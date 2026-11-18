"use client";

import { memo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input, Select } from "@/components/dashboard/ui";
import { STATUS_FILTER_OPTIONS, TRACK_FILTER_OPTIONS } from "./types";

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

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly { id: string; label: string }[];
}) {
  return (
    <div className="relative flex-1 sm:flex-none">
      <Select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 py-0 text-sm sm:w-44"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </Select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
    </div>
  );
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
  const isFiltered = selectedTrack !== "all" || selectedStatusFilter !== "all" || searchTerm.trim() !== "";

  return (
    <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 className="text-lg font-semibold tracking-[-0.01em] text-white">All members</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Showing {filteredCount} of {totalCount}
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search name or email"
            aria-label="Search members"
            className="h-11 py-0 pl-10 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <FilterSelect label="Filter by track" value={selectedTrack} onChange={onTrackChange} options={TRACK_FILTER_OPTIONS} />
          <FilterSelect
            label="Filter by status"
            value={selectedStatusFilter}
            onChange={onStatusChange}
            options={STATUS_FILTER_OPTIONS}
          />
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="shrink-0 px-2 text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
