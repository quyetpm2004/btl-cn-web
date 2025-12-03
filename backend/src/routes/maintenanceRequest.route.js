import express from 'express'
import * as maintenanceRequestController from '@/controllers/admin/maintenance.req.controller'
import { validateBody, validateParams } from '@/middlewares/validate.js'
import {
  createMaintenanceRequestSchema,
  updateMaintenanceRequestSchema,
  maintenanceRequestIdParamSchema
} from '@/schemas/maintenanceRequest.schema.js'

const maintenanceRequestRouter = express.Router()

maintenanceRequestRouter.get(
  '/pending',
  maintenanceRequestController.getAllPendingMaintenanceRequests
)
maintenanceRequestRouter.get(
  '/:id',
  maintenanceRequestController.getMaintenanceRequestDetail
)

maintenanceRequestRouter.put(
  '/:id/assign',
  maintenanceRequestController.assignRequest
)
maintenanceRequestRouter.put(
  '/:id/status',
  maintenanceRequestController.updateStatus
)
maintenanceRequestRouter.put(
  '/:id/complete',
  maintenanceRequestController.completeRequest
)

export default maintenanceRequestRouter
