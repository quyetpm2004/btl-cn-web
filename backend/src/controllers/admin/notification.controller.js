import * as notificationService from '@/services/admin/notification.service'
import { toHttpError } from '@/utils/errors.js'
import { StatusCodes } from 'http-status-codes'

export const getNotifications = async (req, res) => {
  try {
    const result = await notificationService.getNotificationsService(req.query)
    return res.status(StatusCodes.OK).json(result)
  } catch (error) {
    const httpError = toHttpError(error)
    return res.status(httpError.status).json({ message: httpError.message })
  }
}

export const createNotification = async (req, res) => {
  try {
    const data = { ...req.body, created_by: req.user.id }
    const result = await notificationService.createNotificationService(data)
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Tạo thông báo thành công', notification: result })
  } catch (error) {
    const httpError = toHttpError(error)
    return res.status(httpError.status).json({ message: httpError.message })
  }
}

export const updateNotification = async (req, res) => {
  try {
    const result = await notificationService.updateNotificationService(
      req.params.id,
      req.body
    )
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Cập nhật thông báo thành công', notification: result })
  } catch (error) {
    const httpError = toHttpError(error)
    return res.status(httpError.status).json({ message: httpError.message })
  }
}

export const deleteNotification = async (req, res) => {
  try {
    await notificationService.deleteNotificationService(req.params.id)
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Xóa thông báo thành công' })
  } catch (error) {
    const httpError = toHttpError(error)
    return res.status(httpError.status).json({ message: httpError.message })
  }
}
