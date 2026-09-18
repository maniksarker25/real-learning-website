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
    [loginAsOrganization, orgName, email, seats, currentOrgRole],
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border font-mono",
                isOwner
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-blue-50 text-blue-800 border-blue-200",
              )}
            >
              {isOwner ? (
                <>
                  <Crown className="w-3 h-3 text-amber-600" />
                  <span>Owner Role</span>
                </>
              ) : (
                <>
                  <Shield className="w-3 h-3 text-blue-600" />
                  <span>Admin Role</span>
                </>
              )}
            </span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-600" />
            <span>Organization Workspace Settings</span>
          </h2>
          <p className="text-xs text-stone-500">
            {isOwner
              ? "Full control over organization credentials, seat allocations, billing, and access keys."
              : "View workspace details and track configurations. Billing and seat quota are restricted to Owner."}
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Organization settings updated successfully!</span>
        </div>
      )}

      {/* Admin Notice if not Owner */}
      {!isOwner && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-stone-900 block mb-0.5">
              Admin Access Level
            </span>
            You are logged in as an <strong>Organization Admin</strong>. You
            have permissions to invite members, assign simulations, and review
            performance. Upgrading seats, managing billing, and transferring
            ownership are reserved for the <strong>Owner</strong>.
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 1: Organization Profile Details */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-600" />
                <span>Workspace Information</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Primary organization branding and administrative contact details.
              </p>
            </div>
            <span className="text-[10px] font-mono text-stone-500 font-semibold uppercase bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
              Workspace Profile
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                Organization Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  disabled={!isOwner}
                  placeholder="e.g. Acme Corporation"
                  className={cn(
                    "w-full border rounded-xl pl-10 pr-4 py-2.5 text-xs transition-colors",
                    isOwner
                      ? "bg-white border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500"
                      : "bg-stone-100 border-stone-200 text-stone-500 cursor-not-allowed"
                  )}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                Primary Billing / Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isOwner}
                  placeholder="admin@company.com"
                  className={cn(
                    "w-full border rounded-xl pl-10 pr-4 py-2.5 text-xs transition-colors",
                    isOwner
                      ? "bg-white border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500"
                      : "bg-stone-100 border-stone-200 text-stone-500 cursor-not-allowed"
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Seat Allocation & Tier */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-orange-600" />
                <span>Seat Allocation & Pilot Tier</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Current active seat capacity and plan management for your team learners.
              </p>
            </div>
            {!isOwner && (
              <span className="inline-flex items-center gap-1 text-[10px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 font-mono font-bold">
                <Lock className="w-3 h-3" />
                <span>Owner Managed</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#FCFAF6] border border-stone-200 space-y-2">
              <div className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
                CURRENT PLAN CAPACITY
              </div>
              <div className="text-2xl font-black text-stone-900 font-mono">
                {seats} Seats Allocated
              </div>
              <div className="text-xs text-stone-500">
                Enterprise Pilot with real-time AI simulation scoring
              </div>
            </div>

            <div className="space-y-2 flex flex-col justify-center">
              <label className="block text-xs font-semibold text-stone-700">
                Change Seat Allocation
              </label>
              {isOwner ? (
                <select
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-orange-500 transition-colors font-medium"
                >
                  <option value="10">10 Seats (Starter Pilot)</option>
                  <option value="25">25 Seats (Team Pilot - Standard)</option>
                  <option value="50">50 Seats (Growth Scale Pilot)</option>
                  <option value="100+">100+ Enterprise Unlimited Seats</option>
                </select>
              ) : (
                <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-500 text-xs font-mono">
                  {seats} Seats Enrolled (Owner permission required to modify)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 3: Pilot License Key */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-orange-600" />
                <span>Onboarding License & Secret Key</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Share this license key with new learners during workspace registration.
              </p>
            </div>
            <span className="font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 text-[10px]">
              VERIFIED ACTIVE
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FCFAF6] border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-stone-500 font-semibold uppercase">
                ORGANIZATION PILOT KEY
              </span>
              <span className="text-[10px] text-stone-400 font-mono">256-bit encrypted</span>
            </div>
            <div className="font-mono text-xs font-bold text-stone-900 bg-white p-3 rounded-lg border border-stone-200 select-all truncate">
              RL-ORG-2026-PILOT-8F923-KEY-ENCRYPTED
            </div>
          </div>
        </div>

        {isOwner && (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>Save Workspace Settings</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
});
