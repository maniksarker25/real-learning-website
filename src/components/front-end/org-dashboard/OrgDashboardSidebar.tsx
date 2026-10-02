"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";

interface OrgDashboardSidebarProps {
  orgName?: string;
  seats?: string;
  activeNav: string;
  onSelectNav: (id: string) => void;
  isInteractive?: boolean;
}

export const OrgDashboardSidebar = memo(function OrgDashboardSidebar({
  orgName,
  seats,
  activeNav,
  onSelectNav,
  isInteractive = false,
}: OrgDashboardSidebarProps) {
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "participants", label: "Participants", count: "1.2k" },
    { id: "careers", label: "Tracks", count: "4" },
    { id: "analytics", label: "Analytics" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <aside className="w-full md:w-48 bg-[#0d0e14] border-b md:border-b-0 md:border-r border-white/10 p-3 flex flex-row md:flex-col justify-between shrink-0 gap-3">
      <div className="w-full">
        {/* Workspace Title */}
        <div className="flex items-center gap-2.5 px-2 py-2 mb-2.5 border-b border-white/10">
          <div className="w-7 h-7 rounded bg-orange-500 flex items-center justify-center text-white font-black text-xs shrink-0">
            RL
          </div>
          <div className="truncate">
            <div className="text-sm font-bold text-white leading-tight">
              {orgName || "Acme Corp"}
            </div>
            <div className="text-xs text-white/50 leading-tight mt-0.5">
              Enterprise Ops
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex flex-row md:flex-col gap-1 w-full overflow-x-auto">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => isInteractive && onSelectNav(item.id)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium shrink-0 whitespace-nowrap text-left transition-colors",
                  isInteractive ? "cursor-pointer" : "cursor-default",
                  isActive
                    ? "bg-white/10 text-white font-semibold border border-white/15"
                    : "text-white/60 hover:bg-white/5"
                )}
              >
                <span>{item.label}</span>
                {item.count && (
                  <span
                    className={cn(
                      "text-xs font-mono px-1.5 py-0.5 rounded hidden md:inline-block",
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-white/5 text-white/40"
                    )}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Quota Badge */}
      <div className="hidden md:block bg-black/60 rounded-lg p-2.5 border border-white/10 mt-auto text-xs">
        <div className="flex items-center justify-between text-white/60 mb-1.5">
          <span>Seats</span>
          <span className="text-orange-400 font-mono font-bold">
            1,248 / {seats ? `${seats}` : "1.5k"}
          </span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full w-[83%]" />
        </div>
      </div>
    </aside>
  );
});
