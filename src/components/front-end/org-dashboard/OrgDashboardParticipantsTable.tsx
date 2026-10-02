"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { RowActionMenu } from "@/components/ui/RowActionMenu";
import { Participant, TRACK_FILTER_OPTIONS } from "./types";
import { PARTICIPANTS } from "./mockData";

interface OrgDashboardParticipantsTableProps {
  participants: Participant[];
  selectedTrack: string;
  onSelectTrack: (track: string) => void;
}

export const OrgDashboardParticipantsTable = memo(
  function OrgDashboardParticipantsTable({
    participants,
    selectedTrack,
    onSelectTrack,
  }: OrgDashboardParticipantsTableProps) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="lg:col-span-8 bg-[#11121a] rounded-lg p-3.5 border border-white/10 space-y-3 overflow-hidden"
      >
        {/* Table Header: Title + Count + Track Dropdown Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div>
            <h3 className="text-sm font-bold text-white">
              Participant Progress
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              Showing {participants.length} of {PARTICIPANTS.length}{" "}
              participants
            </p>
          </div>

          {/* Track Dropdown Filter */}
          <div className="relative shrink-0">
            <select
              value={selectedTrack}
              onChange={(e) => onSelectTrack(e.target.value)}
              aria-label="Filter by career track"
              className="appearance-none bg-white/5 hover:bg-white/10 border border-white/10 rounded-md pl-3 pr-7 py-1.5 text-xs font-medium text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
            >
              {TRACK_FILTER_OPTIONS.map((opt) => (
                <option
                  key={opt.id}
                  value={opt.id}
                  className="bg-[#181926] text-white"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
          </div>
        </div>

        {/* Mobile View: Card List (< md) */}
        <div className="md:hidden divide-y divide-white/10 -mx-3.5 -mb-3.5">
          {participants.length === 0 ? (
            <div className="text-center text-white/40 text-xs py-8 px-4 leading-normal">
              No participants found matching current filter.
            </div>
          ) : (
            participants.map((p) => (
              <div
                key={p.id}
                className="p-3.5 space-y-3 hover:bg-white/[0.03] transition-colors"
              >
                {/* Participant Info & Actions */}
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {p.name}
                      </div>
                      <div className="text-xs text-white/40 font-mono truncate">
                        {p.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-white/80 bg-white/5 border border-white/10">
                      {p.status}
                    </span>
                    <RowActionMenu
                      buttonAriaLabel={`Actions for ${p.name}`}
                      theme="dark"
                      align="right"
                      items={[
                        { id: "view", label: `View Profile` },
                        { id: "cert", label: "Certification" },
                        { id: "remind", label: "Send Reminder" },
                      ]}
                    />
                  </div>
                </div>

                {/* Track Badge & Score */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center px-2.5 py-1 rounded font-mono text-white/80 bg-white/5 border border-white/10">
                    {p.track}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-white/40 text-xs">Score:</span>
                    <span className="font-bold text-xs text-white bg-white/10 px-2.5 py-0.5 rounded border border-white/15">
                      {p.score}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                    <span>Curriculum Progress</span>
                    <span className="font-bold text-white/90">
                      {p.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Table (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs leading-normal border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-mono text-xs uppercase tracking-wider h-10">
                <th className="px-3.5 py-2.5 font-medium leading-normal">
                  Participant
                </th>
                <th className="px-3.5 py-2.5 font-medium leading-normal">
                  Track
                </th>
                <th className="px-3.5 py-2.5 font-medium leading-normal">
                  Status
                </th>
                <th className="px-3.5 py-2.5 font-medium leading-normal">
                  Progress
                </th>
                <th className="px-3.5 py-2.5 font-medium text-right leading-normal">
                  Score
                </th>
                <th className="px-2 py-2.5 font-medium text-center w-8">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.length === 0 ? (
                <tr className="h-12">
                  <td
                    colSpan={6}
                    className="text-center text-white/40 text-xs py-8 leading-normal"
                  >
                    No participants found matching current filter.
                  </td>
                </tr>
              ) : (
                participants.map((p) => (
                  <tr
                    key={p.id}
                    className="h-12 border-b border-white/5 last:border-0 hover:bg-white/[0.05] transition-colors"
                  >
                    {/* Participant Avatar + Name + Role */}
                    <td className="px-3.5 py-3 whitespace-nowrap align-middle">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0"
                        />
                        <div className="flex items-baseline gap-2 truncate">
                          <span className="text-sm font-semibold text-white truncate leading-normal">
                            {p.name}
                          </span>
                          <span className="text-xs text-white/45 truncate hidden sm:inline leading-normal">
                            {p.role}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Track Tag */}
                    <td className="px-3.5 py-3 whitespace-nowrap align-middle">
                      <span className="text-xs font-mono text-white/70 bg-white/5 px-2.5 py-1 rounded border border-white/10 leading-normal inline-block">
                        {p.track}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3.5 py-3 whitespace-nowrap align-middle text-xs text-white/70 leading-normal">
                      {p.status}
                    </td>

                    {/* Progress Bar */}
                    <td className="px-3.5 py-3 whitespace-nowrap align-middle w-32">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-white/80 font-bold leading-normal">
                          {p.progress}%
                        </span>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="px-3.5 py-3 text-right whitespace-nowrap align-middle">
                      <span className="font-mono font-bold text-xs text-white bg-white/5 px-2.5 py-1 rounded border border-white/10 leading-normal inline-block">
                        {p.score}
                      </span>
                    </td>

                    {/* Action Menu */}
                    <td className="px-1 py-3 text-center whitespace-nowrap align-middle">
                      <RowActionMenu
                        buttonAriaLabel={`Actions for ${p.name}`}
                        theme="dark"
                        align="right"
                        items={[
                          {
                            id: "view",
                            label: `View ${p.name}`,
                          },
                          {
                            id: "edit",
                            label: "Change Track",
                          },
                          {
                            id: "remind",
                            label: "Send Reminder",
                          },
                          {
                            id: "export",
                            label: "Export Progress",
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  }
);
