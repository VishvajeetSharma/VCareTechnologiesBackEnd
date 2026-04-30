import express from "express";
import {
  checkIn,
  checkOut,
  getAttendance,
} from "../controllers/attendance.controller.js";
import { validateZod } from "../middlewares/validateZod.js";
import { authenticateToken } from "../middlewares/auth.js";
import { createAttendanceSchema, updateAttendanceSchema } from "../validators/attendance.schema.js";

const router = express.Router();

router.post(
  "/checkin",
  authenticateToken,
  validateZod(createAttendanceSchema),
  checkIn
);
router.put(
  "/checkout/:attendanceId",
  authenticateToken,
  validateZod(updateAttendanceSchema),
  checkOut
);
router.get("/", authenticateToken, getAttendance);

export default router;