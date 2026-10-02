"use client";

import React, { memo } from "react";
import { Search, Filter } from "lucide-react";

interface UsersFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRoleFilter: string;
  onRoleFilterChange: (value: string) => void;
  selectedTrack: string;
  onTrackFilterChange: (value: string) => void;
}

export const UsersFilterBar = memo(function UsersFilterBar({
  searchTerm,
  onSearchChange,
  selectedRoleFilter,
  onRoleFilterChange,
  selectedTrack,
  onTrackFilterChange,
}: UsersFilterBarProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#FCFAF6] p-3 rounded-2xl border border-stone-200">
      <div className="sm:col-span-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, email, or role..."
          className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      <div className="sm:col-span-3 flex items-center gap-2">
        <Filter className="w-4 h-4 text-stone-400 shrink-0" />
        <select
          value={selectedRoleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
          className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-orange-500 transition-colors font-medium"
        >
          <option value="all">All Roles (Owner, Admin, Member)</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
      </div>

      <div className="sm:col-span-3 flex items-center gap-2">
        <select
          value={selectedTrack}
          onChange={(e) => onTrackFilterChange(e.target.value)}
          className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-orange-500 transition-colors font-medium"
        >
          <option value="all">All Tracks</option>
          <option value="Customer Service">Customer Service</option>
          <option value="Tech Support">Tech Support</option>
          <option value="IT Specialist">IT Specialist</option>
          <option value="Healthcare Support">Healthcare Support</option>
        </select>
      </div>
    </div>
  );
});
