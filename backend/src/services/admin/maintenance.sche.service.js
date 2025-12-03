import * as MaintenanceScheduleRepo from '@/repositories/maintenanceSchedule.repository'
import { AppError } from '../../utils/errors.js'
import { StatusCodes } from 'http-status-codes'

async function getDetail(id) {
  const schedule = await MaintenanceScheduleRepo.findScheduleById(id)
  if (!schedule) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Schedule not found')
  }
  return schedule
}

async function create(data, options = {}) {
  return await MaintenanceScheduleRepo.create(data, options)
}

async function update(id, data, options = {}) {
  return await MaintenanceScheduleRepo.update(id, data, options)
}

async function getAll(filters) {
  return await MaintenanceScheduleRepo.getAll(filters)
}

async function getAllPending() {
  return await MaintenanceScheduleRepo.getAllPending()
}

async function deleteSchedule(id) {
  return await MaintenanceScheduleRepo.deleteSchedule(id)
}

export { getDetail, create, update, getAll, getAllPending, deleteSchedule }
