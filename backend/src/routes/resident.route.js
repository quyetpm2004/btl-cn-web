import express from 'express'
import { residentController } from '../controllers/resident.controller.js'
import { validateBody, validateParams } from '../middlewares/validate.js'
import {
  createResidentSchema,
  updateResidentSchema,
  residentIdParamSchema
} from '../schemas/resident.schema.js'

const residentRouter = express.Router()

residentRouter.post(
  '/',
  validateBody(createResidentSchema),
  residentController.createResident
)
residentRouter.get('/', residentController.getResidents)
residentRouter.get('/filter', residentController.filterResidents)
residentRouter.get('/count', residentController.getResidentCount)
residentRouter.get(
  '/:id',
  validateParams(residentIdParamSchema),
  residentController.getResidentDetail
)
residentRouter.put(
  '/:id',
  validateParams(residentIdParamSchema),
  validateBody(updateResidentSchema),
  residentController.updateResident
)
residentRouter.delete(
  '/:id',
  validateParams(residentIdParamSchema),
  residentController.deleteResident
)

export default residentRouter
