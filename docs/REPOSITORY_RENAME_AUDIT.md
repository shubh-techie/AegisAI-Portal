# PORTAL-011 — Repository rename audit

Recorded: 2026-10-03. Cleanup of current repository references, not a branding or hosting change.
The maintainer reports the GitHub portal rename completed; local origin is already
`https://github.com/shubh-techie/AeglysAI-Portal.git`. No remote change or repository rename
performed by this task; no live GitHub/DNS verification claimed.

## Current references updated

| Location | Classification | Resolution |
| --- | --- | --- |
| AGENTS heading | CURRENT_REPOSITORY_REFERENCE | AeglysAI-Portal |
| About repository-identity sentence | CURRENT_REPOSITORY_REFERENCE | AeglysAI-Portal; original 2026 origin unchanged |
| README | DOCUMENTATION / CURRENT_REPOSITORY_REFERENCE | Explicit portal link to https://github.com/shubh-techie/AeglysAI-Portal and core link to https://github.com/shubh-techie/AeglysAI |
| project.github | CURRENT_REPOSITORY_REFERENCE | New core URL; header/footer/CTA links reuse this value |
| Judge/participant/speaker invitations; event-opening/registration-confirmation drafts | DOCUMENTATION / CURRENT_REPOSITORY_REFERENCE | New core URL |
| Output tests | COMPATIBILITY | New current identity/core assertions; reject legacy URLs and both old/new project base paths |

Astro remains site https://aeglysai.com, base `/`. Workflow uses checkout/current-repository
context and Pages artifact/deploy actions; it has no repository-name or project-path assumption.
No workflow, CNAME, dependency, package identifier, route, theme or research-status change.
PROJECT_HISTORY stays intact as a dated historical record; rename evidence is recorded in the
new development entry. Earlier migration/merge audits and specs remain historical snapshots.

## Remaining old portal-name occurrences

The following is exhaustive for tracked text at the post-cleanup audit snapshot, excluding
this document's own historical explanation of the old name, AegisAI-Portal. No remaining
CURRENT_REPOSITORY_REFERENCE uses the former name. OLD_BASE_PATH rows are historical
observations only; COMPATIBILITY rows are test exclusions, never active routing.

| File | Lines | Classification |
| --- | --- | --- |
| `docs/DEVELOPMENT_LOG.md` | 8, 26, 64, 133, 185 | HISTORICAL, DOCUMENTATION, OLD_BASE_PATH |
| `docs/MERGE_RESOLUTION_AUDIT.md` | 19, 25, 27, 28, 37, 41, 42, 45, 46, 64, 75, 76, 81, 83, 89, 90, 92, 104 | HISTORICAL, DOCUMENTATION, OLD_BASE_PATH |
| `docs/PORTAL_V1_REVIEW.md` | 9, 18 | HISTORICAL, DOCUMENTATION, OLD_BASE_PATH |
| `docs/PROJECT_HISTORY.md` | 3, 9 | HISTORICAL, DOCUMENTATION |
| `docs/specs/SPEC-002-custom-domain.md` | 9 | HISTORICAL, DOCUMENTATION, OLD_BASE_PATH |
| `docs/specs/SPEC-006-aeglysai-domain.md` | 84, 85 | HISTORICAL, DOCUMENTATION, OLD_BASE_PATH |
| `docs/specs/SPEC-007-aeglysai-brand.md` | 41, 44 | HISTORICAL, DOCUMENTATION |
| `scripts/site.test.mjs` | 183, 284 | COMPATIBILITY, OLD_BASE_PATH |
