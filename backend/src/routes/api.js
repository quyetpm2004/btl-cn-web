import express from "express";
import { StatusCodes } from "http-status-codes";
import authRouter from "./auth.route.js";
import { authMiddleware } from "../middlewares/auth.js";
import userRoute from "./user.route.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "API is running",
  });
});

router.use(authMiddleware);
router.use(authRouter);
router.use(userRoute);

export default router;
