import instance from './axios.customize'

export const getAssigneesApi = async () => {
  const res = await instance.get('/staffs/technicians')
  return res.data
}
