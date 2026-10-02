"use client";

import React, { memo, useState, useCallback } from "react";
import { X, UserPlus, CheckCircle2, User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (user: {
    name: string;
    email: string;
    role: "admin" | "member";
    track: string;
  }) => void;
}

export const InviteUserModal = memo(function InviteUserModal({
  isOpen,
  onClose,
  onInvite,
}: InviteUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "member">("member");
  const [track, setTrack] = useState("Customer Service");
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onInvite({ name, email, role, track });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setEmail("");
        setRole("member");
        onClose();
      }, 1500);
    },
    [name, email, role, track, onInvite, onClose]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Invite Team Participant
            </h3>
            <p className="text-xs text-stone-500">
              Assign role and career track for onboarding.
            </p>
          </div>
        </div>

        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <div className="text-sm font-bold text-stone-900">
              Invite Sent Successfully!
            </div>
            <p className="text-xs text-stone-600">
              {name} has been invited as <strong>{role.toUpperCase()}</strong> to
              the {track} track.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Participant Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Work Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@acmecorp.com"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Role Selector (Admin vs Member) */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Assigned Organization Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("member")}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-all cursor-pointer",
                    role === "member"
                      ? "bg-orange-50 border-orange-300 text-orange-950 font-bold shadow-xs"
                      : "bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  )}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                    <User className="w-3.5 h-3.5 text-orange-600" />
                    <span>Member</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1 font-normal">
                    Learner who completes assigned simulations & classes.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-all cursor-pointer",
                    role === "admin"
                      ? "bg-blue-50 border-blue-300 text-blue-950 font-bold shadow-xs"
                      : "bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  )}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    <span>Admin</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1 font-normal">
                    Can invite members, assign simulations, and view progress.
                  </p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Assign Primary Career Track
              </label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-orange-500 font-medium"
              >
                <option value="Customer Service">Customer Service</option>
                <option value="Tech Support">Tech Support</option>
                <option value="IT Specialist">IT Specialist</option>
                <option value="Healthcare Support">Healthcare Support</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer mt-2"
            >
              Send Invitation Key
            </button>
          </form>
        )}
      </div>
    </div>
  );
});
