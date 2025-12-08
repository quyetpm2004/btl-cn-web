import { AppError } from '../utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as invoiceRepo from '../repositories/invoice.repository.js'
import db from '../models/index.js'
import { getApartmentByUserId } from '../repositories/apartment.repository.js'

async function createInvoiceService(data) {
  return invoiceRepo.createInvoice(data)
}

async function getTotalRevenueCurrentMonthService() {
  const now = new Date()
  return invoiceRepo.getPaymentAmountCurrentMonth(now)
}

/**
 * Create payment with automatic invoice status + balance sync using TRANSACTION.
 *
 * Transaction Logic:
 * 1. Create payment
 * 2. Get invoice (with lock)
 * 3. Calculate total paid
 * 4. If fully paid → update invoice status to PAID
 * 5. Recalculate apartment balance
 * 6. Commit or rollback atomically
 *
 * @param {Object} paymentData - { invoice_id, resident_id, method, amount, paid_at, transaction_code }
 * @returns {Promise<{payment, invoice, balance}>}
 */
async function createPaymentService(paymentData) {
  const transaction = await db.sequelize.transaction()

  try {
    console.log('[InvoiceService] Creating payment with sync...', paymentData)

    // 1. Create payment
    const payment = await invoiceRepo.createPayment(paymentData, transaction)

    // 2. Get invoice with row-level lock
    const invoice = await invoiceRepo.getInvoiceById(
      paymentData.invoice_id,
      transaction
    )
    if (!invoice) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Invoice ${paymentData.invoice_id} not found`
      )
    }

    // 3. Calculate total paid for this invoice
    const totalPaid = await invoiceRepo.getTotalPaidForInvoice(
      paymentData.invoice_id,
      transaction
    )
    const invoiceAmount = Number(invoice.total_amount || 0)

    // 4. Update invoice status if fully paid
    if (totalPaid >= invoiceAmount && invoiceAmount > 0) {
      await invoiceRepo.updateInvoiceStatus(invoice.id, 1, transaction) // status = 1 (PAID)
      invoice.status = 1
    }

    // 5. Recalculate and update account balance
    const newBalance = await invoiceRepo.calculateApartmentBalance(
      invoice.apartment_id,
      transaction
    )
    const accountBalance = await invoiceRepo.getOrCreateAccountBalance(
      invoice.apartment_id,
      transaction
    )
    await invoiceRepo.updateAccountBalance(
      accountBalance.id,
      newBalance,
      transaction
    )

    // Commit transaction
    await transaction.commit()

    console.log('[InvoiceService] Payment created successfully')
    console.log(`  - Invoice ${invoice.id} status: ${invoice.status}`)
    console.log(`  - Account balance: ${newBalance}`)

    return {
      payment,
      invoice,
      balance: newBalance
    }
  } catch (err) {
    await transaction.rollback()
    console.error('[InvoiceService] createPaymentService error:', err)

    if (err instanceof AppError) {
      throw err
    }
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create payment'
    )
  }
}

/**
 * Manually check and mark overdue invoices.
 * Calls MySQL event procedure (normally runs daily at 00:05 AM).
 * Useful for immediate update after period end_date changes.
 */
async function checkOverdueInvoicesService() {
  try {
    console.log('[InvoiceService] Checking for overdue invoices...')
    const result = await invoiceRepo.markOverdueByPeriod()
    console.log('[InvoiceService] Overdue check completed:', result)
    return result
  } catch (err) {
    console.error('[InvoiceService] checkOverdueInvoicesService error:', err)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to check overdue invoices'
    )
  }
}

/**
 * Get unpaid invoices for the apartment owned by the given user
 * @param {number} userId
 */
async function getUnpaidInvoicesForUser(userId) {
  const apartment = await getApartmentByUserId(userId)
  if (!apartment) return []
  return invoiceRepo.getInvoicesByApartmentAndStatus(apartment, 0)
}

/**
 * Get paid invoices for the apartment owned by the given user
 * @param {number} userId
 */
async function getPaidInvoicesForUser(userId) {
  const apartment = await getApartmentByUserId(userId)
  if (!apartment) return []
  return invoiceRepo.getInvoicesByApartmentAndStatus(apartment, 1)
}

export const invoiceService = {
  createInvoiceService,
  getTotalRevenueCurrentMonthService,
  createPaymentService,
  checkOverdueInvoicesService,
  getUnpaidInvoicesForUser,
  getPaidInvoicesForUser
}
