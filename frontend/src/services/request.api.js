import instance from './axios.customize'

export const getAllPendingRequestsApi = async () => {
  const res = await instance.get('/requests/pending')
  return res.data
}

export const getRequestDetailApi = async (id) => {
  const res = await instance.get(`/requests/${id}`)
  return res.data
}

export const assignRequestApi = async (id, technicianId) => {
  const res = await instance.put(`/requests/${id}/assign`, {
    technician_id: technicianId
  })
  return res.data
}

export const updateRequestStatusApi = async (id, status) => {
  const res = await instance.put(`/requests/${id}/status`, { status })
  return res.data
}

export const completeRequestApi = async (id, result) => {
  const res = await instance.put(`/requests/${id}/complete`, { result })
  return res.data
}
