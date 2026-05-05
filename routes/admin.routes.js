import express from "express";
import { apiResponse } from "../utils/response.js";
import { getAllAttendanceAdmin, getAllEmployeesAdmin } from "../controllers/admin.controller.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/employees", authenticateToken, getAllEmployeesAdmin);
router.get("/attendance", authenticateToken, getAllAttendanceAdmin);

export default router;