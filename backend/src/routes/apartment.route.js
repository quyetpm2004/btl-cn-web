import express from 'express'
import { apartmentController } from '../controllers/apartment.controller.js'

const apartmentRouter = express.Router()

apartmentRouter.post('/', apartmentController.createApartment)
apartmentRouter.get('/', apartmentController.getApartments)
apartmentRouter.get('/:id', apartmentController.getApartmentDetail)
apartmentRouter.put('/:id', apartmentController.updateApartment)
apartmentRouter.get('/filter', apartmentController.filterApartments)
apartmentRouter.delete('/:id', apartmentController.deleteApartment)

export default apartmentRouter
