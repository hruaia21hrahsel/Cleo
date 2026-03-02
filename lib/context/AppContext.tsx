"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import {
  User, Property, Room, Tenant, Payment, Notification,
  PropertyFormData, RoomFormData, TenantFormData, PaymentFormData, SummaryStats,
} from "@/lib/types";
import {
  MOCK_LANDLORD, MOCK_TENANTS_USERS, MOCK_PROPERTIES, MOCK_ROOMS,
  MOCK_TENANTS, MOCK_PAYMENTS, MOCK_NOTIFICATIONS, MOCK_CREDENTIALS,
} from "@/lib/mock-data";
import { generateId, generateToken, sleep } from "@/lib/utils";

// ============================================================
// Context Shape
// ============================================================

interface AppContextValue {
  // Auth
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchToTenant: (tenantUserId: string) => void;
  switchToLandlord: () => void;

  // Properties
  properties: Property[];
  addProperty: (data: PropertyFormData) => Promise<Property>;
  updateProperty: (id: string, data: Partial<PropertyFormData>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  getProperty: (id: string) => Property | undefined;

  // Rooms
  rooms: Room[];
  addRoom: (propertyId: string, data: RoomFormData) => Promise<Room>;
  updateRoom: (id: string, data: Partial<RoomFormData & { status: Room["status"]; tenantId?: string }>) => Promise<void>;
  deleteRoom: (id: string) => Promise<void>;
  getRoomsForProperty: (propertyId: string) => Room[];

  // Tenants
  tenants: Tenant[];
  addTenant: (data: TenantFormData & { roomId: string; propertyId: string }) => Promise<Tenant>;
  updateTenant: (id: string, data: Partial<Tenant>) => Promise<void>;
  deleteTenant: (id: string) => Promise<void>;
  getTenantsForProperty: (propertyId: string) => Tenant[];
  getTenantByToken: (token: string) => Tenant | undefined;
  generateInviteToken: (tenantId: string) => Promise<string>;

  // Payments
  payments: Payment[];
  addPayment: (data: PaymentFormData) => Promise<Payment>;
  updatePayment: (id: string, data: Partial<Payment>) => Promise<void>;
  getPaymentsForTenant: (tenantId: string) => Payment[];
  getPaymentsForProperty: (propertyId: string) => Payment[];

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;

  // Computed
  stats: SummaryStats;
  revenueData: { month: string; revenue: number; collected: number }[];
}

// ============================================================
// Context + Hook
// ============================================================

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

// ============================================================
// Provider
// ============================================================

const ALL_USERS = [MOCK_LANDLORD, ...MOCK_TENANTS_USERS];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  // ---- Auth ----

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await sleep(500);
    const cred = MOCK_CREDENTIALS.find((c) => c.email === email && c.password === password);
    if (cred) {
      const user = ALL_USERS.find((u) => u.id === cred.userId) ?? null;
      setCurrentUser(user);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const switchToTenant = useCallback((tenantUserId: string) => {
    const user = MOCK_TENANTS_USERS.find((u) => u.id === tenantUserId);
    if (user) setCurrentUser(user);
  }, []);

  const switchToLandlord = useCallback(() => {
    setCurrentUser(MOCK_LANDLORD);
  }, []);

  // ---- Properties ----

  const getProperty = useCallback(
    (id: string) => properties.find((p) => p.id === id),
    [properties]
  );

  const addProperty = useCallback(async (data: PropertyFormData): Promise<Property> => {
    setIsLoading(true);
    await sleep(400);
    const newProp: Property = {
      id: `prop-${generateId()}`,
      landlordId: currentUser?.id ?? "user-001",
      totalRooms: 0,
      createdAt: new Date().toISOString(),
      ...data,
    };
    setProperties((prev) => [...prev, newProp]);
    setIsLoading(false);
    return newProp;
  }, [currentUser]);

  const updateProperty = useCallback(async (id: string, data: Partial<PropertyFormData>) => {
    setIsLoading(true);
    await sleep(300);
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    setIsLoading(false);
  }, []);

  const deleteProperty = useCallback(async (id: string) => {
    setIsLoading(true);
    await sleep(300);
    setProperties((prev) => prev.filter((p) => p.id !== id));
    setRooms((prev) => prev.filter((r) => r.propertyId !== id));
    setTenants((prev) => prev.filter((t) => t.propertyId !== id));
    setIsLoading(false);
  }, []);

  // ---- Rooms ----

  const getRoomsForProperty = useCallback(
    (propertyId: string) => rooms.filter((r) => r.propertyId === propertyId),
    [rooms]
  );

  const addRoom = useCallback(async (propertyId: string, data: RoomFormData): Promise<Room> => {
    setIsLoading(true);
    await sleep(400);
    const newRoom: Room = {
      id: `room-${generateId()}`,
      propertyId,
      status: "vacant",
      createdAt: new Date().toISOString(),
      ...data,
    };
    setRooms((prev) => [...prev, newRoom]);
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, totalRooms: p.totalRooms + 1 } : p))
    );
    setIsLoading(false);
    return newRoom;
  }, []);

  const updateRoom = useCallback(
    async (id: string, data: Partial<RoomFormData & { status: Room["status"]; tenantId?: string }>) => {
      setIsLoading(true);
      await sleep(300);
      setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r)));
      setIsLoading(false);
    },
    []
  );

  const deleteRoom = useCallback(async (id: string) => {
    setIsLoading(true);
    await sleep(300);
    const room = rooms.find((r) => r.id === id);
    setRooms((prev) => prev.filter((r) => r.id !== id));
    if (room) {
      setProperties((prev) =>
        prev.map((p) =>
          p.id === room.propertyId ? { ...p, totalRooms: Math.max(0, p.totalRooms - 1) } : p
        )
      );
    }
    setIsLoading(false);
  }, [rooms]);

  // ---- Tenants ----

  const getTenantsForProperty = useCallback(
    (propertyId: string) => tenants.filter((t) => t.propertyId === propertyId),
    [tenants]
  );

  const getTenantByToken = useCallback(
    (token: string) => tenants.find((t) => t.inviteToken === token),
    [tenants]
  );

  const generateInviteToken = useCallback(async (tenantId: string): Promise<string> => {
    const token = generateToken(24);
    setTenants((prev) =>
      prev.map((t) => (t.id === tenantId ? { ...t, inviteToken: token } : t))
    );
    return token;
  }, []);

  const addTenant = useCallback(
    async (data: TenantFormData & { roomId: string; propertyId: string }): Promise<Tenant> => {
      setIsLoading(true);
      await sleep(500);
      const newTenant: Tenant = {
        id: `tenant-${generateId()}`,
        userId: `user-${generateId()}`,
        landlordId: currentUser?.id ?? "user-001",
        status: "pending",
        inviteToken: generateToken(24),
        createdAt: new Date().toISOString(),
        ...data,
      };
      setTenants((prev) => [...prev, newTenant]);
      setRooms((prev) =>
        prev.map((r) =>
          r.id === data.roomId
            ? { ...r, status: "occupied" as const, tenantId: newTenant.id, leaseStartDate: data.moveInDate }
            : r
        )
      );
      setIsLoading(false);
      return newTenant;
    },
    [currentUser]
  );

  const updateTenant = useCallback(async (id: string, data: Partial<Tenant>) => {
    setIsLoading(true);
    await sleep(300);
    setTenants((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    setIsLoading(false);
  }, []);

  const deleteTenant = useCallback(async (id: string) => {
    setIsLoading(true);
    await sleep(300);
    const tenant = tenants.find((t) => t.id === id);
    setTenants((prev) => prev.filter((t) => t.id !== id));
    if (tenant) {
      setRooms((prev) =>
        prev.map((r) =>
          r.id === tenant.roomId
            ? { ...r, status: "vacant" as const, tenantId: undefined, leaseStartDate: undefined }
            : r
        )
      );
    }
    setIsLoading(false);
  }, [tenants]);

  // ---- Payments ----

  const getPaymentsForTenant = useCallback(
    (tenantId: string) => payments.filter((p) => p.tenantId === tenantId),
    [payments]
  );

  const getPaymentsForProperty = useCallback(
    (propertyId: string) => payments.filter((p) => p.propertyId === propertyId),
    [payments]
  );

  const addPayment = useCallback(async (data: PaymentFormData): Promise<Payment> => {
    setIsLoading(true);
    await sleep(400);
    const newPayment: Payment = {
      id: `pay-${generateId()}`,
      landlordId: currentUser?.id ?? "user-001",
      dueAmount: data.amount,
      paidDate: new Date().toISOString().split("T")[0],
      status: "paid",
      createdAt: new Date().toISOString(),
      ...data,
    };
    setPayments((prev) => [...prev, newPayment]);
    setIsLoading(false);
    return newPayment;
  }, [currentUser]);

  const updatePayment = useCallback(async (id: string, data: Partial<Payment>) => {
    setIsLoading(true);
    await sleep(300);
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    setIsLoading(false);
  }, []);

  // ---- Notifications ----

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read && n.userId === currentUser?.id).length,
    [notifications, currentUser]
  );

  // ---- Computed Stats ----

  const stats = useMemo((): SummaryStats => {
    const myProperties = properties.filter((p) => p.landlordId === (currentUser?.id ?? "user-001"));
    const myRooms = rooms.filter((r) => myProperties.some((p) => p.id === r.propertyId));
    const occupiedRooms = myRooms.filter((r) => r.status === "occupied");
    const myTenants = tenants.filter((t) => occupiedRooms.some((r) => r.id === t.roomId));

    const currentMonth = new Date().toISOString().slice(0, 7);
    const myPayments = payments.filter((p) =>
      myProperties.some((prop) => prop.id === p.propertyId)
    );
    const currentMonthPayments = myPayments.filter((p) => p.month === currentMonth);
    const monthlyRevenue = currentMonthPayments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);

    const overduePayments = myPayments.filter((p) => p.status === "overdue");
    const overdueAmount = overduePayments.reduce((sum, p) => sum + p.dueAmount, 0);

    const totalExpected = myRooms
      .filter((r) => r.status === "occupied")
      .reduce((sum, r) => sum + r.rentAmount, 0);
    const collectionRate = totalExpected > 0 ? (monthlyRevenue / totalExpected) * 100 : 0;

    return {
      totalProperties: myProperties.length,
      totalRooms: myRooms.length,
      occupiedRooms: occupiedRooms.length,
      vacantRooms: myRooms.filter((r) => r.status === "vacant").length,
      totalTenants: myTenants.length,
      monthlyRevenue,
      overduePayments: overduePayments.length,
      overdueAmount,
      occupancyRate: myRooms.length > 0 ? (occupiedRooms.length / myRooms.length) * 100 : 0,
      collectionRate,
    };
  }, [properties, rooms, tenants, payments, currentUser]);

  const revenueData = useMemo(() => {
    const myProperties = properties.filter((p) => p.landlordId === (currentUser?.id ?? "user-001"));
    const months = ["2024-09", "2024-10", "2024-11", "2024-12", "2025-01", "2025-02"];
    return months.map((month) => {
      const monthPayments = payments.filter(
        (p) => p.month === month && myProperties.some((prop) => prop.id === p.propertyId)
      );
      const revenue = monthPayments.reduce((sum, p) => sum + p.dueAmount, 0);
      const collected = monthPayments
        .filter((p) => p.status === "paid")
        .reduce((sum, p) => sum + p.amount, 0);
      return { month, revenue, collected };
    });
  }, [properties, payments, currentUser]);

  const value: AppContextValue = {
    currentUser, isLoading,
    login, logout, switchToTenant, switchToLandlord,
    properties, addProperty, updateProperty, deleteProperty, getProperty,
    rooms, addRoom, updateRoom, deleteRoom, getRoomsForProperty,
    tenants, addTenant, updateTenant, deleteTenant, getTenantsForProperty,
    getTenantByToken, generateInviteToken,
    payments, addPayment, updatePayment, getPaymentsForTenant, getPaymentsForProperty,
    notifications, markNotificationRead, markAllNotificationsRead, unreadCount,
    stats, revenueData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
