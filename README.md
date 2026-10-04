# AeglysAI Research Portal

**Adaptive Intelligence for Secure & Resilient Distributed Systems**

Observe. Assess. Authorize. Respond.

A static public research website built with Astro, TypeScript and CSS. The [AeglysAI-Portal repository](https://github.com/shubh-techie/AeglysAI-Portal) is separate from the [AeglysAI research/application repository](https://github.com/shubh-techie/AeglysAI). Research theme: AI-Driven Automation for Resilient & Secure Cloud/Distributed Systems.

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

Open the local address printed by Astro at `/`. Development and preview use the same root routes as production.

```sh
npm run check
npm run build
npm test
npm run preview
```

`npm test` checks the built `dist/` output, so run the build first. Production pages contain one small inline theme script, with no client JavaScript bundle. Theme defaults to the system preference; the header sun/moon button saves a light/dark choice in localStorage, and the monitor button restores system mode. No React, database, backend, authentication, CMS, analytics, cookies, external fonts or marketing SDKs are included.

## Site structure

| Route (relative to the configured base) | Page                  |
| --------------------------------------- | --------------------- |
| `/`                                     | Home                  |
| `/research/`                            | Research              |
| `/architecture/`                        | Architecture          |
| `/experiments/`                         | Experiments           |
| `/publications/`                        | Publications & Talks  |
| `/about/`                               | About & Roadmap       |
| `/hackathons/`                          | Community Hackathons  |
| `/hackathons/events/`                   | Hackathon Events      |
| `/hackathons/community/`                | Hackathon Community   |
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

## Creator and professional profiles

Creator details are centralized in `src/data/creator.ts`. About presents the technical biography and research interests; the footer and Publications page reuse the supplied professional links. LinkedIn has an unlinked About slot until a verified URL is provided.

The supplied creator portrait is stored unchanged at `public/images/shubh-prabhat.jpg` (the attachment contains JPEG data). About displays it as a round 200px desktop / 160px mobile avatar using CSS, with meaningful alt text, lazy loading and the GitHub Pages base-path helper. The source image is not retouched, converted or destructively cropped. The build retains an accessible initials fallback if the configured image is missing.

See [creator specification](docs/specs/SPEC-001-creator-profile.md) and [Portal V1 review](docs/PORTAL_V1_REVIEW.md) for implementation status, validation and remaining limitations.

## Deployment

The portal is configured to deploy through **GitHub Pages using GitHub Actions**.

Canonical production URL: **https://aeglysai.com/**

The deployment workflow is `.github/workflows/deploy-pages.yml`. It runs on pushes to `main` and supports manual `workflow_dispatch` runs from the Actions tab. Only `main` can deploy; manual runs on other branches perform the build and checks without publishing.

The build job uses Node 24 from `.nvmrc`, runs `npm ci`, `npm run check`, `npm run build`, and `npm test`, then uploads `dist/` with the official `actions/upload-pages-artifact` action. The deployment job configures Pages and publishes that artifact with `actions/deploy-pages` in the `github-pages` environment. This follows the official GitHub Pages static-site build/artifact/deploy approach with explicit npm steps for the Astro build.

Permissions are scoped by job: the build receives `contents: read`; deployment receives only `pages: write` and `id-token: write`. Concurrent deployments are serialized. The workflow uses GitHub's token; no personal access token or third-party hosting service is needed.

### Deployment workflow

1. In this repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
2. After review, commit and merge approved portal changes into `main`. The push triggers the workflow. Alternatively, run **Deploy AeglysAI Portal to GitHub Pages** manually on `main` after the workflow is available on the default branch.
3. Check the workflow's build and deployment jobs and the `github-pages` environment URL.
4. Verify Home, Research, Architecture, Experiments, Publications, About and a missing route on the published site. Confirm styles, navigation, favicon and the custom 404 work.

Configure and verify the production custom domain in GitHub Pages before deployment. A successful local build does not publish changes; the workflow deploys the reviewed version after it reaches `main`.

### Custom-domain root configuration

`astro.config.mjs` is the production URL source of truth:

```js
site: "https://aeglysai.com",
base: "/",
```

The deployment workflow uses this configuration directly, without `SITE_URL` or `BASE_PATH` overrides. The static output and GitHub Pages build/upload/deploy architecture remain unchanged. Do not restore the former repository prefix when building for this domain.

Internal navigation resolves to `/`, `/research/`, `/architecture/`, `/experiments/`, `/publications/` and `/about/`. CSS, favicon and creator photo are served from root paths. Canonical and Open Graph URLs use `https://aeglysai.com`; robots.txt references `https://aeglysai.com/sitemap-index.xml`. The build includes directory indexes plus `404.html` and requires no application server.

The site uses system fonts, a local SVG favicon and inline SVG/HTML diagrams; there are no external font services, client JavaScript bundles, JSON-LD; social previews use the local AeglysAI asset. Twitter/X metadata uses the shared large-image preview. Tests reject old deployment paths and development URLs in generated artifacts.

The existing GitHub Actions custom-domain setup is retained. No `CNAME` file is added. See [SPEC-002 — Custom-domain migration](docs/specs/SPEC-002-custom-domain.md) for the audit and validation requirements. Earlier deployment URLs in historical logs and the dated V1 review are intentionally preserved.

Official references: [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/) and [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Review and next work

Review the portal wording against the finalized research specification before publishing. Model status and paper/talk titles need to be maintained as the research evolves. No publication files, datasets, experimental results or verified literature list are supplied yet. Open Graph and Twitter/X metadata use the local AeglysAI social preview.

Recommended next task: review the domain-only migration, then verify the deployed routes and assets at aeglysai.com after an authorized deployment. Do not publish speculative hypotheses or research outcomes.

## Community hackathon configuration

The planned program is configured in `src/data/hackathons.ts`: events, status definitions,
speaker/judge slots and registration/submission links. Creator identity and portrait remain
owned by `src/data/creator.ts` and reused through `CreatorProfile.astro`.

Configure official HTTPS Google Form responder URLs in `src/data/hackathonForms.ts`: `PARTICIPANT_REGISTRATION_URL`, `QUALIFICATION_SUBMISSION_URL`, `JUDGE_APPLICATION_URL`, `SPEAKER_INTEREST_URL` and `PROJECT_SUBMISSION_URL`. All default to `null`; each collection gate defaults to `open: false`. Open a gate only after approving its terms/privacy and testing signed-out access. Legacy `PARTICIPANT_REGISTRATION_FORM_URL`, `JUDGE_INVITATION_FORM_URL` and `SUBMISSION_FORM_URL` are derived compatibility settings. The landing page shows Start Qualification with Opening Soon while unavailable; existing event/community actions retain their labels. `PARTICIPANT_FORM_URL` is a compatibility
alias for the participant registration setting. Event-specific registration URLs override
the shared participant form; submission URLs are configured separately. Rebuild after changes.
No authentication, participant database or application collection is added to this portal.
Google Forms/Drive will initially handle applications; no live external workflow is configured here.

`src/data/hackathonPeople.ts` provides three guest speaker slots and three independent judge
slots. Fill a slot only with approved public information. Speaker records support name,
title, organization, local photo/alt, bio, topics, LinkedIn URL and CONFIRMED/INVITED status.
Judge records additionally support technical expertise and event assignments (event IDs
from `hackathons.ts`). Public profiles require CONFIRMED status and `publicDisplayApproved: true`.
Invited and unapproved records render anonymous planned slots; they are never presented as confirmed.
The keynote continues to reuse the existing approved creator profile; scheduling remains planned.

This repository is public: keep application responses, private emails, phone numbers,
Drive IDs, conflict disclosures, invitation tracking and internal notes outside repository
configuration. Status is separate from permission to publish. Request consent for the exact
public fields and photo before adding them, and remove/rebuild if permission is withdrawn.
Invitation templates are available for [judges](docs/hackathons/JUDGE_INVITATION_TEMPLATE.md),
[speakers](docs/hackathons/SPEAKER_INVITATION_TEMPLATE.md) and
[participants](docs/hackathons/PARTICIPANT_INVITATION_TEMPLATE.md). Templates are drafts;
replace placeholders privately and verify terms before sending. No invitations were sent.
See [SPEC-004](docs/specs/SPEC-004-participation-workflow.md) for PORTAL-006.

All three events and keynote arrangements are PLANNED. Free participation, proposed rules
and a planned USD $300 prize per event are presented subject to finalized official terms.
Before opening registration, publish exact deadlines/time zones, eligibility, award and
judging procedures, licensing requirements, and conduct reporting/enforcement details.
See [SPEC-003](docs/specs/SPEC-003-hackathon-program.md).

## Hackathon launch operations

See the [launch checklist](docs/hackathons/LAUNCH_READINESS.md),
[participant operations](docs/hackathons/OPERATIONS.md),
[proposed judging framework](docs/hackathons/JUDGING_FRAMEWORK.md),
[submission requirements](docs/hackathons/SUBMISSION_REQUIREMENTS.md) and
[eleven communication drafts](docs/hackathons/communications/README.md).
The operational framework is prepared; event terms and live forms remain pending.
No email infrastructure, messages sent, judging or results are implied.

`SUBMISSION_FORM_URL` now configures the shared submission form; all three shared form
URLs and per-event overrides remain null. Use public responder URLs after testing;
never place private Drive folders or application responses in public configuration.

`src/data/hackathonSeo.ts` owns per-page SEO; `src/data/social.ts` owns the shared social asset referenced by `hackathonSocialPreview.image` and the site layout.
The configured 1200×630 PNG produces Open Graph/Twitter large-image cards. To enable an image,
add an approved local raster asset under `public/` and configure its relative `path`,
meaningful `alt`, `width` and `height` (typically 1200×630). Rebuild and verify the asset,
absolute custom-domain image URL and large-image metadata before publication.
The code-authored social image is stored at `public/images/aeglysai-social.png`, with an editable SVG source alongside it. See [SPEC-005](docs/specs/SPEC-005-launch-readiness.md) for original launch work and [SPEC-007](docs/specs/SPEC-007-aeglysai-brand.md) for the current brand/social asset.


## PORTAL-008 production domain

The production origin is now configured as `https://aeglysai.com` with base `/`.
At the PORTAL-008 domain-only migration, AegisAI remained the portal brand; no repository rename or old-domain redirect was included. PORTAL-009 updates the current brand separately.
GitHub Actions Pages deployment is preserved. GitHub Pages custom-domain, apex DNS and
HTTPS settings require separate verification before publishing. No CNAME file is managed
by this repository. See [SPEC-006](docs/specs/SPEC-006-aeglysai-domain.md) for the classified
URL audit. Dated history and prior domain-migration specifications retain their original URLs.


## Current brand

AeglysAI is the evolution of the initiative previously known as AegisAI. Existing research direction, model IDs, publication titles and technical lineage are preserved. GitHub repository URLs and the internal package identifier remain unchanged.

### Hackathon foundation closure

The series landing links to /hackathons/adaptive-authorization/,
/hackathons/behavioral-risk/ and /hackathons/autonomous-resilience/. The events overview
and community routes remain available. Shared guidance: [handbook](docs/hackathons/README.md),
[qualification template](docs/hackathons/QUALIFICATION_TEMPLATE.md),
[GitHub workflow](docs/hackathons/GITHUB_WORKFLOW.md) and
[certificate policy](docs/hackathons/CERTIFICATE_POLICY.md). Documents newly added in
this review diff will be available on GitHub main only after a separately authorized merge.

### Hackathon sponsorship V1

`/hackathons/sponsors/` reuses the hackathon red visual system. Proposed tiers,
confirmed-only public recognition and event-specific cash prize allocations live in
`src/data/hackathonSponsorship.ts`. `SPONSOR_INTEREST_FORM_URL` and approved contact
remain null, with the collection gate closed. No payments or automatic acceptance.
See [sponsorship program](docs/hackathons/SPONSORSHIP.md) and
[organizer-review draft terms](docs/hackathons/SPONSORSHIP_TERMS_DRAFT.md).
