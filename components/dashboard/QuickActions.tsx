"use client";

import { useRouter } from "next/navigation";
import { PlusCircle, UserPlus, CreditCard, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ACTIONS = [
  { label: "Add Property", icon: PlusCircle, href: "/properties", color: "text-blue-600" },
  { label: "Add Tenant", icon: UserPlus, href: "/properties", color: "text-purple-600" },
  { label: "Record Payment", icon: CreditCard, href: "/payments", color: "text-green-600" },
  { label: "AI Assistant", icon: MessageSquare, href: "/chat", color: "text-orange-600" },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {ACTIONS.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-auto flex-col gap-2 py-4 hover:bg-accent"
            onClick={() => router.push(action.href)}
          >
            <action.icon className={`h-5 w-5 ${action.color}`} />
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
