"use client";

import { useRouter } from "next/navigation";
import { LogOut, Settings, User, Users, Home, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NotificationBell } from "./NotificationBell";
import { useApp } from "@/lib/context/AppContext";
import { getInitials } from "@/lib/utils";
import { MOCK_TENANTS_USERS } from "@/lib/mock-data";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { currentUser, logout, switchToTenant, switchToLandlord } = useApp();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 md:px-6">
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>

      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-primary">
        <Home className="h-5 w-5" />
        <span className="text-lg">RentEase</span>
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <NotificationBell />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {currentUser ? getInitials(currentUser.name) : "?"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground font-normal">{currentUser?.email}</p>
                <p className="text-xs text-primary font-normal capitalize mt-0.5">{currentUser?.role}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <User className="mr-2 h-4 w-4" />
              Profile & Settings
            </DropdownMenuItem>

            {/* Switch view shortcuts */}
            {currentUser?.role === "landlord" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground">Switch to Tenant View</DropdownMenuLabel>
                {MOCK_TENANTS_USERS.slice(0, 3).map((u) => (
                  <DropdownMenuItem key={u.id} onClick={() => { switchToTenant(u.id); router.replace("/tenant/dashboard"); }}>
                    <Users className="mr-2 h-4 w-4" />
                    {u.name}
                  </DropdownMenuItem>
                ))}
              </>
            )}
            {currentUser?.role === "tenant" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { switchToLandlord(); router.replace("/dashboard"); }}>
                  <Home className="mr-2 h-4 w-4" />
                  Switch to Landlord View
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
