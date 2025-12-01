import instance from './axios.customize.js'

export const loginApi = async (data) => {
  const res = await instance.post('/login', data)
  return res
}

export const registerApi = async (data) => {
  const res = await instance.post('/register', data)
  return res
}
