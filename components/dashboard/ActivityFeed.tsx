import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, CreditCard, User, Home, AlertTriangle } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import { getRelativeTime } from "@/lib/utils";
import { NotificationType } from "@/lib/types";

const ICON_MAP: Record<NotificationType, React.ElementType> = {
  payment_received: CreditCard,
  payment_due: AlertTriangle,
  lease_expiry: Home,
  maintenance: Home,
  new_tenant: User,
  invite_accepted: User,
  general: Bell,
};

const COLOR_MAP: Record<NotificationType, string> = {
  payment_received: "text-green-600 bg-green-50 dark:bg-green-950/30",
  payment_due: "text-red-600 bg-red-50 dark:bg-red-950/30",
  lease_expiry: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30",
  maintenance: "text-gray-600 bg-gray-50 dark:bg-gray-800/30",
  new_tenant: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
  invite_accepted: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
  general: "text-muted-foreground bg-muted",
};

export function ActivityFeed() {
  const { notifications, currentUser } = useApp();

  const feed = notifications
    .filter((n) => n.userId === currentUser?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[280px]">
          {feed.length === 0 ? (
            <div className="flex items-center justify-center h-full py-8 text-muted-foreground text-sm">
              No recent activity
            </div>
          ) : (
            <div className="divide-y">
              {feed.map((n) => {
                const Icon = ICON_MAP[n.type] ?? Bell;
                const color = COLOR_MAP[n.type] ?? "";
                return (
                  <div key={n.id} className="flex items-start gap-3 px-6 py-3">
                    <div className={`mt-0.5 rounded-full p-1.5 shrink-0 ${color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground/70 shrink-0">{getRelativeTime(n.createdAt)}</p>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
