# Participant and event operations

Prepared 2026-10-03 for PORTAL-007. This is a proposed manual workflow; Google Forms/Drive
are the intended initial application tools, not a configured integration. The portal remains
static, with no authentication, participant database or bulk-email infrastructure.

Visitor → Hackathon Portal → Google Registration Form → Registration Confirmation →
GitHub Challenge → Build → Submission Form → Eligibility Check → Independent Judges →
Scoring → Results → Winner Announcement

| Step | Responsible party / evidence before advancing |
| --- | --- |
| Visitor → Portal | Public pages present planned status, accurate dates/terms and free participation |
| Google Registration Form | Organizer sets approved public form URL after testing access, privacy notice and event terms |
| Registration Confirmation | Organizer verifies actual response and sends receipt template; no eligibility/selection inferred |
| GitHub Challenge | Participant selects challenge and reads research repository, scope and event requirements |
| Build | Participant develops/evaluates in an authorized isolated environment and documents evidence |
| Submission Form | Organizer opens tested public form; participant supplies required artifacts and frozen commit/tag |
| Eligibility Check | Organizer applies published timing, eligibility and required-artifact rules consistently |
| Independent Judges | At least two confirmed, non-conflicted judges review each eligible entry |
| Scoring | Judges score independently using final published rubric; organizer checks completeness/arithmetic |
| Results | Resolve published ties/corrections/appeals, approve results and obtain display permissions |
| Winner Announcement | Send only for approved verified selection; describe payment status separately and truthfully |

Registration and submission receipts are separate. Registration does not imply a submission,
receipt does not imply eligibility, and scoring does not imply a winner. A winner announcement
requires evidence and approved display information; it must not imply payment without proof.

## Configuration and private operations

- `PARTICIPANT_REGISTRATION_FORM_URL`: public registration form (currently null).
- `JUDGE_INVITATION_FORM_URL`: public judge application form (currently null).
- `SUBMISSION_FORM_URL`: public submission form (currently null).
- Per-event `registrationUrl` and `submissionUrl` override shared forms (currently all null).
- `PARTICIPANT_FORM_URL` is a compatibility alias, not an additional form.

Keep organizer ownership, recipient contacts, Form/Drive responses, review assignments,
conflict disclosures, score sheets and private access links outside this public repository.
Publish only intended responder URLs, never a Drive folder/editor/share-management URL.
Restrict application/review access to authorized organizers/judges; publish a privacy notice
with purpose, access, retention, withdrawal/correction and an approved private contact before
collecting applications. Consent to participate is separate from permission to publish a profile.

Manually verify a response before using a communication template. Check dates/time zones,
message send conditions, required links, consent/preferences and facts. Store filled copies
and delivery evidence privately. No messages are sent by this task; no mailing infrastructure
or automatic scoring/results system is implemented.

Use [communications](communications/README.md), [submission requirements](SUBMISSION_REQUIREMENTS.md),
[judging framework](JUDGING_FRAMEWORK.md) and [launch checklist](LAUNCH_READINESS.md).
