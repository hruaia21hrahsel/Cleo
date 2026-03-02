"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { propertySchema, PropertyInput } from "@/lib/validators";
import { Property } from "@/lib/types";

const AMENITIES_OPTIONS = ["WiFi", "Parking", "Security", "Power Backup", "Gym", "Swimming Pool", "Lift", "CCTV", "Meals", "Laundry", "Common Kitchen", "Garden"];

interface PropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PropertyInput) => Promise<void>;
  defaultValues?: Property;
  loading?: boolean;
}

export function PropertyForm({ open, onOpenChange, onSubmit, defaultValues, loading }: PropertyFormProps) {
  const form = useForm<PropertyInput>({
    resolver: zodResolver(propertySchema),
    defaultValues: { name: "", address: "", city: "", state: "", pincode: "", type: "apartment", description: "", amenities: [] },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name, address: defaultValues.address, city: defaultValues.city,
        state: defaultValues.state, pincode: defaultValues.pincode, type: defaultValues.type,
        description: defaultValues.description ?? "", amenities: defaultValues.amenities,
      });
    } else {
      form.reset({ name: "", address: "", city: "", state: "", pincode: "", type: "apartment", description: "", amenities: [] });
    }
  }, [defaultValues, form, open]);

  const toggleAmenity = (a: string) => {
    const current = form.getValues("amenities");
    form.setValue("amenities", current.includes(a) ? current.filter((x) => x !== a) : [...current, a]);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{defaultValues ? "Edit Property" : "Add New Property"}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Property Name</FormLabel><FormControl><Input placeholder="Green Valley Apartments" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="type" render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="pg">PG / Hostel</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="Plot 42, Sector 18" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Gurugram" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="state" render={({ field }) => (
                <FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="Haryana" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="pincode" render={({ field }) => (
              <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input placeholder="122015" maxLength={6} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Description (optional)</FormLabel><FormControl><Textarea placeholder="Describe the property..." rows={3} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="amenities" render={({ field }) => (
              <FormItem>
                <FormLabel>Amenities</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES_OPTIONS.map((a) => (
                    <button key={a} type="button" onClick={() => toggleAmenity(a)}
                      className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${(field.value ?? []).includes(a) ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary"}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </FormItem>
            )} />
            <SheetFooter className="gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {defaultValues ? "Save Changes" : "Add Property"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
