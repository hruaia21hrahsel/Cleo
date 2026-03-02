import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["landlord", "tenant"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const propertySchema = z.object({
  name: z.string().min(3, "Property name must be at least 3 characters"),
  address: z.string().min(5, "Enter a complete address"),
  city: z.string().min(2, "Enter a valid city"),
  state: z.string().min(2, "Enter a valid state"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  type: z.enum(["apartment", "villa", "commercial", "pg"]),
  description: z.string().optional(),
  amenities: z.array(z.string()).default([]),
});

export const roomSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  floor: z.coerce.number().int().min(0, "Floor must be 0 or above"),
  rentAmount: z.coerce.number().positive("Rent must be positive"),
  depositAmount: z.coerce.number().nonnegative("Deposit cannot be negative"),
  furnishing: z.enum(["furnished", "semi-furnished", "unfurnished"]),
  area: z.coerce.number().positive("Area must be positive"),
  features: z.array(z.string()).default([]),
});

export const tenantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
  emergencyContact: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  occupation: z.string().min(2, "Occupation is required"),
  idType: z.enum(["aadhaar", "pan", "passport", "driving_license"]),
  idNumber: z.string().min(5, "ID number is required"),
  moveInDate: z.string().min(1, "Move-in date is required"),
});

export const paymentSchema = z.object({
  tenantId: z.string().min(1, "Select a tenant"),
  roomId: z.string().min(1, "Room is required"),
  propertyId: z.string().min(1, "Property is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  month: z.string().min(1, "Month is required"),
  dueDate: z.string().min(1, "Due date is required"),
  method: z.enum(["upi", "bank_transfer", "cash", "cheque"]),
  transactionId: z.string().optional(),
  notes: z.string().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type PropertyInput = z.infer<typeof propertySchema>;
export type RoomInput = z.infer<typeof roomSchema>;
export type TenantInput = z.infer<typeof tenantSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
