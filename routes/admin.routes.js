import express from "express";
import { apiResponse } from "../utils/response.js";
import { adminAddAttendance, getAllAttendanceAdmin, getAllEmployeesAdmin, updateAttendanceStatus } from "../controllers/admin.controller.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validateZod } from "../middlewares/validateZod.js";
import { adminAddAttendanceSchema } from "../validators/attendance.schema.js";

const router = express.Router();

router.get("/employees", authenticateToken, getAllEmployeesAdmin);
router.get("/attendance", authenticateToken, getAllAttendanceAdmin);
router.put("/attendance/:attendanceId/status", authenticateToken, updateAttendanceStatus);
router.post("/attendance/add", authenticateToken, validateZod(adminAddAttendanceSchema), adminAddAttendance);
router.post("/expense/add", authenticateToken, )

export default router;