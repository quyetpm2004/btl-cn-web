import * as invoiceService from '@/services/admin/invoice.service.js'
import { toHttpError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'

export const getInvoices = async (req, res) => {
  try {
    const filters = req.query
    const result = await invoiceService.getInvoicesService(filters)
    return res.status(StatusCodes.OK).json(result)
  } catch (error) {
    const http = toHttpError(error)
    return res.status(http.status).json(http.body)
  }
}

export const getInvoiceStats = async (req, res) => {
  try {
    const { period_id } = req.query
    const result = await invoiceService.getInvoiceStatsService(period_id)
    return res.status(StatusCodes.OK).json(result)
  } catch (error) {
    const http = toHttpError(error)
    return res.status(http.status).json(http.body)
  }
}

export const generateInvoices = async (req, res) => {
  try {
    const { periodId, userId } = req.body
    if (!periodId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Period ID is required' })
    }
    await invoiceService.generateInvoicesForPeriodService({ periodId, userId })
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Invoices generated successfully' })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export const payInvoice = async (req, res) => {
  try {
    const { invoice_id } = req.body
    if (!invoice_id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invoice ID is required' })
    }
    await invoiceService.payInvoiceService(invoice_id)
    return res.status(StatusCodes.OK).json({ message: 'Invoice paid successfully' })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export const bulkUpdateInvoices = async (req, res) => {
  try {
    const { period_id, items } = req.body
    if (!period_id || !items || !Array.isArray(items)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid data' })
    }
    const result = await invoiceService.bulkUpdateInvoicesService(period_id, items)
    return res.status(StatusCodes.OK).json(result)
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}
