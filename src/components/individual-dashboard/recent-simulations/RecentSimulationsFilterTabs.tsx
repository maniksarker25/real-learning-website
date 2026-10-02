import React, { memo } from "react";
import { cn } from "@/lib/utils";

interface RecentSimulationsFilterTabsProps {
  activeFilter: string;
  onSelectFilter: (filterId: string) => void;
}

const FILTER_OPTIONS = [
  { id: "all", label: "All Tracks" },
  { id: "Customer Service", label: "Customer Service" },
  { id: "Tech Support", label: "Tech Support" },
  { id: "IT Specialist", label: "IT Specialist" },
  { id: "Healthcare Support", label: "Healthcare Support" },
];

export const RecentSimulationsFilterTabs = memo(
  function RecentSimulationsFilterTabs({
    activeFilter,
    onSelectFilter,
  }: RecentSimulationsFilterTabsProps) {
    return (
      <div className="flex flex-wrap items-center gap-1.5">
        {FILTER_OPTIONS.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onSelectFilter(filter.id)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border",
                isActive
                  ? "bg-stone-900 text-white border-stone-900 font-semibold"
                  : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    );
  },
);
