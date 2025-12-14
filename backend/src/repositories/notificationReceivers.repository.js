import { Notification, NotificationReceiver } from '@/models/index.js'

function categoryStringToNumber(str) {
  const map = {
    system: 1,
    event: 2,
    fee: 3,
    maintenance: 4,
    other: 5
  }
  return map[str] || 0 // 0 = không hợp lệ
}

async function getNotificationsByFilter(userId, filter = 'all') {
  const categoryFilter =
    filter === 'all' ? {} : { category: categoryStringToNumber(filter) }

  return NotificationReceiver.findAll({
    where: { user_id: userId },
    include: [
      {
        model: Notification,
        as: 'notification',
        attributes: [
          'id',
          'title',
          'content',
          'category',
          'created_by',
          'created_at'
        ],
        where: categoryFilter // nếu filter=all thì where = {}
      }
    ],
    order: [['id', 'DESC']]
  })
}

async function getAllNotifications(residentId) {
  return NotificationReceiver.findAll({
    where: { resident_id: residentId },
    include: [
      {
        model: Notification,
        as: 'notification',
        attributes: [
          'id',
          'title',
          'content',
          'category',
          'created_by',
          'created_at'
        ]
      }
    ],
    order: [['id', 'DESC']]
  })
}

async function getNotificationById(id, userId) {
  return Notification.findOne({
    where: { id, userId },
    include: [
      {
        model: User,
        as: 'sender',
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        required: false
      }
    ]
  })
}

async function createNotification(payload) {
  return Notification.create(payload)
}

async function markAsRead(id) {
  return NotificationReceiver.update({ is_read: true }, { where: { id } })
}

async function markAsUnRead(id) {
  return NotificationReceiver.update({ is_read: false }, { where: { id } })
}

async function markAllAsRead(userId, filter) {
  const where = buildFilterWhere(userId, filter)
  return Notification.update({ isRead: true }, { where })
}

async function deleteNotification(id, userId) {
  return Notification.destroy({ where: { id, userId } })
}

function buildFilterWhere(userId, filter) {
  const where = { userId }
  if (filter === 'read') {
    where.isRead = true
  } else if (filter === 'unread') {
    where.isRead = false
  }
  return where
}

export {
  getNotificationsByFilter,
  getNotificationById,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getAllNotifications,
  markAsUnRead
}
