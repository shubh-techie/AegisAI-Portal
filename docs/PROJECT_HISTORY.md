# Project history

This file records only major verified milestones for **AegisAI-Portal**, the public research website repository. It does not establish the history of the separate AegisAI research/application project.

Dates below come from the recorded author and committer timestamps in Git; both agree and use the `-05:00` offset. They establish commit dates, not the GitHub repository creation time or publication date.

## 2026

- **2026-09-23 — Initial AegisAI-Portal repository record.** Commit `6c86d62` (`Initial commit`) introduced the project README. This is the earliest commit in the inspected history.
- **2026-09-23 — Astro research portal V1 created.** Commit `1b83c81` (`Establish AegisAI Research Portal V1`) added the static Astro/TypeScript/CSS portal, six content pages, custom 404, shared research metadata, diagrams, SEO configuration and production-output checks. This verifies implementation in Git, not a release or deployment.

For chronological engineering details and pending work, see [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md). Add a GitHub Pages deployment milestone only when a successful deployment is verified; the presence of a workflow file alone is insufficient.

## Verified working-tree addition — 2026-09-23

- Creator/maintainer information and research identity were added to the public AegisAI portal implementation in PORTAL-003. Evidence: `src/data/creator.ts`, creator components, About, footer, Publications and author metadata. This records the local implementation pending review, not a commit, release or deployment. The required portrait file is absent; an explicit placeholder is used.

- **2026-09-23 — PORTAL-003 portrait follow-up:** the user supplied and authorized the actual creator photo. It is now integrated as a circular About-page avatar in the working tree, superseding the missing-photo state recorded above. The original JPEG is preserved; no release or deployment is implied.


## 2026-10-03 — PORTAL-009 working-tree brand milestone

AegisAI was rebranded as AeglysAI in the portal working tree to establish a more distinctive
long-term identity for the open-source research initiative. The rebranding preserves the
original research direction, implementation history, Git history and technical lineage;
this is a continuation, not a new project.

- Old brand: AegisAI.
- New brand: AeglysAI.
- Primary domain: https://aeglysai.com (the separate domain migration is committed in `03670f7` and merged in `1d68408`).
- Evidence: current project/creator data, public pages, wordmarks, metadata and social assets; see SPEC-007. Status: local implementation pending review, not a commit, release or live deployment. Earlier milestones remain unchanged.

## Verified merged milestones — 2026-10-07 documentation audit

This update supersedes the pending-working-tree status of earlier snapshots without
rewriting them. The current repository name is **AeglysAI-Portal**. Commit/merge dates
below are Git timestamps in America/Chicago (`-05:00`), not deployment/publication dates.
The local and remote main tips were both verified as `74c2963` during this task.

| Commit date | Milestone and implementation evidence | Merge evidence |
| --- | --- | --- |
| 2026-09-23 | Static portal V1: `1b83c81`; Pages build/artifact/deploy workflow: `ff1e711` | `751e77f` (PR #1), `653e401` (PR #2) |
| 2026-09-23 | Creator profile and supplied original JPEG: `e8d7f6b` | `bbe7491` (PR #3) |
| 2026-09-25 | Root-path migration to prior aegisai.world target: `450dd0f` | `8a3646c` (PR #4) |
| 2026-10-03 | Hackathon foundation, public-profile filters and draft launch operations: `c21f16c`, `21c5615`, `45fb2a2` | `c966416` (PR #5), `280730f` (PR #6), `07ebdf3` (PR #7) |
| 2026-10-03 | Current aeglysai.com origin: `03670f7`; rebrand: `5b5251c`; theme implementation: `52ae928`, reconciliation: `247ef9e`; repository-reference cleanup: `b14722f` | `1d68408` (PR #8), `55c0edb` (PR #9), `1ae0493` (PR #10), `9bb31ec` (PR #11) |
| 2026-10-04 | Hackathon experience, handbook, qualification/certificate policy and three event routes: `8431b47`; sponsorship frontend/drafts: `280fd65` | `9030455` (PR #12), `ba5c514` (PR #13) |
| 2026-10-07 | Six media records, Home and full media carousels, publisher thumbnails/branded fallbacks; approved raster brand assets, PNG favicon/touch integration and LinkedIn Page banner: `85332d9` | `74c2963` (PR #14) |

Inspection used commit diffs/statistics and the current source. In particular `85332d9`
contains the formerly pending brand/media work together; no separate historical asset
commit is invented. Earlier log entries record local work dates and checks, which need
not match the later commit dates. Events, forms, prizes, certificates and research results
have not become operational/completed merely because their static portal UI was merged.

## Verified Git tags — 2026-10-07 audit

All four annotated tags below were confirmed locally and in origin's tag refs, including
peeled commit IDs. Ordered by tag creation time, not semantic-version sorting:

| Tag | Tagger timestamp (`-05:00`) | Target commit | Recorded tag meaning / Git scope |
| --- | --- | --- | --- |
| `v1.0.0` | 2026-09-23 20:29:00 | `bbe7491` | “AegisAI Research Portal V1”; includes creator-profile merge |
| `v1.0.0-aeglysai` | 2026-10-03 22:51:37 | `9bb31ec` | Rebrand, current-domain and portal baseline tag after repository-reference cleanup |
| `v1.1.0` | 2026-10-04 00:13:35 | `9030455` | Hackathon foundation tag; precedes sponsorship/media commits |
| `v0.2.0` | 2026-10-07 22:42:11 | `85332d9` | Media images/carousel tag on feature commit, later merged by `74c2963`; also includes raster assets |

The newest tag name `v0.2.0` follows `v1.1.0` by creation date, so the existing numbering
is not monotonically increasing semantic versioning. Preserve exact tags; no replacement,
retagging or invented next version is implied. `package.json` remains private version
`0.1.0`; this is a separate package field, not the latest portal tag. Research roadmap
labels V0.1/V0.2 refer to research phases, not these website versions. A tag's message
or presence is not proof of a GitHub Release, accepted publication or deployed site.
No current Actions/deployment record or GitHub Release object was checked in this task.

## 2026-10-08 — Local Speaking closure review (uncommitted)

PORTAL-SPEAKING-FINAL updates the existing feature/speaking-presentations work based on
74c2963. Inspected private ATAI completion certificate and individual schedule support completed
keynote/full title. GICITE user status is confirmed/upcoming, with organizer acknowledgment not
located; ETIC remains awaiting written confirmation under the task's explicit evidence gate.
Existing SPEC-010 updated before implementation, evidence tracker added, shared creator metadata
updated to Solution Architect. This is a local review milestone, not a commit, release, deployment
or independent organizer verification. Earlier records remain unchanged; details in development log.
