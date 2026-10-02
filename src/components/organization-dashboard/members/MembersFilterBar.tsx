"use client";

import React, { memo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { TRACK_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from "./types";

interface MembersFilterBarProps {
  totalCount: number;
  filteredCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTrack: string;
  onTrackChange: (value: string) => void;
  selectedStatusFilter: string;
  onStatusChange: (value: string) => void;
  onResetFilters: () => void;
}

export const MembersFilterBar = memo(function MembersFilterBar({
  totalCount,
  filteredCount,
  searchTerm,
  onSearchChange,
  selectedTrack,
  onTrackChange,
  selectedStatusFilter,
  onStatusChange,
  onResetFilters,
}: MembersFilterBarProps) {
  const isFiltered =
    selectedTrack !== "all" || selectedStatusFilter !== "all" || searchTerm.trim() !== "";

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-stone-100 pb-3">
      <div>
        <h3 className="text-sm font-bold text-stone-900">
          Participant Members
        </h3>
        <p className="text-xs text-stone-500 mt-0.5">
          Showing {filteredCount} of {totalCount} participants
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full lg:w-auto">
        {/* Search Input */}
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-stone-50/80 border border-stone-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Track Dropdown Filter */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={selectedTrack}
              onChange={(e) => onTrackChange(e.target.value)}
              aria-label="Filter by career track"
              className="w-full sm:w-auto appearance-none bg-stone-50/80 hover:bg-stone-100 border border-stone-200 rounded-md pl-3 pr-7 py-1.5 text-xs font-medium text-stone-700 focus:outline-none focus:border-stone-400 transition-colors cursor-pointer"
            >
              {TRACK_FILTER_OPTIONS.map((opt) => (
                <option
                  key={opt.id}
                  value={opt.id}
                  className="bg-white text-stone-900"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
          </div>

          {/* Status Dropdown Filter */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={selectedStatusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              aria-label="Filter by status"
              className="w-full sm:w-auto appearance-none bg-stone-50/80 hover:bg-stone-100 border border-stone-200 rounded-md pl-3 pr-7 py-1.5 text-xs font-medium text-stone-700 focus:outline-none focus:border-stone-400 transition-colors cursor-pointer"
            >
              {STATUS_FILTER_OPTIONS.map((opt) => (
                <option
                  key={opt.id}
                  value={opt.id}
                  className="bg-white text-stone-900"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
          </div>

          {/* Reset Filter Button */}
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-stone-500 hover:text-stone-900 font-medium underline underline-offset-2 transition-colors px-1 shrink-0 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
