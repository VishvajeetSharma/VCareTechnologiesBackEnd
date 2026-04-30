import { query } from "../utils/dbQuery.js";
import { apiResponse } from "../utils/response.js";

export const createAttendance = async (req, res) => {
  try {
    const body = req.body;

    const values = [
      body.CompanyId,
      body.EmployeeId,
      body.CheckInTime,
      body.CheckOutTime,
      body.CheckInLatitude,
      body.CheckInLongitude,
      body.CheckOutLatitude,
      body.CheckOutLongitude,
      body.CheckInSelfieUrl,
      body.CheckOutSelfieUrl,
      body.IsWithinGeoFence,
      body.Remarks,
      body.DynamicAddress,
      body.LocationSource,
      body.AccuracyMeters,
      body.FaceVerified,
      body.ImageTimestamp,
      body.DeviceInfo,
      body.LocalId,
      body.Address,
    ];

    const sql = `
      INSERT INTO Attendance (
        CompanyId,
        EmployeeId,
        CheckInTime,
        CheckOutTime,
        CheckInLatitude,
        CheckInLongitude,
        CheckOutLatitude,
        CheckOutLongitude,
        CheckInSelfieUrl,
        CheckOutSelfieUrl,
        IsWithinGeoFence,
        Remarks,
        DynamicAddress,
        LocationSource,
        AccuracyMeters,
        FaceVerified,
        ImageTimestamp,
        DeviceInfo,
        LocalId,
        Address
      )
      VALUES (${values.map(() => '?').join(', ')})
    `;

    const result = await query(sql, values);

    return apiResponse({
      res,
      statusCode: 201,
      message: "Attendance created successfully",
      data: { AttendanceId: result.insertId }
    });

  } catch (err) {
    return apiResponse({
      res,
      statusCode: 500,
      success: false,
      message: "Failed to create attendance",
      error: err.message
    });
  }
};


export const getAttendance = async (req, res) => {
  try {
    const { employeeId, companyId } = req.query;

    let sql = `
      SELECT 
        a.*,
        c.CompanyName,
        e.FullName AS EmployeeName,
        e.EmployeeCode,
        e.MobileNo
      FROM Attendance a
      INNER JOIN Companies c ON a.CompanyId = c.CompanyId
      INNER JOIN Employees e ON a.EmployeeId = e.EmployeeId
      WHERE 1=1
    `;

    const params = [];

    if (employeeId) {
      sql += " AND a.EmployeeId = ?";
      params.push(employeeId);
    }

    if (companyId) {
      sql += " AND a.CompanyId = ?";
      params.push(companyId);
    }

    sql += " ORDER BY a.CreatedAt DESC";

    const data = await query(sql, params);

    return apiResponse({
      res,
      message: "Attendance fetched successfully",
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