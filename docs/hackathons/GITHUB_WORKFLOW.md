# AeglysAI participant GitHub workflow

PORTAL-013-FINAL foundation convention, 2026-10-04. Applications are not open.

## Fork and qualification

Official repository: [shubh-techie/AeglysAI](https://github.com/shubh-techie/AeglysAI).
Fork it into your own GitHub account. Participants do not receive official repository
write access. Clone **your own fork**, follow the official repository's current README
for prerequisites and setup, and demonstrate the baseline builds/runs. This portal
does not prescribe or verify the core application's runtime or commands.

Create `qualification/<github-username>` in your fork; example:
`qualification/example-user`. Do not put email, phone, student IDs or other PII in
branch names. Copy the [qualification template](QUALIFICATION_TEMPLATE.md) into
`community/qualification/<github-username>.md`. Document actual build/test outcomes,
architecture understanding, one meaningful observation, one realistic improvement,
its value and a validation approach. Qualification is not a LeetCode-style elimination
exercise. No upstream pull request or accepted contribution is required.

Push to your fork, then supply your GitHub username, fork URL, qualification branch
URL and qualification file URL in the official qualification Google Form when open.
Do not send private evidence through a public issue. Organizer review uses published
selection criteria; completing qualification does not guarantee selection. Criteria,
capacity, review dates and correction/appeal procedure remain TBD before intake opens.

## Selected participant branches

Use these conceptual conventions in participant/team forks:

- `hackathon-01/<github-username-or-team>` — Adaptive Authorization.
- `hackathon-02/<github-username-or-team>` — Behavioral Risk.
- `hackathon-03/<github-username-or-team>` — Autonomous Resilience.

Team eligibility, size and approved public team naming remain TBD. Never grant or
request direct writes to official main. Follow event-specific scope, build/test/document,
and submit the final repository and frozen review commit/tag through the official form.

## Contribution pathway

```text
Official AeglysAI Repository
→ Participant Fork
→ Qualification Branch
→ Local Build / Run
→ Qualification File
→ Push to Participant Fork
→ Google Form Submission
→ Organizer Review
→ Selection
→ Hackathon Branch
→ Build / Test / Document
→ Final Submission
→ Optional Pull Request after review
```

Final submission does not automatically mean code will merge into AeglysAI. Maintainers
retain normal security, correctness, architecture, testing, licensing and code-review
standards. An upstream PR is optional and follows review or an explicit maintainer
request. Keep experiments isolated and authorized; never publish credentials or
sensitive data. Use truthful implementation and evaluation status, including Model D
as planned research unless the core repository provides verified completion evidence.
