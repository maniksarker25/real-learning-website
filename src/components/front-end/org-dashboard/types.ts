export interface OrganizationDashboardProps {
  isInteractive?: boolean;
  orgName?: string;
  seats?: string;
}

export interface Participant {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string;
  track: string;
  status: "Certified" | "In Progress" | "Completed" | "Active";
  progress: number;
  score: string;
}

export interface CareerTrack {
  id: string;
  name: string;
  count: number;
  percentage: number;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  change: string;
}

export const TRACK_FILTER_OPTIONS = [
  { id: "all", label: "All Tracks" },
  { id: "Customer Service", label: "Customer Service" },
  { id: "Tech Support", label: "Tech Support" },
  { id: "IT Specialist", label: "IT Specialist" },
  { id: "Healthcare Support", label: "Healthcare" },
] as const;
