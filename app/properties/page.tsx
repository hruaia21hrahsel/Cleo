"use client";

import { useState } from "react";
import { Plus, Building2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyForm } from "@/components/properties/PropertyForm";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { useApp } from "@/lib/context/AppContext";
import { Property } from "@/lib/types";
import { PropertyInput } from "@/lib/validators";

export default function PropertiesPage() {
  const { properties, rooms, addProperty, updateProperty, deleteProperty, isLoading } = useApp();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Property | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Property | null>(null);

  const handleSubmit = async (data: PropertyInput) => {
    if (editTarget) {
      await updateProperty(editTarget.id, data);
      toast.success("Property updated");
    } else {
      await addProperty(data);
      toast.success("Property added");
    }
    setFormOpen(false);
    setEditTarget(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteProperty(deleteTarget.id);
    toast.success("Property deleted");
    setDeleteTarget(null);
  };

  return (
    <AppLayout requireRole="landlord">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Properties</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{properties.length} {properties.length === 1 ? "property" : "properties"}</p>
          </div>
          <Button onClick={() => { setEditTarget(null); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Add Property
          </Button>
        </div>

        {properties.length === 0 ? (
          <EmptyState icon={Building2} title="No properties yet" description="Add your first property to start managing tenants and payments." actionLabel="Add Property" onAction={() => setFormOpen(true)} />
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                rooms={rooms.filter((r) => r.propertyId === p.id)}
                onEdit={(prop) => { setEditTarget(prop); setFormOpen(true); }}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}
      </div>

      <PropertyForm
        open={formOpen}
        onOpenChange={(o) => { setFormOpen(o); if (!o) setEditTarget(null); }}
        onSubmit={handleSubmit}
        defaultValues={editTarget ?? undefined}
        loading={isLoading}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Delete Property"
        description={`Delete "${deleteTarget?.name}"? All rooms and tenant data will be removed.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
      />
    </AppLayout>
  );
}
