export type Mood =
  | "normal"
  | "happy"
  | "excited"
  | "angry"
  | "sad"
  | "confused"
  | "surprised"
  | "thinking";

export type Turn = {
  /** Patricia's reply when the learner answered well */
  good: { text: string; mood: Mood };
  /** Patricia's reply when the answer missed the mark */
  weak: { text: string; mood: Mood };
};

export type DemoScenario = {
  id: string;
  track: string;
  title: string;
  role: string;
  goal: string;
  minutes: string;
  opening: { text: string; mood: Mood };
  /** One entry per learner reply (3 replies per session) */
  turns: [Turn, Turn, Turn];
  /** Quick-reply suggestions per learner reply */
  suggestions: [string[], string[], string[]];
};

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "double-charge",
    track: "Customer Service",
    title: "Charged twice",
    role: "Frustrated customer",
    goal: "Calm the customer and agree a clear fix.",
    minutes: "3 min",
    opening: {
      text: "I've been charged twice this month and nobody has replied to my emails. I want this sorted now.",
      mood: "angry",
    },
    turns: [
      {
        good: {
          text: "Okay... thank you. So what happens with the extra charge?",
          mood: "normal",
        },
        weak: {
          text: "That's what everyone says. I've heard it all before.",
          mood: "angry",
        },
      },
      {
        good: {
          text: "Five business days is fine, as long as I get confirmation.",
          mood: "normal",
        },
        weak: {
          text: "So you don't actually know when I'll get my money back?",
          mood: "confused",
        },
      },
      {
        good: {
          text: "Great, that's all I needed. Thanks for actually helping.",
          mood: "happy",
        },
        weak: {
          text: "Fine. I'll wait, but I'm not happy about this.",
          mood: "sad",
        },
      },
    ],
    suggestions: [
      [
        "I'm really sorry about this. Let me look at both charges right now.",
        "Please calm down, these things happen.",
      ],
      [
        "I've refunded the duplicate. It will reach your account in 5 business days.",
        "It should come back at some point.",
      ],
      [
        "I'll email you a confirmation today, and I'll check it's landed on Friday.",
        "Is there anything else?",
      ],
    ],
  },
  {
    id: "wifi-meeting",
    track: "Tech Support",
    title: "Offline before a big meeting",
    role: "Stressed employee",
    goal: "Get them online fast and keep them calm.",
    minutes: "3 min",
    opening: {
      text: "My laptop won't connect to Wi-Fi and I'm presenting to the board in 15 minutes!",
      mood: "surprised",
    },
    turns: [
      {
        good: {
          text: "Okay, okay. The Wi-Fi icon has a little warning sign on it.",
          mood: "normal",
        },
        weak: {
          text: "I don't have time for this, I need it working now!",
          mood: "angry",
        },
      },
      {
        good: {
          text: "I turned it off and on again... it's connecting! It says connected.",
          mood: "excited",
        },
        weak: {
          text: "I don't know what that means. Where do I click?",
          mood: "confused",
        },
      },
      {
        good: {
          text: "Perfect, I'll keep that in mind. You saved my presentation!",
          mood: "happy",
        },
        weak: {
          text: "Okay... I hope it doesn't drop out again during the meeting.",
          mood: "sad",
        },
      },
    ],
    suggestions: [
      [
        "We'll get you online well before then. Can you tell me what the Wi-Fi icon shows?",
        "Have you tried turning it off and on again?",
      ],
      [
        "First, click the Wi-Fi icon, turn Wi-Fi off, wait 5 seconds, then turn it back on.",
        "Reset the network adapter in settings.",
      ],
      [
        "Great! If it drops again, plug in the cable at your desk. I'll stay on chat until 10.",
        "Glad it works.",
      ],
    ],
  },
  {
    id: "locked-out",
    track: "IT Specialist",
    title: "Manager locked out",
    role: "Impatient manager",
    goal: "Verify identity safely and restore access.",
    minutes: "3 min",
    opening: {
      text: "I'm locked out of my account again. Just reset it, I don't have time for security questions.",
      mood: "angry",
    },
    turns: [
      {
        good: {
          text: "Fine. I've got my phone here for the code.",
          mood: "normal",
        },
        weak: {
          text: "Why is this so complicated? I'm a manager here.",
          mood: "angry",
        },
      },
      {
        good: {
          text: "Got the code, it's working. Why does this keep happening though?",
          mood: "thinking",
        },
        weak: {
          text: "I'm still locked out. What am I supposed to do?",
          mood: "confused",
        },
      },
      {
        good: {
          text: "That makes sense. I'll update the password on my phone too. Thanks.",
          mood: "happy",
        },
        weak: {
          text: "Whatever. I'll probably be calling you again next week.",
          mood: "sad",
        },
      },
    ],
    suggestions: [
      [
        "I understand you're busy. I'll be quick: I just need to send a code to your phone to keep your account safe.",
        "I can't skip the security check.",
      ],
      [
        "I've sent a 6-digit code. Enter it on the login page, then choose a new password.",
        "Check your phone.",
      ],
      [
        "It's usually an old password saved on your phone. Update it there and this should stop.",
        "It just happens sometimes.",
      ],
    ],
  },
  {
    id: "appointment-delay",
    track: "Healthcare Support",
    title: "Worried about a delay",
    role: "Anxious patient",
    goal: "Reassure the patient and give clear next steps.",
    minutes: "3 min",
    opening: {
      text: "My appointment was moved again. I've been waiting weeks and I'm really worried about my results.",
      mood: "sad",
    },
    turns: [
      {
        good: {
          text: "Thank you for understanding. I just want to know what's going on.",
          mood: "normal",
        },
        weak: {
          text: "You don't understand how stressful this is for me.",
          mood: "sad",
        },
      },
      {
        good: {
          text: "Thursday at 9am works. Will the doctor have my results by then?",
          mood: "thinking",
        },
        weak: {
          text: "So when will I actually see someone?",
          mood: "confused",
        },
      },
      {
        good: {
          text: "That really helps. I feel much better knowing the plan.",
          mood: "happy",
        },
        weak: {
          text: "Okay. I guess I'll just keep waiting then.",
          mood: "sad",
        },
      },
    ],
    suggestions: [
      [
        "I'm so sorry, I can hear how worrying this is. Let me check what's available for you.",
        "Delays are normal, unfortunately.",
      ],
      [
        "I've found a slot this Thursday at 9am. Would that work for you?",
        "We'll call you when something opens up.",
      ],
      [
        "Yes, your results are in. I'll also note that you'd like a call if anything changes before then.",
        "The doctor will explain everything.",
      ],
    ],
  },
];
