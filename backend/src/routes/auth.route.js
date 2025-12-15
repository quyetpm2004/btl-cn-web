import express from 'express'
import { authController } from '@/controllers/auth/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/me', authController.me)
authRouter.post('/forgot-password', authController.handlePasswordResetRequest)
authRouter.post('/resend-otp', authController.handlePasswordResetRequest)
authRouter.post('/verify-otp', authController.handleVerifyOtp)
authRouter.post('/reset-password', authController.handleResetPassword)

export default authRouter
