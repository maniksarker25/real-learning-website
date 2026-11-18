"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { DashboardNavItem } from "./nav";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white">
        <Image src="/icons/brand-mark.png" alt="" fill sizes="36px" className="object-contain p-0.5" />
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">Real Learning</span>
    </Link>
  );
}

export function UserAvatar({ src, name, size = 40 }: { src?: string; name?: string; size?: number }) {
  return (
    <span
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-500 text-black"
      style={{ width: size, height: size }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name || "Avatar"} className="h-full w-full object-cover" />
      ) : (
        <User className="h-1/2 w-1/2" />
      )}
    </span>
  );
}

/** Desktop sidebar: brand, nav, optional widget card, profile link. */
export function Sidebar({
  items,
  isActive,
  onNavigate,
  user,
  profileHref,
  widget,
}: {
  items: DashboardNavItem[];
  isActive: (href: string) => boolean;
  onNavigate?: (href: string) => void;
  user: { name: string; subtitle: string; avatarUrl?: string };
  profileHref: string;
  widget?: ReactNode;
}) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-white/[0.06] bg-[#121212] px-4 py-5 md:flex">
      <BrandMark className="px-2" />

      <nav className="mt-8 flex flex-col gap-1" aria-label="Dashboard">
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
                "flex h-11 items-center gap-3 rounded-xl px-3 text-[15px] transition-colors",
                active ? "bg-white/[0.07] font-medium text-white" : "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
              )}
            >
              <Icon className={cn("h-[18px] w-[18px]", active ? "text-orange-400" : "text-zinc-500")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3">
        {widget && <div className="rounded-2xl border border-white/[0.06] bg-[#181818] p-4">{widget}</div>}

        <Link
          href={profileHref}
          className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-white/[0.04]"
        >
          <UserAvatar src={user.avatarUrl} name={user.name} size={38} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-white">{user.name}</span>
            <span className="block truncate text-xs text-zinc-500">{user.subtitle}</span>
          </span>
        </Link>
      </div>
    </aside>
  );
}
