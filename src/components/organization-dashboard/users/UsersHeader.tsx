"use client";

import { memo } from "react";
import { UserPlus } from "lucide-react";
import type { OrgRole } from "@/types/account";
import { Button, PageHeader } from "@/components/dashboard/ui";

interface UsersHeaderProps {
  currentOrgRole: OrgRole;
  onOpenInviteModal: () => void;
}

export const UsersHeader = memo(function UsersHeader({ currentOrgRole, onOpenInviteModal }: UsersHeaderProps) {
  const isOwner = currentOrgRole === "owner";

  return (
    <PageHeader
      eyebrow={isOwner ? "Owner view" : "Admin view"}
      title="Members & roles"
      description={
        isOwner
          ? "Manage everyone in your workspace: roles, ownership and simulation progress."
          : "Invite and manage members, assign tracks and review simulation scores."
      }
      actions={
        <Button onClick={onOpenInviteModal}>
          <UserPlus className="h-4 w-4" />
          Invite member
        </Button>
      }
    />
  );
});
