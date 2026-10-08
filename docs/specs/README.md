# Specifications

Add or update a SPEC when implementing significant functionality. Specifications below document their stated scope and status; they do not imply that the separate AeglysAI research specification has been finalized.

Use sequential filenames such as `SPEC-001-short-title.md`. Include:

- Title, identifier, actual recording date and revision context.
- Problem, intended behavior, scope and exclusions.
- Requirements and acceptance criteria.
- Relevant routes, data, accessibility and deployment constraints.
- Clear IMPLEMENTED, PLANNED or EXPERIMENTAL status for each relevant capability.
- Validation plan and outcomes actually observed.
- Open questions, related ADRs and implementation/evidence references.

Separate proposed behavior from existing behavior. For a retrospective specification, identify it as such and cite the source code or commits it describes. Do not backdate it or present it as a previously approved document.

The separate AeglysAI research repository owns its research specification and finalized hypotheses. Do not invent them in this portal repository. Use the root [README.md](../../README.md) and [development log](../DEVELOPMENT_LOG.md) for the current portal baseline and pending work.

Follow the reading order and development workflow in [AGENTS.md](../../AGENTS.md).

## Specifications

- [SPEC-001 — Creator profile and research identity](SPEC-001-creator-profile.md): PORTAL-003 implementation and portrait fallback requirements.
- [SPEC-002 — aegisai.world root-path migration](SPEC-002-custom-domain.md): PORTAL-005 production URL configuration, occurrence audit and validation requirements.

- [SPEC-003 — Community hackathon program](SPEC-003-hackathon-program.md): planned events, configurable community roles and registration integrity.

- [SPEC-004 — Speakers, judges and participation workflow](SPEC-004-participation-workflow.md): PORTAL-006 public profiles, configurable forms, privacy and invitation templates.

- [SPEC-005 — Communications and launch readiness](SPEC-005-launch-readiness.md): PORTAL-007 templates, operations, proposed scoring and social metadata.

- [SPEC-006 — Production domain migration to aeglysai.com](SPEC-006-aeglysai-domain.md): PORTAL-008 origin-only migration, URL audit and validation.

- [SPEC-007 — AegisAI → AeglysAI brand migration](SPEC-007-aeglysai-brand.md): PORTAL-009 current identity, social card and classified historical/compatibility references.

- [SPEC-008 — Light/dark theme system](SPEC-008-light-dark-theme.md): PORTAL-010 preference, accessibility and minimal-script requirements.

- [SPEC-009 — Media Coverage](SPEC-009-media-coverage.md): verified publisher-reported metadata, six external articles, responsive cards and latest-three homepage integration.
