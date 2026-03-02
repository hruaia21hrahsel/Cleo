"use client";

import { useState, useMemo } from "react";
import { Plus, Download, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";
import { PaymentTable } from "@/components/payments/PaymentTable";
import { PaymentForm } from "@/components/payments/PaymentForm";
import { PaymentFilters, PaymentFilter } from "@/components/payments/PaymentFilters";
import { EmptyState } from "@/components/shared/EmptyState";
import { useApp } from "@/lib/context/AppContext";
import { PaymentInput } from "@/lib/validators";
import { exportToCSV, formatDate, formatMonth } from "@/lib/utils";

export default function PaymentsPage() {
  const { payments, tenants, rooms, properties, addPayment, isLoading } = useApp();
  const [formOpen, setFormOpen] = useState(false);
  const [filters, setFilters] = useState<PaymentFilter>({ search: "", status: "", propertyId: "", month: "" });

  const activeTenants = tenants.filter((t) => t.status === "active");

  const filtered = useMemo(() => {
    return payments
      .filter((p) => {
        if (filters.status && p.status !== filters.status) return false;
        if (filters.propertyId && p.propertyId !== filters.propertyId) return false;
        if (filters.month && p.month !== filters.month) return false;
        if (filters.search) {
          const tenant = tenants.find((t) => t.id === p.tenantId);
          if (!tenant?.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [payments, filters, tenants]);

  const handleSubmit = async (data: PaymentInput) => {
    await addPayment(data);
    toast.success("Payment recorded");
    setFormOpen(false);
  };

  const handleExport = () => {
    const rows = filtered.map((p) => {
      const tenant = tenants.find((t) => t.id === p.tenantId);
      const property = properties.find((prop) => prop.id === p.propertyId);
      return {
        Tenant: tenant?.name ?? "",
        Property: property?.name ?? "",
        Month: formatMonth(p.month + "-01"),
        Amount: p.amount,
        Status: p.status,
        Method: p.method ?? "",
        "Paid On": p.paidDate ? formatDate(p.paidDate) : "",
        "Transaction ID": p.transactionId ?? "",
      };
    });
    exportToCSV(rows, `payments-${new Date().toISOString().slice(0, 10)}`);
    toast.success("CSV exported");
  };

  return (
    <AppLayout requireRole="landlord">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold">Payments</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{payments.length} total records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Record Payment
            </Button>
          </div>
        </div>

        <PaymentFilters filters={filters} onChange={setFilters} properties={properties} />

        {payments.length === 0 ? (
          <EmptyState icon={CreditCard} title="No payments yet" description="Record your first payment to get started." actionLabel="Record Payment" onAction={() => setFormOpen(true)} />
        ) : (
          <PaymentTable payments={filtered} tenants={tenants} properties={properties} />
        )}
      </div>

      <PaymentForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        tenants={activeTenants}
        rooms={rooms}
        properties={properties}
        loading={isLoading}
      />
    </AppLayout>
  );
}
