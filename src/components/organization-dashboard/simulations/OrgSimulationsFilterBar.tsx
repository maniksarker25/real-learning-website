import { memo } from "react";
import { Search } from "lucide-react";
import { Input, Segmented } from "@/components/dashboard/ui";

interface OrgSimulationsFilterBarProps {
  selectedTrackFilter: string;
  onSelectTrackFilter: (track: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalCount: number;
}

const TRACK_TABS = [
  { value: "Customer Service", label: "Customer Service" },
  { value: "Tech Support", label: "Tech Support" },
  { value: "IT Specialist", label: "IT Specialist" },
  { value: "Healthcare Support", label: "Healthcare" },
];

export const OrgSimulationsFilterBar = memo(function OrgSimulationsFilterBar({
  selectedTrackFilter,
  onSelectTrackFilter,
  searchTerm,
  onSearchChange,
  totalCount,
}: OrgSimulationsFilterBarProps) {
  const options = [{ value: "all", label: `All (${totalCount})` }, ...TRACK_TABS];

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <Segmented
        label="Filter by career track"
        options={options}
        value={selectedTrackFilter}
        onChange={onSelectTrackFilter}
      />
      <div className="relative w-full lg:w-72">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search member or scenario"
          aria-label="Search simulations"
          className="py-2.5 pl-10 text-sm"
        />
      </div>
    </div>
  );
});
