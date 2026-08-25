"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Bell,
  Shield,
  Building2,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  Check,
  Award,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function NotificationDropdown() {
  const {
    session,
    acceptInvitation,
    declineInvitation,
    markAllNotificationsAsRead,
    switchWorkspace,
  } = useAccount();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = useMemo(
    () => session.notifications || [],
    [session.notifications]
  );

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleAccept = useCallback(
    (notifId: string, orgName: string, role: string) => {
      acceptInvitation(notifId);
    },
    [acceptInvitation]
  );

  const handleDecline = useCallback(
    (notifId: string) => {
      declineInvitation(notifId);
    },
    [declineInvitation]
  );

  const handleSwitchToOrg = useCallback(
    (orgName: string, role: string) => {
      const generatedId = `ws-${orgName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${role}`;
      switchWorkspace(generatedId);
      setIsOpen(false);
      if (role === "admin") {
        router.push("/organization-dashboard");
      } else {
        router.push("/user-dashboard");
      }
    },
    [switchWorkspace, router]
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "relative p-2 rounded-full border transition-colors cursor-pointer flex items-center justify-center",
          isOpen
            ? "bg-orange-500/20 text-orange-300 border-orange-400/40"
            : "bg-white/5 hover:bg-white/10 border-white/10 text-white/70 hover:text-white"
        )}
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-mono font-bold text-[9px] flex items-center justify-center shadow-md animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 z-50 bg-[#0e0f17] border border-white/15 rounded-2xl shadow-2xl p-3 space-y-3 animate-in fade-in slide-in-from-top-2">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 px-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-400/30">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="text-[10px] text-orange-400 hover:text-orange-300 hover:underline cursor-pointer"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-0.5">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-white/40">
                No notifications right now.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "p-3 rounded-xl border text-xs space-y-2 transition-colors",
                    !notif.read
                      ? "bg-white/[0.04] border-orange-400/30"
                      : "bg-black/40 border-white/5 opacity-80"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      {/* Icon */}
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                          notif.type === "org_invite_admin"
                            ? "bg-blue-500/20 text-blue-400"
                            : notif.type === "org_invite_member"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-emerald-500/20 text-emerald-400"
                        )}
                      >
                        {notif.type === "org_invite_admin" ? (
                          <Shield className="w-3.5 h-3.5" />
                        ) : notif.type === "org_invite_member" ? (
                          <Building2 className="w-3.5 h-3.5" />
                        ) : (
                          <Award className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-white text-xs">
                            {notif.orgName}
                          </span>
                          <span
                            className={cn(
                              "text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase",
                              notif.invitedRole === "admin"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-purple-500/20 text-purple-300"
                            )}
                          >
                            {notif.invitedRole === "admin"
                              ? "Admin Invite"
                              : "Member Invite"}
                          </span>
                          {notif.careerTrack && (
                            <span className="text-[9px] font-mono text-white/50 bg-white/5 px-1.5 py-0.2 rounded">
                              {notif.careerTrack}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-white/80 leading-relaxed font-normal">
                          {notif.message}
                        </p>

                        <div className="text-[10px] text-white/40 font-mono pt-0.5">
                          {notif.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions for Invites */}
                  {notif.type.startsWith("org_invite") && (
                    <div className="pt-1.5 border-t border-white/5 flex items-center justify-between gap-2">
                      {notif.status === "pending" ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              handleAccept(
                                notif.id,
                                notif.orgName,
                                notif.invitedRole
                              )
                            }
                            className="flex-1 py-1.5 px-3 rounded-lg bg-white text-black hover:bg-white/90 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5 text-black" />
                            <span>Accept {notif.invitedRole === "admin" ? "Admin" : "Member"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDecline(notif.id)}
                            className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Decline
                          </button>
                        </>
                      ) : notif.status === "accepted" ? (
                        <div className="w-full flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Accepted</span>
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleSwitchToOrg(
                                notif.orgName,
                                notif.invitedRole
                              )
                            }
                            className="text-[11px] font-bold text-orange-400 hover:text-orange-300 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Switch into {notif.orgName}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono text-white/40">
                          Invitation Declined
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
