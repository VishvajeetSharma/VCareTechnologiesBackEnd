import express from "express";
import { createEmployee, loginEmployee } from "../controllers/employee.controller.js";
import { validateZod } from "../middlewares/validateZod.js";
import { createEmployeeSchema, loginEmployeeSchema } from "../validators/employee.schema.js";

const router = express.Router();

router.post("/create", validateZod(createEmployeeSchema), createEmployee);
router.post("/login", validateZod(loginEmployeeSchema), loginEmployee);

export default router;