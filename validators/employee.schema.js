import { z } from "zod";

export const createEmployeeSchema = z.object({
  CompanyId: z.coerce.number().int().positive(),

  EmployeeCode: z.string()
    .trim()
    .min(2, "EmployeeCode must be at least 2 characters")
    .max(20, "EmployeeCode cannot be longer than 20 characters"),

  FullName: z.string()
    .trim()
    .min(3, "FullName must be at least 3 characters")
    .max(100, "FullName cannot be longer than 100 characters"),

  MobileNo: z.string()
    .trim()
    .regex(/^[0-9]{10}$/, "MobileNo must be a 10 digit number"),

  Email: z.string()
    .trim()
    .email("Invalid Email address"),

  Password: z.string()
    .min(6, "Password must be at least 6 characters"),
});

export const loginEmployeeSchema = z.object({
  MobileNo: z.string()
    .trim()
    .min(10, "Mobile number must be at least 10 characters") 
    .regex(/^\d+$/, "Mobile number must contain only digits"),

  Password: z.string()
    .min(6, "Password must be at least 6 characters"),
});
