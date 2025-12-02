import { Invoice, Payment } from '../models/index.js'
import { Op } from 'sequelize'
import db from '../models/index.js'

async function createInvoice(data) {
  return Invoice.create(data)
}

// Total revenue collected this calendar month based on actual Payments (recommended)
async function getPaymentAmountCurrentMonth(date) {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const startOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1)

  const total = await Payment.sum('amount', {
    where: {
      paid_at: {
        [Op.gte]: startOfMonth,
        [Op.lt]: startOfNextMonth
      }
    }
  })

  return Number(total || 0)
}

// Alternative: Sum total_amount of invoices marked as paid within this month
// async function getPaidInvoiceAmountCurrentMonth() {
//   const now = new Date()
//   const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
//   const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

//   const total = await Invoice.sum('total_amount', {
//     where: {
//       status: 1, // paid
//       created_at: {
//         [Op.gte]: startOfMonth,
//         [Op.lt]: startOfNextMonth
//       }
//     }
//   })

//   return Number(total || 0)
// }

/**
 * Create payment record.
 * @param {Object} paymentData - { invoice_id, resident_id, method, amount, paid_at, transaction_code }
 * @param {Object} transaction - optional Sequelize transaction
 * @returns {Promise<Payment>}
 */
async function createPayment(paymentData, transaction) {
  return Payment.create(paymentData, { transaction })
}

/**
 * Get invoice by ID with optional lock.
 * @param {number} invoiceId
 * @param {Object} transaction - optional Sequelize transaction
 * @returns {Promise<Invoice>}
 */
async function getInvoiceById(invoiceId, transaction) {
  const options = { transaction }
  if (transaction) {
    options.lock = transaction.LOCK.UPDATE
  }
  return Invoice.findByPk(invoiceId, options)
}

/**
 * Get total paid amount for an invoice.
 * @param {number} invoiceId
 * @param {Object} transaction - optional Sequelize transaction
 * @returns {Promise<number>}
 */
async function getTotalPaidForInvoice(invoiceId, transaction) {
  const total = await Payment.sum('amount', {
    where: { invoice_id: invoiceId },
    transaction
  })
  return Number(total || 0)
}

/**
 * Update invoice status.
 * @param {number} invoiceId
 * @param {number} status - 0: unpaid, 1: paid, 2: overdue, 3: cancelled
 * @param {Object} transaction - optional Sequelize transaction
 * @returns {Promise<void>}
 */
async function updateInvoiceStatus(invoiceId, status, transaction) {
  await Invoice.update({ status }, { where: { id: invoiceId }, transaction })
}

/**
 * Calculate apartment balance.
 * Balance = SUM(invoices.total_amount) - SUM(payments) where invoice status != cancelled
 * @param {number} apartmentId
 * @param {Object} transaction - optional Sequelize transaction
 * @returns {Promise<number>}
 */
async function calculateApartmentBalance(apartmentId, transaction) {
  const result = await db.sequelize.query(
    `SELECT
      COALESCE(SUM(i.total_amount), 0) as total_invoices,
      COALESCE(SUM(p.amount), 0) as total_payments
    FROM invoices i
    LEFT JOIN payments p ON i.id = p.invoice_id
    WHERE i.apartment_id = :apartment_id AND i.status != 3`,
    {
      replacements: { apartment_id: apartmentId },
      type: db.sequelize.QueryTypes.SELECT,
      transaction
    }
  )

  const totalInvoices = Number(result[0]?.total_invoices || 0)
  const totalPayments = Number(result[0]?.total_payments || 0)
  return totalInvoices - totalPayments
}

/**
 * Get or create account balance record.
 * @param {number} apartmentId
 * @param {Object} transaction - optional Sequelize transaction
 * @returns {Promise<AccountBalance>}
 */
async function getOrCreateAccountBalance(apartmentId, transaction) {
  const { AccountBalance } = db.sequelize.models
  const options = { where: { apartment_id: apartmentId }, transaction }
  if (transaction) {
    options.lock = transaction.LOCK.UPDATE
  }

  let balance = await AccountBalance.findOne(options)
  if (!balance) {
    balance = await AccountBalance.create(
      {
        apartment_id: apartmentId,
        balance: 0,
        last_update: new Date()
      },
      { transaction }
    )
  }
  return balance
}

/**
 * Update account balance.
 * @param {number} accountBalanceId
 * @param {number} balanceAmount
 * @param {Object} transaction - optional Sequelize transaction
 * @returns {Promise<void>}
 */
async function updateAccountBalance(
  accountBalanceId,
  balanceAmount,
  transaction
) {
  const { AccountBalance } = db.sequelize.models
  await AccountBalance.update(
    {
      balance: balanceAmount,
      last_update: new Date()
    },
    { where: { id: accountBalanceId }, transaction }
  )
}

/**
 * Call stored procedure to mark overdue invoices.
 * @returns {Promise<Object>}
 */
async function markOverdueByPeriod() {
  try {
    await db.sequelize.query('CALL mark_overdue_invoices()')
    return { success: true, message: 'Overdue invoices marked successfully' }
  } catch (err) {
    console.error('[InvoiceRepo] markOverdueByPeriod error:', err)
    throw err
  }
}

export {
  createInvoice,
  getPaymentAmountCurrentMonth,
  createPayment,
  getInvoiceById,
  getTotalPaidForInvoice,
  updateInvoiceStatus,
  calculateApartmentBalance,
  getOrCreateAccountBalance,
  updateAccountBalance,
  markOverdueByPeriod
}

/**
 * Get invoices for an apartment filtered by status.
 * @param {number} apartmentId
 * @param {number|Array<number>} status - invoice status or array of statuses
 * @returns {Promise<Array<Invoice>>}
 */
async function getInvoicesByApartmentAndStatus(apartmentId, status) {
  const where = { apartment_id: apartmentId }
  if (Array.isArray(status)) {
    where.status = { [Op.in]: status }
  } else if (status !== undefined && status !== null) {
    where.status = status
  }

  return Invoice.findAll({
    where,
    include: [
      { model: db.sequelize.models.InvoiceItem, as: 'items' },
      { model: db.sequelize.models.Payment, as: 'payments' },
      { model: db.sequelize.models.CollectionPeriod, as: 'period' }
    ],
    order: [['id', 'DESC']]
  })
}

/**
 * Get all invoices for an apartment (optional pagination/filtering could be added later)
 */
async function getInvoicesByApartment(apartmentId) {
  return getInvoicesByApartmentAndStatus(apartmentId)
}

// Export the new helpers
export {
  getInvoicesByApartmentAndStatus,
  getInvoicesByApartment
}
