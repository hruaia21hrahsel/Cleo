"use client";

import { Home, Pencil, Trash2, MoreVertical, Ruler } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Room, Tenant } from "@/lib/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";

interface RoomCardProps {
  room: Room;
  tenant?: Tenant;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
}

export function RoomCard({ room, tenant, onEdit, onDelete }: RoomCardProps) {
  return (
    <Card className="group">
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-muted p-2">
              <Home className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">Room {room.roomNumber}</p>
              <p className="text-xs text-muted-foreground">Floor {room.floor}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={room.status} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(room)}>
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(room)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Rent</span>
            <CurrencyDisplay amount={room.rentAmount} size="sm" className="font-semibold text-primary" />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Deposit</span>
            <CurrencyDisplay amount={room.depositAmount} size="sm" />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Area</span>
            <span className="flex items-center gap-1"><Ruler className="h-3 w-3" />{room.area} sq ft</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Furnishing</span>
            <span className="capitalize">{room.furnishing}</span>
          </div>
        </div>

        {tenant && (
          <div className="mt-3 rounded-md bg-blue-50 dark:bg-blue-950/20 p-2">
            <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">{tenant.name}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">{tenant.phone}</p>
          </div>
        )}

        {room.features.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {room.features.slice(0, 3).map((f) => (
              <span key={f} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{f}</span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
