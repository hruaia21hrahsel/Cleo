"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus, UserPlus, Home } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/layout/AppLayout";
import { RoomCard } from "@/components/properties/RoomCard";
import { RoomForm } from "@/components/properties/RoomForm";
import { TenantTable } from "@/components/tenants/TenantTable";
import { TenantForm } from "@/components/tenants/TenantForm";
import { InviteSharePanel } from "@/components/tenants/InviteSharePanel";
import { EmptyState } from "@/components/shared/EmptyState";
import { useApp } from "@/lib/context/AppContext";
import { Room, Tenant } from "@/lib/types";
import { RoomInput, TenantInput } from "@/lib/validators";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    getProperty, getRoomsForProperty, getTenantsForProperty, tenants,
    addRoom, updateRoom, deleteRoom, addTenant, deleteTenant, generateInviteToken, isLoading,
  } = useApp();

  const property = getProperty(id);
  const rooms = getRoomsForProperty(id);
  const propertyTenants = getTenantsForProperty(id);

  const [roomFormOpen, setRoomFormOpen] = useState(false);
  const [editRoom, setEditRoom] = useState<Room | null>(null);
  const [tenantFormOpen, setTenantFormOpen] = useState(false);
  const [invitePanel, setInvitePanel] = useState<{ tenant: Tenant; token: string } | null>(null);

  if (!property) {
    return (
      <AppLayout requireRole="landlord">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-muted-foreground">Property not found</p>
          <Button variant="outline" onClick={() => router.push("/properties")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </AppLayout>
    );
  }

  const vacantRooms = rooms.filter((r) => r.status === "vacant");

  const handleAddRoom = async (data: RoomInput) => {
    if (editRoom) {
      await updateRoom(editRoom.id, data);
      toast.success("Room updated");
    } else {
      await addRoom(id, data);
      toast.success("Room added");
    }
    setRoomFormOpen(false);
    setEditRoom(null);
  };

  const handleDeleteRoom = async (room: Room) => {
    await deleteRoom(room.id);
    toast.success("Room deleted");
  };

  const handleAddTenant = async (data: TenantInput & { roomId: string }) => {
    const newTenant = await addTenant({ ...data, propertyId: id });
    toast.success("Tenant added! Share their invite link.");
    setTenantFormOpen(false);
    if (newTenant.inviteToken) {
      setInvitePanel({ tenant: newTenant, token: newTenant.inviteToken });
    }
  };

  const handleDeleteTenant = async (tenant: Tenant) => {
    await deleteTenant(tenant.id);
    toast.success("Tenant removed");
  };

  const handleInvite = async (tenant: Tenant) => {
    let token = tenant.inviteToken;
    if (!token) token = await generateInviteToken(tenant.id);
    setInvitePanel({ tenant, token });
  };

  return (
    <AppLayout requireRole="landlord">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold">{property.name}</h1>
              <Badge variant="outline" className="capitalize">{property.type}</Badge>
            </div>
            <p className="text-muted-foreground text-sm">{property.address}, {property.city}, {property.state} — {property.pincode}</p>
          </div>
        </div>

        <Tabs defaultValue="rooms">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <TabsList>
              <TabsTrigger value="rooms">Rooms ({rooms.length})</TabsTrigger>
              <TabsTrigger value="tenants">Tenants ({propertyTenants.length})</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { setEditRoom(null); setRoomFormOpen(true); }}>
                <Plus className="mr-2 h-4 w-4" /> Add Room
              </Button>
              <Button size="sm" onClick={() => setTenantFormOpen(true)} disabled={vacantRooms.length === 0}>
                <UserPlus className="mr-2 h-4 w-4" /> Add Tenant
              </Button>
            </div>
          </div>

          <TabsContent value="rooms" className="mt-4">
            {rooms.length === 0 ? (
              <EmptyState icon={Home} title="No rooms yet" description="Add rooms to this property." actionLabel="Add Room" onAction={() => setRoomFormOpen(true)} />
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {rooms.map((r) => (
                  <RoomCard
                    key={r.id}
                    room={r}
                    tenant={tenants.find((t) => t.roomId === r.id)}
                    onEdit={(room) => { setEditRoom(room); setRoomFormOpen(true); }}
                    onDelete={handleDeleteRoom}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tenants" className="mt-4">
            {propertyTenants.length === 0 ? (
              <EmptyState icon={UserPlus} title="No tenants yet" description="Add tenants to assign them to rooms." actionLabel="Add Tenant" onAction={() => setTenantFormOpen(true)} />
            ) : (
              <TenantTable tenants={propertyTenants} rooms={rooms} onDelete={handleDeleteTenant} onInvite={handleInvite} />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <RoomForm
        open={roomFormOpen}
        onOpenChange={(o) => { setRoomFormOpen(o); if (!o) setEditRoom(null); }}
        onSubmit={handleAddRoom}
        defaultValues={editRoom ?? undefined}
        loading={isLoading}
      />
      <TenantForm
        open={tenantFormOpen}
        onOpenChange={setTenantFormOpen}
        onSubmit={handleAddTenant}
        availableRooms={vacantRooms}
        loading={isLoading}
      />
      {invitePanel && (
        <InviteSharePanel
          open={!!invitePanel}
          onOpenChange={(o) => !o && setInvitePanel(null)}
          token={invitePanel.token}
          tenantName={invitePanel.tenant.name}
        />
      )}
    </AppLayout>
  );
}
