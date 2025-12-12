import instance from './axios.customize'

export const getAllActiveServicesApi = async () => {
  const res = await instance.get('/services')
  return res.data
}

export const createServiceApi = async (data) => {
  const res = await instance.post('/services', data)
  return res.data
}

export const updateServiceApi = async (id, data) => {
  const res = await instance.put(`/services/${id}`, data)
  return res.data
}

export const deleteServiceApi = async (id) => {
  const res = await instance.delete(`/services/${id}`)
  return res.data
}
