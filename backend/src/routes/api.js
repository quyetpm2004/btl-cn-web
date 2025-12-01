import express from 'express'
import { authMiddleware } from '../middlewares/auth.js'
import authRouter from './auth.route.js'
import userRoute from './user.route.js'
import apartmentRouter from './apartment.route.js'
import residentRouter from './resident.route.js'

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

export default router
