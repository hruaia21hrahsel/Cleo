"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roomSchema, RoomInput } from "@/lib/validators";
import { Room } from "@/lib/types";

const FEATURES_OPTIONS = ["AC", "Balcony", "Attached Bath", "Study Table", "Wardrobe", "Fan", "Bed", "Cupboard", "Shared Bath", "Meals Included", "City View", "Conference Room"];

interface RoomFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: RoomInput) => Promise<void>;
  defaultValues?: Room;
  loading?: boolean;
}

export function RoomForm({ open, onOpenChange, onSubmit, defaultValues, loading }: RoomFormProps) {
  const form = useForm<RoomInput>({
    resolver: zodResolver(roomSchema),
    defaultValues: { roomNumber: "", floor: 0, rentAmount: 0, depositAmount: 0, furnishing: "furnished", area: 0, features: [] },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        roomNumber: defaultValues.roomNumber, floor: defaultValues.floor,
        rentAmount: defaultValues.rentAmount, depositAmount: defaultValues.depositAmount,
        furnishing: defaultValues.furnishing, area: defaultValues.area, features: defaultValues.features,
      });
    } else {
      form.reset({ roomNumber: "", floor: 0, rentAmount: 0, depositAmount: 0, furnishing: "furnished", area: 0, features: [] });
    }
  }, [defaultValues, form, open]);

  const toggleFeature = (f: string) => {
    const current = form.getValues("features");
    form.setValue("features", current.includes(f) ? current.filter((x) => x !== f) : [...current, f]);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{defaultValues ? "Edit Room" : "Add New Room"}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="roomNumber" render={({ field }) => (
                <FormItem><FormLabel>Room Number</FormLabel><FormControl><Input placeholder="101" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="floor" render={({ field }) => (
                <FormItem><FormLabel>Floor</FormLabel><FormControl><Input type="number" min={0} {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="rentAmount" render={({ field }) => (
                <FormItem><FormLabel>Monthly Rent (₹)</FormLabel><FormControl><Input type="number" min={0} placeholder="15000" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="depositAmount" render={({ field }) => (
                <FormItem><FormLabel>Deposit (₹)</FormLabel><FormControl><Input type="number" min={0} placeholder="45000" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="area" render={({ field }) => (
                <FormItem><FormLabel>Area (sq ft)</FormLabel><FormControl><Input type="number" min={1} placeholder="600" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="furnishing" render={({ field }) => (
                <FormItem>
                  <FormLabel>Furnishing</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="furnished">Furnished</SelectItem>
                      <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                      <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="features" render={({ field }) => (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {FEATURES_OPTIONS.map((f) => (
                    <button key={f} type="button" onClick={() => toggleFeature(f)}
                      className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${(field.value ?? []).includes(f) ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary"}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </FormItem>
            )} />
            <SheetFooter className="gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {defaultValues ? "Save Changes" : "Add Room"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
