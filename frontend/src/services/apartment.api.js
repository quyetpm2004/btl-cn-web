import instance from './axios.customize.js'

export const createApartmentApi = async (data) => {
  const res = await instance.post('/apartments', data)
  return res.data
}

export const getApartmentDetailApi = async (id) => {
  const res = await instance.get(`/apartments/${id}`)
  return res.data
}

export const updateApartmentApi = async (id, data) => {
  const res = await instance.put(`/apartments/${id}`, data)
  return res.data
}

export const deleteApartmentApi = async (id) => {
  const res = await instance.delete(`/apartments/${id}`)
  return res.data
}

export const filterApartmentsApi = async (params) => {
  const res = await instance.get('/apartments/filter', { params })
  return res.data
}

export const getApartmentsWithServicesApi = async (params) => {
  const res = await instance.get('/apartments/services', { params })
  return res.data
}

export const getApartmentCountApi = async (config) => {
  const res = await instance.get('/apartments/count', config)
  return res.data
}

export const getBuildingsApartmentApi = async () => {
  const res = await instance.get('/apartments/buildings')
  return res.data
}

export const getTypesApartmentApi = async () => {
  const res = await instance.get('/apartments/types')
  return res.data
}

export const addResidentToApartmentApi = async (apartmentId, residentId) => {
  const res = await instance.post(`/apartments/${apartmentId}/residents`, {
    resident_id: residentId
  })
  return res.data
}

export const updateApartmentServicesApi = async (apartmentId, services) => {
  const res = await instance.put(`/apartments/${apartmentId}/services`, {
    services
  })
  return res.data
}

export const removeResidentFromApartmentApi = async (
  apartmentId,
  residentId
) => {
  const res = await instance.delete(
    `/apartments/${apartmentId}/residents/${residentId}`
  )
  return res.data
}
