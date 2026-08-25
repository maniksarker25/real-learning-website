/**
 * Two Primary Roles in the Application:
 * 1. organization_owner:
 *    - The single owner of their organization.
 *    - Has full control over their organization workspace.
 *    - Manages Admins, Members, Seat Allocation, and Views Simulation logs.
 *    - Does NOT take individual simulations as a learner (cannot do normal user work).
 *    - Does NOT own multiple organizations.
 * 
 * 2. normal_user:
 *    - An individual user who uses the personal learning dashboard to practice simulations.
 *    - Can be invited into an organization as an Admin (to help manage members) or as a Member (to take simulations).
 */

export type AccountType =
  | "organization_owner"
  | "normal_user"
  | "individual" // alias for normal_user
  | "organization"; // alias for organization_owner

export type OrgRole = "owner" | "admin" | "member";

export interface AccountOption {
  id: "normal_user" | "organization_owner" | "individual" | "organization";
  title: string;
  badgeText: string;
  description: string;
  ctaText: string;
  route: string;
  features: string[];
  flowSteps: string[];
}

export interface IndividualOnboardingState {
  accountType: "normal_user" | "individual";
  name?: string;
  goal?: string;
  selectedSkills?: string[];
}

export interface OrganizationOnboardingState {
  accountType: "organization_owner" | "organization";
  orgRole?: "owner";
  orgName?: string;
  workEmail?: string;
  seats?: string;
  programGoal?: string;
}

export interface WorkspaceMembership {
  id: string;
  orgName: string;
  role: OrgRole;
  avatar?: string;
  seatsTotal?: number;
  seatsUsed?: number;
}
