import { creator } from "./creator";
import { hackathonForms, publicFormUrl } from "./hackathonForms";

export type ProgramStatus = "CONFIRMED" | "INVITED" | "PLANNED" | "COMPLETED";
// Set to official HTTPS application forms when available; never invent URLs.
export const PARTICIPANT_REGISTRATION_FORM_URL = publicFormUrl(hackathonForms.participant.url, hackathonForms.participant.open);
export const JUDGE_INVITATION_FORM_URL = publicFormUrl(hackathonForms.judge.url, hackathonForms.judge.open);
export const SUBMISSION_FORM_URL = publicFormUrl(hackathonForms.project.url, hackathonForms.project.open);
// Compatibility alias for PORTAL-005 consumers; configure the registration URL above.
export const PARTICIPANT_FORM_URL = PARTICIPANT_REGISTRATION_FORM_URL;
export const registrationLinks = {
  participant: PARTICIPANT_REGISTRATION_FORM_URL,
  judge: JUDGE_INVITATION_FORM_URL,
  submission: SUBMISSION_FORM_URL,
};
export const program = {
  title: "AeglysAI Community Hackathons",
  subtitle: "Build. Break. Measure. Improve.",
  description: "A community engineering program for exploring adaptive authorization, behavioral risk, cloud-native security and resilient distributed systems using the open-source AeglysAI research platform.",
  prize: "Planned USD $300 prize per hackathon",
  terms: "Prizes and rules are subject to official event terms until finalized. No prize has been awarded.",
  eligibility: "Free participation for platform engineers, cloud engineers, security engineers, SREs, software engineers, AI/ML engineers, researchers and graduate students. Final eligibility, team limits and any geographic or age requirements will be specified in official event terms.",
};
export const participants = ["Platform Engineers", "Cloud Engineers", "Security Engineers", "Distributed Systems Engineers", "SREs", "Software Engineers", "AI/ML Engineers", "Researchers", "Graduate Students"];
export const judgingCriteria = ["Technical correctness", "Security reasoning", "Architecture quality", "Reproducibility", "Innovation", "Explainability", "Documentation"];
export const statusDefinitions: Record<ProgramStatus, string> = {
  CONFIRMED: "Participation or arrangements explicitly confirmed.",
  INVITED: "An invitation has been sent; acceptance is pending.",
  PLANNED: "Proposed; arrangements have not been finalized.",
  COMPLETED: "Finished, with supporting evidence available.",
};
export const events: {
  id: string; title: string; status: ProgramStatus; launch: string;
  submission: string; prize: { amount: number; currency: "USD"; status: "PLANNED" }; themes: string[]; problem: string; challenge: string;
  deliverables: string[]; registrationUrl: string | null; submissionUrl: string | null;
}[] = [
  {
    id: "adaptive-authorization", title: "AeglysAI Adaptive Authorization Challenge", status: "PLANNED",
    launch: "November 2026", submission: "January 2027", prize: { amount: 300, currency: "USD", status: "PLANNED" },
    themes: ["RBAC", "ABAC", "Zero Trust", "Risk-Aware Authorization", "Contextual risk", "Adaptive authorization", "Policy explainability"],
    problem: "Authorization policies must account for roles, attributes and context while making security decisions understandable and testable.",
    challenge: "Build or evaluate an authorization capability around AeglysAI. Compare policy behavior under changing context, identify failure cases and explain the security tradeoffs with reproducible evidence.",
    deliverables: ["Source code or evaluation harness and setup instructions", "Policy examples, threat assumptions and reproducible test cases", "Results with limitations and an explanation of authorization decisions"],
    registrationUrl: null, submissionUrl: null,
  },
  {
    id: "behavioral-risk", title: "AeglysAI Behavioral Risk Challenge", status: "PLANNED",
    launch: "December 2026", submission: "February 2027", prize: { amount: 300, currency: "USD", status: "PLANNED" },
    themes: ["Behavioral anomaly detection", "Risk evidence", "Identity/context signals", "Explainability", "False-positive reduction"],
    problem: "Behavioral signals can be noisy, and risk assessments need evidence that distinguishes suspicious activity from legitimate variation.",
    challenge: "Prototype or evaluate behavioral risk methods using synthetic or appropriately licensed data. Explain signal selection, assess false positives and document uncertainty. Model D is planned research, not an existing implemented capability.",
    deliverables: ["Prototype or evaluation code with reproducible setup", "Data provenance, signal definitions and privacy considerations", "Evaluation method, false-positive analysis and explainable risk evidence"],
    registrationUrl: null, submissionUrl: null,
  },
  {
    id: "autonomous-resilience", title: "AeglysAI Autonomous Resilience Challenge", status: "PLANNED",
    launch: "January 2027", submission: "March 2027", prize: { amount: 300, currency: "USD", status: "PLANNED" },
    themes: ["Incident detection", "Policy-bounded response", "Resilience", "Observability", "Distributed-system security", "Distributed-System Recovery"],
    problem: "Distributed-system incidents require observable evidence and response mechanisms constrained by explicit security policies.",
    challenge: "Build or evaluate an incident-detection or resilience prototype in an isolated environment. Define response boundaries, test failure scenarios and explain recovery behavior. Autonomous response is a challenge theme, not a claim of deployed AeglysAI functionality.",
    deliverables: ["Prototype or evaluation harness with architecture documentation", "Isolated incident scenarios, telemetry and reproducible runs", "Response policies, safeguards, recovery analysis and limitations"],
    registrationUrl: null, submissionUrl: null,
  },
];
export const keynote = { person: creator, status: "PLANNED" as ProgramStatus };
export { speakers, judges } from "./hackathonPeople";

/** Proposed operating rubric; finalize in official terms before the event opens. */
export const scoringFramework = [
  { category: "Technical Correctness", weight: 25 },
  { category: "Security & Threat Reasoning", weight: 20 },
  { category: "Architecture & Engineering", weight: 20 },
  { category: "Reproducibility", weight: 15 },
  { category: "Innovation", weight: 10 },
  { category: "Documentation & Explainability", weight: 10 },
];
export const submissionRequirements = [
  "Public GitHub repository unless an exception is approved before submission",
  "README", "Problem statement", "Architecture description", "Setup instructions", "Demo",
  "Test evidence", "Security considerations", "Limitations", "License information",
];
export const optionalSubmissionMaterials = ["Video demo", "Benchmark results", "Research notes"];
export const engineeringProblems = [
  { title: "Authorization and identity", description: "Test how roles, attributes and identity context affect policy decisions across service boundaries. Explain who can do what and why." },
  { title: "Risk and observability", description: "Explore which signals support a risk decision, how to trace its evidence and how to distinguish anomalies from legitimate operational changes." },
  { title: "Resilience and incident response", description: "Use isolated failure scenarios to evaluate detection, recovery and policy-bounded response. Document safeguards and effects on distributed services." },
];
