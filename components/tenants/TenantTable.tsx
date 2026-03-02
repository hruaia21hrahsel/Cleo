"use client";

import { useState } from "react";
import { MoreVertical, Trash2, Share2, Mail } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Tenant, Room } from "@/lib/types";
import { getInitials, formatDate } from "@/lib/utils";

interface TenantTableProps {
  tenants: Tenant[];
  rooms: Room[];
  onDelete: (tenant: Tenant) => void;
  onInvite: (tenant: Tenant) => void;
}

export function TenantTable({ tenants, rooms, onDelete, onInvite }: TenantTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Tenant | null>(null);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Move-in</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No tenants yet</TableCell>
              </TableRow>
            ) : (
              tenants.map((t) => {
                const room = rooms.find((r) => r.id === t.roomId);
                return (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">{getInitials(t.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{t.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3"/>{t.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{room ? `Room ${room.roomNumber}` : "—"}</TableCell>
                    <TableCell className="text-sm">{formatDate(t.moveInDate)}</TableCell>
                    <TableCell><StatusBadge status={t.status} /></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onInvite(t)}><Share2 className="mr-2 h-4 w-4" /> Share Invite Link</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteTarget(t)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Remove Tenant
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Remove Tenant"
        description={`Are you sure you want to remove ${deleteTarget?.name}? This will vacate their room.`}
        confirmLabel="Remove"
        onConfirm={() => { if (deleteTarget) { onDelete(deleteTarget); setDeleteTarget(null); } }}
      />
    </>
  );
}
