import instance from './axios.customize'

export const getAllAccountsApi = async (params) => {
  const res = await instance.get('/accounts', { params })
  return res.data
}

export const createAccountApi = async (data) => {
  const res = await instance.post('/accounts', data)
  return res.data
}

export const updateAccountApi = async (id, data) => {
  const res = await instance.put(`/accounts/${id}`, data)
  return res.data
}

export const deleteAccountApi = async (id) => {
  const res = await instance.delete(`/accounts/${id}`)
  return res.data
}
