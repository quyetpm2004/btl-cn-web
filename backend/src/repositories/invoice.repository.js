import {
  Invoice,
  InvoiceItem,
  CollectionPeriod,
  Apartment,
  Service,
  Resident,
  Payment
} from '../models/index.js'
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
    order: [
      ['period_id', 'DESC'],
      ['apartment_id', 'ASC']
    ]
  })

  return { items, total, page, limit }
}

async function getInvoiceById(invoiceId, transaction) {
  const options = { transaction }
  if (transaction) options.lock = transaction.LOCK.UPDATE
  return Invoice.findByPk(invoiceId, options)
}

async function updateInvoice(invoiceId, data) {
  await Invoice.update(data, { where: { id: invoiceId } })
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
    order: [['period_id', 'DESC']]
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
  getInvoiceById,
  updateInvoice,
  getInvoicesByApartmentAndStatus,
  getInvoicesByApartment
}
