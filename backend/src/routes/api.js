import express from 'express'
import { authMiddleware } from '../middlewares/auth.js'
import authRouter from './auth.route.js'
import apartmentRouter from './apartment.route.js'

const router = express.Router()

router.get('/', async (req, res) => {
  res.status(200).json({
    message: 'API is running'
  })
})

router.use(authMiddleware)
router.use(authRouter)
router.use('/apartments', apartmentRouter)

export default router
