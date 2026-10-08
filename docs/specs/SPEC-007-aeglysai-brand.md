# SPEC-007 — AegisAI → AeglysAI brand migration

- Recorded: 2026-10-03 (America/Chicago).
- Task: PORTAL-009.
- Status: IMPLEMENTED locally, uncommitted for review; no deployment claimed.
- Baseline: clean `feature/aeglysai-rebrand` at `1d68408`. Domain migration was committed in `03670f7` and merged in `1d68408`; domain remains https://aeglysai.com.

## Identity and scope

AeglysAI continues the initiative previously known as AegisAI; it is not a new project.
Official spelling is AeglysAI. Primary tagline: Adaptive Intelligence for Secure & Resilient
Distributed Systems. Preserve Observe. Assess. Authorize. Respond., open-source engineering/
research positioning and intelligent control loops bounded by deterministic mechanisms.

Update current public source, header/footer/home wordmarks, page copy, metadata, alt/accessibility
labels, creator current description and future hackathon names. Keep the existing visual system.
About includes the supplied understated continuity note. Models A/B/C/D, implementation/planned
statuses, paper/talk titles, event IDs, routes and actual creator/photo/professional links remain.

A shared original 1200×630 social PNG with editable SVG uses the new name, full tagline,
Observe • Assess • Authorize • Respond and the existing palette/abstract mark. Configure
Open Graph and Twitter image URLs/alt/dimensions through the shared site default and existing
hackathon metadata interface. The abstract favicon has no old text and remains unchanged.
No manifest, RSS or JSON-LD exists; none is invented. Add no trademark or other legal claims.

## Occurrence classifications and preservation

| Scope | Classification | Treatment |
| --- | --- | --- |
| src pages/layout/creator/project/hackathon SEO and planned event names | CURRENT_BRAND | Update current name; retain IDs and factual statuses |
| Header/footer/home split textual wordmark | CURRENT_BRAND | Aeglys + AI, preserving styling |
| README and future invitation/communication templates | CURRENT_BRAND | Update current descriptions and planned event communications |
| AGENTS repository scope | CURRENT_BRAND | Update current scope; retain repository heading and historical continuity |
| Deployment workflow human-readable display name | CURRENT_BRAND | Update name only; preserve job IDs/environment/actions/configuration |
| About transition and creator historical continuity sentence | HISTORICAL | Explicitly preserve previous AegisAI identity |
| Project evolution title/text about the 2026 evolution into AegisAI | HISTORICAL / RESEARCH_IDENTIFIER | Preserve recorded lineage; current continuing-program title updated |
| PROJECT_HISTORY and DEVELOPMENT_LOG prior entries | HISTORICAL | Append only; prior content unchanged |
| SPEC-001 through SPEC-006 and dated PORTAL_V1_REVIEW | HISTORICAL / RESEARCH_IDENTIFIER | Preserve original task snapshots, exact descriptions and URLs |
| Launch readiness dated PORTAL-007 review observations | HISTORICAL | Preserve observation text; current workflow branding updated |
| README PORTAL-008 description | HISTORICAL | Make prior domain-only scope explicit; current branding documented separately |
| github.com/shubh-techie/AegisAI and repository identity AegisAI-Portal | URL / REPOSITORY NAME | Preserve existing external links and factual portal identity |
| package.json/package-lock aegisai-research-portal | CODE_IDENTIFIER / COMPATIBILITY | Preserve internal package identifier, no dependency or published-package rename |
| Tests' old URL/prefix exclusions and historical identity assertions | COMPATIBILITY | Preserve exclusions; verify new current brand while allowing only explained legacy text |
| AGENTS heading AegisAI-Portal | REPOSITORY NAME | Repository unchanged |
| aegisai.world in dated docs and exclusion tests | HISTORICAL / OLD URL | Preserve; zero current production links, no redirect implemented |

Models/experiment identifiers and publication titles are not renamed. No brand-containing
email address exists in tracked current public source; no replacement email is invented.
All remaining old-brand occurrences must fit these classifications; generated output allows
only repository URLs/identity and explicit historical transition/lineage. Private contacts,
invitations, results, sponsors, judges and attendees are not created by this migration.

## Validation and remaining work

Run Node 24 npm ci/check/build/test and git diff --check. Verify nine content routes plus
404/missing route on desktop/mobile, image decode, navigation, title/accessibility branding,
aeglysai.com canonicals/crawl artifacts, social PNG dimensions and no unsupported legal wording.
Verify original creator portrait, model/publication identifiers, historical document prefixes,
all Git refs/tags/commit IDs unchanged. Record observed results in DEVELOPMENT_LOG.

No new architecture or ADR needed. Authorized review/deployment and any social-cache refresh
are future actions; GitHub repository rename and old-domain redirect are separate tasks.

## PORTAL-015 asset integration extension — 2026-10-04

Authorized noncreative raster crops/resizes from the approved Dark Tech brand sheet.
Source retained unchanged and copied to public/brand/source. Clean logo/icon/banner
regions and source coordinates documented in public/brand/README.md. Header/footer
reuse existing text with theme-specific small symbols; favicon/apple touch metadata
uses exported PNGs. Global theme engine, layouts and research content unchanged.
No manifest exists, so none/PWA introduced. Dedicated OG/hackathon cards and full dark
primary logo require clean sources; retain existing truthful social previews. Acceptance:
source hash unchanged, crops omit labels/neighbor panels/text truncation, aspect ratios
preserved, raster limitations disclosed, root asset URLs resolve, both themes/mobile
navigation and accessible home link work. Validate install/check/build/tests and diff.
