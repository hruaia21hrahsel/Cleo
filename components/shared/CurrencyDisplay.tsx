import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CurrencyDisplayProps {
  amount: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg font-semibold",
  xl: "text-2xl font-bold",
};

export function CurrencyDisplay({ amount, className, size = "md" }: CurrencyDisplayProps) {
  return (
    <span className={cn(sizeClasses[size], className)}>
      {formatCurrency(amount)}
    </span>
  );
}
