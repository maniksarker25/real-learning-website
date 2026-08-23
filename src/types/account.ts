export type AccountType = "individual" | "organization";

export interface AccountOption {
  id: AccountType;
  title: string;
  badgeText: string;
  description: string;
  ctaText: string;
  route: string;
  features: string[];
  flowSteps: string[];
}

export interface IndividualOnboardingState {
  accountType: "individual";
  goal?: string;
  selectedSkills?: string[];
}

export interface OrganizationOnboardingState {
  accountType: "organization";
  orgName?: string;
  workEmail?: string;
  seats?: string;
  programGoal?: string;
}
