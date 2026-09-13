export interface LifeGPSState {
  whereYouAre: string;
  whereYouWantToGo: string;
  nextBestStep: string;
  actionCta?: {
    label: string;
    href: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: "patricia" | "user";
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  gpsUpdate?: Partial<LifeGPSState>;
}

// Exactly the 4 prompts requested by client
export const INITIAL_PROMPTS = [
  "I want to make more money.",
  "I don’t know what career I want.",
  "What should I learn next?",
  "Help me figure out my next step.",
];

export const INITIAL_LIFE_GPS: LifeGPSState = {
  whereYouAre: "Exploring your current situation",
  whereYouWantToGo: "Defining your ideal direction",
  nextBestStep: "Ask Patricia a question or pick an option below",
  actionCta: {
    label: "Explore Simulations",
    href: "#explore-careers",
  },
};

/**
 * Patricia Response Engine adhering strictly to client rules:
 * - Short by default (1-2 short sentences)
 * - Simple everyday language
 * - Exactly ONE question at a time
 * - Avoid long paragraphs & overwhelming text
 * - Give the simplest useful next step first
 * - Update the Life GPS state
 */
export function getPatriciaResponse(
  userMessage: string
): {
  replyText: string;
  suggestedQuestions?: string[];
  gpsUpdate?: Partial<LifeGPSState>;
} {
  const clean = userMessage.trim().toLowerCase();

  // 1. "I want to make more money."
  if (
    clean.includes("make more money") ||
    clean.includes("higher income") ||
    clean.includes("earn more") ||
    clean.includes("more money")
  ) {
    return {
      replyText:
        "To make more money, we should focus on high-paying workplace skills. What kind of work feels most natural to you?",
      suggestedQuestions: [
        "Talking with people",
        "Working with computers & data",
        "I'm not sure yet",
      ],
      gpsUpdate: {
        whereYouAre: "Looking to increase your income",
        whereYouWantToGo: "High-earning career path",
        nextBestStep: "Pick an area to test in 5 minutes",
        actionCta: {
          label: "Start 5-Min Simulation",
          href: "#explore-careers",
        },
      },
    };
  }

  // 2. "I don’t know what career I want."
  if (
    clean.includes("don’t know what career") ||
    clean.includes("dont know what career") ||
    clean.includes("career i want") ||
    clean.includes("not sure what career")
  ) {
    return {
      replyText:
        "That's completely normal. The easiest way to find out is to test real work before deciding. Do you prefer working with people or solving problems on your own?",
      suggestedQuestions: [
        "Working with people",
        "Solving problems on my own",
        "A mix of both",
      ],
      gpsUpdate: {
        whereYouAre: "Exploring career directions",
        whereYouWantToGo: "A career that fits your natural strengths",
        nextBestStep: "Try a 3-minute work scenario test",
        actionCta: {
          label: "Browse Career Scenarios",
          href: "#explore-careers",
        },
      },
    };
  }

  // 3. "What should I learn next?"
  if (
    clean.includes("what should i learn next") ||
    clean.includes("learn next") ||
    clean.includes("what to learn")
  ) {
    return {
      replyText:
        "Focus on practical skills that employers look for right now. Which of these sounds most interesting to you?",
      suggestedQuestions: [
        "Clear workplace communication",
        "AI and digital tools",
        "Managing projects",
      ],
      gpsUpdate: {
        whereYouAre: "Ready to build valuable skills",
        whereYouWantToGo: "Job-ready practical abilities",
        nextBestStep: "Practice a realistic workplace situation",
        actionCta: {
          label: "View Recommended Practice",
          href: "#how-it-works",
        },
      },
    };
  }

  // 4. "Help me figure out my next step."
  if (
    clean.includes("figure out my next step") ||
    clean.includes("next step") ||
    clean.includes("what's my next step")
  ) {
    return {
      replyText:
        "Let's keep it simple and focus on one good step. Are you looking to change careers, or grow where you are now?",
      suggestedQuestions: [
        "Change to a new career",
        "Grow where I am now",
        "I'm starting fresh",
      ],
      gpsUpdate: {
        whereYouAre: "Setting your immediate focus",
        whereYouWantToGo: "Clear direction and momentum",
        nextBestStep: "Pick one career simulation to test today",
        actionCta: {
          label: "Take Next Step",
          href: "#explore-careers",
        },
      },
    };
  }

  // Follow-up: People / Communication
  if (
    clean.includes("talking with people") ||
    clean.includes("working with people") ||
    clean.includes("talking to people") ||
    clean.includes("communication")
  ) {
    return {
      replyText:
        "Customer Success and Tech Sales pay well and rely on great communication. Would you like to try a 3-minute scenario to see how it feels?",
      suggestedQuestions: [
        "Yes, let's try it!",
        "What skills do I need first?",
      ],
      gpsUpdate: {
        whereYouAre: "People and communication focus",
        whereYouWantToGo: "Customer Success or Tech Sales role",
        nextBestStep: "Practice a 3-minute customer scenario",
        actionCta: {
          label: "Try Customer Scenario",
          href: "#explore-careers",
        },
      },
    };
  }

  // Follow-up: Tech / Data / Computers
  if (
    clean.includes("computers") ||
    clean.includes("data") ||
    clean.includes("solving problems") ||
    clean.includes("technical") ||
    clean.includes("ai and digital")
  ) {
    return {
      replyText:
        "Data and digital operations roles have strong demand and steady pay. Have you used spreadsheets or computer tools before?",
      suggestedQuestions: [
        "Yes, basic tools",
        "No, starting from scratch",
      ],
      gpsUpdate: {
        whereYouAre: "Technical and problem-solving focus",
        whereYouWantToGo: "Data & Systems Specialist",
        nextBestStep: "Run a beginner workplace simulation",
        actionCta: {
          label: "Start Beginner Sim",
          href: "#explore-careers",
        },
      },
    };
  }

  // Follow-up: Change career
  if (clean.includes("change to a new career") || clean.includes("new career")) {
    return {
      replyText:
        "The fastest way to switch careers is trying real workplace tasks risk-free. Which field sounds most exciting?",
      suggestedQuestions: [
        "Tech & Customer Success",
        "Business & Operations",
        "Marketing & Creative",
      ],
      gpsUpdate: {
        whereYouAre: "Preparing for career change",
        whereYouWantToGo: "New in-demand role",
        nextBestStep: "Test a 5-minute scenario in your target field",
        actionCta: {
          label: "Browse Roles",
          href: "#explore-careers",
        },
      },
    };
  }

  // Follow-up: Grow where I am now
  if (clean.includes("grow where i am") || clean.includes("grow in my current")) {
    return {
      replyText:
        "The fastest way to grow is proving you can solve real workplace problems. Would you like to practice a leadership decision?",
      suggestedQuestions: [
        "Yes, show me leadership scenario",
        "What else can I practice?",
      ],
      gpsUpdate: {
        whereYouAre: "Aiming for promotion and growth",
        whereYouWantToGo: "Senior or team leadership role",
        nextBestStep: "Practice a leadership decision scenario",
        actionCta: {
          label: "Start Leadership Practice",
          href: "#explore-careers",
        },
      },
    };
  }

  // Follow-up: Starting fresh / Mix
  if (clean.includes("starting fresh") || clean.includes("mix of both") || clean.includes("not sure yet")) {
    return {
      replyText:
        "Starting fresh is great because you can explore freely. What sounds better: a short 3-minute quiz, or browsing real job simulations?",
      suggestedQuestions: [
        "Short 3-minute quiz",
        "Browse real job simulations",
      ],
      gpsUpdate: {
        whereYouAre: "Open to new directions",
        whereYouWantToGo: "Discovering your strengths",
        nextBestStep: "Complete a 3-minute discovery quiz",
        actionCta: {
          label: "Take Discovery Quiz",
          href: "#explore-careers",
        },
      },
    };
  }

  // Follow-up: Affirmative ("Yes, let's try it", "start scenario", "show me")
  if (
    clean.includes("yes") ||
    clean.includes("try it") ||
    clean.includes("start") ||
    clean.includes("show me")
  ) {
    return {
      replyText:
        "Awesome! You can test a real scenario right now and get instant feedback on your choices. Ready to jump in?",
      suggestedQuestions: [
        "Start simulation now",
        "Ask another question",
      ],
      gpsUpdate: {
        whereYouAre: "Ready for hands-on practice",
        whereYouWantToGo: "Active workplace scenario",
        nextBestStep: "Launch your first 5-minute simulation",
        actionCta: {
          label: "Launch Simulation Now",
          href: "#explore-careers",
        },
      },
    };
  }

  // Default fallback adhering strictly to Patricia rules
  return {
    replyText:
      "Got it. Let's find the simplest next step for you. What is the single most important goal you want to achieve next?",
    suggestedQuestions: [
      "I want to make more money.",
      "I don’t know what career I want.",
      "Help me figure out my next step.",
    ],
    gpsUpdate: {
      whereYouAre: `Exploring: "${userMessage.slice(0, 32)}"`,
      whereYouWantToGo: "Clear direction and momentum",
      nextBestStep: "Select one option above to focus",
      actionCta: {
        label: "Explore Scenarios",
        href: "#explore-careers",
      },
    },
  };
}
