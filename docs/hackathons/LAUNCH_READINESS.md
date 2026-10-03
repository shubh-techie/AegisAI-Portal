# Launch readiness — 2026-10-03

Status: portal implementation and draft operations are prepared locally; **registration
launch is not ready**. No current event, prize award, speaker invitation, judging activity
or attendance is claimed. Recheck this snapshot whenever configuration changes.

## Launch checklist

- [x] Three event/community routes and existing routes implemented; root routing retained.
- [x] Free participation and planned USD $300 per-event prize with provisional terms visible.
- [x] Eleven factual communication drafts with evidence-based send conditions prepared.
- [x] Proposed participant workflow, submission requirements and 100% scoring rubric documented.
- [x] Speaker/judge publication requires confirmation and explicit public-display approval.
- [x] Hackathon SEO and optional approved social-image configuration implemented; text-only previews by default.
- [ ] Finalize exact opening/deadline dates, time zones, session and judging/results schedules.
- [ ] Finalize eligibility/team limits, prior-work/AI disclosures, repository exceptions and licenses.
- [ ] Finalize prize funding/payment conditions, tie fallback and correction/appeal procedures.
- [ ] Confirm independent judges, conflicts procedure, availability and at least two non-conflicted reviewers per entry.
- [ ] Confirm optional speaker sessions and approved public profiles; do not treat invitations as acceptance.
- [ ] Set/test registration, judge application and submission form responder URLs, including mobile access.
- [ ] Publish privacy notice, private organizer contact, retention/access rules and conduct reporting/enforcement procedure.
- [ ] Finalize official event terms and announce only after the actual opening conditions hold.
- [ ] Review dependency audit findings before deployment; two high-severity findings were reported in prior tasks.
- [ ] Review/commit/push/CI/merge/deploy in a separately authorized task; this task stops uncommitted.
- [ ] Verify deployed version, GitHub Pages deployment evidence, canonical/social/asset URLs and live forms after deployment.

## Missing form URLs

| Configuration | State |
| --- | --- |
| PARTICIPANT_REGISTRATION_FORM_URL | null — Register for Hackathon disabled |
| JUDGE_INVITATION_FORM_URL | null — Apply to Judge disabled |
| SUBMISSION_FORM_URL | null — no submission link |
| Three per-event registrationUrl/submissionUrl pairs | null — use shared forms once set, or explicit overrides |

No Google Form or private Drive URL is invented. Speaker replies use a private correspondence
placeholder in the invitation template; no speaker form is currently required/configured.

## People and event readiness

Creator/keynote: Shubh Prabhat uses the verified creator profile/photo; keynote topic and
schedule remain planned. Guest speakers: three empty slots. Independent judges: three empty
slots, no appointments claimed. No participant roster, sponsors, partners or winners are announced.

| Event | Planned launch | Planned submission | Readiness |
| --- | --- | --- | --- |
| Adaptive Authorization Challenge | November 2026 | January 2027 | PLANNED; forms, official terms and independent review arrangements pending |
| Behavioral Risk Challenge | December 2026 | February 2027 | PLANNED; same launch dependencies; Model D remains planned research |
| Autonomous Resilience Challenge | January 2027 | March 2027 | PLANNED; same launch dependencies; no deployed autonomous response claimed |

## Validation boundary

Local build, artifact/link/metadata tests and browser checks establish portal behavior, not
GitHub Pages publication or live form operations. Hosting configuration remains static
Astro output at `https://aegisai.world/`, built/uploaded/deployed through the existing Pages
workflow. It still has no pull-request trigger. Current task validation and any live HTTP
observations are recorded in DEVELOPMENT_LOG.md; no new deployment is performed.


## PORTAL-007 review observations

- Node v24.13.0 install/type check/build and all twelve output tests passed. Ten pages
  were built. Chrome passed 44 route/viewport cases at 1440, 768, 390 and 320px with
  styles, portrait decoding, navigation, headings and no horizontal overflow.
- Required artifacts, rubric weights totaling 100%, dates, provisional prize terms,
  null form configuration and empty guest/judge records were reviewed. No private
  Drive/form/contact links or synthetic fixture people remain in production source.
- Optional image metadata was tested with a temporary existing-asset fixture; source
  was restored and output rebuilt. Final previews are text-only, not a supplied social image.
- Live read-only HTTPS checks returned 200 for the home page and all three hackathon
  routes on aegisai.world; the home response identified GitHub serving. This verifies
  existing availability, not publication of PORTAL-007 or a new Actions/deployment run.
- No full automated accessibility audit or social-platform crawler test was performed.
  npm reported two existing high-severity dependency findings; lockfile unchanged.
- Documentation links and whitespace checks passed. No messages, commit, push, merge,
  form creation or deployment performed; temporary local browser/server stopped.
