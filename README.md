# AegisAI Research Portal

**Adaptive Intelligence for Secure Distributed Systems**

Observe. Assess. Authorize. Respond.

A static public research website built with Astro, TypeScript and CSS. This repository is separate from the [AegisAI research/application repository](https://github.com/shubh-techie/AegisAI). Research theme: AI-Driven Automation for Resilient & Secure Cloud/Distributed Systems.

## Local development

Use Node.js 24 LTS (`nvm use` if you use nvm) and npm.

```sh
npm install
npm run dev
```

Open the local address printed by Astro, including `/AegisAI-Portal/`.

```sh
npm run check
npm run build
npm test
npm run preview
```

`npm test` checks the built `dist/` output, so run the build first. Production pages contain no client-side JavaScript. No React, database, backend, authentication, CMS, analytics, cookies, external fonts or marketing SDKs are included.

## Site structure

| Route (relative to the configured base) | Page                  |
| --------------------------------------- | --------------------- |
| `/`                                     | Home                  |
| `/research/`                            | Research              |
| `/architecture/`                        | Architecture          |
| `/experiments/`                         | Experiments           |
| `/publications/`                        | Publications & Talks  |
| `/about/`                               | About & Roadmap       |
| `/404.html`                             | Custom not-found page |

- `src/data/project.ts`: shared project details, models, statuses, navigation, publication topics and timeline.
- `src/components/`: Header, Footer, Hero, StatusBadge, ModelCard, ArchitectureDiagram, ResearchTimeline and SectionHeading.
- `src/layouts/Layout.astro`: semantic page shell and SEO metadata.
- `src/styles/global.css`: responsive design, diagrams, focus styles and reduced-motion support.
- `src/pages/robots.txt.ts`: build-time robots.txt generation; no runtime server is required.
- `public/`: local SVG favicon and `.nojekyll` marker.
- `scripts/site.test.mjs`: production route, link, metadata and research-integrity checks.

## Research content and integrity

The initial content follows TASK PORTAL-001; the separate application source has not been audited in this repository. Models A–C are labeled implemented according to that specification:

- A: RBAC.
- B: RBAC + ABAC.
- C: RBAC + deterministic contextual risk.
- D: RBAC + ABAC + behavioral adaptive risk — **planned research**, not implemented.

Implementation is not evidence of measured research outcomes. Architecture diagrams are conceptual: solid nodes describe existing baseline capabilities, while dashed amber nodes describe proposed research. Telemetry instrumentation and the feedback loop are shown as planned, without asserting deployed service topology. The decision outputs are conceptual vocabulary, not a per-model capability matrix.

Hypotheses await the finalized research specification. Papers and talks are in preparation. There are no invented measurements, citations, affiliations, acceptance claims or publication metadata. `Experimental` is defined as a status reserved for work under evaluation; no completed comparative experiment is claimed.

## GitHub Pages deployment strategy (not deployed)

Default build configuration targets `https://shubh-techie.github.io/AegisAI-Portal/`. This is a proposed deployment address, not a claim that the website is live. Confirm the account and repository path before deployment.

`astro.config.mjs` sets a static output, `site` origin and repository `base`. Internal links, assets, canonical URLs, robots.txt and sitemap use this configuration. Override at build time for a custom domain or another path:

```sh
SITE_URL=https://research.example.org BASE_PATH=/ npm run build
```

`SITE_URL` must be an absolute origin; put any subpath in `BASE_PATH`. Use `/` explicitly for a root-hosted site. Changing either setting requires rebuilding.

After review and explicit deployment authorization:

1. Enable GitHub Pages with GitHub Actions as its source.
2. Add a reviewed workflow that checks out the repository, sets up Node 24, runs `npm ci`, `npm run check`, `npm run build`, and `npm test`.
3. Upload `dist/` with the GitHub Pages artifact action, then deploy that artifact with the Pages deployment action using the `github-pages` environment and appropriate `pages: write` / `id-token: write` permissions.
4. Verify all six routes, asset paths, canonical metadata, sitemap and the custom 404 on the published URL.

No deployment workflow is enabled in this task. The build emits directory indexes and `404.html` suitable for GitHub Pages; it needs no application server. GitHub Pages project sites host robots.txt under the repository path; search engines generally discover robots.txt at the origin root. Control the root site's robots.txt or submit the project sitemap separately when deploying under a project subpath.

Official references: [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/) and [Astro sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/).

## Review and next work

Review the portal wording against the finalized research specification before publishing. Model status and paper/talk titles need to be maintained as the research evolves. No publication files, datasets, experimental results, verified literature list or social preview image are supplied yet. Metadata includes text-based Open Graph and Twitter/X summary cards.

Recommended next task: review content and accessibility on the target deployment URL configuration, then authorize a GitHub Pages workflow separately. Do not publish speculative hypotheses or research outcomes.
