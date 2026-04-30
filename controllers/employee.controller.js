import { query } from "../utils/dbQuery.js";
import { hashPassword, comparePassword } from "../services/password.service.js";
import { generateToken } from "../services/jwt.service.js";
import { apiResponse } from "../utils/response.js";
import { validateUnique } from "../validators/custom.validators.js";

export const createEmployee = async (req, res) => {
  try {

    const { Email } = req.body;

    await validateUnique({
      table: "Employees",
      column: "Email",
      value: Email,
    });

    const sql = `
      INSERT INTO Employees
      (CompanyId, EmployeeCode, FullName, MobileNo, Email, PasswordHash)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      req.body.CompanyId,
      req.body.EmployeeCode,
      req.body.FullName,
      req.body.MobileNo,
      req.body.Email,
      await hashPassword(req.body.Password),
    ]);

    return apiResponse({
      res,
      statusCode: 201,
      message: "Employee created",
      data: { EmployeeId: result.insertId },
    });
  } catch (err) {
    const statusCode = err.message?.includes("already exists") ? 409 : err.code ? 400 : 500;

    return apiResponse({
      res,
      success: false,
      statusCode,
      message: err.message || "Employee creation failed",
      error: err.message,
    });
  }
};


export const loginEmployee = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const users = await query(
      "SELECT * FROM Employees WHERE Email = ?",
      [Email]
    );

    if (!users.length) {
      return apiResponse({
        res,
        success: false,
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const user = users[0];

    const isValid = await comparePassword(Password, user.PasswordHash);

    if (!isValid) {
      return apiResponse({
        res,
        success: false,
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const token = generateToken({
      EmployeeId: user.EmployeeId,
      CompanyId: user.CompanyId,
      Email: user.Email,
    });

    return apiResponse({
      res,
      message: "Login successful",
      data: {
        token,
        employee: {
          EmployeeId: user.EmployeeId,
          FullName: user.FullName,
          Email: user.Email,
        },
      },
    });

  } catch (err) {
    return apiResponse({
      res,
      success: false,
      statusCode: 500,
      message: "Login failed",
      error: err.message,
    });
  }
};