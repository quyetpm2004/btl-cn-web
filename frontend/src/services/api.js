import instance from './axios.customize.js'

const loginApi = async (username, password) => {
  const response = await instance.post('/api-v1/login', {
    username,
    password
  })
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
  const response = await instance.post('/api-v1/register', {
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
  const response = await instance.get('/api-v1/user/profile')
  return response
}

const updateProfileApi = async (profileData) => {
  const response = await instance.put('/api-v1/user/profile', profileData)
  return response
}

const updatePasswordApi = async (passwordData) => {
  const response = await instance.put('/api-v1/user/password', passwordData)
  return response
}

const fetchResidentInfoApi = async () => {
  const response = await instance.get('/api-v1/user/fetch-resident')
  return response
}

export {
  loginApi,
  registerApi,
  getProfileApi,
  updateProfileApi,
  updatePasswordApi,
  fetchResidentInfoApi
}
