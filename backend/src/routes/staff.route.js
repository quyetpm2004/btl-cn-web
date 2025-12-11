import express from 'express'
import * as staffController from '@/controllers/admin/staff.controller'

const staffRouter = express.Router()

staffRouter.get('/', staffController.getAllStaffs)
staffRouter.get('/technicians', staffController.getTechnicians)

export default staffRouter
