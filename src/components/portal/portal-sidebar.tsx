"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Users,
  Calendar,
  BookOpen,
  LogOut,
} from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";

const LINKS = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/profile", label: "Profile", icon: User },
  { href: "/portal/referrals", label: "Connections", icon: Users },
  { href: "/portal/events", label: "My Events", icon: Calendar },
  { href: "/portal/resources", label: "Resources", icon: BookOpen },
];

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r bg-card">
      <div className="border-b p-6">
        <Logo size="sm" href="/" className="h-12 w-auto max-w-[150px]" />
        <p className="mt-2 text-xs text-muted-foreground">Member Portal</p>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <form action={signOut}>
          <Button type="submit" variant="ghost" className="w-full justify-start gap-3">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </form>
      </div>
    </aside>
  );
}
