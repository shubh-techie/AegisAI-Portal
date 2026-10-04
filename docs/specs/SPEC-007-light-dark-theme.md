# SPEC-007 — Light/dark theme system

Recorded: 2026-10-03. PORTAL-010, local implementation for review.

## Scope and behavior

IMPLEMENTED locally: a shared light/dark palette, first-visit system preference, saved manual preference and a return-to-system control on all portal pages including hackathons and 404. No research text/status, photographs, production origin, SEO identity, history or deployment mechanism changes. No UI framework, external service or dependency added.

`src/styles/global.css` centralizes semantic component colors with `light-dark()`. The root color-scheme selects the palette, including diagrams and status badges. Modern browsers supporting CSS `light-dark()` are required. With JavaScript disabled, CSS follows the system preference and interactive controls remain hidden.

`src/components/ThemeInit.astro` runs inline in the head before styles/body. It reads only valid light/dark choices from `aeglysai-theme` in localStorage, falls back to matchMedia, updates the root and theme-color, and handles system/storage changes. Storage failure does not prevent local switching; persistence is unavailable in that case. System mode removes the stored choice.

## Acceptance criteria

- Initial preference applies before stylesheet/body rendering; no network request for initialization.
- Saved choice survives reload and navigation; system changes apply only in system mode.
- Native buttons work by keyboard, have visible focus, 44px targets and state-dependent accessible names. System selection has a checkmark and aria-pressed state; changes are announced in a live region.
- Header, cards, diagrams, badges, code, tables, links, buttons, creator section, footer and 404 remain readable without horizontal overflow at desktop/mobile widths.
- Canonical/social metadata, route paths and research meaning remain unchanged.
- Node 24 npm ci, check, build and tests pass; git diff --check passes.

## Validation and limitations

Local Astro check/build and twelve output tests passed. Chrome covered 88 combinations: eleven routes (including missing-route 404), both themes and 1440/768/390/320px widths. Keyboard/focus, saved reload, system changes/reset, invalid storage and blocked storage passed. Desktop/mobile screenshots reviewed. Eleven representative text pairs per theme exceed 4.5:1 contrast; minimum sampled ratio 4.93:1. This is a bounded review, not full WCAG certification or cross-browser testing.

Evidence: theme components, Header/Layout, shared CSS and `scripts/site.test.mjs`; [development log](../DEVELOPMENT_LOG.md). No architectural change requiring an ADR. No commit, remote CI or deployment claimed. This branch still has existing AegisAI labels; rebranding remains outside this task.
