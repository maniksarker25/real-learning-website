import { memo } from "react";
import { Segmented } from "@/components/dashboard/ui";

interface RecentSimulationsFilterTabsProps {
  activeFilter: string;
  onSelectFilter: (filterId: string) => void;
}

const FILTER_OPTIONS = [
  { value: "all", label: "All tracks" },
  { value: "Customer Service", label: "Customer Service" },
  { value: "Tech Support", label: "Tech Support" },
  { value: "IT Specialist", label: "IT Specialist" },
  { value: "Healthcare Support", label: "Healthcare" },
];

export const RecentSimulationsFilterTabs = memo(function RecentSimulationsFilterTabs({
  activeFilter,
  onSelectFilter,
}: RecentSimulationsFilterTabsProps) {
  return (
    <Segmented label="Filter by career track" options={FILTER_OPTIONS} value={activeFilter} onChange={onSelectFilter} />
  );
});
