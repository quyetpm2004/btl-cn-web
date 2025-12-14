import express from 'express'
import * as invoiceController from '../controllers/admin/invoice.controller.js'

const invoiceRouter = express.Router()

invoiceRouter.get('/', invoiceController.getInvoices)
invoiceRouter.get('/stats', invoiceController.getInvoiceStats)
invoiceRouter.post('/generate', invoiceController.generateInvoices)
invoiceRouter.post('/pay', invoiceController.payInvoice)
invoiceRouter.post('/bulk-update', invoiceController.bulkUpdateInvoices)
invoiceRouter.post('/notify-period', invoiceController.sendPeriodNotification)
invoiceRouter.post('/notify-overdue', invoiceController.sendOverdueNotification)

export default invoiceRouter
