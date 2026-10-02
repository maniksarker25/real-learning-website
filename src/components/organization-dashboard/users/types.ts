import { OrgRole } from "@/types/account";

export interface SkillsBreakdown {
  communication: number;
  deEscalation: number;
  diagnostics: number;
  empathy: number;
}

export interface CompletedClassHistory {
  title: string;
  score: string;
  date: string;
}

export interface UserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: OrgRole;
  track: string;
  trackColor: string;
  enrolledClasses: number;
  progress: number;
  score: string;
  status: "Active" | "Pending" | "Suspended";
  skillsBreakdown?: SkillsBreakdown;
  completedClassesHistory?: CompletedClassHistory[];
}
