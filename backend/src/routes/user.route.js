import express from "express";
import {
  fetchResident,
  getApartment,
  getProfile,
  updatePassword,
  updateProfile,
} from "../controllers/user.controller";

const userRoute = express.Router();

userRoute.get("/user/profile", getProfile);
userRoute.put("/user/profile", updateProfile);
userRoute.put("/user/password", updatePassword);
userRoute.get("/user/apartment", getApartment);
userRoute.get("/user/fetch-resident", fetchResident);

export default userRoute;
