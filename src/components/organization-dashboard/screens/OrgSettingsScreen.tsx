"use client";

import React, { useState, useCallback, memo } from "react";
import { Settings, Building2, Mail, Key, CheckCircle2, ShieldCheck } from "lucide-react";
import { useAccount } from "@/context/AccountContext";

export const OrgSettingsScreen = memo(function OrgSettingsScreen() {
  const { session, loginAsOrganization } = useAccount();
  const [orgName, setOrgName] = useState(session.orgName || "Acme Corp");
  const [email, setEmail] = useState(session.email || "admin@acmecorp.com");
  const [seats, setSeats] = useState(session.seats || "25");
  const [saved, setSaved] = useState(false);

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loginAsOrganization({ orgName, email, seats });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
    [loginAsOrganization, orgName, email, seats]
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-orange-400" />
          <span>Organization Workspace Settings</span>
        </h2>
        <p className="text-xs text-white/60">
          Manage your organization name, administrator email, seat quota package, and enterprise onboarding keys.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Organization settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#12131c]/90 rounded-2xl p-6 border border-white/10 shadow-lg space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-2">
              Organization Name
            </label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/80 mb-2">
              Admin Work Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-white/80 mb-2">
            Active Seat Allocation Package
          </label>
          <select
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-400 transition-colors"
          >
            <option value="10">10 Seats (Starter Pilot)</option>
            <option value="25">25 Seats (Team Pilot)</option>
            <option value="50">50 Seats (Growth Pilot)</option>
            <option value="100+">100+ Enterprise Seats</option>
          </select>
        </div>

        <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span className="flex items-center gap-2">
              <Key className="w-4 h-4 text-orange-400" />
              <span>Pilot Onboarding License Key</span>
            </span>
            <span className="font-mono text-emerald-400 font-bold">ACTIVE</span>
          </div>
          <p className="text-[11px] font-mono text-white/50 bg-black p-2.5 rounded-lg border border-white/5 truncate">
            RL-ORG-2026-PILOT-8F923-KEY-ENCRYPTED
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Save Workspace Settings</span>
        </button>
      </form>
    </div>
  );
});
