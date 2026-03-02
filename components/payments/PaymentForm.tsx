"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { paymentSchema, PaymentInput } from "@/lib/validators";
import { Tenant, Room, Property } from "@/lib/types";

interface PaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PaymentInput) => Promise<void>;
  tenants: Tenant[];
  rooms: Room[];
  properties: Property[];
  loading?: boolean;
}

export function PaymentForm({ open, onOpenChange, onSubmit, tenants, rooms, properties, loading }: PaymentFormProps) {
  const form = useForm<PaymentInput>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      tenantId: "", roomId: "", propertyId: "", amount: 0,
      month: new Date().toISOString().slice(0, 7),
      dueDate: "", method: "upi", transactionId: "", notes: "",
    },
  });

  const selectedTenantId = form.watch("tenantId");

  const handleTenantChange = (tenantId: string) => {
    form.setValue("tenantId", tenantId);
    const tenant = tenants.find((t) => t.id === tenantId);
    if (tenant) {
      form.setValue("roomId", tenant.roomId);
      form.setValue("propertyId", tenant.propertyId);
      const room = rooms.find((r) => r.id === tenant.roomId);
      if (room) form.setValue("amount", room.rentAmount);
    }
  };

  const handleSubmit = async (data: PaymentInput) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader><SheetTitle>Record Payment</SheetTitle></SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
            <FormField control={form.control} name="tenantId" render={({ field }) => (
              <FormItem>
                <FormLabel>Tenant</FormLabel>
                <Select onValueChange={handleTenantChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select tenant" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {tenants.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="amount" render={({ field }) => (
                <FormItem><FormLabel>Amount (₹)</FormLabel><FormControl><Input type="number" min={1} {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="month" render={({ field }) => (
                <FormItem><FormLabel>For Month</FormLabel><FormControl><Input type="month" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="dueDate" render={({ field }) => (
              <FormItem><FormLabel>Due Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="method" render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="transactionId" render={({ field }) => (
                <FormItem><FormLabel>Transaction ID</FormLabel><FormControl><Input placeholder="TXN123..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="notes" render={({ field }) => (
              <FormItem><FormLabel>Notes (optional)</FormLabel><FormControl><Textarea placeholder="Any additional notes..." rows={2} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <SheetFooter className="gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Record Payment
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
