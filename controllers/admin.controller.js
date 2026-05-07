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
        e.CreatedAt,
        e.Role
      FROM Employees e
      INNER JOIN Companies c ON e.CompanyId = c.CompanyId
      WHERE e.Role = 'employee'
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

export const updateAttendanceStatus = async (req, res) => {
  try {
    const { Role } = req.user || {};
    const { attendanceId } = req.params;
    const { Status } = req.body;

    if (Role !== 'admin') {
      return apiResponse({
        res,
        success: false,
        statusCode: 403,
        message: "Forbidden: Only admins can update status",
      });
    }

    if (!attendanceId || !Status) {
      return apiResponse({
        res,
        success: false,
        statusCode: 400,
        message: "Attendance ID and Status are required",
      });
    }

    const sql = "UPDATE Attendance SET Status = ? WHERE AttendanceId = ?";
    await query(sql, [Status, attendanceId]);

    return apiResponse({
      res,
      message: `Attendance status updated to ${Status} successfully`,
      data: { attendanceId, Status },
    });

  } catch (err) {
    return apiResponse({
      res,
      success: false,
      statusCode: 500,
      message: "Failed to update attendance status",
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
      ORDER BY a.AttendanceId DESC
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


export const adminAddAttendance = async (req, res) => {
  try {
    const CompanyId = 1;

    let {
      EmployeeId,
      CheckInTime,
      Remarks,
      Address,
      CheckOutTime,
    } = req.body;

    // ─────────────────────────────
    // 1. REQUIRED VALIDATION
    // ─────────────────────────────
    if (!EmployeeId) {
      return apiResponse({
        res,
        success: false,
        statusCode: 400,
        message: "EmployeeId is required",
        error: [{ field: "EmployeeId", message: "EmployeeId is required" }],
      });
    }

    // ─────────────────────────────
    // 2. CLEAN DATETIME VALUES (IMPORTANT FIX)
    // ─────────────────────────────
    const cleanDateTime = (value) => {
      if (!value) return null;

      // prevent empty string issue
      if (typeof value === 'string' && value.trim() === '') return null;

      return value;
    };

    CheckInTime = cleanDateTime(CheckInTime);
    CheckOutTime = cleanDateTime(CheckOutTime);

    // ─────────────────────────────
    // 3. FIX ADDRESS TOO
    // ─────────────────────────────
    Address = Address?.trim() || null;
    Remarks = Remarks?.trim() || null;

    // ─────────────────────────────
    // 4. SQL INSERT
    // ─────────────────────────────
    const sql = `
      INSERT INTO Attendance (
        CompanyId,
        EmployeeId,
        CheckInTime,
        Remarks,
        Address,
        CheckOutTime
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      CompanyId,
      EmployeeId,
      CheckInTime,
      Remarks,
      Address,
      CheckOutTime,
    ];

    const result = await query(sql, values);

    return apiResponse({
      res,
      statusCode: 201,
      message: "Attendance added successfully by admin",
      data: {
        AttendanceId: result.insertId,
      },
    });

  } catch (err) {
    return apiResponse({
      res,
      success: false,
      statusCode: 500,
      message: "Failed to add attendance",
      error: err.message,
    });
  }
};