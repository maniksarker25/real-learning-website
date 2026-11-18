"use client";

import { memo } from "react";
import { UserPlus } from "lucide-react";
import { Button, PageHeader } from "@/components/dashboard/ui";

interface MembersHeaderProps {
  onOpenInviteModal: () => void;
}

export const MembersHeader = memo(function MembersHeader({ onOpenInviteModal }: MembersHeaderProps) {
  return (
    <PageHeader
      eyebrow="Members"
      title="Your team"
      description="See how each learner is doing, follow their progress and manage access."
      actions={
        <Button onClick={onOpenInviteModal}>
          <UserPlus className="h-4 w-4" />
          Invite member
        </Button>
      }
    />
  );
});
