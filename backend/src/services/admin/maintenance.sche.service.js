import * as MaintenanceScheduleRepo from '@/repositories/maintenanceSchedule.repository'
import { AppError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'
import { createNotificationService } from '@/services/admin/notification.service.js'
import { format } from 'date-fns'
import { sequelize, Notification } from '@/models/index.js'

async function getDetail(id) {
  const schedule = await MaintenanceScheduleRepo.findScheduleById(id)
  if (!schedule) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Schedule not found')
  }
  return schedule
}

async function create(data) {
  const t = await sequelize.transaction()
  try {
    const schedule = await MaintenanceScheduleRepo.create(data, {
      transaction: t
    })

    // Create notification for all users
    await createNotificationService({
      title: data.title,
      content: `Diễn ra từ ${format(new Date(data.start_at), 'HH:mm dd/MM/yyyy')} đến ${format(new Date(data.end_at), 'HH:mm dd/MM/yyyy')} tại ${data.location}. \n${data.description ? `Chi tiết: ${data.description}` : ''}`,
      category: 4 // Maintenance
    })

    await t.commit()
    return schedule
  } catch (error) {
    await t.rollback()
    throw error
  }
}

async function update(id, data) {
  return await MaintenanceScheduleRepo.update(id, data)
}

async function getAll(filters) {
  return await MaintenanceScheduleRepo.getAll(filters)
}

async function getAllPending() {
  return await MaintenanceScheduleRepo.getAllPending()
}

async function deleteSchedule(id) {
  const t = await sequelize.transaction()
  try {
    const schedule = await getDetail(id)
    await MaintenanceScheduleRepo.deleteSchedule(id, { transaction: t })
    await Notification.destroy({
      where: { title: schedule.title, category: 4 },
      transaction: t
    })
    await t.commit()
  } catch (error) {
    await t.rollback()
    throw error
  }
}

export { getDetail, create, update, getAll, getAllPending, deleteSchedule }
