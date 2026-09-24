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

## 2026-09-23 — PORTAL-003: Creator profile and Portal V1 review

- **Evidence:** local implementation on `feature/creator-profile`, based on `653e401`. Git now shows the earlier deployment/documentation work in `ff1e711` and its merge through PR #2 (`653e401`); this updates the earlier pending working-tree snapshot without rewriting it. The existing Pages URL returned HTTP 200 during this task; this does not publish the current enhancement.
- Centralized creator name, role, supplied biography, research interests, portrait settings and professional URLs in `src/data/creator.ts`.
- Added `CreatorProfile.astro` and `CreatorLinks.astro`; updated About, footer, Publications and author metadata. GitHub and Google Scholar use supplied URLs; LinkedIn remains an unlinked slot because no verified URL was found.
- The required `public/images/shubh-prabhat.webp` is absent. Implemented the requested accessible placeholder, with an original-photo path ready for a future build. Did not generate, manipulate or substitute the attached person's photo. Actual WebP loading is pending supply of that file.
- Clarified the research/application timeline versus the 2026 portal repository. Model D, paper/talk preparation status and absence of experimental results remain explicit. No unsupported research claims were discovered; no new research assertions were added.
- Added `SPEC-001-creator-profile.md` and `PORTAL_V1_REVIEW.md`; updated documentation links and appended a clearly labeled working-tree milestone to project history without altering historical entries.
- **Validation:** `npm ci`, type-check, production build and all seven output tests passed. Final Chrome/axe review passed 28 page/viewport cases with no automated accessibility violations, overflow or runtime/network failures. Keyboard navigation, reduced motion, internal links/fragments and base-path assets passed. An initial footer link color-only accessibility failure was corrected with an underline before rerunning. No apparent secrets or unintended private information were found in the bounded public-source/artifact review. Existing GitHub, Scholar and Pages URLs returned HTTP 200.
- **Warnings:** npm emitted the environment-level `Unknown env config "min-release-age"` warning. No Astro/type-check errors or warnings remained. Actual person-photo loading was not tested because the specified file is missing.
- **Git integrity:** pre-task commit IDs and refs preserved; project history verified append-only. No commit, push or merge performed.
- **Status:** IMPLEMENTED locally and ready for V1 release review with the permitted portrait and LinkedIn placeholders. See the review report for limitations; the creator enhancement is not yet deployed.

## 2026-09-23 — PORTAL-003 follow-up: Supplied round creator avatar

- The user explicitly extended PORTAL-003 to use the attached author photo and present it as a round avatar on About. This supersedes the earlier missing-photo limitation without altering its historical record.
- Added `public/images/shubh-prabhat.jpg`. The supplied attachment contains JPEG data despite its temporary PNG extension; the asset is an unchanged copy, verified by matching SHA-256 hashes. No image generation, retouching, conversion or destructive cropping was performed.
- Updated the centralized portrait path and CSS to use a circular frame with `object-fit: cover`, retaining 200px desktop / 160px mobile sizes, lazy loading, asynchronous decoding, meaningful alt text and the Pages base-path helper. The initials fallback remains for a genuinely missing file.
- Updated the creator specification, README and V1 review to include the authorized photo rather than the earlier pending WebP requirement. Project history received only an appended follow-up.
- Validation: type-check, production build and all seven output tests passed. The source EXIF check found no GPS, artist, user-comment, camera-owner-name or body-serial tags; source bytes and ordinary camera metadata are preserved. The original photo is approximately 492 KiB and is lazy-loaded instead of recompressed.
- Environment note: npm still reports the external `min-release-age` warning. The initial preview-start approval review timed out; the retry found an existing preview on port 4321, which was reused and left running.
- Status: implemented locally as part of PORTAL-003; no commit, push, merge or deployment performed. LinkedIn remains unlinked pending a verified URL.
- Browser follow-up: the actual JPEG decoded from `/AegisAI-Portal/images/shubh-prabhat.jpg`; circular styling, alt text, responsive dimensions, no overflow and axe accessibility checks passed at 1440, 768, 390 and 320px. Desktop/mobile screenshots were inspected.
