import express from 'express'
import * as statsController from '@/controllers/admin/stats.controller'

const statsRouter = express.Router()

statsRouter.get('/', statsController.getDashboardStats)
statsRouter.get('/account', statsController.getAccountStats)

export default statsRouter
