# SPEC-006 — Production domain migration to aeglysai.com

## Current status — 2026-10-07 synchronization

COMPLETED / IMPLEMENTED origin configuration: `03670f7`, merged by `1d68408`
(PR #8). Current origin remains https://aeglysai.com, base `/`, output static.
Current brand/social preview now use AeglysAI (SPEC-007); fourteen content routes plus custom 404 and
robots.txt exist including Media Coverage (SPEC-009). Site config remains the source
for canonicals, sitemap and robots. No new hosting dependency, tracked CNAME or
old-domain redirect exists. Earlier null-image/old-repository notes below are the
original domain-only snapshot. Successful current deployment/DNS/HTTPS was not
verified in this synchronization.

Current baseline: `74c2963`, verified against local source and Git history. Implementation/merge
is not deployment evidence. The original dated task record follows unchanged.

## Original task record

- Recorded: 2026-10-03 (America/Chicago).
- Task: PORTAL-008.
- Status: IMPLEMENTED locally, uncommitted for review; no live migration claimed.
- Baseline: clean `feature/aeglysai-domain-migration` at `07ebdf3`, also the recorded main tip.

## Scope and implementation

Production domain migration initiated from the previous hosting/domain configuration to
`https://aeglysai.com`. Change Astro site origin only; retain existing base `/`, static
output, trailing slashes and sitemap integration. Keep AegisAI brand, repository identity,
research content, all nine content routes/custom 404 and Git history. No old-domain redirect.

Internal links and assets already use root/base helpers. Layout canonical/Open Graph URLs,
optional social-image URLs, sitemap and robots.txt derive from Astro site; no separate
hard-coded application URL requires replacement. Twitter text/card metadata remains branded
AegisAI. No RSS/feed or structured data is present. Social image configuration is null;
image URL behavior remains derived from site when an approved asset is supplied.

The existing GitHub Actions Pages build/upload/deploy workflow has no site/base overrides
and needs no modification. No tracked/public CNAME exists; none is created or removed.
No hosting provider, dependency, DNS, GitHub setting or redirect architecture is changed.

## URL occurrence audit

The following classifies pre-change occurrences in tracked current application/documentation.
Historical snapshots and source-level regression exclusions remain intact. The repository name
in GitHub URLs and local paths is an EXTERNAL_REFERENCE, not a production base path.

| Location / occurrences | Classification | Action |
| --- | --- | --- |
| astro.config.mjs site value | CURRENT_PRODUCTION_URL | Change old domain to new apex origin |
| README current canonical, config example, metadata/robots guidance and next-work URL | CURRENT_PRODUCTION_URL | Update current guidance |
| scripts/site.test.mjs expected origin, page URLs and sitemap URL | CURRENT_PRODUCTION_URL | Update required origin; retain old-path exclusions and add old-domain exclusion |
| Participant invitation template event URL and conduct URL | CURRENT_PRODUCTION_URL | Update reusable links |
| Launch readiness current hosting configuration paragraph | CURRENT_PRODUCTION_URL | Update; retain dated live observations |
| DEVELOPMENT_LOG dated domain, github.io and project-prefix observations | HISTORICAL_REFERENCE | Preserve; append new factual entry |
| SPEC-002 old domain/base-path migration and constraints | HISTORICAL_REFERENCE | Preserve prior task record; this spec supersedes the production target |
| SPEC-001 creator acceptance observation under prior PORTAL-005 | HISTORICAL_REFERENCE | Preserve prior task evidence; this spec defines current domain requirements |
| specs/README SPEC-002 title/index description | HISTORICAL_REFERENCE | Preserve historical specification title |
| PORTAL_V1_REVIEW prior base-path/photo validation | HISTORICAL_REFERENCE | Preserve dated review |
| LAUNCH_READINESS dated PORTAL-007 live observations | HISTORICAL_REFERENCE | Preserve prior observation, not current deployment evidence |
| site.test.mjs forbidden project prefix/github.io regex | HISTORICAL_REFERENCE | Retain exclusions; they are not rendered URLs |
| src navigation/footer/buttons/cards/pages | INTERNAL_ROUTE | No old-origin/prefix literals; helpers already generate root routes |
| src/public assets and asset helper | ASSET_PATH | No old-origin/prefix literals; existing root assets preserved |
| Existing GitHub repository/profile URLs | EXTERNAL_REFERENCE | Preserve; no repository rename |

Ignored dist artifacts contain prior canonical/crawl URLs until rebuilding; regenerate and
audit rather than manually editing them. Git objects and dependency/IDE caches are not deployed
application source; historical objects are preserved. No intentional old-origin reference should
remain in required generated HTML/CSS/XML/TXT/SVG/JS/JSON artifacts.

## Acceptance and validation

Use Node 24; run npm ci, check, build, test and git diff --check. Verify all content routes,
404/missing route, local assets/links, root navigation, metadata, sitemap and robots. Assert
production origin is aeglysai.com, base is `/`, and generated assets contain no old domain,
GitHub Pages origin or project prefix. Check desktop/mobile creator photo, CSS and navigation.
Preserve all refs, tag object IDs and historical commit IDs; no commit/push/merge permitted.
Record observed outcomes in DEVELOPMENT_LOG.md.

## Manual hosting work

GitHub Pages custom domain and DNS/HTTPS require separate verification/configuration for
`aeglysai.com`; this local task does not change those settings. Retain GitHub Actions as Pages
source, point the apex domain to GitHub Pages using its supported DNS configuration, verify
domain ownership where required, and verify HTTPS and all routes after authorized deployment.
Old-domain redirection and full AegisAI → AeglysAI branding remain separate tasks. No ADR is
needed: the static rendering and existing deployment architecture are retained.


## Observed validation and remaining references

Node v24.13.0 npm ci succeeded; type check reported zero errors/warnings/hints; build
emitted ten pages; all twelve tests passed. Browser checks passed 44 route/viewport cases
including all nine content routes, 404 and a missing route at 1440/768/390/320px. Root CSS,
favicon, creator photo, headings/navigation and no horizontal overflow passed. No client
JavaScript bundles are emitted. Optional social-image URLs were tested with a temporary
existing-asset configuration and verified against the new origin, then restored to null
and final output rebuilt. Temporary browser/server stopped; documentation links and
whitespace checks passed. No full automated accessibility audit or live-domain/DNS check.

Generated output contains zero `/AegisAI-Portal`, `shubh-techie.github.io` or `aegisai.world`
occurrences. The bare `AegisAI-Portal` name remains once in About's factual repository-identity
sentence (EXTERNAL_REFERENCE); this is not a route/asset dependency and is intentionally preserved.
Prior domain/path occurrences remain only in historical documentation and exclusion regexes,
plus this migration's audit/log explanations. All refs/tags and reachable commit IDs match
the starting snapshot; main is unchanged. npm reports the two pre-existing high-severity
findings and environment warning; dependency versions/lockfile unchanged.
