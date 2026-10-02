import { Metric, CareerTrack, Participant } from "./types";

export const METRICS: Metric[] = [
  {
    id: "total-participants",
    label: "Total Participants",
    value: "1,248",
    change: "+14.2%",
  },
  {
    id: "total-simulations-completed",
    label: "Total Simulations Completed",
    value: "3,842",
    change: "+342 this week",
  },
  {
    id: "simulation-completion",
    label: "Simulation Completion Rate",
    value: "88.5%",
    change: "+5.2% mastery",
  },
];

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: "customer-service",
    name: "Customer Service",
    count: 380,
    percentage: 38,
  },
  {
    id: "tech-support",
    name: "Tech Support",
    count: 290,
    percentage: 29,
  },
  {
    id: "it-specialist",
    name: "IT Specialist",
    count: 210,
    percentage: 21,
  },
  {
    id: "healthcare-support",
    name: "Healthcare Support",
    count: 160,
    percentage: 16,
  },
];

export const PARTICIPANTS: Participant[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior Agent",
    email: "s.jenkins@acme.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    track: "Customer Service",
    status: "Completed",
    progress: 94,
    score: "96%",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Tier 2 Support",
    email: "d.chen@acme.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    track: "Tech Support",
    status: "In Progress",
    progress: 78,
    score: "88%",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Systems Analyst",
    email: "e.rostova@acme.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    track: "IT Specialist",
    status: "In Progress",
    progress: 64,
    score: "85%",
  },
  {
    id: 4,
    name: "Marcus Vance",
    role: "Clinical Care",
    email: "m.vance@acme.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    track: "Healthcare Support",
    status: "Active",
    progress: 45,
    score: "79%",
  },
  {
    id: 5,
    name: "Aisha Khan",
    role: "Lead Specialist",
    email: "a.khan@acme.com",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    track: "Customer Service",
    status: "Certified",
    progress: 98,
    score: "94%",
  },
];
