import express from 'express'
import { apartmentController } from '../controllers/apartment.controller.js'
import { validateBody, validateParams } from '../middlewares/validate.js'
import {
  createApartmentSchema,
  updateApartmentSchema,
  apartmentIdParamSchema
} from '../schemas/apartment.schema.js'

const apartmentRouter = express.Router()

apartmentRouter.post(
  '/',
  validateBody(createApartmentSchema),
  apartmentController.createApartment
)
apartmentRouter.get('/', apartmentController.getApartments)
apartmentRouter.get('/filter', apartmentController.filterApartments)
apartmentRouter.get('/count', apartmentController.getApartmentCount)
apartmentRouter.get(
  '/:id',
  validateParams(apartmentIdParamSchema),
  apartmentController.getApartmentDetail
)
apartmentRouter.put(
  '/:id',
  validateParams(apartmentIdParamSchema),
  validateBody(updateApartmentSchema),
  apartmentController.updateApartment
)
apartmentRouter.delete(
  '/:id',
  validateParams(apartmentIdParamSchema),
  apartmentController.deleteApartment
)

export default apartmentRouter
