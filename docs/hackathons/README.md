# AeglysAI Community Hackathons — participant handbook

PORTAL-013-FINAL foundation, 2026-10-04. Planned events; registration is **Opening Soon**.
This is the shared participant guide, not evidence of launched events or finalized
eligibility terms. The red visual experience is stabilized; subsequent work covers
Google Forms integration, CORE-012 Model D and challenge implementation.

## Welcome

Build. Break. Measure. Improve. Explore authorization, identity, risk, observability,
resilience and policy-bounded incident response through reproducible engineering work.
AeglysAI remains an open-source research initiative; no validated outcomes are promised.

## Who Can Participate

University/graduate students, early-career engineers, platform/cloud/security/software
engineers, SREs, AI/ML engineers, distributed-systems practitioners and researchers are
the intended audience. Participation is free. Age and geographic eligibility: TBD.

## Hackathon Series

| Event | Theme | Planned launch | Planned submission |
| --- | --- | --- | --- |
| AeglysAI Adaptive Authorization Challenge | UNDERSTAND & EXTEND: RBAC, ABAC, Zero Trust, contextual risk, risk-aware authorization, explainability | November 2026 | January 2027 |
| AeglysAI Behavioral Risk Challenge | MEASURE & DETECT: behavioral signals, anomaly detection, risk scoring, identity context, false-positive reduction, explainability | December 2026 | February 2027 |
| AeglysAI Autonomous Resilience Challenge | ADAPT & RESPOND: incident detection, observability, resilience, policy-bounded response, distributed-system recovery | January 2027 | March 2027 |

Model D remains planned research; no unverified autonomous capabilities or experimental
results are claimed. FOUNDATION supports students, early-career engineers and first-time
contributors; ADVANCED supports experienced engineers, graduate researchers and advanced
students. Neither is more prestigious. Event-specific tasks/resources and rankings: TBD.

## How to Register

1. **REGISTER:** use the official Google Form when registration opens.
2. **FORK AEGLYSAI:** fork the official repository into your GitHub account. No official write access.
3. **CLONE & RUN:** clone your own fork; follow official setup instructions and demonstrate baseline build/run.
4. **COMPLETE QUALIFICATION:** show architecture understanding, successful setup, one meaningful observation, one realistic improvement and how to validate it. Not a LeetCode-style elimination exercise.
5. **SUBMIT:** official Google Form receives GitHub username, fork URL, qualification branch URL and qualification file URL.
6. **SELECTION:** organizer applies published criteria; qualification does not guarantee selection.
7. **BUILD & COMPETE:** selected participants develop scoped challenges with reproducible evidence.

From first fork to a working idea.

A proposed contributor pathway. Qualification and selection rules will be published before applications open; completing the steps does not guarantee selection.

Branch `qualification/<github-username>` and file
`community/qualification/<github-username>.md` live in your fork. See the
[qualification template](QUALIFICATION_TEMPLATE.md) and [GitHub workflow](GITHUB_WORKFLOW.md).

## Teams

Individual/team eligibility, size and changes: TBD. Selected branches in participant/team
forks use `hackathon-01/<github-username-or-team>`, `hackathon-02/<github-username-or-team>`
or `hackathon-03/<github-username-or-team>`. No PII in names.

## Rules

Official event rules and published selection criteria must precede intake. Prior-work
limits, technologies, minimum valid-project criteria, exceptions and deadlines: TBD.
A final submission does not guarantee merge into AeglysAI; normal maintainer review applies.

## Code of Conduct

Respect others; reject harassment/discrimination; provide constructive feedback and
credit collaborators. Test only authorized isolated systems. Private reporting contact
and enforcement procedure: TBD before opening registration. Do not publish sensitive reports.

## Challenge Requirements

Choose the relevant event and depth. Describe the problem, policy boundaries and evidence.
Starter resources, precise track deliverables and mentoring sessions: TBD / PLANNED.

## Submission Requirements

Public GitHub repository unless a prior exception is approved; README; problem statement;
architecture; setup instructions; demo; tests/evidence; security considerations; limitations;
license. Supply a frozen review commit/tag. Optional video, benchmarks and research notes.
See [submission requirements](SUBMISSION_REQUIREMENTS.md).

## Judging

Proposed weights: technical correctness 25%, security reasoning 20%, architecture 20%,
reproducibility 15%, innovation 10%, documentation/explainability 10%. Independent,
non-conflicted judges review eligible submissions; conflicts require recusal/reassignment.
See [judging framework](JUDGING_FRAMEWORK.md). Final anchors, ties and appeals: TBD.

## Prize

Planned **USD $300 Prize Per Hackathon**. Prize eligibility and payment are subject to
official event rules. Funding, allocation and payment arrangements: TBD. No sponsor or
award/payment is claimed.

## Digital Certificates

Registration does not earn a certificate. Participation requires qualification,
selection, actual participation and a valid minimum final project. Finalist certificates
require official finalist selection; Excellence/Winner requires verified recognition;
Appreciation requires actual judge/speaker/mentor service. Future IDs and private issuance
rules are in [certificate policy](CERTIFICATE_POLICY.md). No certificates are generated.

## Timeline

Month windows above remain planned. Exact dates/time zones, judging, showcase and results:
TBD. Unconfirmed workshops, clinics, office hours and demos remain PLANNED.

## GitHub Guidelines

Work in your fork; credit dependencies and collaborators; retain reproducible artifacts.
Official repository: [AeglysAI](https://github.com/shubh-techie/AeglysAI). Optional upstream
PRs follow review; direct writes to official main are not granted.

## Academic Integrity

Represent your own contribution honestly and attribute reuse. Detailed prior-work and
institution-compatible requirements: TBD.

## AI Tool Usage

Disclose assistance and verify generated work; do not fabricate evidence. Specific allowed
uses and disclosure format require organizer decisions: TBD.

## Security Rules

Authorized isolated testing only. No credentials, personal data or sensitive logs in public
forks. Report vulnerabilities privately to affected maintainers.

## FAQ

Participation is free; students are welcome subject to final eligibility. Teams,
international eligibility, permitted technologies and exact prerequisites: TBD.
Applying to judge/speak does not confirm appointment. No certificate merely for registration.

## Contact and privacy

Approved organizer, conduct and accessibility contact: TBD; no email address is invented.
Google Forms/Drive initially handle applications privately. V1 uses Google Forms, Google
Sheets, Google Drive, GitHub and email, with manual organizer operations. No Supabase,
PostgreSQL, Firebase, custom authentication, participant/judge accounts, custom backend,
.NET registration backend or database infrastructure.

Form/Sheet responses remain private. Never publish emails, phones, private applications,
internal selection notes or unpublished judge scores. Public profiles require approval;
privacy notice, access roles, retention/deletion and correction process: TBD before intake.

All five configurable public responder URLs are currently null / Opening Soon:
`PARTICIPANT_REGISTRATION_URL`, `QUALIFICATION_SUBMISSION_URL`, `JUDGE_APPLICATION_URL`,
`SPEAKER_INTEREST_URL`, `PROJECT_SUBMISSION_URL`. Configuration owner:
`src/data/hackathonForms.ts`; opening gates remain closed until reviewed.
