import express from "express";
import {
  createAttendance,
  getAttendance,
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/", createAttendance);
router.get("/", getAttendance);

export default router;