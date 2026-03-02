// ============================================================
// User & Auth Types
// ============================================================

export type UserRole = "landlord" | "tenant";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

// ============================================================
// Property Types
// ============================================================

export type PropertyType = "apartment" | "villa" | "commercial" | "pg";

export interface Property {
  id: string;
  landlordId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  type: PropertyType;
  totalRooms: number;
  description?: string;
  amenities: string[];
  createdAt: string;
}

// ============================================================
// Room Types
// ============================================================

export type RoomStatus = "vacant" | "occupied" | "maintenance";
export type FurnishingType = "furnished" | "semi-furnished" | "unfurnished";

export interface Room {
  id: string;
  propertyId: string;
  roomNumber: string;
  floor: number;
  rentAmount: number;
  depositAmount: number;
  status: RoomStatus;
  furnishing: FurnishingType;
  area: number; // sq ft
  features: string[];
  tenantId?: string;
  leaseStartDate?: string;
  leaseEndDate?: string;
  createdAt: string;
}

// ============================================================
// Tenant Types
// ============================================================

export type TenantStatus = "active" | "pending" | "inactive";

export interface Tenant {
  id: string;
  userId: string;
  roomId: string;
  propertyId: string;
  landlordId: string;
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  occupation: string;
  idType: "aadhaar" | "pan" | "passport" | "driving_license";
  idNumber: string;
  status: TenantStatus;
  inviteToken?: string;
  moveInDate: string;
  moveOutDate?: string;
  createdAt: string;
}

// ============================================================
// Payment Types
// ============================================================

export type PaymentStatus = "paid" | "pending" | "overdue" | "partial";
export type PaymentMethod = "upi" | "bank_transfer" | "cash" | "cheque";

export interface Payment {
  id: string;
  tenantId: string;
  roomId: string;
  propertyId: string;
  landlordId: string;
  amount: number;
  dueAmount: number;
  month: string; // YYYY-MM
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  method?: PaymentMethod;
  transactionId?: string;
  notes?: string;
  createdAt: string;
}

// ============================================================
// Notification Types
// ============================================================

export type NotificationType =
  | "payment_due"
  | "payment_received"
  | "lease_expiry"
  | "maintenance"
  | "new_tenant"
  | "invite_accepted"
  | "general";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

// ============================================================
// Chat Types
// ============================================================

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// ============================================================
// Dashboard Types
// ============================================================

export interface SummaryStats {
  totalProperties: number;
  totalRooms: number;
  occupiedRooms: number;
  vacantRooms: number;
  totalTenants: number;
  monthlyRevenue: number;
  overduePayments: number;
  overdueAmount: number;
  occupancyRate: number;
  collectionRate: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  collected: number;
}

export interface PropertyOccupancy {
  propertyId: string;
  propertyName: string;
  totalRooms: number;
  occupiedRooms: number;
  occupancyRate: number;
}

// ============================================================
// Form Types
// ============================================================

export interface PropertyFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  type: PropertyType;
  description?: string;
  amenities: string[];
}

export interface RoomFormData {
  roomNumber: string;
  floor: number;
  rentAmount: number;
  depositAmount: number;
  furnishing: FurnishingType;
  area: number;
  features: string[];
}

export interface TenantFormData {
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  occupation: string;
  idType: Tenant["idType"];
  idNumber: string;
  moveInDate: string;
}

export interface PaymentFormData {
  tenantId: string;
  roomId: string;
  propertyId: string;
  amount: number;
  month: string;
  dueDate: string;
  method: PaymentMethod;
  transactionId?: string;
  notes?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}
