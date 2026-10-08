# SPEC-009 — Media Coverage

Recorded 2026-10-07. Status: IMPLEMENTED locally for review; no deployment.
Task: user-requested Media Coverage page and homepage integration.
Baseline: feature/aeglysai-brand-assets at ba5c514 with pending brand work; all existing
changes preserved on the new feature/media-coverage branch. This feature adds no
backend, dependencies, runtime fetching or publishing automation.

## Scope and behavior

- `/media/` uses the existing Layout/Hero and neutral research styling. One h1:
  AeglysAI in the Media; exact requested introduction. Canonical remains on aeglysai.com.
- Six records in src/data/media.ts, ordered by publisher-reported verified publication
  date descending. Undated items follow dated records, tie-break by stable id.
- Each card has publisher, full headline, verified date/time element, short portal
  summary, category, locally created article illustration and original external link.
- src/components/media/MediaCard.astro owns shared compact/full presentation; cards
  adapt with existing responsive grids, semantic headings, focus styles and both themes.
- Homepage features at most three dated, title-verified records with a recorded check
  date. Current selection: Business Outstanders, Nerdbot, Cyber Mag community article.
  New entries require data only, not layout edits. Missing/unverified entries are
  excluded from homepage recency selection; the full page labels manual-review fields.
- Discover through homepage View All Media Coverage. Global navigation is retained.
  Existing research, publication/status, hackathon, branding/theme and SEO behavior
  preserved. External media coverage is distinct from papers in preparation.

## Data and editorial boundary

Fields: id, publication, title, url, category, summary, publishedDate|null,
titleVerified, verifiedOn|null, dateEvidence|null, thumbnail|null (path, alt, permission).
No author fields, quotes, logos, awards, endorsements or research findings inferred.
Dates are publishers' own reports, not independently established project-history dates;
do not rewrite project history based on these dates. DateModified is not DatePublished.

Summaries are original brief descriptions, not copied article excerpts. Editorial,
sponsorship or paid-placement arrangements remain unverified; no independence claim.
Public page says coverage is not an endorsement or validation of research results.
No publisher artwork reuse permission supplied: media-article.svg is original neutral
portal artwork, not a publisher logo or screenshot. No third-party image requests,
tracking, article-body copy or invented affiliation.

Future metadata unavailable: retain supplied URL/headline, set titleVerified false,
verifiedOn/null dates as appropriate, and label missing fields for manual review.
Never derive a date from URL, copyright year, sidebar, author profile or update date.
Recheck original article title and publication evidence before assigning verified fields.
Future external images require documented permission and local valid asset path.

## Source verification — 2026-10-07

| Article (full URL in data) | Verified headline/date evidence | Publisher-reported publication date |
| --- | --- | --- |
| [TechBullion](https://techbullion.com/from-cloud-modernization-to-intelligent-infrastructure-how-shubh-prabhat-is-connecting-enterprise-engineering-with-aeglysai/) | HTTP 200 original h1, visible time, article:published_time and JSON-LD datePublished | 2026-07-21 |
| [Business Outstanders](https://businessoutstanders.com/cybersecurity/aeglysai-adaptive-security-distributed-systems) | Browser article h1/byline date and HTTP 200 metadata; timestamps differ in presentation but calendar date agrees | 2026-10-07 |
| [Programming Insider](https://programminginsider.com/beyond-static-access-control-shubh-prabhats-aeglysai-approach-to-adaptive-authorization-for-zero-trust-cloud-systems/) | HTTP 200 original h1 (curly apostrophe), article:published_time and JSON-LD datePublished | 2026-08-01 |
| [Nerdbot](https://nerdbot.com/2026/09/25/when-ai-advises-but-policy-decides-shubh-prabhat-on-explainable-risk-intelligence-and-the-future-of-aeglysai/) | Browser-accessible original h1 and byline publication date; curl blocked by Cloudflare 403 | 2026-09-25 |
| [The Cyber Mag — policy](https://thecybermag.com/why-policy-bounded-ai-could-reshape-security-in-distributed-systems-shubh-prabhat-on-adaptive-cyber-defense/) | HTTP 200 original h1, article-specific visible time, metadata/datePublished | 2026-07-02 |
| [The Cyber Mag — community](https://thecybermag.com/from-research-to-community-how-aeglysai-is-bringing-engineers-together-around-adaptive-security/) | HTTP 200 original h1, article-specific visible time, metadata/datePublished | 2026-09-11 |

Browser tools could not fetch four supplied pages; system curl with certificate
verification accessed them. Initial Python HTTPS attempt failed due to local CA trust;
no certificate verification disabled. Future availability can change; no uptime guarantee.
Source publication dates differ from October update dates; July/August source dates do
not establish that the portal was branded AeglysAI then. Historical records untouched.

## Acceptance and validation

Build must emit /media/index.html and sitemap/canonical/social metadata. All six URLs
appear once as card links with target=_blank, rel=noopener noreferrer and accessible
new-tab names. Full page is sorted; homepage chooses exactly the three verified newest
records, never substitutes null/unverified records. No date or headline invented.
Test unknown dates, unverified records and deterministic ordering with in-memory
fixtures; production must not contain fixtures. Verify existing route metadata/assets,
light/dark mobile/desktop navigation, focus states, readable typography and no overflow.
Run Node 24 npm run check/build/test and git diff --check. No lint script configured.
Actual validation outcomes go in DEVELOPMENT_LOG.md. Commit/push/deploy not authorized.


## 2026-10-07 — Image carousel enhancement

This extension supersedes the original grid/latest-three/image illustration presentation.
IMPLEMENTED locally: shared dependency-free CSS scroll-snap carousel on the homepage
and /media/, containing all six unchanged articles in date order. Displays 3 cards at
1024px and above, 2 at 640–1023px and 1 below 640px. Full media cards retain their
existing summaries/category; headlines visually clamp to three lines with full text
available to assistive technology. Original article URLs and metadata are unchanged.

Images use verified public publisher URLs, not licensed local copies. PUBLISHER_METADATA
records provenance only; it does not assert artwork ownership or a granted reuse license.
The user requested publisher thumbnails. Five URLs came from og:image; Nerdbot uses
the article's featured image link exposed by the original page. All six image endpoints
returned HTTP 200 with image content types on 2026-10-07. See src/data/media.ts for exact
URLs. Publication metadata does not guarantee future availability or redistribution
rights; no publisher images were vendored. Missing/null/failed images show the existing
AeglysAI icon and a code-authored branded placeholder, never unrelated stock artwork.

Reserved 16:9 frames, explicit dimensions, lazy loading, asynchronous decoding and
no-referrer requests reduce loading impact and prevent image-driven layout shifts.
Navigation includes previous/next buttons with disabled boundaries, responsive position
indicators, keyboard Left/Right/Home/End, native touch scrolling and smooth movement.
Reduced-motion preference disables smooth movement. A live region announces the visible
range; the scroll track is keyboard focusable. Without carousel JavaScript the articles
remain scrollable and original links remain usable; inactive controls stay hidden.
No autoplay, dependency, runtime metadata fetch, backend or navigation changes.

Acceptance: all six articles accessible on both routes, 3/2/1 sizing, functional arrows,
indicators/keyboard, image failure fallback, no page overflow and successful existing
check/build/test commands. Observed outcomes are recorded in DEVELOPMENT_LOG.md.
