import axios from './axios.customize'

export const getInvoicesApi = (params) => {
  return axios.get('/invoices', { params })
}

export const getInvoiceStatsApi = (params) => {
  return axios.get('/invoices/stats', { params })
}

export const generateInvoicesApi = (periodId) => {
  return axios.post('/invoices/generate', { periodId })
}
