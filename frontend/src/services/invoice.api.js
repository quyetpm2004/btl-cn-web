import axios from './axios.customize'

export const getInvoicesApi = (params) => {
  return axios.get('/invoices', { params })
}

export const getInvoiceStatsApi = (params) => {
  return axios.get('/invoices/stats', { params })
}

export const generateInvoicesApi = ({ periodId, userId }) => {
  return axios.post('/invoices/generate', { periodId, userId })
}

export const payInvoiceApi = (invoiceId) => {
  return axios.post('/invoices/pay', { invoice_id: invoiceId })
}

export const bulkUpdateInvoicesApi = ({ periodId, items }) => {
  return axios.post('/invoices/bulk-update', { period_id: periodId, items })
}

export const sendPeriodNotificationApi = (periodId) => {
  return axios.post('/invoices/notify-period', { periodId })
}

export const sendOverdueNotificationApi = () => {
  return axios.post('/invoices/notify-overdue')
}
