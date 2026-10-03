import { creator } from "./creator";

export type ProgramStatus = "CONFIRMED" | "INVITED" | "PLANNED" | "COMPLETED";
// Set to an official HTTPS interest form when available; never invent a URL.
export const PARTICIPANT_FORM_URL: string | null = null;
export const registrationLinks = {
  participant: PARTICIPANT_FORM_URL,
  submission: null as string | null,
};
export const program = {
  title: "AegisAI Community Hackathons",
  subtitle: "Build. Break. Measure. Improve.",
  description: "A community engineering program for exploring adaptive authorization, behavioral risk, cloud-native security and resilient distributed systems using the open-source AegisAI research platform.",
  prize: "Planned USD $300 prize per hackathon",
  terms: "Prizes and rules are subject to official event terms until finalized. No prize has been awarded.",
  eligibility: "Free participation for platform engineers, cloud engineers, security engineers, SREs, software engineers, AI/ML engineers, researchers and graduate students. Final eligibility, team limits and any geographic or age requirements will be specified in official event terms.",
};
export const participants = ["Platform Engineers", "Cloud Engineers", "Security Engineers", "SREs", "Software Engineers", "AI/ML Engineers", "Researchers", "Graduate Students"];
export const judgingCriteria = ["Technical correctness", "Security reasoning", "Architecture quality", "Reproducibility", "Innovation", "Explainability", "Documentation"];
export const statusDefinitions: Record<ProgramStatus, string> = {
  CONFIRMED: "Participation or arrangements explicitly confirmed.",
  INVITED: "An invitation has been sent; acceptance is pending.",
  PLANNED: "Proposed; arrangements have not been finalized.",
  COMPLETED: "Finished, with supporting evidence available.",
};
export const events: {
  id: string; title: string; status: ProgramStatus; launch: string;
  submission: string; themes: string[]; problem: string; challenge: string;
  deliverables: string[]; registrationUrl: string | null; submissionUrl: string | null;
}[] = [
  {
    id: "adaptive-authorization", title: "AegisAI Adaptive Authorization Challenge", status: "PLANNED",
    launch: "November 2026", submission: "January 2027",
    themes: ["RBAC", "ABAC", "Contextual risk", "Adaptive authorization", "Policy explainability"],
    problem: "Authorization policies must account for roles, attributes and context while making security decisions understandable and testable.",
    challenge: "Build or evaluate an authorization capability around AegisAI. Compare policy behavior under changing context, identify failure cases and explain the security tradeoffs with reproducible evidence.",
    deliverables: ["Source code or evaluation harness and setup instructions", "Policy examples, threat assumptions and reproducible test cases", "Results with limitations and an explanation of authorization decisions"],
    registrationUrl: null, submissionUrl: null,
  },
  {
    id: "behavioral-risk", title: "AegisAI Behavioral Risk Challenge", status: "PLANNED",
    launch: "December 2026", submission: "February 2027",
    themes: ["Behavioral anomaly detection", "Risk evidence", "Identity/context signals", "Explainability", "False-positive reduction"],
    problem: "Behavioral signals can be noisy, and risk assessments need evidence that distinguishes suspicious activity from legitimate variation.",
    challenge: "Prototype or evaluate behavioral risk methods using synthetic or appropriately licensed data. Explain signal selection, assess false positives and document uncertainty. Model D is planned research, not an existing implemented capability.",
    deliverables: ["Prototype or evaluation code with reproducible setup", "Data provenance, signal definitions and privacy considerations", "Evaluation method, false-positive analysis and explainable risk evidence"],
    registrationUrl: null, submissionUrl: null,
  },
  {
    id: "autonomous-resilience", title: "AegisAI Autonomous Resilience Challenge", status: "PLANNED",
    launch: "January 2027", submission: "March 2027",
    themes: ["Incident detection", "Policy-bounded response", "Resilience", "Observability", "Distributed-system security"],
    problem: "Distributed-system incidents require observable evidence and response mechanisms constrained by explicit security policies.",
    challenge: "Build or evaluate an incident-detection or resilience prototype in an isolated environment. Define response boundaries, test failure scenarios and explain recovery behavior. Autonomous response is a challenge theme, not a claim of deployed AegisAI functionality.",
    deliverables: ["Prototype or evaluation harness with architecture documentation", "Isolated incident scenarios, telemetry and reproducible runs", "Response policies, safeguards, recovery analysis and limitations"],
    registrationUrl: null, submissionUrl: null,
  },
];
export interface CommunitySlot {
  id: string;
  label: string;
  status: ProgramStatus;
  person: { name: string; role: string; profileUrl: string | null } | null;
}
export const keynote = { person: creator, status: "PLANNED" as ProgramStatus };
export const speakers: CommunitySlot[] = Array.from({ length: 3 }, (_, i) => ({
  id: `guest-${i + 1}`, label: `Future guest speaker ${i + 1}`, status: "PLANNED", person: null,
}));
export const judges: CommunitySlot[] = Array.from({ length: 3 }, (_, i) => ({
  id: `judge-${i + 1}`, label: `Independent judge slot ${i + 1}`, status: "PLANNED", person: null,
}));
