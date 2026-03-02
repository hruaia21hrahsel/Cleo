"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { TenantPropertyCard } from "@/components/tenant/TenantPropertyCard";
import { TenantPaymentHistory } from "@/components/tenant/TenantPaymentHistory";
import { useApp } from "@/lib/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDate, formatMonth } from "@/lib/utils";

export default function TenantDashboardPage() {
  const { currentUser, tenants, rooms, properties, payments } = useApp();

  const tenant = tenants.find((t) => t.userId === currentUser?.id);
  const room = rooms.find((r) => r.id === tenant?.roomId);
  const property = properties.find((p) => p.id === tenant?.propertyId);
  const tenantPayments = payments.filter((p) => p.tenantId === tenant?.id);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentPayment = tenantPayments.find((p) => p.month === currentMonth);

  if (!tenant) {
    return (
      <AppLayout requireRole="tenant">
        <div className="flex flex-col items-center justify-center h-64 gap-2">
          <p className="text-muted-foreground">No tenancy found for your account.</p>
          <p className="text-sm text-muted-foreground">Contact your landlord for an invite link.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout requireRole="tenant">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {currentUser?.name.split(" ")[0]}! 🏠</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Your rental portal</p>
        </div>

        {/* Current month status */}
        <Card className={currentPayment?.status === "overdue" ? "border-red-300 dark:border-red-700" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">This Month — {formatMonth(`${currentMonth}-01`)}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentPayment ? (
              <div className="flex items-center justify-between">
                <div>
                  <CurrencyDisplay
                    amount={currentPayment.amount}
                    size="xl"
                    className={
                      currentPayment.status === "paid" ? "text-green-600" :
                      currentPayment.status === "overdue" ? "text-red-600" : "text-foreground"
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">Due {formatDate(currentPayment.dueDate)}</p>
                </div>
                <StatusBadge status={currentPayment.status} />
              </div>
            ) : room ? (
              <div className="flex items-center justify-between">
                <div>
                  <CurrencyDisplay amount={room.rentAmount} size="xl" />
                  <p className="text-xs text-muted-foreground mt-1">Due {currentMonth}-05</p>
                </div>
                <StatusBadge status="pending" />
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <TenantPropertyCard tenant={tenant} room={room} property={property} />
          <TenantPaymentHistory payments={tenantPayments} />
        </div>
      </div>
    </AppLayout>
  );
}
