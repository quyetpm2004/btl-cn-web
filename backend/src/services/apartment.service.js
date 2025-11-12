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
  const apartment = await apartmentRepo.getApartmentById(id)
  if (!apartment) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Apartment not found')
  }
  return apartment
}

async function updateApartmentService(id, data) {
  const [updatedRows] = await apartmentRepo.updateApartment(id, data)
  if (updatedRows === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Apartment not found or no changes made'
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
    throw new AppError(StatusCodes.NOT_FOUND, 'Apartment not found')
  }
}

async function getApartmentCountService() {
  return apartmentRepo.getApartmentCount() ?? 0
}

export const apartmentService = {
  createApartmentService,
  getApartmentsService,
  getApartmentDetailService,
  updateApartmentService,
  filterApartmentsService,
  deleteApartmentService,
  getApartmentCountService
}
