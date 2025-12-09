import express from 'express'
import { authMiddleware } from '../middlewares/auth.js'
import authRouter from './auth.route.js'
import userRoute from './user.route.js'
import apartmentRouter from './apartment.route.js'
import residentRouter from './resident.route.js'
import maintenanceScheduleRouter from './maintenanceSchedule.route.js'
import staffRouter from './staff.route.js'
import maintenanceRequestRouter from './maintenanceRequest.route.js'
import uploadRouter from './upload.route.js'
import statsRouter from './stats.route.js'
import accountRouter from './account.route.js'
import serviceRouter from './service.route.js'
import collectionPeriodRouter from './collectionPeriod.route.js'
import invoiceRouter from './invoice.route.js'

const router = express.Router()

router.get('/', async (req, res) => {
  res.status(200).json({
    message: 'API is running'
  })
})

router.use(authMiddleware)
router.use(authRouter)
router.use('/user', userRoute)
router.use('/apartments', apartmentRouter)
router.use('/residents', residentRouter)
router.use('/schedules', maintenanceScheduleRouter)
router.use('/staffs', staffRouter)
router.use('/requests', maintenanceRequestRouter)
router.use('/stats', statsRouter)
router.use('/accounts', accountRouter)
router.use('/services', serviceRouter)
router.use('/periods', collectionPeriodRouter)
router.use('/invoices', invoiceRouter)

router.use('/upload', uploadRouter) //test cloudinary

export default router
