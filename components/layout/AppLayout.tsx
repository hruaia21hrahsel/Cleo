"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Header } from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
  requireRole?: "landlord" | "tenant";
}

export function AppLayout({ children, requireRole }: AppLayoutProps) {
  const { currentUser } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
      return;
    }
    if (requireRole && currentUser.role !== requireRole) {
      router.replace(currentUser.role === "landlord" ? "/dashboard" : "/tenant/dashboard");
    }
  }, [currentUser, requireRole, router]);

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
