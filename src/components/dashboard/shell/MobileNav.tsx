"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { DashboardNavItem } from "./nav";

/** Bottom tab bar on small screens (thumb reachable). */
export function MobileNav({
  items,
  isActive,
  onNavigate,
}: {
  items: DashboardNavItem[];
  isActive: (href: string) => boolean;
  onNavigate?: (href: string) => void;
}) {
  return (
    <nav
      aria-label="Dashboard"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.06] bg-[#121212]/90 px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 backdrop-blur-xl md:hidden"
    >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onNavigate?.(item.href)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] transition-colors",
                active ? "text-white" : "text-zinc-500",
              )}
            >
              <Icon className={cn("h-5 w-5", active && "text-orange-400")} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
