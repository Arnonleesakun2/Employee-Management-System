import { z } from "zod";

export const employeeSchema = z.object({
  id: z.string().optional(),
  image: z
    .any()
    .refine(
      (val) =>
        val !== undefined &&
        val.public_id !== undefined &&
        val.public_id.trim() !== "",
      {
        message: "Please enter a valid picture.",
      }
    ),
  firstname: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastname: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  email: z.string().email("Please enter a valid email address"),
  position: z.string().min(1, "Position is required"),
  address: z
    .string()
    .min(20, "Address must be at least 20 characters")
    .max(200, "Address must be less than 200 characters"),
});

export const salarySchema = z.object({
  employeeId: z
    .string({
      required_error: "Please select an employee",
    })
    .min(1, "Please select an employee"),
  salary: z
    .string()
    .min(1, "Salary is required")
    .transform((val) => parseFloat(val))
    .pipe(
      z
        .number()
        .positive("Salary must be positive")
        .min(1, "Salary must be greater than 0")
    ),
});

export const payrollSchema = z.object({
  employeeId: z
    .string({
      required_error: "Please select an employee",
    })
    .min(1, "Please select an employee"),
  baseSalary: z.number().min(0, "Base salary cannot be negative"),
  bonus: z.coerce.number().min(0, "Bonus cannot be negative"),
  tax: z.coerce.number().min(0, "Tax cannot be negative"),
  totalPaid: z.coerce.number().min(0, "Total paid cannot be negative"),
  payDate: z.date({
    required_error: "Please select a date",
  }),
  note: z.string().optional(),
});

