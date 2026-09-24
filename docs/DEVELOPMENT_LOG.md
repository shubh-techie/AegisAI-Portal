# Development log

Record meaningful engineering changes in chronological order. This is not a copy of every Git commit. Distinguish committed implementation, uncommitted work, local validation and remote outcomes. Add evidence references where available; do not invent dates or infer test results from the presence of test files.

## 2026-09-23 — Repository foundation

- **Evidence:** `6c86d62`, `Initial commit`; author and committer timestamps both `2026-09-23T18:32:10-05:00`.
- Added the initial AegisAI-Portal README with the project name and expanded title.
- **Status:** committed repository foundation. No website implementation in this commit.

## 2026-09-23 — PORTAL-001: Research portal V1

- **Evidence:** `1b83c81`, `Establish AegisAI Research Portal V1`; author and committer timestamps both `2026-09-23T18:58:05-05:00`.
- Added the static Astro, TypeScript and CSS website: Home, Research, Architecture, Experiments, Publications & Talks, About & Roadmap, and a custom 404.
- Centralized project/model metadata; added shared layout and components, research diagrams, status badges and timeline.
- Added responsive styling, keyboard focus and skip navigation, reduced-motion support, metadata, favicon, sitemap and robots.txt generation.
- Configured the GitHub Pages project origin and base path; documented development and a future deployment strategy.
- Added production-output checks for routes, metadata, links, research wording and absence of client scripts.
- **Status:** IMPLEMENTED and committed on the feature branch. The commit does not establish a merge, successful hosted deployment or research results. Research Model D is PLANNED; paper/talk topics remain IN PREPARATION.
- **Validation evidence boundary:** the commit contains checks, but their historical execution results are not encoded in the commit. Use current local checks or retained CI output when reporting validation.

## 2026-09-23 — PORTAL-002: GitHub Pages deployment configuration

- **Evidence:** working-tree snapshot taken during history setup; changes are not yet committed. Files: `.github/workflows/deploy-pages.yml`, `astro.config.mjs`, `scripts/site.test.mjs` and the Deployment section of `README.md`.
- Added an official GitHub Actions build/artifact/deploy workflow for pushes to `main` and manual dispatch. Deployment is limited to `main` and the `github-pages` environment, with job-scoped permissions.
- Retained `site: https://shubh-techie.github.io` and `base: /AegisAI-Portal`; the workflow supplies matching environment values. Added a configuration comment and a generated-output check for development URLs and unintended CNAME files.
- Documented the expected URL, first deployment steps and later custom-domain work without selecting a domain or adding CNAME.
- **Local validation recorded in this working session:** `npm ci`, `npm run build`, `npm run check` and six output tests passed. A temporary Chrome check passed 32 route/viewport combinations, including styles, system fonts, SVG favicon and navigation. Public GitHub repository links returned HTTP 200; the expected Pages URL returned HTTP 404 at that check. These are local/session observations, not committed CI records or claims about future availability.
- **Status:** workflow implemented locally, pending review/commit/merge and first verified deployment. Remote Pages settings and a successful Actions deployment have not been verified. The temporary preview used for validation was stopped.
- **Follow-up:** select GitHub Actions as the Pages source, review and merge the changes, then verify the live site. The workflow does not have a `pull_request` trigger; pre-merge PR CI required by the documented development workflow remains to be configured.

## 2026-09-23 — Durable history and agent workflow

- **Evidence:** this documentation-only working-tree change; date is the local session date (CDT). No historical commit is assigned to this task.
- Created root `AGENTS.md` with mandatory reading order, Git-history protections, feature-branch workflow, documentation duties and research-status definitions.
- Created `docs/PROJECT_HISTORY.md` from verified Git milestones and this chronological development log. Kept pending deployment separate from completed project history.
- Created tracked `docs/adr/` and `docs/specs/` directories with authoring guidance. No historical ADR or finalized research specification was invented.
- Added a durable documentation index to the root README while preserving its pending deployment edits.
- **Validation:** checked milestone dates and changes against Git, reviewed existing deployment/configuration files, and checked documentation links and whitespace. No application behavior changed; no additional build or runtime tests were required for this documentation-only task.
- **Status:** documentation created locally, pending review and commit. Existing PORTAL-002 changes remain uncommitted and should be kept as a separate logical change when commits are authorized.
