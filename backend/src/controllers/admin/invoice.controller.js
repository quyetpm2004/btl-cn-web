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
    const { periodId } = req.body
    if (!periodId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Period ID is required' })
    }
    await invoiceService.generateInvoicesForPeriodService(periodId)
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Invoices generated successfully' })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}
