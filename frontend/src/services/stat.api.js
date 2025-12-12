import instance from './axios.customize'

export const getDashboardStatsApi = async () => {
  const res = await instance.get('/stats')
  return res.data
}

export const getAccountStatsApi = async () => {
  const res = await instance.get('/stats/account')
  return res.data
}
