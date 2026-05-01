import { z } from "zod";

export const createAttendanceSchema = z.object({
  CheckInTime: z.string().trim().min(1, "CheckInTime is required"),
  CheckInLatitude: z.coerce.number(),
  CheckInLongitude: z.coerce.number(),
  CheckInSelfieUrl: z.string().trim().url("CheckInSelfieUrl must be a valid URL").optional(),
  IsWithinGeoFence: z.string(),
  Remarks: z.string().trim().optional(),
  DynamicAddress: z.string().trim(),
  LocationSource: z.string().trim(),
  AccuracyMeters: z.coerce.number().nonnegative(),
  FaceVerified: z.string(),
  ImageTimestamp: z.string().trim(),
  DeviceInfo: z.string().trim().optional(),
  LocalId: z.string().trim(),
  Address: z.string().trim().optional(),
});

export const updateAttendanceSchema = z.object({
  CheckOutTime: z.string().trim().min(1, "CheckOutTime is required"),
  CheckOutLatitude: z.coerce.number(),
  CheckOutLongitude: z.coerce.number(),
  CheckOutSelfieUrl: z.string().trim().url("CheckOutSelfieUrl must be a valid URL").optional(),
  Remarks: z.string().trim().optional(),
  DynamicAddress: z.string().trim(),
  LocationSource: z.string().trim(),
  AccuracyMeters: z.coerce.number().nonnegative(),
  FaceVerified: z.string(),
  ImageTimestamp: z.string().trim(),
  DeviceInfo: z.string().trim().optional(),
  Address: z.string().trim().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
  path: [],
});