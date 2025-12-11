import * as MaintenanceScheduleService from '@/services/admin/maintenance.sche.service'
import { toHttpError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'

async function getMaintenanceScheduleDetail(req, res) {
  try {
    const { id } = req.params
    const schedule = await MaintenanceScheduleService.getDetail(id)

    return res.status(StatusCodes.OK).json({ schedule })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function createMaintenanceSchedule(req, res) {
  try {
    const data = req.body
    const newSchedule = await MaintenanceScheduleService.create(data)
    return res.status(StatusCodes.CREATED).json({ schedule: newSchedule })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function updateMaintenanceSchedule(req, res) {
  try {
    const { id } = req.params
    const data = req.body
    const updatedSchedule = await MaintenanceScheduleService.update(id, data)
    return res.status(StatusCodes.OK).json({ schedule: updatedSchedule })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getAllMaintenanceSchedules(req, res) {
  try {
    const filters = req.query
    const schedules = await MaintenanceScheduleService.getAll(filters)
    return res.status(StatusCodes.OK).json(schedules)
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function getAllPendingMaintenanceSchedules(req, res) {
  try {
    const schedules = await MaintenanceScheduleService.getAllPending()
    return res.status(StatusCodes.OK).json({ schedules })
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

async function deleteMaintenanceSchedule(req, res) {
  try {
    const { id } = req.params
    await MaintenanceScheduleService.deleteSchedule(id)
    return res.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    const http = toHttpError(err)
    return res.status(http.status).json(http.body)
  }
}

export {
  getMaintenanceScheduleDetail,
  createMaintenanceSchedule,
  updateMaintenanceSchedule,
  getAllMaintenanceSchedules,
  getAllPendingMaintenanceSchedules,
  deleteMaintenanceSchedule
}
