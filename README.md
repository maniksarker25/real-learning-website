# Real Learning — Your Learning GPS 🚀

> **Never get stuck where you are in life.**  
> *Start where you are → discover your paths → learn → practice → build skills → find opportunities → evolve.*

Real Learning (RL) is an AI-powered career and education guidance platform designed to help people keep up with modern AI and technology, identify what they need to learn, and take the fastest practical path from learning to employment.

---

## 🔁 Core Learning Loop Workflow

The central learning experience in Real Learning connects discovery, theory, practice, and AI guidance into one continuous loop:

```
PATHFINDER  ──>  CLASS  ──>  SIMULATOR  ──>  AI FEEDBACK  ──>  SKILL PROGRESS  ──>  NEXT STEP
```

> **Important Principle**: The **Simulator is NOT a separate feature** from the classes. It is the **integrated practice layer** for what the learner just learned in the Class.

---

## 🧭 The 6-Stage Learning GPS Experience

### 1. WHERE AM I? (Pathfinder Baseline)
- RL AI evaluates the learner's current baseline skills, background, and career goals.
- Provides a clear starting skill profile.

### 2. WHAT PATHS CAN I TAKE? (Career Track Discovery)
- Learners discover aligned high-demand career pathways (e.g., *Technical Support Specialist*, *Customer Success & Escalations*, *L1 Network/IT Triage*).
- Displays skill match percentages, core competencies, and average salary ranges.

### 3. WHAT SHOULD I LEARN? (AI Pathfinder Recommendation)
- RL AI pairs the ideal starting **Class** (theory & fundamentals) with its connected **Simulator** (practice layer).

### 4. CLASS (Learn Fundamentals)
- Learners study core principles, active de-escalation, diagnostic steps, non-confrontational phrasing, and positive framing.
- Short quizzes verify key concepts before moving to practice.

### 5. SIMULATOR (Apply What You Learned)
- Learners enter a dynamic, realistic scenario (e.g., handling an upset customer requesting a refund or triaging an IT outage).
- Practice active listening and problem-solving with a dynamic AI roleplay character.

### 6. AI FEEDBACK, SKILL PROGRESS & NEXT STEP
- **AI Feedback**: Highlights strengths, improvement opportunities, and timestamped transcript notes.
- **Skill Progress**: Automatically updates demonstrated skill levels (e.g. *De-escalation +16%*, *Active Listening +18%*).
- **WHAT SHOULD I DO NEXT?**: RL AI Pathfinder determines the next step:
  - *Option A*: Take the next class in the pathway.
  - *Option B*: Practice a harder simulation scenario under SLA pressure.
  - *Option C*: Repeat the simulation to refine skills.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router)
- **UI & Styling**: React 19, Tailwind CSS v4, Lucide React Icons
- **Animation**: Framer Motion
- **State Management**: AccountContext & React Hooks

---

## 🚀 Getting Started Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Application**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
src/
├── app/                      # Next.js App Router routes & layouts
├── components/               # Application UI components
│   ├── individual-dashboard/ # Learner Dashboard & GPS Loop screens
│   │   ├── LearningLoopStepper.tsx  # 6-Step GPS Stepper Bar
│   │   └── screens/
│   │       ├── IndPathfinderScreen.tsx # 1. Pathfinder (Where am I? / Paths / Recommendation)
│   │       ├── IndClassesScreen.tsx    # 2. Class (Theory & Practice Layer CTA)
│   │       ├── IndSimulationsScreen.tsx # 3. Simulator (Practice Layer)
│   │       ├── IndFeedbackScreen.tsx   # 4. AI Feedback, Skill Progress & Next Step Engine
│   │       └── ...
├── context/                  # Session & Account State Providers
└── types/                    # TypeScript interfaces & types
```
