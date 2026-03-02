"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OccupancyChart } from "@/components/dashboard/OccupancyChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useApp } from "@/lib/context/AppContext";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { currentUser, stats, revenueData } = useApp();
  const today = formatDate(new Date().toISOString());

  return (
    <AppLayout requireRole="landlord">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">
            Good {getGreeting()}, {currentUser?.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">{today} · Here&apos;s your portfolio overview</p>
        </div>

        {/* Stats */}
        <SummaryCards stats={stats} />

        {/* Charts + Actions */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} />
          </div>
          <QuickActions />
        </div>

        {/* Bottom row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <OccupancyChart />
          <ActivityFeed />
        </div>
      </div>
    </AppLayout>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Morning";
  if (h < 17) return "Afternoon";
  return "Evening";
}
