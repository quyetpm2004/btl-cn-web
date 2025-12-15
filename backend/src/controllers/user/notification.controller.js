import {
  handleGetNotification,
  handleMarkNotificationRead
} from '../../services/user/notification.service'

const getNotification = async (req, res) => {
  const { userId } = req.params
  const { filter } = req.query
  try {
    const notification = await handleGetNotification(userId, filter)
    return res
      .status(200)
      .json({ message: 'Lấy thông báo thành công', notification })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

const markNotificationRead = async (req, res) => {
  const { notificationReceiverId, isRead } = req.params
  try {
    const notification = await handleMarkNotificationRead(
      notificationReceiverId,
      isRead
    )
    return res
      .status(200)
      .json({ message: 'Đánh dấu thông báo đã đọc thành công', notification })
  } catch {
    return res.status(400).json({ error: err.message })
  }
}

export { getNotification, markNotificationRead }
