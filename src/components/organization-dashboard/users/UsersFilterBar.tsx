"use client";

import { memo } from "react";
import { Select } from "@/components/dashboard/ui";
import { SearchInput } from "./UserBadges";

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
    <div className="grid gap-2 sm:grid-cols-[1fr_200px_200px]">
      <SearchInput value={searchTerm} onChange={onSearchChange} placeholder="Search by name or email" />
      <Select value={selectedRoleFilter} onChange={(e) => onRoleFilterChange(e.target.value)} aria-label="Filter by role">
        <option value="all">All roles</option>
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
        <option value="member">Member</option>
      </Select>
      <Select value={selectedTrack} onChange={(e) => onTrackFilterChange(e.target.value)} aria-label="Filter by track">
        <option value="all">All tracks</option>
        <option value="Customer Service">Customer Service</option>
        <option value="Tech Support">Tech Support</option>
        <option value="IT Specialist">IT Specialist</option>
        <option value="Healthcare Support">Healthcare Support</option>
      </Select>
    </div>
  );
});
