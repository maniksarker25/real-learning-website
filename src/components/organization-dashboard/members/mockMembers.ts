import { MemberUserItem } from "./types";

export function getInitialMembers(): MemberUserItem[] {
  return [
    {
      id: "u1",
      name: "Sarah Jenkins",
      email: "sarah.j@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
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
      track: "Tech Support",
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
      track: "IT Specialist",
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
      track: "Customer Service",
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
    {
      id: "u5",
      name: "Liam O'Connor",
      email: "liam.o@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      track: "Healthcare Support",
      enrolledClasses: 2,
      progress: 45,
      score: "81%",
      status: "Active",
      skillsBreakdown: {
        communication: 80,
        deEscalation: 78,
        diagnostics: 82,
        empathy: 84,
      },
      completedClassesHistory: [
        {
          title: "Patient Intake & Empathetic Communication",
          score: "81%",
          date: "Aug 16, 2026",
        },
      ],
    },
  ];
}
