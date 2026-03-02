"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Home, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/lib/context/AppContext";
import { Tenant } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const { getTenantByToken, updateTenant, rooms, properties } = useApp();

  const token = typeof params.token === "string" ? params.token : "";
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    const found = getTenantByToken(token);
    setTenant(found ?? null);
    setLoading(false);
  }, [token, getTenantByToken]);

  const room = rooms.find((r) => r.id === tenant?.roomId);
  const property = properties.find((p) => p.id === tenant?.propertyId);

  const handleAccept = async () => {
    if (!tenant) return;
    setAccepting(true);
    await updateTenant(tenant.id, { status: "active", inviteToken: undefined });
    toast.success("Welcome to RentEase! Your account is now active.");
    setTimeout(() => router.replace("/login"), 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-2">
            <Home className="h-7 w-7" />
            RentEase
          </div>
        </div>

        {!tenant ? (
          <Card>
            <CardContent className="flex flex-col items-center py-10 gap-4">
              <XCircle className="h-12 w-12 text-destructive" />
              <h2 className="text-xl font-semibold">Invalid or Expired Link</h2>
              <p className="text-muted-foreground text-center text-sm">
                This invite link is no longer valid. Please contact your landlord for a new invite.
              </p>
              <Button variant="outline" onClick={() => router.push("/login")}>
                Go to Login
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-7 w-7 text-primary" />
              </div>
              <CardTitle>You&apos;re Invited!</CardTitle>
              <CardDescription>
                You&apos;ve been invited to join RentEase as a tenant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{tenant.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property</span>
                  <span className="font-medium">{property?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room</span>
                  <span className="font-medium">Room {room?.roomNumber}</span>
                </div>
                {room && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="font-medium text-primary">{formatCurrency(room.rentAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Move-in Date</span>
                  <span className="font-medium">{formatDate(tenant.moveInDate)}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                By accepting, you confirm the above details and agree to the tenancy terms.
              </p>

              <Button className="w-full" onClick={handleAccept} disabled={accepting}>
                {accepting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Accepting...
                  </>
                ) : (
                  "Accept & Join RentEase"
                )}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push("/login")}>
                I already have an account
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
