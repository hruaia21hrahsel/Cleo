"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Property } from "@/lib/types";

export interface PaymentFilter {
  search: string;
  status: string;
  propertyId: string;
  month: string;
}

interface PaymentFiltersProps {
  filters: PaymentFilter;
  onChange: (filters: PaymentFilter) => void;
  properties: Property[];
}

export function PaymentFilters({ filters, onChange, properties }: PaymentFiltersProps) {
  const reset = () => onChange({ search: "", status: "", propertyId: "", month: "" });
  const hasFilters = filters.search || filters.status || filters.propertyId || filters.month;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[180px]">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tenant..."
          className="pl-9"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>
      <Select value={filters.status || "all"} onValueChange={(v) => onChange({ ...filters, status: v === "all" ? "" : v })}>
        <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
          <SelectItem value="partial">Partial</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filters.propertyId || "all"} onValueChange={(v) => onChange({ ...filters, propertyId: v === "all" ? "" : v })}>
        <SelectTrigger className="w-48"><SelectValue placeholder="Property" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All properties</SelectItem>
          {properties.map((p) => (
            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input type="month" className="w-40" value={filters.month} onChange={(e) => onChange({ ...filters, month: e.target.value })} />
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={reset}>
          <X className="mr-1 h-4 w-4" /> Clear
        </Button>
      )}
    </div>
  );
}
