import { ClassModule } from "./types";

export function getSampleClasses(): ClassModule[] {
  return [
    {
      id: "class-1",
      title: "Customer Communication & De-escalation Mastery",
      category: "Customer Service & Empathy",
      description:
        "Learn key de-escalation strategies, active listening techniques, and professional phrasing for tough workplace scenarios.",
      estimatedDuration: "45 mins",
      progress: 67,
      isCompleted: false,
      lessons: [
        {
          id: "l1",
          title: "Lesson 1: Understanding Customer Psychology Under Stress",
          duration: "10 mins",
          content:
            "When customers encounter unexpected product failures or delay issues, their emotional response precedes logic. De-escalation begins by validating their emotional state without admitting unverified fault.",
          example:
            "Customer: 'This service breakdown lost me hours of work!' \nRight approach: 'I completely understand how frustrating that delay is, and I am stepping in right now to resolve this for you.'",
          exercisePrompt:
            "Practice rephrasing: 'That's our policy' to an empathetic, customer-centric response.",
          isCompleted: true,
        },
        {
          id: "l2",
          title: "Lesson 2: Active Listening & Echo Statements",
          duration: "12 mins",
          content:
            "Active listening requires repeating key facts stated by the user to demonstrate comprehension before offering solutions.",
          example:
            "Echo Statement: 'If I understand correctly, you need your shipment rerouted to the Chicago branch by 3 PM today, correct?'",
          exercisePrompt:
            "Identify the 2 core facts in the user's grievance before responding.",
          isCompleted: true,
        },
        {
          id: "l3",
          title: "Lesson 3: Non-Confrontational Phrasing & Positive Framing",
          duration: "12 mins",
          content:
            "Avoid negative absolute words ('can't', 'impossible', 'no'). Frame constraints around what CAN be done immediately.",
          example:
            "Instead of: 'We can't refund this after 30 days.' \nUse: 'What I can do right now is apply full account credit towards your next invoice.'",
          exercisePrompt:
            "Transform negative policy statements into positive action options.",
          isCompleted: true,
        },
        {
          id: "l4",
          title: "Lesson 4: Establishing Control & Action Agreements",
          duration: "11 mins",
          content:
            "Guide the conversation to action steps with explicit timelines and direct follow-up commitments.",
          example:
            "Action Agreement: 'I will personally inspect your account status and update you by 2 PM via email.'",
          exercisePrompt: "Draft an action agreement with clear timestamps.",
          isCompleted: false,
        },
      ],
      quiz: [
        {
          id: "q1",
          question:
            "What is the primary goal of an echo statement during customer de-escalation?",
          options: [
            "To argue against customer claims",
            "To demonstrate active listening and verify core facts",
            "To delay providing a solution",
            "To transfer the customer to another agent",
          ],
          correctAnswerIndex: 1,
          explanation:
            "Echo statements confirm understanding and show the customer their issue has been heard accurately.",
        },
        {
          id: "q2",
          question:
            "Which of the following phrases represents positive framing?",
          options: [
            "We cannot help you with that request.",
            "That is strictly against our policy.",
            "What I can do right now is issue account credit for your next order.",
            "You should have read the terms earlier.",
          ],
          correctAnswerIndex: 2,
          explanation:
            "Positive framing focuses on actionable options available right now rather than negative policy walls.",
        },
        {
          id: "q3",
          question:
            "When a customer is emotionally elevated, what should be addressed first?",
          options: [
            "Technical product architecture",
            "Validating their frustration before diving into logistics",
            "Billing escalation forms",
            "Interrupting them to give instant advice",
          ],
          correctAnswerIndex: 1,
          explanation:
            "Emotional validation calms hostility so the customer can process logical solutions.",
        },
      ],
    },
  ];
}
