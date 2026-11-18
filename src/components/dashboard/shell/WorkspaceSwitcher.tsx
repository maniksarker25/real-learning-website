"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Check, ChevronDown, Shield, User, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const WORKSPACES: {
  id: string;
  role?: "admin" | "member";
  name: string;
  desc: string;
  icon: LucideIcon;
  orgName?: string;
}[] = [
  { id: "personal", name: "Personal", desc: "Your own practice", icon: User },
  { id: "ws-globex-admin", role: "admin", name: "Globex Global", desc: "Admin · manage team", icon: Shield },
  {
    id: "ws-initech-member",
    role: "member",
    name: "Initech Learning",
    desc: "Member · assigned scenarios",
    icon: Building2,
    orgName: "Initech Learning",
  },
];

/** Pill button that opens the workspace menu (personal / organizations). */
export function WorkspaceSwitcher({
  orgName,
  isMember,
  onSelect,
}: {
  orgName?: string;
  isMember: boolean;
  onSelect: (workspaceId: string, role?: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const isActive = (w: (typeof WORKSPACES)[number]) =>
    w.id === "personal" ? !isMember : !!w.orgName && isMember && orgName === w.orgName;

  return (
    <div ref={ref} className="relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex h-9 max-w-[180px] items-center gap-2 rounded-full border border-white/10 pl-3 pr-2.5 text-sm text-zinc-200 transition-colors hover:border-white/30 sm:max-w-none"
      >
        {isMember ? <Building2 className="h-4 w-4 shrink-0 text-orange-400" /> : <User className="h-4 w-4 shrink-0 text-orange-400" />}
        <span className="truncate">{isMember ? orgName : "Personal"}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 text-zinc-500 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 max-w-[85vw] rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-2 shadow-2xl shadow-black/50">
          <p className="px-3 pb-2 pt-1.5 text-xs text-zinc-500">Switch workspace</p>
          {WORKSPACES.map((w) => {
            const Icon = w.icon;
            const active = isActive(w);
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => {
                  setOpen(false);
                  onSelect(w.id, w.role);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors",
                  active ? "bg-white/[0.06]" : "hover:bg-white/[0.04]",
                )}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-white">{w.name}</span>
                  <span className="block truncate text-xs text-zinc-500">{w.desc}</span>
                </span>
                {active && <Check className="h-4 w-4 shrink-0 text-orange-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
