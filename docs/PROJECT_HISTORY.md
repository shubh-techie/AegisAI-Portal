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
