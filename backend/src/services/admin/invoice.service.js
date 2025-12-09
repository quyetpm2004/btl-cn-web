import { AppError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as invoiceRepo from '@/repositories/invoice.repository.js'
import db from '@/models/index.js'
import { Op } from 'sequelize'

async function createInvoiceService(data) {
  return invoiceRepo.createInvoice(data)
}

async function getInvoicesService(filters) {
  return invoiceRepo.getInvoices(filters)
}

async function getInvoiceStatsService(periodId) {
  const { Invoice } = db
  const where = {}

  if (periodId) where.period_id = periodId

  const totalRevenue = await Invoice.sum('total_amount', { where })

  const paidAmount = await Invoice.sum('total_amount', {
    where: { ...where, status: 1 }
  })

  const unpaidAmount = await Invoice.sum('total_amount', {
    where: { ...where, status: 0 }
  })

  const count = await Invoice.count({
    where
  })

  return {
    total_amount: totalRevenue || 0,
    paid_amount: paidAmount || 0,
    unpaid_amount: unpaidAmount || 0,
    count: count || 0
  }
}

async function generateInvoicesForPeriodService(periodId) {
  const {
    CollectionPeriod,
    Invoice,
    InvoiceItem,
    Apartment,
    ServiceRegistration,
    Service,
    sequelize
  } = db

  const period = await CollectionPeriod.findByPk(periodId)
  if (!period) throw new AppError(StatusCodes.NOT_FOUND, 'Period not found')

  // 0. Cleanup old unpaid invoices
  await sequelize.transaction(async (trx) => {
    const unpaidInvoices = await Invoice.findAll({
      where: { period_id: periodId, status: 0 },
      transaction: trx
    })

    const invoiceIds = unpaidInvoices.map((i) => i.id)

    if (invoiceIds.length > 0) {
      await InvoiceItem.destroy({
        where: { invoice_id: invoiceIds },
        transaction: trx
      })
      await Invoice.destroy({
        where: { id: invoiceIds },
        transaction: trx
      })
    }
  })

  const apartments = await Apartment.findAll()

  for (const apt of apartments) {
    const existing = await Invoice.findOne({
      where: { apartment_id: apt.id, period_id: periodId }
    })
    if (existing) continue

    const activeServices = await ServiceRegistration.findAll({
      where: {
        apartment_id: apt.id,
        status: 1,
        start_date: { [Op.lte]: period.end_date },
        [Op.or]: [
          { end_date: null },
          { end_date: { [Op.gte]: period.start_date } }
        ]
      },
      include: [{ model: Service, as: 'service' }]
    })

    if (activeServices.length === 0) continue

    await sequelize.transaction(async (trx) => {
      const invoice = await Invoice.create(
        {
          apartment_id: apt.id,
          period_id: periodId,
          status: 0,
          total_amount: 0,
          created_at: new Date()
        },
        { transaction: trx }
      )

      let grandTotal = 0

      for (const reg of activeServices) {
        let amount, quantity
        if (reg.service.unit.toLowerCase().includes('m2')) {
          amount = reg.service.price * (apt.area || 0)
          quantity = apt.area || 0
        } else {
          amount = reg.service.price * (reg.quantity || 1)
          quantity = reg.quantity || 1
        }
        await InvoiceItem.create(
          {
            invoice_id: invoice.id,
            service_id: reg.service_id,
            quantity: quantity,
            unit_price: reg.service.price,
            amount: amount
          },
          { transaction: trx }
        )
        grandTotal += amount
      }

      await invoice.update({ total_amount: grandTotal }, { transaction: trx })
    })
  }
}

export {
  createInvoiceService,
  getInvoicesService,
  getInvoiceStatsService,
  generateInvoicesForPeriodService
}
