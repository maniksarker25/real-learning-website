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
      router.push("/");
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
            ? "bg-orange-100 text-orange-900 border-orange-300"
            : "bg-stone-100 hover:bg-stone-200/80 border-stone-200 text-stone-700 hover:text-stone-900"
        )}
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-mono font-bold text-[9px] flex items-center justify-center shadow-xs animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 z-50 bg-white border border-stone-200/90 rounded-2xl shadow-xl p-3 space-y-3 animate-in fade-in slide-in-from-top-2 text-stone-900">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 px-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-stone-900">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-100 text-orange-900 border border-orange-200">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="text-[10px] text-orange-700 hover:text-orange-900 font-bold hover:underline cursor-pointer"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-0.5">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-400">
                No notifications right now.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "p-3 rounded-xl border text-xs space-y-2 transition-colors",
                    !notif.read
                      ? "bg-orange-50/50 border-orange-200"
                      : "bg-stone-50 border-stone-200 opacity-80"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      {/* Icon */}
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                          notif.type === "org_invite_admin"
                            ? "bg-blue-100 text-blue-700"
                            : notif.type === "org_invite_member"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-emerald-100 text-emerald-700"
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
                          <span className="font-bold text-stone-900 text-xs">
                            {notif.orgName}
                          </span>
                          <span
                            className={cn(
                              "text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase",
                              notif.invitedRole === "admin"
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : "bg-purple-100 text-purple-800 border border-purple-200"
                            )}
                          >
                            {notif.invitedRole === "admin"
                              ? "Admin Invite"
                              : "Member Invite"}
                          </span>
                          {notif.careerTrack && (
                            <span className="text-[9px] font-mono text-stone-600 bg-stone-100 border border-stone-200 px-1.5 py-0.2 rounded">
                              {notif.careerTrack}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                          {notif.message}
                        </p>

                        <div className="text-[10px] text-stone-400 font-mono pt-0.5">
                          {notif.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions for Invites */}
                  {notif.type.startsWith("org_invite") && (
                    <div className="pt-1.5 border-t border-stone-200 flex items-center justify-between gap-2">
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
                            className="flex-1 py-1.5 px-3 rounded-lg bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                          >
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Accept {notif.invitedRole === "admin" ? "Admin" : "Member"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDecline(notif.id)}
                            className="py-1.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Decline
                          </button>
                        </>
                      ) : notif.status === "accepted" ? (
                        <div className="w-full flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-emerald-800 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
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
                            className="text-[11px] font-bold text-orange-700 hover:text-orange-900 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Switch into {notif.orgName}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono text-stone-400">
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
