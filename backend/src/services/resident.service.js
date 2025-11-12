import { AppError } from '../utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import * as residentRepo from '../repositories/resident.repository.js'

async function createResidentService(data) {
  return residentRepo.createResident(data)
}

async function getResidentsService() {
  return residentRepo.getAllResidents()
}

async function getResidentDetailService(id) {
  const resident = await residentRepo.getResidentById(id)
  if (!resident) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Resident not found')
  }
  return resident
}

async function updateResidentService(id, data) {
  const [updatedRows] = await residentRepo.updateResident(id, data)
  if (updatedRows === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Resident not found or no changes made'
    )
  }
  return residentRepo.getResidentById(id)
}

async function filterResidentsService(filters) {
  return residentRepo.filterResidents(filters)
}

async function deleteResidentService(id) {
  const deletedRows = await residentRepo.deleteResident(id)
  if (deletedRows === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Resident not found')
  }
}

async function getResidentCountService() {
  return residentRepo.getResidentCount() ?? 0
}

export const residentService = {
  createResidentService,
  getResidentsService,
  getResidentDetailService,
  updateResidentService,
  filterResidentsService,
  deleteResidentService,
  getResidentCountService
}
