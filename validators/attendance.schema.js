import { z } from "zod";

export const createAttendanceSchema = z.object({
  CheckInTime: z.string().trim().min(1, "CheckInTime is required"),
  CheckInLatitude: z.coerce.number(),
  CheckInLongitude: z.coerce.number(),
  CheckInSelfieUrl: z.string().trim().url("CheckInSelfieUrl must be a valid URL").optional(),
  IsWithinGeoFence: z.boolean(),
  Remarks: z.string().trim().optional(),
  DynamicAddress: z.string().trim().optional(),
  LocationSource: z.string().trim().optional(),
  AccuracyMeters: z.coerce.number().nonnegative().optional(),
  FaceVerified: z.boolean().optional(),
  ImageTimestamp: z.string().trim().optional(),
  DeviceInfo: z.string().trim().optional(),
  LocalId: z.string().trim().optional(),
  Address: z.string().trim().optional(),
});

export const updateAttendanceSchema = z.object({
  CheckOutTime: z.string().trim().min(1, "CheckOutTime is required").optional(),
  CheckOutLatitude: z.coerce.number().optional(),
  CheckOutLongitude: z.coerce.number().optional(),
  CheckOutSelfieUrl: z.string().trim().url("CheckOutSelfieUrl must be a valid URL").optional(),
  Remarks: z.string().trim().optional(),
  DynamicAddress: z.string().trim().optional(),
  LocationSource: z.string().trim().optional(),
  AccuracyMeters: z.coerce.number().nonnegative().optional(),
  FaceVerified: z.boolean().optional(),
  ImageTimestamp: z.string().trim().optional(),
  DeviceInfo: z.string().trim().optional(),
  Address: z.string().trim().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
  path: [],
});