# Proposed judging framework

Recorded 2026-10-03 for PORTAL-007. This framework is prepared for adoption in official
terms before launch; it is not proof that judges have been appointed or judging occurred.
Public weights are configured in `src/data/hackathons.ts`; keep this document aligned.

| Category | Weight | Evidence to assess |
| --- | ---: | --- |
| Technical Correctness | 25% | Working behavior, appropriate tests, accurate conclusions and failure cases |
| Security & Threat Reasoning | 20% | Threat model, identity/trust boundaries, authorized testing and safeguards |
| Architecture & Engineering | 20% | Clear components, interfaces, operational tradeoffs and maintainability |
| Reproducibility | 15% | Pinned review version, runnable setup, data provenance and repeatable evidence |
| Innovation | 10% | Useful original approach or insight, with prior work credited |
| Documentation & Explainability | 10% | Clear README, limitations and interpretable policy/risk/response decisions |

## Anchors and scoring

Each category receives an integer score from 0 to 5:

- 0: absent evidence or unsupported capability.
- 1: substantial gaps; claims cannot be reliably checked.
- 2: partially demonstrated, with significant unresolved weaknesses.
- 3: meets the documented challenge expectation with adequate evidence.
- 4: strong evidence and reasoning with minor limitations.
- 5: exceptional evidence and reasoning across relevant cases; limitations remain explicit.

Score against the frozen submission, not presentation polish or unrelated reputation.
No optional benchmark or video is required to receive a high score; evidence appropriate
to the challenge matters. Negative results can score well when their method and analysis are sound.
For each judge: total out of 100 = sum(category score / 5 × category weight).
For a submission: take the mean of totals from at least two non-conflicted independent judges.
Keep unrounded totals for ranking; display totals to two decimal places only after approval.
The weights sum to 100%; a score of 3 in every category yields 60/100.

## Eligibility before scoring

Organizers privately verify submission timing/time zone, finalized eligibility/team limits,
challenge fit, required artifacts, accessible repository or prior approved access exception,
review commit/tag, license/data permissions, authorized testing and disclosures of reused
work/AI assistance. Apply published rules consistently. A receipt is not eligibility.
Record reasons for exclusions privately and notify entrants through an approved channel.
Any cure/clarification or appeal window must be published in official terms before launch;
do not create ad hoc exceptions after seeing scores. Missing optional artifacts are not disqualifying.

## Independence and conflicts

A judge must disclose employment/reporting relationships, collaboration, mentorship,
family/personal relationships, financial interests, involvement in the submission or other
conditions that could bias review. Disclosures are private and required before assignment
and again if a conflict becomes apparent. The organizer records reassignment/recusal privately;
a conflicted judge must not access, score, moderate or break ties for the affected work.
Do not publish private conflict narratives. Disclosure alone does not remove a conflict.

Judges independently review and score before seeing other judges' scores. Use the same
rubric and frozen artifact for every assigned entry. A neutral organizer coordinates
logistics without substituting their preference for independent scoring. Confirm enough
non-conflicted judges before judging begins; if fewer than two are available for an entry,
reassign or defer that entry's review rather than fabricate an independent decision.

## Scoring procedure

1. Finalize and publish rubric/version, eligibility, tie and correction procedures before launch.
2. Brief confirmed judges using shared synthetic/example evidence and the score anchors.
3. Freeze each eligible submission's commit/tag and assign at least two non-conflicted judges.
4. Each judge records category scores, evidence references and concise reasons privately.
5. Check arithmetic and completeness; an abstention is not a zero. Obtain replacement review.
6. If judges' total scores differ by 20 or more points, request evidence-based moderation
   and independent reconsideration. Preserve original scores and reasons; do not force consensus.
   If unresolved, add a third non-conflicted judge and average all final valid totals.
7. Apply the prepublished tie procedure, resolve published correction/appeal steps, and approve results.
8. Publish only approved results and permitted identities. Record prize selection separately
   from payment. Keep score sheets/contact details outside this public repository.

## Tie handling

Compare unrounded mean totals. Exact ties are resolved by higher mean Security & Threat
Reasoning score, then Technical Correctness, then Reproducibility. If still tied, an additional
non-conflicted judge independently reviews the tied entries with the same rubric; recompute
means with the additional valid review for each tied entry. If a tie remains, defer award
selection until the organizer follows the fallback stated in finalized official terms.
No random tie-break, automatic split of the planned USD $300 prize or new category may be
introduced after submission. The final unresolved-tie fallback is a launch dependency.
