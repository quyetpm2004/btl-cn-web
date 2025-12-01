import express from "express";
import uploadFile from "../middlewares/multer.js";
import {
  getProfile,
  updatePassword,
  updateProfile,
} from "../controllers/user/profile.controller.js";
import {
  fetchResident,
  getApartment,
} from "../controllers/user/apartment.controller.js";
import {
  getNotification,
  markNotificationRead,
} from "../controllers/user/notification.controller.js";
import {
  createMaintenanceRequest,
  deleteMaintenanceRequest,
  getMaintenanceRequestDetail,
  getPendingRequests,
  updateMaintenanceRequest,
} from "../controllers/user/maintenance.req.controller.js";
import {
  getMaintenanceScheduleDetail,
  getResidentSchedules,
} from "../controllers/user/maintenance.sche.controller.js";
import {
  getAllEquipments,
  getEquipmentById,
} from "../controllers/user/equipment.controller.js";
import { getAllWorkType } from "../controllers/user/worktype.controller.js";
const uploadAvatar = uploadFile("avatar");
const uploadRequestImages = uploadFile("request");

const userRoute = express.Router();

// profle
userRoute.get("/user/profile", getProfile);
userRoute.put("/user/profile", uploadAvatar.single("avatar"), updateProfile);
userRoute.put("/user/password", updatePassword);

// apartment
userRoute.get("/user/apartment", getApartment);
userRoute.get("/user/fetch-resident", fetchResident);

// notification
userRoute.get("/user/notification/:residentId", getNotification);
userRoute.put(
  "/user/notification/:notificationReceiverId/:isRead",
  markNotificationRead
);

// Maintenance Request
userRoute.post(
  "/user/maintenance-request",
  uploadRequestImages.array("images", 5),
  createMaintenanceRequest
);
userRoute.get("/user/maintenance-request/:residentId", getPendingRequests);
userRoute.get("/user/maintenance-request/:id", getMaintenanceRequestDetail);
userRoute.put(
  "/user/maintenance-request/:id",
  uploadRequestImages.array("images", 5),
  updateMaintenanceRequest
);
userRoute.delete("/user/maintenance-request/:id", deleteMaintenanceRequest);

// Maintenance Schedule
userRoute.get(
  "/user/maintenance-schedule/resident/:residentId",
  getResidentSchedules
);
userRoute.get("/user/maintenance-schedule/:id", getMaintenanceScheduleDetail);

// Equipment
userRoute.get("/user/equipment", getAllEquipments);
userRoute.get("/user/equipment/:id", getEquipmentById);

// Work Type
userRoute.get("/user/work-type", getAllWorkType);

export default userRoute;
