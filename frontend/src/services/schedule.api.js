import instance from './axios.customize'

export const getSchedulesApi = async (params) => {
  const res = await instance.get('/schedules', { params })
  return res.data
}

export const getAllPendingSchedulesApi = async () => {
  const res = await instance.get('/schedules/pending')
  return res.data
}

export const getScheduleDetailApi = async (id) => {
  const res = await instance.get(`/schedules/${id}`)
  return res.data
}

export const createScheduleApi = async (data) => {
  const res = await instance.post('/schedules', data)
  return res.data
}

export const updateScheduleApi = async (id, data) => {
  const res = await instance.put(`/schedules/${id}`, data)
  return res.data
}

export const deleteScheduleApi = async (id) => {
  const res = await instance.delete(`/schedules/${id}`)
  return res.data
}
