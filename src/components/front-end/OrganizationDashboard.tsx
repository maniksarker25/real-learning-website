"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  OrganizationDashboardProps,
  PARTICIPANTS,
  OrgDashboardWindowChrome,
  OrgDashboardSidebar,
  OrgDashboardMetricsGrid,
  OrgDashboardCareerTracks,
  OrgDashboardParticipantsTable,
} from "./org-dashboard";

export default function OrganizationDashboard({
  isInteractive = false,
  orgName,
  seats,
}: OrganizationDashboardProps = {}) {
  const [activeNav, setActiveNav] = useState("overview");
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredParticipants = useMemo(() => {
    return PARTICIPANTS.filter((p) => {
      const matchesTrack =
        selectedTrack === "all" || p.track === selectedTrack;
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.track.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTrack && matchesSearch;
    });
  }, [selectedTrack, searchQuery]);

  return (
    <section className="relative w-full py-10 sm:py-14 bg-black text-slate-100 font-sans border-y border-white/10 overflow-hidden select-none">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-xs text-orange-400 font-medium mb-3.5"
          >
            <span>FOR SCHOOLS & ORGANIZATIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight uppercase"
          >
            ORGANIZATION <span className="text-orange-400">DASHBOARD</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-sm sm:text-base text-white/60 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Monitor participant engagement, active learning metrics, and career
            track participation in real time.
          </motion.p>
        </div>

        {/* Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn(
            "bg-[#0a0b10] rounded-xl border border-white/15 overflow-hidden",
            !isInteractive && "select-none pointer-events-none"
          )}
        >
          {/* Window Chrome Header */}
          <OrgDashboardWindowChrome />

          {/* Inner Layout: Sidebar + Main Workspace */}
          <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar */}
            <OrgDashboardSidebar
              orgName={orgName}
              seats={seats}
              activeNav={activeNav}
              onSelectNav={setActiveNav}
              isInteractive={isInteractive}
            />

            {/* Main Workspace */}
            <main className="flex-1 p-4 sm:p-5 space-y-4 bg-[#0a0b10] overflow-y-auto">
              {/* Workspace Top Search Bar */}
              <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-white/10">
                <div className="relative max-w-sm w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter participant or track..."
                    readOnly={!isInteractive}
                    tabIndex={isInteractive ? 0 : -1}
                    className="w-full bg-black/60 border border-white/10 rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/25 transition-colors leading-normal"
                  />
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-7 h-7 rounded-full object-cover border border-white/20"
                  />
                </div>
              </div>

              {/* Metrics Grid */}
              <OrgDashboardMetricsGrid />

              {/* Two-Column Workspace Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
                {/* Career Track Participation */}
                <OrgDashboardCareerTracks
                  selectedTrack={selectedTrack}
                  onSelectTrack={(trackName) =>
                    setSelectedTrack((prev) =>
                      prev === trackName ? "all" : trackName
                    )
                  }
                />

                {/* Participant Progress Table */}
                <OrgDashboardParticipantsTable
                  participants={filteredParticipants}
                  selectedTrack={selectedTrack}
                  onSelectTrack={setSelectedTrack}
                />
              </div>
            </main>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
