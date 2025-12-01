import instance from './axios.customize.js'

export const getProfileApi = async () => {
  const res = await instance.get('/user/profile')
  return res
}

export const updateProfileApi = async (profileData) => {
  const res = await instance.put('/user/profile', profileData)
  return res
}

export const updatePasswordApi = async (passwordData) => {
  const res = await instance.put('/user/password', passwordData)
  return res
}

export const fetchResidentInfoApi = async () => {
  const res = await instance.get('/user/fetch-resident')
  return res
}
