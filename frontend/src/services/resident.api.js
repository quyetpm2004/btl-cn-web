import instance from './axios.customize.js'

export const createResidentApi = async (data) => {
  const res = await instance.post('/residents', data)
  if (res && res.data) return res.data
  throw res
}

export const getResidentsApi = async () => {
  const res = await instance.get('/residents')
  return res.data
}

export const getResidentDetailApi = async (id) => {
  const res = await instance.get(`/residents/${id}`)
  return res.data
}

export const updateResidentApi = async (id, data) => {
  const res = await instance.put(`/residents/${id}`, data)
  if (res && res.data) return res.data
  throw res
}

export const deleteResidentApi = async (id) => {
  const res = await instance.delete(`/residents/${id}`)
  return res.data
}

export const filterResidentsApi = async (params) => {
  const res = await instance.get('/residents/filter', { params })
  return res.data
}

export const getResidentCountApi = async (config) => {
  const res = await instance.get('/residents/count', config)
  return res.data
}

export const getResidentsWithoutAccountApi = async () => {
  const res = await instance.get('/residents/no-account')
  return res.data
}
