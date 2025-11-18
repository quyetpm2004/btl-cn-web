import express from "express";
import { authController } from "../controllers/auth/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authController.me);

export default authRouter;
