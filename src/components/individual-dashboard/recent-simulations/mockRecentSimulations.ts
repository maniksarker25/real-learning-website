import { RecentSimulationItem } from "./types";

export function getRecentSimulations(): RecentSimulationItem[] {
  return [
    {
      id: "r-sim-1",
      scenarioTitle: "Handling an Upset Customer Requesting Immediate Refund",
      careerTrack: "Customer Service",
      trackColor: "bg-orange-500/10 text-orange-300 border-orange-400/30",
      score: 92,
      scoreGrade: "Mastery",
      date: "Today, 2:30 PM",
      duration: "6m 20s",
      status: "Completed",
      aiPersona: {
        name: "Alex Rivera",
        role: "Frustrated VIP Customer",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      },
      skills: {
        communication: 95,
        empathy: 94,
        activeListening: 92,
        problemSolving: 90,
        conflictResolution: 89,
      },
      positiveHighlights: [
        "Immediate Emotional Validation: You validated the caller's frustration within the first 10 seconds before discussing policies.",
        "Positive Framing: Used 'What I can do right now...' instead of 'We can't...'.",
        "Explicit Action Agreement: Set a clear 2 PM email update follow-up timestamp.",
      ],
      improvementPoints: [
        "Speed of Agreement: State the specific resolution credit option ~30 seconds earlier in the interaction.",
        "Summarizing Facts: Confirm order invoice # before confirming the credit amount.",
      ],
      keyMoments: [
        {
          timestamp: "00:15",
          note: "Customer expressed anger over 5-day delay. You responded with empathy ('I completely understand how frustrating that delay is...'). Excellent tone control.",
          quality: "good",
        },
        {
          timestamp: "01:20",
          note: "Customer demanded immediate refund. You framed available credit options positively ('What I can do right now...').",
          quality: "good",
        },
        {
          timestamp: "02:10",
          note: "Opportunity missed: State invoice verification earlier to lock in protocol accuracy.",
          quality: "improve",
        },
      ],
      recommendedLessons: [
        "Lesson 4: Establishing Control & Action Agreements",
        "Lesson 3: Non-Confrontational Phrasing & Positive Framing",
      ],
      recommendedSimulations: [
        "L1 Network Diagnostics Under High SLA Pressure",
        "Omnichannel Live Chat Resolution",
      ],
    },
    {
      id: "r-sim-2",
      scenarioTitle: "Remote Office VPN Outage SLA Triage",
      careerTrack: "Tech Support",
      trackColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      score: 91,
      scoreGrade: "Proficient",
      date: "Aug 24, 11:15 AM",
      duration: "8m 45s",
      status: "Completed",
      aiPersona: {
        name: "David Vance",
        role: "Branch Manager",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      },
      skills: {
        communication: 92,
        empathy: 88,
        activeListening: 90,
        problemSolving: 96,
        conflictResolution: 89,
      },
      positiveHighlights: [
        "Fast Diagnostic Path: Successfully narrowed down issue to gateway DNS table mismatch.",
        "Clear Non-Technical Language: Explained router reboot sequence without confusing terminology.",
      ],
      improvementPoints: [
        "Estimated Restoration SLA: Give a concrete SLA window earlier in the conversation.",
      ],
      keyMoments: [
        {
          timestamp: "00:30",
          note: "Accurately gathered branch IP subnet and gateway status without delaying the call.",
          quality: "good",
        },
        {
          timestamp: "03:15",
          note: "Communicated workaround tunnel configuration clearly.",
          quality: "good",
        },
      ],
      recommendedLessons: [
        "Lesson 2: Managing Anxious Stakeholders in SLA Incidents",
      ],
      recommendedSimulations: [
        "Active Ransomware Vector Containment",
      ],
    },
    {
      id: "r-sim-3",
      scenarioTitle: "Active Ransomware Vector Containment & Isolation",
      careerTrack: "IT Specialist",
      trackColor: "bg-rose-500/10 text-rose-300 border-rose-400/30",
      score: 89,
      scoreGrade: "Good",
      date: "Aug 22, 4:00 PM",
      duration: "11m 10s",
      status: "Completed",
      aiPersona: {
        name: "SecOps Bot",
        role: "Incident Lead",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      },
      skills: {
        communication: 86,
        empathy: 82,
        activeListening: 88,
        problemSolving: 95,
        conflictResolution: 92,
      },
      positiveHighlights: [
        "Strict NIST Incident Adherence: Isolated host subnet immediately before memory dump.",
      ],
      improvementPoints: [
        "Chain of Custody: Export hash log prior to terminating rogue background process.",
      ],
      keyMoments: [
        {
          timestamp: "01:05",
          note: "Segregated VLAN 14 port 24 immediately. Excellent incident isolation speed.",
          quality: "good",
        },
      ],
      recommendedLessons: [
        "Lesson 5: SOC Incident Protocols & Evidence Logging",
      ],
      recommendedSimulations: [
        "Remote Office VPN Outage SLA Triage",
      ],
    },
    {
      id: "r-sim-4",
      scenarioTitle: "Urgent Care Clinical Intake & Empathetic Triage",
      careerTrack: "Healthcare Support",
      trackColor: "bg-purple-500/10 text-purple-300 border-purple-400/30",
      score: 94,
      scoreGrade: "Mastery",
      date: "Aug 20, 10:30 AM",
      duration: "7m 15s",
      status: "Completed",
      aiPersona: {
        name: "Maria Santos",
        role: "Anxious Patient",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      },
      skills: {
        communication: 95,
        empathy: 98,
        activeListening: 96,
        problemSolving: 91,
        conflictResolution: 93,
      },
      positiveHighlights: [
        "Compassionate Tone: Maintained a soothing vocal tone that calmed patient breathing.",
        "HIPAA Privacy Compliance: Verified identity discreetly and securely.",
      ],
      improvementPoints: [
        "Contact Verification: Confirm primary emergency phone number twice before nurse handoff.",
      ],
      keyMoments: [
        {
          timestamp: "00:45",
          note: "Patient was anxious; you established reassuring presence before asking symptom questions.",
          quality: "good",
        },
      ],
      recommendedLessons: [
        "Lesson 1: Patient-Centric Communication in High-Stress Clinical Settings",
      ],
      recommendedSimulations: [
        "Handling an Upset Customer Requesting Immediate Refund",
      ],
    },
  ];
}
