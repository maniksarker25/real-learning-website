import { UserItem } from "./types";

export function getInitialUsers(
  sessionName?: string,
  sessionEmail?: string
): UserItem[] {
  return [
    {
      id: "u-owner",
      name: sessionName || "Hosain Ali (You)",
      email: sessionEmail || "hosain.owner@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "owner",
      track: "Executive Ops",
      trackColor: "bg-amber-50 text-amber-800 border-amber-200",
      enrolledClasses: 6,
      progress: 100,
      score: "99%",
      status: "Active",
      skillsBreakdown: {
        communication: 99,
        deEscalation: 98,
        diagnostics: 97,
        empathy: 99,
      },
      completedClassesHistory: [
        {
          title: "Strategic Leadership & Conflict Negotiation",
          score: "99%",
          date: "Aug 24, 2026",
        },
        {
          title: "Team Performance Coaching & SLA Delivery",
          score: "98%",
          date: "Aug 20, 2026",
        },
      ],
    },
    {
      id: "u-admin-1",
      name: "Marcus Vance",
      email: "marcus.admin@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      role: "admin",
      track: "Tech Support",
      trackColor: "bg-blue-50 text-blue-800 border-blue-200",
      enrolledClasses: 4,
      progress: 92,
      score: "94%",
      status: "Active",
      skillsBreakdown: {
        communication: 92,
        deEscalation: 90,
        diagnostics: 96,
        empathy: 91,
      },
      completedClassesHistory: [
        {
          title: "Enterprise Incident Response Protocol",
          score: "96%",
          date: "Aug 22, 2026",
        },
        {
          title: "Technical Leadership & Triage",
          score: "93%",
          date: "Aug 17, 2026",
        },
      ],
    },
    {
      id: "u1",
      name: "Sarah Jenkins",
      email: "sarah.j@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      role: "member",
      track: "Customer Service",
      trackColor: "bg-orange-50 text-orange-800 border-orange-200",
      enrolledClasses: 4,
      progress: 94,
      score: "96%",
      status: "Active",
      skillsBreakdown: {
        communication: 98,
        deEscalation: 96,
        diagnostics: 90,
        empathy: 97,
      },
      completedClassesHistory: [
        {
          title: "De-escalating High-Pressure Customer Complaints",
          score: "96%",
          date: "Aug 21, 2026",
        },
        {
          title: "Active Listening & Echo Statements",
          score: "95%",
          date: "Aug 18, 2026",
        },
        {
          title: "Omnichannel Chat & Support Protocol",
          score: "94%",
          date: "Aug 14, 2026",
        },
      ],
    },
    {
      id: "u2",
      name: "David Chen",
      email: "david.c@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "member",
      track: "Tech Support",
      trackColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      enrolledClasses: 3,
      progress: 78,
      score: "88%",
      status: "Active",
      skillsBreakdown: {
        communication: 86,
        deEscalation: 84,
        diagnostics: 92,
        empathy: 88,
      },
      completedClassesHistory: [
        {
          title: "L1 Technical Troubleshooting & Diagnostics",
          score: "88%",
          date: "Aug 20, 2026",
        },
        {
          title: "Remote Desktop SLA Management",
          score: "87%",
          date: "Aug 15, 2026",
        },
      ],
    },
    {
      id: "u3",
      name: "Elena Rostova",
      email: "elena.r@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "member",
      track: "IT Specialist",
      trackColor: "bg-rose-50 text-rose-800 border-rose-200",
      enrolledClasses: 3,
      progress: 64,
      score: "85%",
      status: "Active",
      skillsBreakdown: {
        communication: 82,
        deEscalation: 80,
        diagnostics: 90,
        empathy: 85,
      },
      completedClassesHistory: [
        {
          title: "Enterprise Network Security & Incident Response",
          score: "85%",
          date: "Aug 19, 2026",
        },
      ],
    },
    {
      id: "u4",
      name: "Aisha Khan",
      email: "aisha.k@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      role: "member",
      track: "Customer Service",
      trackColor: "bg-orange-50 text-orange-800 border-orange-200",
      enrolledClasses: 5,
      progress: 98,
      score: "94%",
      status: "Active",
      skillsBreakdown: {
        communication: 95,
        deEscalation: 94,
        diagnostics: 92,
        empathy: 96,
      },
      completedClassesHistory: [
        {
          title: "De-escalating High-Pressure Customer Complaints",
          score: "94%",
          date: "Aug 22, 2026",
        },
        {
          title: "Active Listening & Echo Statements",
          score: "95%",
          date: "Aug 19, 2026",
        },
      ],
    },
  ];
}
