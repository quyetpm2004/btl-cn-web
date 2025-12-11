import express from 'express'
import { apartmentController } from '@/controllers/admin/apartment.controller.js'
import { validateBody, validateParams } from '@/middlewares/validate.js'
import {
  createApartmentSchema,
  updateApartmentSchema,
  apartmentIdParamSchema
} from '@/schemas/apartment.schema.js'

const apartmentRouter = express.Router()

apartmentRouter.post(
  '/',
  validateBody(createApartmentSchema),
  apartmentController.createApartment
)
apartmentRouter.get('/', apartmentController.getApartments)
apartmentRouter.get('/filter', apartmentController.filterApartments)
apartmentRouter.get('/count', apartmentController.getApartmentCount)
apartmentRouter.get('/buildings', apartmentController.getBuildingsApartment)
apartmentRouter.get('/types', apartmentController.getTypesApartment)
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

apartmentRouter.post('/:id/residents', apartmentController.addResident)
apartmentRouter.delete(
  '/:id/residents/:residentId',
  apartmentController.removeResident
)

export default apartmentRouter
