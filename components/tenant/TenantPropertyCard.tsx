import { MapPin, Home, Building2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tenant, Room, Property } from "@/lib/types";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { formatDate } from "@/lib/utils";

interface TenantPropertyCardProps {
  tenant: Tenant;
  room?: Room;
  property?: Property;
}

export function TenantPropertyCard({ tenant, room, property }: TenantPropertyCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">My Residence</CardTitle>
          {property?.type && <Badge variant="secondary" className="capitalize">{property.type}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-4 w-4 text-primary" />
            <p className="font-semibold">{property?.name ?? "—"}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <p>{property?.address}, {property?.city}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-lg border p-3">
          <div>
            <p className="text-xs text-muted-foreground">Room</p>
            <p className="font-semibold flex items-center gap-1.5 mt-0.5">
              <Home className="h-4 w-4 text-primary" />
              Room {room?.roomNumber ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Monthly Rent</p>
            <CurrencyDisplay amount={room?.rentAmount ?? 0} size="lg" className="text-primary mt-0.5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Move-in Date</p>
            <p className="font-medium flex items-center gap-1.5 mt-0.5 text-sm">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(tenant.moveInDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Deposit Paid</p>
            <CurrencyDisplay amount={room?.depositAmount ?? 0} size="sm" className="mt-0.5" />
          </div>
        </div>

        {property?.amenities && property.amenities.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">Amenities</p>
            <div className="flex flex-wrap gap-1">
              {property.amenities.map((a) => (
                <span key={a} className="rounded-full bg-muted px-2 py-0.5 text-xs">{a}</span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
