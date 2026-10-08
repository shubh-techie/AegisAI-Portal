# SPEC-001 — Creator profile and research identity

## Current status — 2026-10-07 synchronization

COMPLETED / IMPLEMENTED: creator profile and supplied original JPEG were committed in
`e8d7f6b` and merged by `bbe7491` (PR #3). Current identity is AeglysAI after `5b5251c`;
`creator.ts` supplies current photo alt text and a null LinkedIn URL. Root routing now
uses https://aeglysai.com (SPEC-006); the earlier seven-page/old-domain acceptance
criteria below describe their original task snapshot. The current route inventory
and image architecture are in the [README](../../README.md#frontend-architecture-and-content-ownership).
No speaking record, affiliation or citation metrics have been added. The separate
Speaking & Presentations module is PLANNED in the [roadmap](../../README.md#next-work).

Current baseline: `74c2963`, verified against local source and Git history. Implementation/merge
is not deployment evidence. The original dated task record follows unchanged.

### Speaking module follow-up — 2026-10-07

The subsequent user-authorized module is IMPLEMENTED locally in
[SPEC-010](SPEC-010-speaking-presentations.md): /speaking/, approved-record detail templates
and conditional featured cards. The earlier roadmap-only status above records the prior
snapshot. Creator metadata remains unchanged; no supplied PDF/content, recorded delivery,
keynote confirmation or new public person is inferred. Existing proposed talks and hackathon
speaker/judge arrangements retain their original status.

## Original task record

- Recorded: 2026-09-23 (CDT).
- Task: PORTAL-003.
- Status: IMPLEMENTED in the working tree, pending review; supplied portrait integrated.

## Purpose and scope

Present Shubh Prabhat as creator and maintainer while keeping AegisAI as the portal's primary identity. Preserve the existing research pages, model status, publication status and Git history. This adds no authentication, backend, analytics or new research claims.

## Requirements and implementation

- One creator data object in `src/data/creator.ts` owns the name, role, short biography, research interests, portrait path/alt and professional URLs.
- The About page presents a Creator & Maintainer section with the supplied technical biography and research interests. It explicitly distinguishes the research project's 2022 origin from the portal repository established in 2026.
- `CreatorLinks.astro` renders accessible text links with `target="_blank"` and `rel="noopener noreferrer"`. GitHub and Google Scholar use the URLs supplied for the task. LinkedIn remains `null` until a verified URL is supplied; About displays an unlinked slot, and the footer omits the unavailable link.
- The footer retains AegisAI as its wordmark, adds the expanded project name and concise creator attribution, and includes professional links.
- Publications links to the creator's Google Scholar profile without importing citation counts or representing proposed papers as published.
- Every page uses the creator's name in standard author metadata. Existing project-first Open Graph and Twitter/X descriptions remain factual. No social handles or affiliations are inferred.

## Portrait behavior

PORTAL-003 was extended by the user on 2026-09-23 to use the newly supplied photo as a round avatar. The attachment contains JPEG data despite its temporary `.png` filename; preserve its bytes at `public/images/shubh-prabhat.jpg` and reference that path from creator metadata.

At build time, check the configured image path. Render the original file through the base-path asset helper with lazy loading, asynchronous decoding, explicit dimensions and the alt text “Shubh Prabhat, creator and maintainer of AegisAI”. Display it in a circular 200px desktop / 160px mobile frame using `border-radius: 50%` and `object-fit: cover`. Only the browser presentation clips the image; do not retouch, convert or destructively crop the source file. If the asset is absent, retain the accessible initials fallback without a broken request.

## Acceptance and validation

- All seven pages build at `/` on `https://aegisai.world` under PORTAL-005; local assets, navigation, fragments, canonical URLs and sitemap references resolve. The original repository-prefix validation is preserved in the dated Portal V1 review.
- Creator metadata is consistent across About, footer, Publications and document heads.
- No invented LinkedIn destination, research measurements, citations or accepted publications are added.
- Layout supports desktop, tablet and narrow mobile screens; keyboard focus and reduced-motion behavior remain usable.
- Run `npm ci`, `npm run check`, `npm run build` and `npm test`; inspect generated output and use browser accessibility checks.
- Preserve historical commits and append documentation updates without editing prior project-history entries.

See [Portal V1 review](../PORTAL_V1_REVIEW.md) for observations and limitations and [development log](../DEVELOPMENT_LOG.md) for the task record.

### Publications/Speaking consolidation — 2026-10-08

SPEC-010 now centralizes proposed talks and approved public invitation/resource metadata
in presentations.ts. Publications retains manuscripts only with a Speaking cross-link.
GICITE is an invitation awaiting confirmation, not a creator affiliation, completed talk
or IEEE-issued invitation. creator.ts remains unchanged.

### PORTAL-SPEAKING-FINAL biography follow-up — 2026-10-08

User-approved current role is Solution Architect; project designation Creator & Maintainer,
AeglysAI; research focus AI-Driven Automation for Resilient and Secure Cloud & Distributed
Systems. Shared creator.ts/CreatorProfile/SpeakerProfile consume these fields and the existing
approved portrait. Historic Software & Distributed Systems Engineer descriptions remain in
historic snapshots and the unchanged PDF, rather than being rewritten as current biography.
