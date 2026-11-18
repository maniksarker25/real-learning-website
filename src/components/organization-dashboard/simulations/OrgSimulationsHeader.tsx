import { memo } from "react";
import { PageHeader } from "@/components/dashboard/ui";

interface OrgSimulationsHeaderProps {
  averageScore?: string;
}

export const OrgSimulationsHeader = memo(function OrgSimulationsHeader({
  averageScore = "92.2%",
}: OrgSimulationsHeaderProps) {
  return (
    <PageHeader
      eyebrow="Simulations"
      title="Team simulations"
      description="Completed practice sessions from your team, with scores and full transcripts."
      actions={
        <div className="rounded-2xl border border-white/[0.06] bg-[#181818] px-5 py-3 text-right">
          <p className="text-sm text-zinc-400">Team average</p>
          <p className="text-2xl font-semibold tracking-[-0.02em] text-emerald-400 tabular-nums">{averageScore}</p>
        </div>
      }
    />
  );
});
