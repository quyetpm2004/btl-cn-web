import instance from './axios.customize.js'

const loginApi = async (username, password) => {
  const response = await instance.post('/login', {
    username,
    password
  })
  return response
}

const getMeApi = async () => {
  const response = await instance.get('/me')
  return response
}

const registerApi = async (
  username,
  password,
  full_name,
  email,
  phone,
  apartment_code
) => {
  const response = await instance.post('/register', {
    username,
    password,
    full_name,
    email,
    phone,
    apartment_code
  })

  return response
}

const getProfileApi = async () => {
  const response = await instance.get('/user/profile')
  return response
}

const updateProfileApi = async (profileData) => {
  const response = await instance.put('/user/profile', profileData)
  return response
}

const updatePasswordApi = async (passwordData) => {
  const response = await instance.put('/user/password', passwordData)
  return response
}

const fetchResidentInfoApi = async () => {
  const response = await instance.get('/user/fetch-resident')
  return response
}

const getNotification = async (userId, filter) => {
  const response = await instance.get(
    `/user/notification/${userId}?filter=${filter}`
  )
  return response
}

const markNotification = async (notificationReceiverId, isRead) => {
  const response = instance.put(
    `/user/notification/${notificationReceiverId}/${isRead}`
  )
  return response
}

const getMaintenanceRequestsApi = async (residentId) => {
  const response = await instance.get(`/user/maintenance-request/${residentId}`)
  return response
}

const getAllWorkType = async () => {
  const response = await instance.get('/user/work-type')
  return response
}

const getEquipmentByIdApi = async (id) => {
  const response = await instance.get(`/user/equipment/${id}`)
  return response
}

const createMaintenanceRequestApi = async (data) => {
  const formData = new FormData()
  formData.append('work_type_id', data.work_type_id)
  formData.append('resident_id', data.resident_id)
  formData.append('title', data.title)
  formData.append('description', data.description)
  data.images.forEach((image) => {
    formData.append(`images`, image)
  })
  const response = await instance.post('/user/maintenance-request', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response
}

const updateMaintenanceRequestApi = async (id, data) => {
  const formData = new FormData()
  formData.append('equipment_id', data.equipment_id)
  formData.append('resident_id', data.resident_id)
  formData.append('priority', data.priority)
  formData.append('description', data.description)
  formData.append('removed_images', JSON.stringify(data.removed_images))
  data.images.forEach((image) => {
    formData.append(`images`, image)
  })
  const response = await instance.put(
    `/user/maintenance-request/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response
}

const deleteMaintenanceRequestApi = async (id) => {
  const response = await instance.delete(`/user/maintenance-request/${id}`)
  return response
}

const getMaintenanceSchedule = async (residentId) => {
  const response = await instance.get(
    `/user/maintenance-schedule/resident/${residentId}`
  )
  return response
}

const getUnpaidApi = async () => {
  const response = await instance.get('/user/payment/unpaid')
  return response
}

const getPaymentHistoryApi = async () => {
  const response = await instance.get('/user/payment/paid')
  return response
}

const createQrApi = async (invoiceId) => {
  const response = await instance.post('/user/payment/create-qr', {
    invoiceId
  })
  return response
}

const paymentResultApi = async (query) => {
  const response = await instance.get(`/user/payment/vnpay_return${query}`)
  return response
}

const dashboardApi = async (residentId) => {
  const response = await instance.get(`/user/dashboard/${residentId}`)
  return response
}

const getServicesApi = async () => {
  const response = await instance.get('/user/services')
  return response
}

const forgotPasswordApi = async (email) => {
  const response = await instance.post('/forgot-password', { email })
  return response
}

const verifyOtpApi = async (email, otp) => {
  const response = await instance.post('/verify-otp', { email, code: otp })
  return response
}

const resetPasswordApi = async (token, newPassword) => {
  const response = await instance.post('/reset-password', {
    token,
    newPassword
  })
  return response
}

export {
  loginApi,
  getMeApi,
  registerApi,
  getProfileApi,
  updateProfileApi,
  updatePasswordApi,
  fetchResidentInfoApi,
  getNotification,
  markNotification,
  getMaintenanceRequestsApi,
  getAllWorkType,
  getEquipmentByIdApi,
  createMaintenanceRequestApi,
  updateMaintenanceRequestApi,
  deleteMaintenanceRequestApi,
  getMaintenanceSchedule,
  getUnpaidApi,
  getPaymentHistoryApi,
  createQrApi,
  paymentResultApi,
  dashboardApi,
  getServicesApi,
  forgotPasswordApi,
  verifyOtpApi,
  resetPasswordApi
}
