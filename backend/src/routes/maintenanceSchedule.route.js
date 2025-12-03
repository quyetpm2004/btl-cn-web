import express from 'express'
import * as maintenanceScheduleController from '@/controllers/admin/maintenance.sche.controller'
import { validateBody, validateParams } from '@/middlewares/validate.js'
import {
  createMaintenanceScheduleSchema,
  updateMaintenanceScheduleSchema,
  maintenanceScheduleIdParamSchema
} from '@/schemas/maintenanceSchedule.schema.js'

const maintenanceScheduleRouter = express.Router()

maintenanceScheduleRouter.post(
  '/',
  validateBody(createMaintenanceScheduleSchema),
  maintenanceScheduleController.createMaintenanceSchedule
)
maintenanceScheduleRouter.get(
  '/',
  maintenanceScheduleController.getAllMaintenanceSchedules
)
maintenanceScheduleRouter.get(
  '/pending',
  maintenanceScheduleController.getAllPendingMaintenanceSchedules
)

maintenanceScheduleRouter.get(
  '/:id',
  maintenanceScheduleController.getMaintenanceScheduleDetail
)
maintenanceScheduleRouter.put(
  '/:id',
  validateParams(maintenanceScheduleIdParamSchema),
  validateBody(updateMaintenanceScheduleSchema),
  maintenanceScheduleController.updateMaintenanceSchedule
)
maintenanceScheduleRouter.delete(
  '/:id',
  validateParams(maintenanceScheduleIdParamSchema),
  maintenanceScheduleController.deleteMaintenanceSchedule
)

export default maintenanceScheduleRouter
