import * as notificationRepo from '@/repositories/notification.repository'
import { sequelize, User, NotificationReceiver } from '@/models/index.js'
import { AppError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'

export const getNotificationsService = async (filters) => {
  return await notificationRepo.getAllNotifications(filters)
}

export const createNotificationService = async (data) => {
  const t = await sequelize.transaction()
  try {
    const notification = await notificationRepo.createNotification(
      {
        title: data.title,
        content: data.content,
        category: data.category,
        created_by: data.created_by
      },
      {
        transaction: t
      }
    )

    let users = []
    if (data.userIds && data.userIds.length > 0) {
      users = data.userIds.map((id) => ({ id }))
    } else {
      // Broadcast to all users
      users = await User.findAll({ attributes: ['id'] })
    }

    const receivers = users.map((user) => ({
      notification_id: notification.id,
      user_id: user.id,
      is_read: false
    }))

    if (receivers.length > 0) {
      await NotificationReceiver.bulkCreate(receivers, { transaction: t })
    }

    await t.commit()
    return notification
  } catch (error) {
    await t.rollback()
    throw error
  }
}

export const updateNotificationService = async (id, data) => {
  const [updatedRows] = await notificationRepo.updateNotification(id, data)
  if (updatedRows === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Notification not found or no changes made'
    )
  }
  return notificationRepo.getNotificationById(id)
}

export const deleteNotificationService = async (id) => {
  const deletedRows = await notificationRepo.deleteNotification(id)
  if (deletedRows === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Notification not found')
  }
}
