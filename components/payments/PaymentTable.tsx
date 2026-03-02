import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { Payment, Tenant, Property } from "@/lib/types";
import { formatDate, formatMonth } from "@/lib/utils";

const METHOD_LABELS: Record<string, string> = {
  upi: "UPI", bank_transfer: "Bank Transfer", cash: "Cash", cheque: "Cheque",
};

interface PaymentTableProps {
  payments: Payment[];
  tenants: Tenant[];
  properties: Property[];
}

export function PaymentTable({ payments, tenants, properties }: PaymentTableProps) {
  if (payments.length === 0) {
    return (
      <div className="rounded-md border py-12 text-center text-muted-foreground text-sm">
        No payments match your filters
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tenant</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Paid On</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => {
            const tenant = tenants.find((t) => t.id === payment.tenantId);
            const property = properties.find((p) => p.id === payment.propertyId);
            return (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{tenant?.name ?? "—"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{property?.name ?? "—"}</TableCell>
                <TableCell className="text-sm">{formatMonth(payment.month + "-01")}</TableCell>
                <TableCell><CurrencyDisplay amount={payment.amount} /></TableCell>
                <TableCell>
                  {payment.method ? <Badge variant="outline" className="text-xs">{METHOD_LABELS[payment.method]}</Badge> : "—"}
                </TableCell>
                <TableCell className="text-sm">{payment.paidDate ? formatDate(payment.paidDate) : "—"}</TableCell>
                <TableCell><StatusBadge status={payment.status} /></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
