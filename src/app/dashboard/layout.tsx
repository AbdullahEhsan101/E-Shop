"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/shop", label: "View Shop", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/dashboard">
              <Logo />
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn("gap-2", isActive && "bg-secondary")}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container py-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
