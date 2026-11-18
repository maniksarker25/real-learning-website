import { Crown, Search, Shield, User } from "lucide-react";
import type { OrgRole } from "@/types/account";
import { Badge, Input } from "@/components/dashboard/ui";

/** Owner / Admin / Member pill. */
export function RoleBadge({ role }: { role: OrgRole }) {
  if (role === "owner")
    return (
      <Badge tone="amber">
        <Crown className="h-3.5 w-3.5" /> Owner
      </Badge>
    );
  if (role === "admin")
    return (
      <Badge tone="blue">
        <Shield className="h-3.5 w-3.5" /> Admin
      </Badge>
    );
  return (
    <Badge>
      <User className="h-3.5 w-3.5" /> Member
    </Badge>
  );
}

/** Active / Pending / Suspended pill with a dot. */
export function StatusBadge({ status }: { status: "Active" | "Pending" | "Suspended" }) {
  const tone = status === "Active" ? "green" : status === "Suspended" ? "rose" : "amber";
  return (
    <Badge tone={tone}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  );
}

/** Search input with a leading icon. */
export function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="pl-11"
      />
    </div>
  );
}

/** Table header cell styling shared by the org tables. */
export const thClass = "px-5 py-3.5 text-left text-sm font-medium text-zinc-500";
