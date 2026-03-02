"use client";

import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface InviteSharePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: string;
  tenantName: string;
}

export function InviteSharePanel({ open, onOpenChange, token, tenantName }: InviteSharePanelProps) {
  const [copied, setCopied] = useState(false);
  const inviteUrl = typeof window !== "undefined"
    ? `${window.location.origin}/invite/${token}`
    : `/invite/${token}`;

  const copy = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    toast.success("Invite link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" /> Share Invite Link
          </DialogTitle>
          <DialogDescription>
            Share this link with <strong>{tenantName}</strong> to onboard them to RentEase.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex gap-2">
            <Input value={inviteUrl} readOnly className="text-sm font-mono bg-muted" />
            <Button size="icon" variant="outline" onClick={copy}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This link allows {tenantName} to view their tenancy details and join RentEase. It expires in 7 days.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
