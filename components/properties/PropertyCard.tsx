"use client";

import { useRouter } from "next/navigation";
import { Building2, MapPin, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Property, Room } from "@/lib/types";
import { cn } from "@/lib/utils";

const TYPE_COLORS: Record<Property["type"], string> = {
  apartment: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  villa: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  commercial: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  pg: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
};

interface PropertyCardProps {
  property: Property;
  rooms: Room[];
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
}

export function PropertyCard({ property, rooms, onEdit, onDelete }: PropertyCardProps) {
  const router = useRouter();
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const rate = rooms.length > 0 ? Math.round((occupied / rooms.length) * 100) : 0;

  return (
    <Card
      className="group hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/properties/${property.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="rounded-lg bg-primary/10 p-2 shrink-0">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">{property.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{property.city}, {property.state}</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(property); }}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={(e) => { e.stopPropagation(); onDelete(property); }}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize", TYPE_COLORS[property.type])}>
            {property.type}
          </span>
          <span className={cn(
            "text-xs font-semibold",
            rate >= 80 ? "text-green-600" : rate >= 50 ? "text-yellow-600" : "text-red-600"
          )}>
            {rate}% occupied
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md bg-muted/50 p-2">
            <p className="text-lg font-bold">{rooms.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <p className="text-lg font-bold text-green-600">{occupied}</p>
            <p className="text-xs text-muted-foreground">Occupied</p>
          </div>
          <div className="rounded-md bg-muted/50 p-2">
            <p className="text-lg font-bold text-yellow-600">{rooms.filter(r => r.status === "vacant").length}</p>
            <p className="text-xs text-muted-foreground">Vacant</p>
          </div>
        </div>

        {property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((a) => (
              <span key={a} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{a}</span>
            ))}
            {property.amenities.length > 3 && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">+{property.amenities.length - 3}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
