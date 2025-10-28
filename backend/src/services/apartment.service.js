import { AppError } from '../utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as apartmentRepo from '../repositories/apartment.repository.js'

async function createApartmentService(data) {
  return apartmentRepo.createApartment(data)
}

async function getApartmentsService() {
  return apartmentRepo.getAllApartments()
}

async function getApartmentDetailService(id) {
  return apartmentRepo.getApartmentById(id)
}

async function updateApartmentService(id, data) {
  const [updatedRows] = await apartmentRepo.updateApartment(id, data)
  if (updatedRows === 0) {
    throw new AppError(
      'Apartment not found or no changes made',
      StatusCodes.NOT_FOUND
    )
  }
  return apartmentRepo.getApartmentById(id)
}

async function filterApartmentsService(filters) {
  return apartmentRepo.filterApartments(filters)
}

async function deleteApartmentService(id) {
  const deletedRows = await apartmentRepo.deleteApartment(id)
  if (deletedRows === 0) {
    throw new AppError('Apartment not found', StatusCodes.NOT_FOUND)
  }
  return true
}

export const apartmentService = {
  createApartmentService,
  getApartmentsService,
  getApartmentDetailService,
  updateApartmentService,
  filterApartmentsService,
  deleteApartmentService
}
