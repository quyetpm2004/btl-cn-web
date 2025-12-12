import {
  Invoice,
  InvoiceItem,
  CollectionPeriod,
  Apartment,
  Service,
  Resident,
  Payment
} from '../models/index.js'
import db from '../models/index.js'
import { Op } from 'sequelize'

async function createInvoice(data) {
  return Invoice.create(data)
}

async function getInvoices(filters) {
  const page = Number(filters.page) > 0 ? Number(filters.page) : 1
  const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 9
  const offset = (page - 1) * limit

  const { page: _p, limit: _l, offset: _o, query, ...rest } = filters || {}
  const where = Object.fromEntries(
    Object.entries(rest).filter(
      ([, v]) => v !== undefined && v !== null && v !== ''
    )
  )

  const apartmentInclude = {
    model: Apartment,
    as: 'apartment',
    attributes: ['apartment_code', 'id']
  }

  if (query) {
    apartmentInclude.where = {
      apartment_code: { [Op.like]: `%${query}%` }
    }
  }

  const total = await Invoice.count({
    where,
    include: [apartmentInclude]
  })

  const items = await Invoice.findAll({
    where,
    include: [
      {
        ...apartmentInclude,
        include: [
          {
            model: Resident,
            as: 'residents',
            through: { where: { relationship: 'owner' } },
            required: false,
            attributes: ['full_name']
          }
        ]
      },
      {
        model: CollectionPeriod,
        as: 'period',
        attributes: ['id', 'name', 'start_date', 'end_date']
      },
      {
        model: InvoiceItem,
        as: 'items',
        attributes: ['amount', 'quantity'],
        include: [
          { model: Service, as: 'service', attributes: ['name', 'unit'] }
        ]
      },
      {
        model: Payment,
        as: 'payments',
        attributes: ['amount', 'method', 'paid_at']
      }
    ],
    limit,
    offset,
    order: [['created_at', 'DESC']]
  })

  return { items, total, page, limit }
}

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

async function createPayment(paymentData, transaction) {
  return Payment.create(paymentData, { transaction })
}

async function getInvoiceById(invoiceId, transaction) {
  const options = { transaction }
  if (transaction) options.lock = transaction.LOCK.UPDATE
  return Invoice.findByPk(invoiceId, options)
}

async function getTotalPaidForInvoice(invoiceId, transaction) {
  const total = await Payment.sum('amount', {
    where: { invoice_id: invoiceId },
    transaction
  })
  return Number(total || 0)
}

async function updateInvoice(invoiceId, data) {
  await Invoice.update(data, { where: { id: invoiceId } })
}

async function calculateApartmentBalance(apartmentId, transaction) {
  const result = await db.sequelize.query(
    `SELECT
      COALESCE(SUM(i.total_amount), 0) AS total_invoices,
      COALESCE(SUM(p.amount), 0) AS total_payments
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

async function getOrCreateAccountBalance(apartmentId, transaction) {
  const { AccountBalance } = db.sequelize.models
  const options = { where: { apartment_id: apartmentId }, transaction }
  if (transaction) options.lock = transaction.LOCK.UPDATE

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

async function markOverdueByPeriod() {
  try {
    await db.sequelize.query('CALL mark_overdue_invoices()')
    return { success: true, message: 'Overdue invoices marked successfully' }
  } catch (err) {
    console.error('[InvoiceRepo] markOverdueByPeriod error:', err)
    throw err
  }
}

async function getInvoicesByApartmentAndStatus(apartments, status) {
  const apartmentIds = apartments.map((a) => a.id)

  const where = { apartment_id: { [Op.in]: apartmentIds } }

  if (Array.isArray(status)) {
    where.status = { [Op.in]: status }
  } else if (status !== undefined && status !== null) {
    where.status = status
  }

  const invoices = await Invoice.findAll({
    where,
    include: [
      {
        model: InvoiceItem,
        as: 'items',
        include: [{ model: Service, as: 'service' }]
      },
      { model: CollectionPeriod, as: 'period' }
    ],
    order: [['id', 'ASC']]
  })

  return invoices.map((invoice) => ({
    id: invoice.id,
    apartment_id: invoice.apartment_id,
    total_amount: invoice.total_amount,
    status: invoice.status,
    end_date: invoice.end_date,
    paid_at: invoice.paid_at,
    created_at: invoice.created_at,
    items: invoice.items,
    name: invoice.period?.name
  }))
}

async function getInvoicesByApartment(apartments) {
  return getInvoicesByApartmentAndStatus(apartments)
}

export {
  createInvoice,
  getInvoices,
  getPaymentAmountCurrentMonth,
  createPayment,
  getInvoiceById,
  getTotalPaidForInvoice,
  updateInvoice,
  calculateApartmentBalance,
  getOrCreateAccountBalance,
  updateAccountBalance,
  markOverdueByPeriod,
  getInvoicesByApartmentAndStatus,
  getInvoicesByApartment
}
