import express from 'express'
import { serviceController } from '../controllers/service.controller.js'
import { validateBody, validateParams } from '../middlewares/validate.js'
import {
  createServiceSchema,
  updateServiceSchema,
  serviceIdParamSchema
} from '../schemas/service.schema.js'

const serviceRouter = express.Router()

serviceRouter.post(
  '/',
  validateBody(createServiceSchema),
  serviceController.createService
)
serviceRouter.get('/', serviceController.getServices)
serviceRouter.get('/filter', serviceController.filterServices)
serviceRouter.get(
  '/:id',
  validateParams(serviceIdParamSchema),
  serviceController.getServiceDetail
)
serviceRouter.put(
  '/:id',
  validateParams(serviceIdParamSchema),
  validateBody(updateServiceSchema),
  serviceController.updateService
)
serviceRouter.delete(
  '/:id',
  validateParams(serviceIdParamSchema),
  serviceController.deleteService
)

export default serviceRouter
