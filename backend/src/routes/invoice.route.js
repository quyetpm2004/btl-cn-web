import express from 'express'
import * as invoiceController from '../controllers/admin/invoice.controller.js'

const invoiceRouter = express.Router()

invoiceRouter.get('/', invoiceController.getInvoices)
invoiceRouter.get('/stats', invoiceController.getInvoiceStats)
invoiceRouter.post('/generate', invoiceController.generateInvoices)

export default invoiceRouter
