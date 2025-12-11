import express from 'express'
import uploadFile from '@/middlewares/multer.js'
import {
  getProfile,
  updatePassword,
  updateProfile
} from '@/controllers/user/profile.controller.js'
import {
  fetchResident,
  getApartment
} from '@/controllers/user/apartment.controller.js'
import {
  getNotification,
  markNotificationRead
} from '@/controllers/user/notification.controller.js'
import {
  createMaintenanceRequest,
  deleteMaintenanceRequest,
  getMaintenanceRequestDetail,
  getPendingRequests,
  updateMaintenanceRequest
} from '@/controllers/user/maintenance.req.controller.js'
import {
  getMaintenanceScheduleDetail,
  getResidentSchedules
} from '@/controllers/user/maintenance.sche.controller.js'
import {
  getAllEquipments,
  getEquipmentById
} from '../controllers/user/equipment.controller.js'
import { getAllWorkType } from '../controllers/user/worktype.controller.js'
import {
  getPaymentUnpaid,
  getPaymentPaid,
  createPayment,
  vnpayReturn
} from '../controllers/user/payment.controller.js'
import { getDashboard } from '../controllers/user/dashboard.controller.js'
import { serviceController } from '../controllers/service.controller.js'
import { validateBody } from '../middlewares/validate.js'
import { profileSchema } from '../schemas/profile.schema.js'
const uploadAvatar = uploadFile('avatar')
const uploadRequestImages = uploadFile('request')

const userRoute = express.Router()

// profle
userRoute.get('/profile', getProfile)
userRoute.put(
  '/profile',
  uploadAvatar.single('avatar'),
  validateBody(profileSchema),
  updateProfile
)
userRoute.put('/password', updatePassword)

// apartment
userRoute.get('/fetch-resident', fetchResident)

// notification
userRoute.get('/notification/:userId', getNotification)
userRoute.put(
  '/notification/:notificationReceiverId/:isRead',
  markNotificationRead
)

// Maintenance Request
userRoute.post(
  '/maintenance-request',
  uploadRequestImages.array('images', 5),
  createMaintenanceRequest
)
userRoute.get('/maintenance-request/:residentId', getPendingRequests)
userRoute.get('/maintenance-request/:id', getMaintenanceRequestDetail)
userRoute.put(
  '/maintenance-request/:id',
  uploadRequestImages.array('images', 5),
  updateMaintenanceRequest
)
userRoute.delete('/maintenance-request/:id', deleteMaintenanceRequest)

// Maintenance Schedule
userRoute.get(
  '/maintenance-schedule/resident/:residentId',
  getResidentSchedules
)
userRoute.get('/maintenance-schedule/:id', getMaintenanceScheduleDetail)

// Equipment
userRoute.get('/equipment', getAllEquipments)
userRoute.get('/equipment/:id', getEquipmentById)

// Work Type
userRoute.get('/work-type', getAllWorkType)

// Fee
userRoute.get('/payment/unpaid', getPaymentUnpaid)
userRoute.get('/payment/paid', getPaymentPaid)
userRoute.post('/payment/create-qr', createPayment)
userRoute.get('/payment/vnpay_return', vnpayReturn)

// Dashboard
userRoute.get('/dashboard', getDashboard)

// Services
userRoute.get('/services', serviceController.getServices)

export default userRoute
