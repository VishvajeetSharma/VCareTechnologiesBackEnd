import express from "express";
import { createEmployee, loginEmployee, updateEmployeeProfile } from "../controllers/employee.controller.js";
import { validateZod } from "../middlewares/validateZod.js";
import { authenticateToken } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
import { createEmployeeSchema, loginEmployeeSchema } from "../validators/employee.schema.js";

const router = express.Router();

router.post("/create", upload.single("image"), validateZod(createEmployeeSchema), createEmployee);
router.post("/login", validateZod(loginEmployeeSchema), loginEmployee);
router.put("/profile/image", authenticateToken, upload.single("image"), updateEmployeeProfile);

export default router;