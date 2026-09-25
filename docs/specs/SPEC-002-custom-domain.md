# SPEC-002 — aegisai.world root-path migration

- Recorded: 2026-09-25 (America/Chicago).
- Task: PORTAL-005.
- Status: IMPLEMENTED locally, pending review and deployment.

## Problem and scope

The custom domain reaches GitHub Pages, but the existing production build uses the repository prefix `/AegisAI-Portal/`. Astro and the workflow both configured that prefix, producing incorrect asset/navigation paths and old github.io canonical URLs. Migrate URL generation to `https://aegisai.world` at `/` while retaining the static GitHub Actions deployment architecture. DNS, domain settings, Git history, visual design and research claims are outside this change.

## Configuration

`astro.config.mjs` sets `site: "https://aegisai.world"` and `base: "/"`, retaining static output, trailing slashes and sitemap generation. The workflow no longer supplies `SITE_URL`/`BASE_PATH`; Astro configuration is the single production URL source of truth. Environment variables with those old names no longer override it. The existing build, artifact upload, permissions and deployment jobs remain intact. No CNAME is added.

The existing `href()` and `asset()` helpers already handle root correctly. Canonical/Open Graph URLs derive from Astro's site and request path; sitemap and robots.txt are also generated from configuration. No page or research data rewrite is needed.

## Occurrence audit

- **Changed:** Astro defaults, GitHub Actions build environment, active README development/production URLs, and the current creator specification's routing acceptance criterion.
- **Retained:** earlier dated entries in `DEVELOPMENT_LOG.md` and the 2026-09-23 `PORTAL_V1_REVIEW.md` document the former deployment. `PROJECT_HISTORY.md` is unchanged. Old URLs in this migration record and regression-test exclusions are explanatory, not production links.
- **Regenerated:** ignored `dist/` contained old HTML, robots.txt and sitemap references; the clean production build replaces these artifacts.
- **Not production:** ignored IDE workspace state and Astro preview/dev logs contain local paths/addresses and previous project URLs. They are not copied into the Pages artifact and were not edited. Dependency files were searched; Git objects and historical commits are preserved rather than rewritten.
- **No matches in application paths:** navigation, metadata and creator photo use helpers instead of hard-coded project prefixes. No literal localhost:4321 or localhost:4322 reference was found in tracked production source.

## Assets and metadata

- CSS uses `/_astro/`; favicon uses `/favicon.svg`; creator photo uses `/images/shubh-prabhat.jpg`.
- Wordmark and architecture illustrations use HTML/CSS/inline SVG. Fonts are system fonts.
- No client JavaScript bundle, Open Graph/Twitter image asset or JSON-LD is currently present; do not invent assets or structured research claims.
- Canonical and Open Graph page URLs must use the custom origin and root routes. Twitter/X summary text and author metadata are preserved.
- Sitemap and robots.txt must use `https://aegisai.world`; 404 stays noindex.

## Acceptance and validation

1. Run `npm ci`, `npm run check`, `npm run build` and `npm test`.
2. Confirm `/`, `/research/`, `/architecture/`, `/experiments/`, `/publications/`, `/about/`, `404.html` and a missing route work from root in preview.
3. Check desktop/mobile navigation, CSS, favicon, creator photo and architecture graphics; validate internal fragments and local asset targets.
4. Inspect generated HTML/CSS/crawl artifacts for old prefixes, github.io canonical URLs and development URLs. Regression tests must reject these even if all generated pages share the same incorrect configuration.
5. Preserve research source and statuses unchanged, historical documentation unchanged except the appended log, and all existing commits/tags/branch tips.
6. Stop any preview started for verification. Report local validation separately from live deployment: the fix is not live until the reviewed changes deploy.

Reference: [Astro base configuration](https://docs.astro.build/en/reference/configuration-reference/#base).
