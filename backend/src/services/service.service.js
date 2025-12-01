import { AppError } from '../utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as serviceRepo from '../repositories/service.repository.js'

async function createServiceService(data) {
  return serviceRepo.createService(data)
}

async function getServicesService() {
  return serviceRepo.getAllServices()
}

async function getServiceDetailService(id) {
  const service = await serviceRepo.getServiceById(id)
  if (!service) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service not found')
  }
  return service
}

async function updateServiceService(id, data) {
  const [updatedRows] = await serviceRepo.updateService(id, data)
  if (updatedRows === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Service not found or no changes made'
    )
  }
  return serviceRepo.getServiceById(id)
}

async function filterServicesService(filters) {
  return serviceRepo.filterServices(filters)
}

async function deleteServiceService(id) {
  const deletedRows = await serviceRepo.deleteService(id)
  if (deletedRows === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service not found')
  }
}

export const serviceService = {
  createServiceService,
  getServicesService,
  getServiceDetailService,
  updateServiceService,
  filterServicesService,
  deleteServiceService
}
