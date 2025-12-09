import { AppError } from '../../utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as serviceRepo from '../../repositories/service.repository.js'

async function create(data) {
  return serviceRepo.create(data)
}

async function getAllActive() {
  return serviceRepo.getAllActive()
}

async function update(id, data) {
  const [updatedRows] = await serviceRepo.update(id, data)
  if (updatedRows === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Service not found or no changes made'
    )
  }
  return serviceRepo.getById(id)
}

async function deleteService(id) {
  const deletedRows = await serviceRepo.deleteService(id)
  if (deletedRows === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service not found')
  }
}

export { create, getAllActive, update, deleteService }
