import { query } from "../utils/dbQuery.js";
import { apiResponse } from "../utils/response.js";

export const getAllEmployeesAdmin = async (req, res) => {
  try {
    const sql = `
      SELECT
        e.EmployeeId,
        e.CompanyId,
        c.CompanyName,
        e.EmployeeCode,
        e.FullName,
        e.MobileNo,
        e.Email,
        e.IsActive,
        e.CreatedAt
      FROM Employees e
      INNER JOIN Companies c ON e.CompanyId = c.CompanyId
      ORDER BY e.CreatedAt DESC
    `;

    const data = await query(sql);

    return apiResponse({
      res,
      message: "All employees fetched successfully",
      data,
    });

  } catch (err) {
    return apiResponse({
      res,
      success: false,
      statusCode: 500,
      message: "Failed to fetch employees",
      error: err.message,
    });
  }
};



export const getAllAttendanceAdmin = async (req, res) => {
  try {
    const sql = `
      SELECT
        a.*,
        c.CompanyName,
        e.FullName AS EmployeeName,
        e.EmployeeCode,
        e.MobileNo
      FROM Attendance a
      INNER JOIN Companies c ON a.CompanyId = c.CompanyId
      INNER JOIN Employees e ON a.EmployeeId = e.EmployeeId
      ORDER BY a.CheckInTime DESC
    `;

    const data = await query(sql);

    return apiResponse({
      res,
      message: "All attendance fetched successfully",
      data,
    });

  } catch (err) {
    return apiResponse({
      res,
      success: false,
      statusCode: 500,
      message: "Failed to fetch attendance",
      error: err.message,
    });
  }
};