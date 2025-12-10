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
            through: {
              where: { relationship: 'owner' }
            },
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

export { createInvoice, getInvoices }
