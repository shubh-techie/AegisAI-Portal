# AegisAI Research Portal

**Adaptive Intelligence for Secure Distributed Systems**

Observe. Assess. Authorize. Respond.

A static public research website built with Astro, TypeScript and CSS. This repository is separate from the [AegisAI research/application repository](https://github.com/shubh-techie/AegisAI). Research theme: AI-Driven Automation for Resilient & Secure Cloud/Distributed Systems.

## Project records and agent workflow

Start with [AGENTS.md](AGENTS.md), then read [Project history](docs/PROJECT_HISTORY.md), [Development log](docs/DEVELOPMENT_LOG.md), and relevant [specifications](docs/specs/README.md) and [ADRs](docs/adr/README.md). Inspect Git history before making changes. These records provide durable context for future sessions.

The development workflow is:

```text
main -> feature branch -> implementation -> local validation -> commit -> push
     -> pull request -> CI -> merge -> delete feature branch
```

Preserve existing commits and use new commits for corrections. Do not rewrite history, amend historical commits, alter their dates/authors or force push. Keep one logical change per commit and follow the current task's authorization before committing or publishing. Update the development log for meaningful work; significant functionality needs a SPEC, and important architectural decisions need an ADR.

This workflow describes the required process, not existing branch-protection settings. The pending deployment workflow has no pull-request trigger; pre-merge PR CI remains a setup task.

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

## Deployment

The portal is configured to deploy through **GitHub Pages using GitHub Actions**.

Temporary production URL: **https://shubh-techie.github.io/AegisAI-Portal/**

The deployment workflow is `.github/workflows/deploy-pages.yml`. It runs on pushes to `main` and supports manual `workflow_dispatch` runs from the Actions tab. Only `main` can deploy; manual runs on other branches perform the build and checks without publishing.

The build job uses Node 24 from `.nvmrc`, runs `npm ci`, `npm run check`, `npm run build`, and `npm test`, then uploads `dist/` with the official `actions/upload-pages-artifact` action. The deployment job configures Pages and publishes that artifact with `actions/deploy-pages` in the `github-pages` environment. This follows the official GitHub Pages static-site build/artifact/deploy approach with explicit npm steps for the Astro build.

Permissions are scoped by job: the build receives `contents: read`; deployment receives only `pages: write` and `id-token: write`. Concurrent deployments are serialized. The workflow uses GitHub's token; no personal access token or third-party hosting service is needed.

### First deployment

1. In this repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
2. After review, commit and merge the deployment changes into `main`. The push triggers the workflow. Alternatively, run **Deploy AegisAI Portal to GitHub Pages** manually on `main` after the workflow is available on the default branch.
3. Check the workflow's build and deployment jobs and the `github-pages` environment URL.
4. Verify Home, Research, Architecture, Experiments, Publications, About and a missing route on the published site. Confirm styles, navigation, favicon and the custom 404 work.

The first live deployment remains pending until these changes are reviewed and reach `main`; a successful local build is not confirmation of a live GitHub Pages deployment.

### Project-path configuration

`astro.config.mjs` defaults to:

```js
site: "https://shubh-techie.github.io",
base: "/AegisAI-Portal",
```

The workflow explicitly supplies these same values through `SITE_URL` and `BASE_PATH`. Internal links and local assets use the shared base-path helpers. Canonical and Open Graph URLs, robots.txt and sitemap references include the project path. The static output contains directory indexes plus `404.html`, and requires no application server.

The site uses system fonts, a local SVG favicon and inline SVG/HTML diagrams; no external font or image service is required. Tests check generated routes, local assets, metadata, sitemap references and the absence of development URLs. GitHub Pages project sites host robots.txt under the repository path; crawlers normally look for robots.txt at the origin root. Submit the project sitemap separately or manage the origin-root robots.txt when needed.

### Custom domain later

A custom domain will be configured later. No domain has been selected and no `CNAME` file is included. When that work is authorized, update both the Astro configuration and workflow URL settings, configure the domain in GitHub Pages, and rebuild to refresh canonical URLs and sitemap references.

Official references: [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/) and [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Review and next work

Review the portal wording against the finalized research specification before publishing. Model status and paper/talk titles need to be maintained as the research evolves. No publication files, datasets, experimental results, verified literature list or social preview image are supplied yet. Metadata includes text-based Open Graph and Twitter/X summary cards.

Recommended next task: review and merge the deployment configuration, then verify the first live GitHub Pages deployment. Do not publish speculative hypotheses or research outcomes.
