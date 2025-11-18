import {
  getNotificationsByFilter,
  markAsRead,
  markAsUnRead,
} from "../../repositories/notificationReceivers.repository";

const handleGetNotification = async (residentId, filter) => {
  return await getNotificationsByFilter(residentId, filter);
};

const handleMarkNotificationRead = async (id, isRead) => {
  if (isRead === "1") {
    return await markAsRead(id);
  } else {
    return await markAsUnRead(id);
  }
};

export { handleGetNotification, handleMarkNotificationRead };
