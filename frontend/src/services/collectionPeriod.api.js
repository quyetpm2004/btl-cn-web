import instance from './axios.customize'

export const getAllCollectionPeriodsApi = async () => {
  const res = await instance.get('/periods')
  return res.data
}

export const createCollectionPeriodApi = async (data) => {
  const res = await instance.post('/periods', data)
  return res.data
}

export const updateCollectionPeriodApi = async (id, data) => {
  const res = await instance.put(`/periods/${id}`, data)
  return res.data
}

export const closeCollectionPeriodApi = async (id) => {
  const res = await instance.put(`/periods/${id}/close`)
  return res.data
}

export const deleteCollectionPeriodApi = async (id) => {
  const res = await instance.delete(`/periods/${id}`)
  return res.data
}
