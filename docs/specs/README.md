# Specifications

Add or update a SPEC when implementing significant functionality. Specifications below document their stated scope and status; they do not imply that the separate AegisAI research specification has been finalized.

Use sequential filenames such as `SPEC-001-short-title.md`. Include:

- Title, identifier, actual recording date and revision context.
- Problem, intended behavior, scope and exclusions.
- Requirements and acceptance criteria.
- Relevant routes, data, accessibility and deployment constraints.
- Clear IMPLEMENTED, PLANNED or EXPERIMENTAL status for each relevant capability.
- Validation plan and outcomes actually observed.
- Open questions, related ADRs and implementation/evidence references.

Separate proposed behavior from existing behavior. For a retrospective specification, identify it as such and cite the source code or commits it describes. Do not backdate it or present it as a previously approved document.

The separate AegisAI research repository owns its research specification and finalized hypotheses. Do not invent them in this portal repository. Use the root [README.md](../../README.md) and [development log](../DEVELOPMENT_LOG.md) for the current portal baseline and pending work.

Follow the reading order and development workflow in [AGENTS.md](../../AGENTS.md).

## Specifications

- [SPEC-001 — Creator profile and research identity](SPEC-001-creator-profile.md): PORTAL-003 implementation and portrait fallback requirements.
- [SPEC-002 — aegisai.world root-path migration](SPEC-002-custom-domain.md): PORTAL-005 production URL configuration, occurrence audit and validation requirements.
