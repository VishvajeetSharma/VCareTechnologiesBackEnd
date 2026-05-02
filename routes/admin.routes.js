import express from "express";
import { apiResponse } from "../utils/response.js";
import { getAllAttendanceAdmin, getAllEmployeesAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  return apiResponse({res, message:"Admin route is working"}) 
});

router.get("/employees", getAllEmployeesAdmin);
router.get("/attendance", getAllAttendanceAdmin);

export default router;