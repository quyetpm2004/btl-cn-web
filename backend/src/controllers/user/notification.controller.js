import {
  handleGetNotification,
  handleMarkNotificationRead,
} from "../../services/user/notification.service";

const getNotification = async (req, res) => {
  const { residentId } = req.params;
  const { filter } = req.query;
  try {
    const notification = await handleGetNotification(residentId, filter);
    return res
      .status(200)
      .json({ message: "Fetch notification successful", notification });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const markNotificationRead = async (req, res) => {
  const { notificationReceiverId, isRead } = req.params;
  try {
    const notification = await handleMarkNotificationRead(
      notificationReceiverId,
      isRead
    );
    return res
      .status(200)
      .json({ message: "Fetch notification successful", notification });
  } catch {
    return res.status(400).json({ error: err.message });
  }
};

export { getNotification, markNotificationRead };
