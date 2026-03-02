import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { Payment } from "@/lib/types";
import { formatDate, formatMonth } from "@/lib/utils";

const METHOD_LABELS: Record<string, string> = {
  upi: "UPI", bank_transfer: "Bank Transfer", cash: "Cash", cheque: "Cheque",
};

interface TenantPaymentHistoryProps {
  payments: Payment[];
}

export function TenantPaymentHistory({ payments }: TenantPaymentHistoryProps) {
  const sorted = [...payments].sort((a, b) => b.month.localeCompare(a.month));
  const totalPaid = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const overdue = payments.filter((p) => p.status === "overdue");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payment History</CardTitle>
          <div className="text-sm text-right">
            <p className="text-muted-foreground">Total Paid</p>
            <CurrencyDisplay amount={totalPaid} size="sm" className="font-semibold text-green-600" />
          </div>
        </div>
        {overdue.length > 0 && (
          <div className="rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3 mt-2">
            <p className="text-sm text-red-800 dark:text-red-300 font-medium">
              ⚠️ {overdue.length} overdue payment{overdue.length > 1 ? "s" : ""}
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[360px]">
          <div className="divide-y">
            {sorted.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-6 py-3">
                <div>
                  <p className="font-medium text-sm">{formatMonth(p.month + "-01")}</p>
                  <p className="text-xs text-muted-foreground">
                    Due: {formatDate(p.dueDate)}
                    {p.paidDate && ` · Paid: ${formatDate(p.paidDate)}`}
                  </p>
                  {p.method && <Badge variant="outline" className="text-xs mt-1">{METHOD_LABELS[p.method]}</Badge>}
                </div>
                <div className="text-right">
                  <CurrencyDisplay amount={p.amount} size="sm" className="font-semibold" />
                  <div className="mt-1"><StatusBadge status={p.status} /></div>
                </div>
              </div>
            ))}
            {sorted.length === 0 && (
              <div className="py-8 text-center text-muted-foreground text-sm">No payment history</div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
