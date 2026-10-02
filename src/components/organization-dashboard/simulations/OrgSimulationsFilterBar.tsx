import React, { memo } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrgSimulationsFilterBarProps {
  selectedTrackFilter: string;
  onSelectTrackFilter: (track: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalCount: number;
}

const TRACK_TABS = [
  { id: "all", label: "All Simulations" },
  { id: "Customer Service", label: "Customer Service" },
  { id: "Tech Support", label: "Tech Support" },
  { id: "IT Specialist", label: "IT Specialist" },
  { id: "Healthcare Support", label: "Healthcare Support" },
];

export const OrgSimulationsFilterBar = memo(function OrgSimulationsFilterBar({
  selectedTrackFilter,
  onSelectTrackFilter,
  searchTerm,
  onSearchChange,
  totalCount,
}: OrgSimulationsFilterBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {TRACK_TABS.map((tab) => {
            const label =
              tab.id === "all" ? `${tab.label} (${totalCount})` : tab.label;
            const isSelected = selectedTrackFilter === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTrackFilter(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border",
                  isSelected
                    ? "bg-stone-900 border-stone-900 text-white font-bold shadow-xs"
                    : "bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 shadow-xs",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by member or scenario..."
            className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
});
