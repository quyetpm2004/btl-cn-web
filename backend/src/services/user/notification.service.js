import {
  getNotificationsByFilter,
  markAsRead,
  markAsUnRead
} from '../../repositories/notificationReceivers.repository'

const handleGetNotification = async (userId, filter) => {
  return await getNotificationsByFilter(userId, filter)
}

const handleMarkNotificationRead = async (id, isRead) => {
  if (isRead === '1') {
    return await markAsRead(id)
  } else {
    return await markAsUnRead(id)
  }
}

export { handleGetNotification, handleMarkNotificationRead }
