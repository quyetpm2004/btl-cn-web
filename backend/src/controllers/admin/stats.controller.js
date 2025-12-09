import * as StatsService from '@/services/admin/stats.service'
import { toHttpError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'

async function getDashboardStats(req, res) {
  try {
    const dashboardStats = await StatsService.getDashboardStats()
    return res.status(StatusCodes.OK).json({ dashboardStats })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getAccountStats(req, res) {
  try {
    const accountStats = await StatsService.getAccountStats()
    return res.status(StatusCodes.OK).json({ accountStats })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export { getDashboardStats, getAccountStats }
