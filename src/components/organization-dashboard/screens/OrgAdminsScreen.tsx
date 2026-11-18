"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { CheckCircle2, Crown, ShieldCheck, UserPlus, X } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { OrgRole } from "@/types/account";
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  EmptyState,
  Field,
  Input,
  Modal,
  PageHeader,
  Select,
  Toast,
} from "@/components/dashboard/ui";
import { RoleBadge, SearchInput, StatusBadge, thClass } from "../users";

interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "owner" | "admin";
  title: string;
  department: string;
  addedDate: string;
  status: "Active" | "Pending" | "Suspended";
}

export const OrgAdminsScreen = memo(function OrgAdminsScreen() {
  const { session } = useAccount();
  const currentOrgRole: OrgRole = session.orgRole || "owner";
  const isOwner = currentOrgRole === "owner";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  // Invite modal state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteDepartment, setInviteDepartment] = useState("Operations & Training");
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const [admins, setAdmins] = useState<AdminUserItem[]>([
    {
      id: "u-owner",
      name: session.name || "Hosain Ali (You)",
      email: session.email || "hosain.owner@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "owner",
      title: "Founder & Organization Owner",
      department: "Executive Leadership",
      addedDate: "Jan 15, 2026",
      status: "Active",
    },
    {
      id: "u-admin-1",
      name: "Marcus Vance",
      email: "marcus.admin@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      role: "admin",
      title: "L&D Training Director",
      department: "Human Resources / L&D",
      addedDate: "Feb 02, 2026",
      status: "Active",
    },
    {
      id: "u-admin-2",
      name: "Sophia Martinez",
      email: "sophia.m@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      role: "admin",
      title: "Customer Success Team Lead",
      department: "Support & Enablement",
      addedDate: "Mar 11, 2026",
      status: "Active",
    },
  ]);

  const filteredAdmins = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return admins.filter((admin) => {
      const matchesSearch =
        admin.name.toLowerCase().includes(q) ||
        admin.email.toLowerCase().includes(q) ||
        admin.department.toLowerCase().includes(q);
      const matchesStatus = selectedStatusFilter === "all" || admin.status === selectedStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [admins, searchTerm, selectedStatusFilter]);

  const handleRemoveAdmin = useCallback(
    (adminId: string, adminName: string) => {
      setAdmins((prev) => prev.filter((a) => a.id !== adminId));
      showToast(`${adminName} removed from organization administrators.`);
    },
    [showToast],
  );

  const handleInviteSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newAdmin: AdminUserItem = {
        id: `u-admin-${Date.now()}`,
        name: inviteName,
        email: inviteEmail,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        role: "admin",
        title: "Training Administrator",
        department: inviteDepartment,
        addedDate: "Just now",
        status: "Pending",
      };

      setAdmins((prev) => [...prev, newAdmin]);
      setInviteSuccess(true);
      setTimeout(() => {
        setInviteSuccess(false);
        setIsInviteModalOpen(false);
        setInviteName("");
        setInviteEmail("");
        showToast(`Admin invite sent to ${inviteName}`);
      }, 1500);
    },
    [inviteName, inviteEmail, inviteDepartment, showToast],
  );

  if (!isOwner) {
    return (
      <Card className="mx-auto my-8 max-w-lg text-center sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300">
          <Crown className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-xl font-semibold text-white">Only the owner manages admins</h1>
        <p className="mx-auto mt-2 max-w-sm text-base text-zinc-400">
          As an admin you can still manage members, review simulations and follow team progress.
        </p>
        <ButtonLink href="/organization-dashboard/members" variant="white" className="mt-6">
          Go to members
        </ButtonLink>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Toast message={toastMessage} />

      <PageHeader
        eyebrow="Owner view"
        title="Administrators"
        description="Invite team leads and manage who can run your workspace."
        actions={
          <Button onClick={() => setIsInviteModalOpen(true)}>
            <UserPlus className="h-4 w-4" />
            Invite admin
          </Button>
        }
      />

      <div className="grid gap-2 sm:grid-cols-[1fr_200px]">
        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search by name, email or department" />
        <Select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending invite</option>
          <option value="Suspended">Suspended</option>
        </Select>
      </div>

      <Card className="overflow-hidden p-0 sm:p-0">
        {filteredAdmins.length === 0 ? (
          <EmptyState title="No admins found" description="Try a different search or filter." />
        ) : (
          <>
            {/* desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse">
                <thead className="border-b border-white/[0.06]">
                  <tr>
                    <th className={thClass}>Administrator</th>
                    <th className={thClass}>Role</th>
                    <th className={thClass}>Department</th>
                    <th className={thClass}>Added</th>
                    <th className={thClass}>Status</th>
                    <th className={`${thClass} text-right`}>Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-5 py-4">
                        <AdminIdentity admin={admin} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <RoleBadge role={admin.role} />
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-white">{admin.department}</p>
                        <p className="text-sm text-zinc-500">{admin.title}</p>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-zinc-400">{admin.addedDate}</td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <StatusBadge status={admin.status} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <AdminAction admin={admin} onRemove={handleRemoveAdmin} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* mobile cards */}
            <div className="divide-y divide-white/[0.06] md:hidden">
              {filteredAdmins.map((admin) => (
                <div key={admin.id} className="space-y-4 p-5">
                  <AdminIdentity admin={admin} />
                  <div className="flex flex-wrap gap-2">
                    <RoleBadge role={admin.role} />
                    <StatusBadge status={admin.status} />
                  </div>
                  <div className="text-sm">
                    <p className="text-white">{admin.department}</p>
                    <p className="text-zinc-500">
                      {admin.title} · Added {admin.addedDate}
                    </p>
                  </div>
                  <AdminAction admin={admin} onRemove={handleRemoveAdmin} />
                </div>
              ))}
            </div>
          </>
        )}
      </Card>

      <Modal
        open={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite an admin"
        className="max-w-lg"
      >
        {inviteSuccess ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
            <p className="mt-3 text-lg font-medium text-white">Invite sent</p>
            <p className="mt-1 text-sm text-zinc-400">{inviteName} was invited as an admin.</p>
          </div>
        ) : (
          <form onSubmit={handleInviteSubmit} className="space-y-5">
            <Field label="Full name">
              <Input
                required
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="e.g. Rachel Adams"
              />
            </Field>
            <Field label="Work email">
              <Input
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="rachel@company.com"
              />
            </Field>
            <Field label="Department">
              <Input
                required
                value={inviteDepartment}
                onChange={(e) => setInviteDepartment(e.target.value)}
                placeholder="e.g. Operations & Support"
              />
            </Field>
            <div className="flex gap-3 rounded-2xl bg-sky-500/10 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
              <p className="text-sm leading-relaxed text-zinc-300">
                Admins can manage members and assign simulations. Billing and seats stay with the owner.
              </p>
            </div>
            <Button type="submit" variant="white" size="lg" className="w-full">
              Send admin invite
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
});

function AdminIdentity({ admin }: { admin: AdminUserItem }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={admin.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
      <div className="min-w-0">
        <p className="flex items-center gap-2 truncate text-base font-medium text-white">
          {admin.name}
          {admin.id === "u-owner" && <Badge className="px-2 py-0.5">You</Badge>}
        </p>
        <p className="truncate text-sm text-zinc-500">{admin.email}</p>
      </div>
    </div>
  );
}

function AdminAction({ admin, onRemove }: { admin: AdminUserItem; onRemove: (id: string, name: string) => void }) {
  if (admin.role === "owner") return <span className="text-sm text-zinc-500">Protected</span>;
  return (
    <Button size="sm" variant="danger" onClick={() => onRemove(admin.id, admin.name)}>
      <X className="h-4 w-4" />
      Remove
    </Button>
  );
}
