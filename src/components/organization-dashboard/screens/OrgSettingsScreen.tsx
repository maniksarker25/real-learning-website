"use client";

import React, { useState, useCallback, memo } from "react";
import {
  Settings,
  Building2,
  Mail,
  Key,
  CheckCircle2,
  ShieldCheck,
  Crown,
  Shield,
  Lock,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";
import { OrgRole } from "@/types/account";

export const OrgSettingsScreen = memo(function OrgSettingsScreen() {
  const { session, loginAsOrganization } = useAccount();
  const currentOrgRole: OrgRole = session.orgRole || "owner";
  const isOwner = currentOrgRole === "owner";

  const [orgName, setOrgName] = useState(session.orgName || "Acme Corp");
  const [email, setEmail] = useState(session.email || "admin@acmecorp.com");
  const [seats, setSeats] = useState(session.seats || "25");
  const [saved, setSaved] = useState(false);

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loginAsOrganization({ orgName, email, seats, orgRole: currentOrgRole });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
    [loginAsOrganization, orgName, email, seats, currentOrgRole]
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border",
                isOwner
                  ? "bg-amber-500/10 text-amber-300 border-amber-400/30"
                  : "bg-blue-500/10 text-blue-300 border-blue-400/30"
              )}
            >
              {isOwner ? (
                <>
                  <Crown className="w-3 h-3 text-amber-400" />
                  <span>Owner Role</span>
                </>
              ) : (
                <>
                  <Shield className="w-3 h-3 text-blue-400" />
                  <span>Admin Role</span>
                </>
              )}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-400" />
            <span>Organization Workspace Settings</span>
          </h2>
          <p className="text-xs text-white/60">
            {isOwner
              ? "Full control over organization credentials, seat allocations, billing, and access keys."
              : "View workspace details and track configurations. Billing and seat quota are restricted to Owner."}
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Organization settings updated successfully!</span>
        </div>
      )}

      {/* Admin Notice if not Owner */}
      {!isOwner && (
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-400/30 text-blue-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">
              Admin Access Level
            </span>
            You are logged in as an <strong>Organization Admin</strong>. You have permissions to invite members, assign simulations, and review performance. Upgrading seats, managing billing, and transferring ownership are reserved for the <strong>Owner</strong>.
          </div>
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
                disabled={!isOwner}
                className={cn(
                  "w-full border rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/40 transition-colors",
                  isOwner
                    ? "bg-black/60 border-white/10 focus:outline-none focus:border-orange-400"
                    : "bg-white/[0.02] border-white/5 text-white/60 cursor-not-allowed"
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/80 mb-2">
              Primary Contact Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isOwner}
                className={cn(
                  "w-full border rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/40 transition-colors",
                  isOwner
                    ? "bg-black/60 border-white/10 focus:outline-none focus:border-orange-400"
                    : "bg-white/[0.02] border-white/5 text-white/60 cursor-not-allowed"
                )}
              />
            </div>
          </div>
        </div>

        {/* Seat Allocation Package */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-white/80">
              Active Seat Allocation & Pilot Tier
            </label>
            {!isOwner && (
              <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-mono">
                <Lock className="w-3 h-3" />
                <span>Owner Managed</span>
              </span>
            )}
          </div>

          {isOwner ? (
            <select
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-400 transition-colors"
            >
              <option value="10">10 Seats (Starter Pilot)</option>
              <option value="25">25 Seats (Team Pilot - Standard)</option>
              <option value="50">50 Seats (Growth Scale Pilot)</option>
              <option value="100+">100+ Enterprise Unlimited Seats</option>
            </select>
          ) : (
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-white">
                <CreditCard className="w-4 h-4 text-orange-400" />
                <span className="font-bold">{seats} Seats Enrolled (Active Team Pilot)</span>
              </div>
              <span className="text-[11px] text-white/40">Read-Only</span>
            </div>
          )}
        </div>

        {/* License Key Section */}
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

        {isOwner && (
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Save Workspace Settings</span>
          </button>
        )}
      </form>
    </div>
  );
});

