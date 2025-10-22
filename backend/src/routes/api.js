import express from 'express'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

router.get('/', async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'API is running'
  })
})

export default router
