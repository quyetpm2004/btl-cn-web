import express from 'express'
import contactController from '../controllers/contact.controller.js'

const router = express.Router()

// Route public - không cần authentication
router.post('/send', contactController.sendContact)

export default router
