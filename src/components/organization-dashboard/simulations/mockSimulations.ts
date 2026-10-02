import { CompletedSimulationItem } from "./types";

export function getCompletedSimulations(): CompletedSimulationItem[] {
  return [
    {
      id: "sim-1",
      scenarioTitle: "Handling an Upset Customer Requesting Immediate Refund",
      careerTrack: "Customer Service",
      trackColor: "bg-orange-50 text-orange-800 border-orange-200",
      aiCharacterName: "Karen Miller",
      aiCharacterRole: "VIP Customer",
      completedAt: "15 mins ago",
      duration: "6m 20s",
      overallScore: 96,
      member: {
        name: "Sarah Jenkins",
        email: "sarah.j@acmecorp.com",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      },
      skills: {
        communication: 98,
        empathy: 97,
        problemSolving: 94,
        ownership: 96,
        resolution: 95,
      },
      highlightQuote:
        '"I completely understand — 45 minutes on hold is unacceptable. Let me personally handle this right now."',
      dialoguePreview: [
        {
          role: "ai",
          text: "I've been on hold for 45 minutes. This is completely unacceptable!",
        },
        {
          role: "user",
          text: "I completely understand — 45 minutes is too long. Let me personally handle this right now with no more holds.",
        },
        {
          role: "ai",
          text: "Fine. But I just want this fixed. I'm a paying customer.",
        },
        {
          role: "user",
          text: "You deserve that. Walk me through what happened — I will stay on the line until it's done.",
        },
      ],
      feedbackHighlights: [
        "Exceptional emotional de-escalation in the first 15 seconds.",
        "Took immediate single-point ownership without passing blame.",
        "High empathy tone score (97/100).",
      ],
    },
    {
      id: "sim-2",
      scenarioTitle: "Remote Office VPN Outage SLA Triage",
      careerTrack: "Tech Support",
      trackColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      aiCharacterName: "David Sterling",
      aiCharacterRole: "Regional Branch Manager",
      completedAt: "42 mins ago",
      duration: "8m 45s",
      overallScore: 91,
      member: {
        name: "David Chen",
        email: "david.c@acmecorp.com",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      },
      skills: {
        communication: 90,
        empathy: 88,
        problemSolving: 96,
        ownership: 92,
        resolution: 90,
      },
      highlightQuote:
        '"I am initiating a secondary IPSec tunnel failover now to restore branch traffic within 3 minutes."',
      dialoguePreview: [
        {
          role: "ai",
          text: "The Chicago branch VPN went down right before our quarterly investor call!",
        },
        {
          role: "user",
          text: "Understood, David. I'm checking the gateway telemetry right now. We have automated failover ready.",
        },
      ],
      feedbackHighlights: [
        "Followed standard enterprise SLA protocol under high pressure.",
        "Clear diagnostic questioning with technical clarity.",
      ],
    },
    {
      id: "sim-3",
      scenarioTitle: "Enterprise Ransomware Phishing Containment",
      careerTrack: "IT Specialist",
      trackColor: "bg-rose-50 text-rose-800 border-rose-200",
      aiCharacterName: "Security SIEM Alert",
      aiCharacterRole: "Automated Threat Monitor",
      completedAt: "2 hours ago",
      duration: "11m 10s",
      overallScore: 94,
      member: {
        name: "Elena Rostova",
        email: "elena.r@acmecorp.com",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      },
      skills: {
        communication: 92,
        empathy: 90,
        problemSolving: 98,
        ownership: 95,
        resolution: 95,
      },
      highlightQuote:
        '"Isolated VLAN segment 14 and revoked compromised Kerberos tickets across domain controller."',
      dialoguePreview: [
        {
          role: "ai",
          text: "Alert: Multiple endpoint encrypted file renames detected on Finance subnet.",
        },
        {
          role: "user",
          text: "Isolating VLAN 14 immediately and revoking all session tokens across Active Directory.",
        },
      ],
      feedbackHighlights: [
        "Contained simulated zero-day threat in under 4 minutes.",
        "Flawless adherence to NIST incident response framework.",
      ],
    },
    {
      id: "sim-4",
      scenarioTitle: "Anxious Family Member Clinical Intake De-escalation",
      careerTrack: "Healthcare Support",
      trackColor: "bg-purple-50 text-purple-800 border-purple-200",
      aiCharacterName: "Maria Santos",
      aiCharacterRole: "Patient Daughter",
      completedAt: "3 hours ago",
      duration: "7m 30s",
      overallScore: 95,
      member: {
        name: "Liam O'Connor",
        email: "liam.o@acmecorp.com",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      },
      skills: {
        communication: 97,
        empathy: 99,
        problemSolving: 92,
        ownership: 94,
        resolution: 93,
      },
      highlightQuote:
        '"Maria, your father is safe and Dr. Keller is with him right now. I will stay with you every step."',
      dialoguePreview: [
        {
          role: "ai",
          text: "Nobody is telling me anything! Is my father okay in room 4?",
        },
        {
          role: "user",
          text: "Maria, I hear how scared you are. Dr. Keller is with your father right now, and his vitals are stable.",
        },
      ],
      feedbackHighlights: [
        "Flawless patient empathy (99/100).",
        "Calm pacing reduced simulated family stress index by 65%.",
      ],
    },
    {
      id: "sim-5",
      scenarioTitle: "Billing Dispute & Escalated Chargeback Threat",
      careerTrack: "Customer Service",
      trackColor: "bg-orange-50 text-orange-800 border-orange-200",
      aiCharacterName: "Robert Hayes",
      aiCharacterRole: "Account Owner",
      completedAt: "5 hours ago",
      duration: "5m 50s",
      overallScore: 97,
      member: {
        name: "Aisha Khan",
        email: "aisha.k@acmecorp.com",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      },
      skills: {
        communication: 96,
        empathy: 94,
        problemSolving: 95,
        ownership: 97,
        resolution: 96,
      },
      highlightQuote:
        '"I will reverse the $89 fee right now and send the email confirmation while we talk."',
      dialoguePreview: [
        {
          role: "ai",
          text: "There is an $89 fee on my account that I never authorized!",
        },
        {
          role: "user",
          text: "I completely own this. Let me pull up your account and reverse this right now.",
        },
      ],
      feedbackHighlights: [
        "First-contact resolution achieved in under 6 minutes.",
        "High ownership score (97/100).",
      ],
    },
    {
      id: "sim-6",
      scenarioTitle: "Critical Server Kernel Panic & Database Recovery",
      careerTrack: "Tech Support",
      trackColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      aiCharacterName: "Tom Walker",
      aiCharacterRole: "DevOps Engineer",
      completedAt: "Yesterday",
      duration: "9m 10s",
      overallScore: 88,
      member: {
        name: "David Chen",
        email: "david.c@acmecorp.com",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      },
      skills: {
        communication: 86,
        empathy: 84,
        problemSolving: 92,
        ownership: 90,
        resolution: 89,
      },
      highlightQuote:
        '"Mounted read-only snapshot. Restoring WAL logs from secondary replica."',
      dialoguePreview: [
        {
          role: "ai",
          text: "Database primary is in kernel panic reboot loop!",
        },
        {
          role: "user",
          text: "Failover triggered. Mounting read-only snapshot while restoring WAL logs.",
        },
      ],
      feedbackHighlights: [
        "Zero data loss achieved during recovery scenario.",
      ],
    },
  ];
}
