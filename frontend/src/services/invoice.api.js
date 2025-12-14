import instance from './axios.customize'

export const getInvoicesApi = (params) => {
  return instance.get('/invoices', { params })
}

export const getInvoiceStatsApi = (params) => {
  return instance.get('/invoices/stats', { params })
}

export const generateInvoicesApi = ({ periodId, userId }) => {
  return instance.post('/invoices/generate', { periodId, userId })
}

export const payInvoiceApi = (invoiceId) => {
  return instance.post('/invoices/pay', { invoice_id: invoiceId })
}

export const bulkUpdateInvoicesApi = ({ periodId, items }) => {
  return instance.post('/invoices/bulk-update', { period_id: periodId, items })
}

export const sendPeriodNotificationApi = (periodId) => {
  return instance.post('/invoices/notify-period', { periodId })
}

export const sendOverdueNotificationApi = () => {
  return instance.post('/invoices/notify-overdue')
}
