"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Award, Bell, Building2, Check, Shield } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";
import { Badge, Button } from "../ui";

/** Bell button + dark dropdown with org invites (same data as the org dashboard menu). */
export function NotificationsMenu() {
  const { session, acceptInvitation, declineInvitation, markAllNotificationsAsRead, switchWorkspace } = useAccount();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const notifications = session.notifications || [];
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const switchToOrg = (orgName: string, role: string) => {
    switchWorkspace(`ws-${orgName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${role}`);
    setOpen(false);
    router.push("/");
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        aria-expanded={open}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
          open ? "border-white/30 text-white" : "border-white/10 text-zinc-300 hover:border-white/30 hover:text-white",
        )}
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-semibold text-black">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-2 shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between px-3 pb-2 pt-1.5">
            <p className="text-sm font-medium text-white">Notifications</p>
            {unread > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="text-xs text-zinc-400 transition-colors hover:text-orange-400"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[380px] space-y-1 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="py-10 text-center text-sm text-zinc-500">You&apos;re all caught up.</p>
            )}
            {notifications.map((n) => {
              const Icon = n.type === "org_invite_admin" ? Shield : n.type === "org_invite_member" ? Building2 : Award;
              return (
                <div key={n.id} className={cn("rounded-xl p-3", !n.read ? "bg-white/[0.05]" : "opacity-70")}>
                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-sm font-medium text-white">{n.orgName}</span>
                        <Badge tone={n.invitedRole === "admin" ? "blue" : "neutral"} className="px-2 py-0.5">
                          {n.invitedRole === "admin" ? "Admin invite" : "Member invite"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-400">{n.message}</p>
                      <p className="mt-1 text-xs text-zinc-600">{n.timestamp}</p>

                      {n.type.startsWith("org_invite") && (
                        <div className="mt-3">
                          {n.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="white" onClick={() => acceptInvitation(n.id)}>
                                <Check className="h-4 w-4" />
                                Accept
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => declineInvitation(n.id)}>
                                Decline
                              </Button>
                            </div>
                          )}
                          {n.status === "accepted" && (
                            <button
                              type="button"
                              onClick={() => switchToOrg(n.orgName, n.invitedRole)}
                              className="inline-flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300"
                            >
                              Switch into {n.orgName}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {n.status === "declined" && <p className="text-xs text-zinc-600">Invitation declined</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
