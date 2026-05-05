import express from "express";
import { authenticateToken } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
import { createExpense, getExpenses, updateExpenseStatus } from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/", authenticateToken, upload.single("ReceiptUrl"), createExpense);
router.get("/", authenticateToken, getExpenses);
router.patch("/:expenseId", authenticateToken, updateExpenseStatus);

export default router;
