import { Notification } from '@/models/index.js'
import { Op } from 'sequelize'

export const getAllNotifications = async (filters) => {
  const page = Number(filters.page) > 0 ? Number(filters.page) : 1
  const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 10
  const offset = (page - 1) * limit

  const { query, category } = filters || {}
  const where = {
    title: { [Op.notLike]: '%quá hạn%' }
  }

  if (query) {
    where.title.additional = { [Op.like]: `%${query}%` }
  }
  if (category) {
    where.category = category
  }

  const { count, rows } = await Notification.findAndCountAll({
    where,
    limit,
    offset,
    order: [['created_at', 'DESC']]
  })
  return { items: rows, total: count, page, limit }
}

export const createNotification = async (data, options) => {
  return await Notification.create(data, options)
}

export const updateNotification = async (id, data) => {
  return await Notification.update(data, { where: { id } })
}

export const deleteNotification = async (id) => {
  return await Notification.destroy({ where: { id } })
}

export const getNotificationById = async (id) => {
  return await Notification.findByPk(id)
}
