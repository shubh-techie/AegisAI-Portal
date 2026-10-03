# SPEC-004 — Speakers, judges and participation workflow

- Recorded: 2026-10-03 (America/Chicago).
- Task: PORTAL-006.
- Status: IMPLEMENTED locally, pending review; external forms, invitations and scheduling remain PLANNED.
- Baseline: PORTAL-005 foundation in `c21f16c`; extends [SPEC-003](SPEC-003-hackathon-program.md) without redesigning pages.

## Requirements and implementation

Preserve existing routes, navigation, design, research statuses, creator portrait and Git history.
The keynote remains Shubh Prabhat using centralized creator metadata and the existing photo;
no new event-confirmation claim is inferred.

`src/data/hackathonPeople.ts` provides three guest speaker and three judge slots with null
people, not fabricated invitations. Actual records allow only CONFIRMED or INVITED status.
Speakers support name, title, organization, photo/alt, bio, topics and LinkedIn URL.
Judges support name, title, organization, photo/alt, technical expertise, bio, LinkedIn URL
and typed event assignments. Organization, photo and LinkedIn may be null if not supplied.

`publicDisplayApproved` defaults to no approval unless explicitly set true. The shared
publication filter and card render only CONFIRMED people with explicit display approval.
Invited/unapproved people yield anonymous planned slots with no profile fields or asset links.
Only approved local photos are used; absent photos render no broken image. Private invitation
records must remain outside this public repository even though the renderer excludes them.

`PARTICIPANT_REGISTRATION_FORM_URL` and `JUDGE_INVITATION_FORM_URL` are null configuration
values in `src/data/hackathons.ts`. Participant CTAs read Register for Hackathon; the judge
CTA reads Apply to Judge. Missing links produce disabled buttons and explanatory text.
Per-event registration overrides remain; the old `PARTICIPANT_FORM_URL` is a compatibility
alias. Applications will initially use Google Forms/Drive. No authentication, participant
database, embedded form, private contact details, Drive IDs or internal notes are introduced.

## Invitations and privacy

Three draft templates in `docs/hackathons/` cover judge responsibilities, estimates and
conflict disclosure; speaker topic/audience/format/duration and explicit bio/photo display
permission; participant eligibility/timeline/provisional prize/deliverables/conduct/registration.
All unknown logistics, response channels and form URLs remain placeholders. No person is
invited, contacted or confirmed by creation of a template. Keep completed correspondence,
application data and conflict disclosures private. Public-profile approval is independent
of acceptance; record only approved public facts in repository source.

## Acceptance and validation

Run Node 24 `npm ci`, `npm run check`, `npm run build`, then `npm test`. Verify preserved
routes and mobile/desktop navigation. Regression checks must cover disabled workflow CTAs,
confirmed-with-permission publication versus invited/unapproved exclusion, absence of
invented URLs and private application fields, creator portrait reuse and event links.
Check templates and documentation links and `git diff --check`. Record actual outcomes
in [DEVELOPMENT_LOG.md](../DEVELOPMENT_LOG.md); no deployment or external workflow is implied.

## Pending operations

Create official forms and publish their privacy/handling terms; finalize event terms,
conduct reporting, review workload/dates and conflicts procedures; obtain acceptance and
public display consent before adding real profiles. Scheduling and keynote details remain
planned. No ADR is needed for this extension of existing static data/components.


## Observed local validation

Node v24.13.0 `npm ci` succeeded. `npm run check` reported zero errors, warnings and hints;
production builds generated ten pages; all eleven output/publication tests passed.
Local Chrome checked 44 route/viewport combinations at 1440, 768, 390 and 320px with
empty configuration, and another 44 with temporary synthetic populated profiles.
Confirmed/approved speaker bio/topics and judge expertise/event links rendered correctly;
invited and unapproved sentinel fields were absent from generated HTML. Responsive photo
sizing passed; fixture source was restored and final artifacts rebuilt without test people.
Temporary browsers/servers stopped. Documentation links and `git diff --check` passed.
No full automated accessibility audit, remote CI or deployment was performed. npm repeated
the existing environment warning and two high-severity dependency findings; dependencies
and lockfile were not changed.
