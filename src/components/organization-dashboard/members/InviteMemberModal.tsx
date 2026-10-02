"use client";

import React, { memo, useState, useCallback } from "react";
import { X, UserPlus, CheckCircle2 } from "lucide-react";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (member: { name: string; email: string; track: string }) => void;
}

export const InviteMemberModal = memo(function InviteMemberModal({
  isOpen,
  onClose,
  onInvite,
}: InviteMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState("Customer Service");
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onInvite({ name, email, track });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setEmail("");
        onClose();
      }, 1500);
    },
    [name, email, track, onInvite, onClose]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-xl p-6 space-y-4 text-left">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 leading-tight">
              Invite Team Member
            </h3>
            <p className="text-xs text-stone-500">
              Assign a career track for onboarding.
            </p>
          </div>
        </div>

        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center space-y-1.5">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
            <div className="text-sm font-bold text-stone-900">
              Invite Sent Successfully!
            </div>
            <p className="text-xs text-stone-600">
              {name} has been enrolled in the {track} track.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Participant Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full bg-stone-50 border border-stone-200 rounded-md px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-stone-400 font-medium"
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
                placeholder="sarah@acmecorp.com"
                className="w-full bg-stone-50 border border-stone-200 rounded-md px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-stone-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Assign Primary Career Track
              </label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-md px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-400 font-medium cursor-pointer"
              >
                <option value="Customer Service">Customer Service</option>
                <option value="Tech Support">Tech Support</option>
                <option value="IT Specialist">IT Specialist</option>
                <option value="Healthcare Support">Healthcare Support</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-md bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer mt-2"
            >
              Send Invitation Key
            </button>
          </form>
        )}
      </div>
    </div>
  );
});
