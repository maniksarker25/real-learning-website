/**
 * Lightweight, rule-based reply evaluator for the public demo.
 * Runs entirely in the browser. Swap `evaluateReply` for a call to the
 * real AI scoring endpoint when it's available; the rest of the demo
 * only depends on the `ReplyEvaluation` shape.
 */

export type SkillKey = "empathy" | "ownership" | "clarity" | "listening";

export const SKILL_LABELS: Record<SkillKey, string> = {
  empathy: "Empathy",
  ownership: "Ownership",
  clarity: "Clarity",
  listening: "Active listening",
};

const TIPS: Record<SkillKey, string> = {
  empathy: "Start by acknowledging how they feel.",
  ownership: "Take ownership: say what you will do.",
  clarity: "Be specific: give a time, step or number.",
  listening: "Ask a question to understand the situation.",
};

const PRAISE: Record<SkillKey, string> = {
  empathy: "Nice, you acknowledged their feelings.",
  ownership: "Good ownership, you took charge.",
  clarity: "Clear and specific. That builds trust.",
  listening: "Great question, you're really listening.",
};

const PATTERNS: Record<SkillKey, RegExp[]> = {
  empathy: [
    /\bsorry\b/i,
    /\bapolog/i,
    /\bunderstand\b/i,
    /\bfrustrat/i,
    /\bworr(y|ying|ied)\b/i,
    /\bstressful\b/i,
    /\bi (can )?hear\b/i,
    /\bappreciate\b/i,
    /\bthat must\b/i,
  ],
  ownership: [
    /\bi'?ll\b/i,
    /\bi will\b/i,
    /\blet me\b/i,
    /\bi'?m going to\b/i,
    /\bi'?ve (refunded|sent|found|booked|fixed|reset|checked|noted)\b/i,
    /\bpersonally\b/i,
    /\bright now\b/i,
    /\bwe'?ll\b/i,
  ],
  clarity: [
    /\d/,
    /\btoday\b/i,
    /\btomorrow\b/i,
    /\b(monday|tuesday|wednesday|thursday|friday)\b/i,
    /\bminutes?\b/i,
    /\bhours?\b/i,
    /\bdays?\b/i,
    /\bfirst\b/i,
    /\bthen\b/i,
    /\bstep\b/i,
  ],
  listening: [
    /\?/,
    /\bcan you tell me\b/i,
    /\bcould you\b/i,
    /\bwalk me through\b/i,
    /\bwhat (happened|do you see|does it show)\b/i,
    /\bwould that work\b/i,
  ],
};

export type ReplyEvaluation = {
  hits: Record<SkillKey, boolean>;
  /** 0–100 quality score for this single reply */
  score: number;
  good: boolean;
  tip: { kind: "praise" | "improve"; text: string };
};

export function evaluateReply(text: string): ReplyEvaluation {
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  const hits = Object.fromEntries(
    (Object.keys(PATTERNS) as SkillKey[]).map((k) => [
      k,
      PATTERNS[k].some((re) => re.test(text)),
    ]),
  ) as Record<SkillKey, boolean>;

  const hitCount = Object.values(hits).filter(Boolean).length;

  let score = 35 + hitCount * 16;
  if (words < 5) score -= 20;
  else if (words >= 10) score += 6;
  if (words > 80) score -= 8;
  if (/\bcalm down\b|\bnot my (job|problem)\b|\bwhatever\b/i.test(text)) score -= 25;
  score = Math.max(10, Math.min(98, score));

  const good = score >= 60;

  const missing = (Object.keys(hits) as SkillKey[]).find((k) => !hits[k]);
  const strongest = (Object.keys(hits) as SkillKey[]).find((k) => hits[k]);

  const tip =
    good && strongest
      ? { kind: "praise" as const, text: PRAISE[strongest] }
      : { kind: "improve" as const, text: TIPS[missing ?? "empathy"] };

  return { hits, score, good, tip };
}

export type SessionSummary = {
  overall: number;
  skills: { key: SkillKey; label: string; score: number }[];
  strongest: SkillKey;
  weakest: SkillKey;
  bestReply: string;
  improveTip: string;
};

export function summarise(
  replies: { text: string; evaluation: ReplyEvaluation }[],
): SessionSummary {
  const keys = Object.keys(SKILL_LABELS) as SkillKey[];
  const n = Math.max(1, replies.length);

  const skills = keys.map((key) => {
    const hitRate = replies.filter((r) => r.evaluation.hits[key]).length / n;
    const avgQuality = replies.reduce((s, r) => s + r.evaluation.score, 0) / n;
    const score = Math.round(Math.min(98, 30 + hitRate * 50 + avgQuality * 0.2));
    return { key, label: SKILL_LABELS[key], score };
  });

  const overall = Math.round(skills.reduce((s, k) => s + k.score, 0) / skills.length);
  const sorted = [...skills].sort((a, b) => b.score - a.score);
  const best = [...replies].sort((a, b) => b.evaluation.score - a.evaluation.score)[0];

  return {
    overall,
    skills,
    strongest: sorted[0].key,
    weakest: sorted[sorted.length - 1].key,
    bestReply: best?.text ?? "",
    improveTip: TIPS[sorted[sorted.length - 1].key],
  };
}
