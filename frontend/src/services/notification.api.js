import instance from './axios.customize'

export const getNotificationsApi = async (params) => {
  const res = await instance.get('/notifications', { params })
  return res.data
}

export const createNotificationApi = async (data) => {
  const res = await instance.post('/notifications', data)
  return res.data
}

export const updateNotificationApi = async (id, data) => {
  const res = await instance.put(`/notifications/${id}`, data)
  return res.data
}

export const deleteNotificationApi = async (id) => {
  const res = await instance.delete(`/notifications/${id}`)
  return res.data
}
