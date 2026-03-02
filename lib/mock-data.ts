import { User, Property, Room, Tenant, Payment, Notification } from "./types";

// ============================================================
// Users
// ============================================================

export const MOCK_LANDLORD: User = {
  id: "user-001",
  name: "Rajesh Kumar",
  email: "rajesh@example.com",
  phone: "9876543210",
  role: "landlord",
  createdAt: "2024-01-01T00:00:00Z",
};

export const MOCK_TENANTS_USERS: User[] = [
  {
    id: "user-101",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9811234567",
    role: "tenant",
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "user-102",
    name: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "9822345678",
    role: "tenant",
    createdAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "user-103",
    name: "Sunita Patel",
    email: "sunita@example.com",
    phone: "9833456789",
    role: "tenant",
    createdAt: "2024-04-10T00:00:00Z",
  },
  {
    id: "user-104",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "9844567890",
    role: "tenant",
    createdAt: "2024-05-20T00:00:00Z",
  },
  {
    id: "user-105",
    name: "Kavya Reddy",
    email: "kavya@example.com",
    phone: "9855678901",
    role: "tenant",
    createdAt: "2024-06-05T00:00:00Z",
  },
];

// ============================================================
// Mock Credentials
// ============================================================

export const MOCK_CREDENTIALS = [
  { email: "rajesh@example.com", password: "password123", userId: "user-001" },
  { email: "priya@example.com", password: "password123", userId: "user-101" },
  { email: "arjun@example.com", password: "password123", userId: "user-102" },
  { email: "sunita@example.com", password: "password123", userId: "user-103" },
  { email: "vikram@example.com", password: "password123", userId: "user-104" },
  { email: "kavya@example.com", password: "password123", userId: "user-105" },
];

// ============================================================
// Properties
// ============================================================

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-001",
    landlordId: "user-001",
    name: "Green Valley Apartments",
    address: "Plot 42, Sector 18",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122015",
    type: "apartment",
    totalRooms: 4,
    description: "Modern apartments with all amenities near metro station.",
    amenities: ["WiFi", "Parking", "Security", "Power Backup", "Gym"],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "prop-002",
    landlordId: "user-001",
    name: "Sunrise PG Hostel",
    address: "14, MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    type: "pg",
    totalRooms: 4,
    description: "Comfortable PG for working professionals and students.",
    amenities: ["WiFi", "Meals", "Laundry", "CCTV", "Common Kitchen"],
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "prop-003",
    landlordId: "user-001",
    name: "Lakeview Commercial",
    address: "7th Floor, Tower B, Hitech City",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    type: "commercial",
    totalRooms: 2,
    description: "Premium commercial office space with city views.",
    amenities: ["WiFi", "Parking", "Lift", "24x7 Security", "Cafeteria"],
    createdAt: "2024-03-10T00:00:00Z",
  },
];

// ============================================================
// Rooms
// ============================================================

export const MOCK_ROOMS: Room[] = [
  // Green Valley Apartments (prop-001)
  {
    id: "room-001",
    propertyId: "prop-001",
    roomNumber: "101",
    floor: 1,
    rentAmount: 18000,
    depositAmount: 54000,
    status: "occupied",
    furnishing: "furnished",
    area: 650,
    features: ["AC", "Balcony", "Attached Bath"],
    tenantId: "tenant-001",
    leaseStartDate: "2024-02-15",
    leaseEndDate: "2025-02-14",
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "room-002",
    propertyId: "prop-001",
    roomNumber: "102",
    floor: 1,
    rentAmount: 16000,
    depositAmount: 48000,
    status: "occupied",
    furnishing: "semi-furnished",
    area: 600,
    features: ["Fan", "Attached Bath"],
    tenantId: "tenant-002",
    leaseStartDate: "2024-03-01",
    leaseEndDate: "2025-02-28",
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "room-003",
    propertyId: "prop-001",
    roomNumber: "201",
    floor: 2,
    rentAmount: 20000,
    depositAmount: 60000,
    status: "vacant",
    furnishing: "furnished",
    area: 800,
    features: ["AC", "Balcony", "Attached Bath", "Study Table"],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "room-004",
    propertyId: "prop-001",
    roomNumber: "202",
    floor: 2,
    rentAmount: 22000,
    depositAmount: 66000,
    status: "maintenance",
    furnishing: "furnished",
    area: 900,
    features: ["AC", "Balcony", "Attached Bath", "Wardrobe"],
    createdAt: "2024-01-15T00:00:00Z",
  },
  // Sunrise PG Hostel (prop-002)
  {
    id: "room-005",
    propertyId: "prop-002",
    roomNumber: "A1",
    floor: 0,
    rentAmount: 8500,
    depositAmount: 17000,
    status: "occupied",
    furnishing: "furnished",
    area: 200,
    features: ["Shared Bath", "Meals Included", "Bed", "Cupboard"],
    tenantId: "tenant-003",
    leaseStartDate: "2024-04-10",
    leaseEndDate: "2025-04-09",
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "room-006",
    propertyId: "prop-002",
    roomNumber: "A2",
    floor: 0,
    rentAmount: 8500,
    depositAmount: 17000,
    status: "occupied",
    furnishing: "furnished",
    area: 200,
    features: ["Shared Bath", "Meals Included", "Bed", "Cupboard"],
    tenantId: "tenant-004",
    leaseStartDate: "2024-05-20",
    leaseEndDate: "2025-05-19",
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "room-007",
    propertyId: "prop-002",
    roomNumber: "B1",
    floor: 1,
    rentAmount: 9500,
    depositAmount: 19000,
    status: "occupied",
    furnishing: "furnished",
    area: 250,
    features: ["Attached Bath", "Meals Included", "AC", "Balcony"],
    tenantId: "tenant-005",
    leaseStartDate: "2024-06-05",
    leaseEndDate: "2025-06-04",
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "room-008",
    propertyId: "prop-002",
    roomNumber: "B2",
    floor: 1,
    rentAmount: 9500,
    depositAmount: 19000,
    status: "vacant",
    furnishing: "furnished",
    area: 250,
    features: ["Attached Bath", "Meals Included", "AC"],
    createdAt: "2024-02-01T00:00:00Z",
  },
  // Lakeview Commercial (prop-003)
  {
    id: "room-009",
    propertyId: "prop-003",
    roomNumber: "7A",
    floor: 7,
    rentAmount: 45000,
    depositAmount: 135000,
    status: "vacant",
    furnishing: "unfurnished",
    area: 1200,
    features: ["Open Floor", "City View", "Modular Kitchen"],
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "room-010",
    propertyId: "prop-003",
    roomNumber: "7B",
    floor: 7,
    rentAmount: 55000,
    depositAmount: 165000,
    status: "vacant",
    furnishing: "unfurnished",
    area: 1500,
    features: ["Corner Office", "Panoramic View", "Conference Room"],
    createdAt: "2024-03-10T00:00:00Z",
  },
];

// ============================================================
// Tenants
// ============================================================

export const MOCK_TENANTS: Tenant[] = [
  {
    id: "tenant-001",
    userId: "user-101",
    roomId: "room-001",
    propertyId: "prop-001",
    landlordId: "user-001",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9811234567",
    emergencyContact: "Ravi Sharma",
    emergencyPhone: "9811234599",
    occupation: "Software Engineer",
    idType: "aadhaar",
    idNumber: "XXXX XXXX 1234",
    status: "active",
    moveInDate: "2024-02-15",
    createdAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "tenant-002",
    userId: "user-102",
    roomId: "room-002",
    propertyId: "prop-001",
    landlordId: "user-001",
    name: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "9822345678",
    emergencyContact: "Suresh Mehta",
    emergencyPhone: "9822345699",
    occupation: "Data Analyst",
    idType: "pan",
    idNumber: "ABCPM1234D",
    status: "active",
    moveInDate: "2024-03-01",
    createdAt: "2024-02-25T00:00:00Z",
  },
  {
    id: "tenant-003",
    userId: "user-103",
    roomId: "room-005",
    propertyId: "prop-002",
    landlordId: "user-001",
    name: "Sunita Patel",
    email: "sunita@example.com",
    phone: "9833456789",
    emergencyContact: "Ramesh Patel",
    emergencyPhone: "9833456799",
    occupation: "MBA Student",
    idType: "aadhaar",
    idNumber: "XXXX XXXX 5678",
    status: "active",
    moveInDate: "2024-04-10",
    createdAt: "2024-04-05T00:00:00Z",
  },
  {
    id: "tenant-004",
    userId: "user-104",
    roomId: "room-006",
    propertyId: "prop-002",
    landlordId: "user-001",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "9844567890",
    emergencyContact: "Gurpreet Singh",
    emergencyPhone: "9844567899",
    occupation: "Marketing Manager",
    idType: "driving_license",
    idNumber: "DL-1420110012345",
    status: "active",
    moveInDate: "2024-05-20",
    createdAt: "2024-05-15T00:00:00Z",
  },
  {
    id: "tenant-005",
    userId: "user-105",
    roomId: "room-007",
    propertyId: "prop-002",
    landlordId: "user-001",
    name: "Kavya Reddy",
    email: "kavya@example.com",
    phone: "9855678901",
    emergencyContact: "Venkat Reddy",
    emergencyPhone: "9855678999",
    occupation: "UX Designer",
    idType: "passport",
    idNumber: "P1234567",
    status: "active",
    moveInDate: "2024-06-05",
    createdAt: "2024-06-01T00:00:00Z",
  },
];

// ============================================================
// Payments (last 6 months)
// ============================================================

const months = [
  "2024-09", "2024-10", "2024-11", "2024-12", "2025-01", "2025-02",
];

export const MOCK_PAYMENTS: Payment[] = [
  // Priya Sharma (room-001 @ ₹18,000/mo)
  ...months.map((month, i) => ({
    id: `pay-001-${month}`,
    tenantId: "tenant-001",
    roomId: "room-001",
    propertyId: "prop-001",
    landlordId: "user-001",
    amount: 18000,
    dueAmount: 18000,
    month,
    dueDate: `${month}-05`,
    paidDate: i < 5 ? `${month}-0${i < 4 ? i + 2 : 8}` : undefined,
    status: (i < 5 ? "paid" : "pending") as Payment["status"],
    method: i < 5 ? ("upi" as Payment["method"]) : undefined,
    transactionId: i < 5 ? `TXN${100 + i}PRY` : undefined,
    createdAt: `${month}-01T00:00:00Z`,
  })),
  // Arjun Mehta (room-002 @ ₹16,000/mo)
  ...months.map((month, i) => ({
    id: `pay-002-${month}`,
    tenantId: "tenant-002",
    roomId: "room-002",
    propertyId: "prop-001",
    landlordId: "user-001",
    amount: 16000,
    dueAmount: 16000,
    month,
    dueDate: `${month}-05`,
    paidDate: i < 4 ? `${month}-07` : undefined,
    status: (i < 4 ? "paid" : i === 4 ? "overdue" : "pending") as Payment["status"],
    method: i < 4 ? ("bank_transfer" as Payment["method"]) : undefined,
    transactionId: i < 4 ? `TXN${200 + i}ARJ` : undefined,
    createdAt: `${month}-01T00:00:00Z`,
  })),
  // Sunita Patel (room-005 @ ₹8,500/mo)
  ...months.map((month, i) => ({
    id: `pay-003-${month}`,
    tenantId: "tenant-003",
    roomId: "room-005",
    propertyId: "prop-002",
    landlordId: "user-001",
    amount: 8500,
    dueAmount: 8500,
    month,
    dueDate: `${month}-05`,
    paidDate: i < 5 ? `${month}-04` : undefined,
    status: (i < 5 ? "paid" : "pending") as Payment["status"],
    method: i < 5 ? ("upi" as Payment["method"]) : undefined,
    transactionId: i < 5 ? `TXN${300 + i}SUN` : undefined,
    createdAt: `${month}-01T00:00:00Z`,
  })),
  // Vikram Singh (room-006 @ ₹8,500/mo)
  ...months.map((month, i) => ({
    id: `pay-004-${month}`,
    tenantId: "tenant-004",
    roomId: "room-006",
    propertyId: "prop-002",
    landlordId: "user-001",
    amount: 8500,
    dueAmount: 8500,
    month,
    dueDate: `${month}-05`,
    paidDate: i < 5 ? `${month}-06` : undefined,
    status: (i < 5 ? "paid" : "pending") as Payment["status"],
    method: i < 5 ? ("cash" as Payment["method"]) : undefined,
    createdAt: `${month}-01T00:00:00Z`,
  })),
  // Kavya Reddy (room-007 @ ₹9,500/mo)
  ...months.map((month, i) => ({
    id: `pay-005-${month}`,
    tenantId: "tenant-005",
    roomId: "room-007",
    propertyId: "prop-002",
    landlordId: "user-001",
    amount: 9500,
    dueAmount: 9500,
    month,
    dueDate: `${month}-05`,
    paidDate: i < 3 ? `${month}-05` : undefined,
    status: (i < 3 ? "paid" : i === 3 ? "partial" : i === 4 ? "overdue" : "pending") as Payment["status"],
    method: i < 3 ? ("upi" as Payment["method"]) : undefined,
    transactionId: i < 3 ? `TXN${500 + i}KAV` : undefined,
    createdAt: `${month}-01T00:00:00Z`,
  })),
];

// ============================================================
// Notifications
// ============================================================

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-001",
    userId: "user-001",
    type: "payment_received",
    title: "Payment Received",
    message: "Priya Sharma paid ₹18,000 for February 2025.",
    read: false,
    link: "/payments",
    createdAt: "2025-02-04T10:00:00Z",
  },
  {
    id: "notif-002",
    userId: "user-001",
    type: "payment_due",
    title: "Payment Overdue",
    message: "Arjun Mehta's rent for January 2025 is overdue.",
    read: false,
    link: "/payments",
    createdAt: "2025-01-10T09:00:00Z",
  },
  {
    id: "notif-003",
    userId: "user-001",
    type: "payment_due",
    title: "Payment Overdue",
    message: "Kavya Reddy's rent for February 2025 is overdue.",
    read: false,
    link: "/payments",
    createdAt: "2025-02-10T09:00:00Z",
  },
  {
    id: "notif-004",
    userId: "user-001",
    type: "lease_expiry",
    title: "Lease Expiring Soon",
    message: "Priya Sharma's lease in Room 101 expires on 14 Feb 2025.",
    read: true,
    link: "/properties/prop-001",
    createdAt: "2025-01-15T08:00:00Z",
  },
  {
    id: "notif-005",
    userId: "user-001",
    type: "general",
    title: "New Room Vacant",
    message: "Room B2 in Sunrise PG Hostel is now available.",
    read: true,
    link: "/properties/prop-002",
    createdAt: "2025-01-05T11:00:00Z",
  },
  {
    id: "notif-006",
    userId: "user-101",
    type: "payment_due",
    title: "Rent Due",
    message: "Your rent of ₹18,000 is due for March 2025.",
    read: false,
    link: "/tenant/dashboard",
    createdAt: "2025-03-01T09:00:00Z",
  },
  {
    id: "notif-007",
    userId: "user-101",
    type: "payment_received",
    title: "Payment Confirmed",
    message: "Your payment of ₹18,000 for February 2025 was received.",
    read: true,
    link: "/tenant/dashboard",
    createdAt: "2025-02-04T10:30:00Z",
  },
];

// ============================================================
// Revenue Chart Data
// ============================================================

export const MOCK_REVENUE_DATA = months.map((month, i) => {
  const expected = 60500; // sum of all rents
  const collected = [55000, 58500, 60500, 52000, 60500, 44000][i];
  return { month, revenue: expected, collected };
});

// ============================================================
// Invite Tokens (pre-set for testing)
// ============================================================

export const MOCK_INVITE_TOKENS: Record<string, { tenantId: string; token: string }> = {
  "INVITE-TEST-001": { tenantId: "tenant-001", token: "INVITE-TEST-001" },
};
