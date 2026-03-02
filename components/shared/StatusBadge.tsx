import { Badge } from "@/components/ui/badge";
import { PaymentStatus, RoomStatus, TenantStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type StatusType = PaymentStatus | RoomStatus | TenantStatus;

const STATUS_CONFIG: Record<StatusType, { label: string; className: string }> = {
  // Payment
  paid: { label: "Paid", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  partial: { label: "Partial", className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" },
  // Room
  occupied: { label: "Occupied", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  vacant: { label: "Vacant", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  maintenance: { label: "Maintenance", className: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400" },
  // Tenant
  active: { label: "Active", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  inactive: { label: "Inactive", className: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400" },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, className: "" };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
