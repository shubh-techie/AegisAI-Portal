import { closeSync, existsSync, openSync, readSync, realpathSync, statSync } from "node:fs";
import { extname, resolve, sep } from "node:path";
import { asset, papers } from "./project";

/** Supplied, approved public metadata only. All public talk metadata lives here; private evidence belongs outside this public repository.
 * Keep drafts/PDFs awaiting approval outside public/: Astro copies all public assets.
 */
export const participationStatuses = ["Invited", "Confirmed", "Upcoming", "Completed", "Acceptance Sent", "Proposed", "Resources"] as const;
export type ParticipationStatus = typeof participationStatuses[number];
export interface Presentation {
  topics?: string[];
  role?: string;
  series?: string;
  location?: string;
  talkTitle?: string | null;
  participationStatus?: ParticipationStatus;
  participationNote?: string;
  abstract?: string | null;
  previousTitle?: string;
  relatedPaperTitles?: string[];
  slug: string;
  title: string;
  description: string;
  category: string;
  speaker: string;
  publicationStatus: "DRAFT" | "PUBLISHED";
  approvedForPublication: boolean;
  publishedDate: string | null; // Slide publication date, not an event date.
  delivery: { event: string; date: string | null } | null;
  conference?: { name: string; shortName: string; startDate: string; endDate: string; mode: string; organizer: { name: string; url: string }; technicalSponsor?: { name: string; url: string }; venue?: string; sourceUrl: string } | null;
  pdf: { path: string; downloadEnabled: boolean } | null;
  thumbnail: { path: string; source: "PDF_FIRST_PAGE" } | null;
  featured: boolean;
}

// User approved the actual cover image and supplied conference information.
// The full deck remains private; conference association does not establish delivery.
export const presentations: Presentation[] = [
  {
    slug: "beyond-static-access-control",
    participationStatus: "Completed",
    participationNote: "Completed",
    role: "Keynote Speaker", location: "Hybrid · Online presentation",
    topics: ["Adaptive Authorization", "Zero Trust", "RBAC/ABAC", "Contextual and Behavioral Risk", "Policy-Bounded Security", "Explainable Decisions", "Cloud-Native Distributed Systems"],
    previousTitle: "Beyond RBAC: Adaptive Authorization for Zero-Trust Cloud Systems",
    title: "Beyond Static Access Control: AI-Driven Adaptive Security for Resilient Cloud-Native Systems",
    description: "A research brief on contextual, behavioral and operational risk in cloud-native authorization, explainable decisions and policy-bounded responses.",
    category: "Adaptive Authorization / Zero Trust",
    speaker: "Shubh Prabhat",
    publicationStatus: "PUBLISHED",
    approvedForPublication: true,
    publishedDate: null,
    delivery: { event: "ATAI 2026", date: "2026-09-26" },
    conference: {
      name: "International Conference on Advanced Technology and Artificial Intelligence",
      shortName: "ATAI 2026", startDate: "2026-09-26", endDate: "2026-09-27", mode: "Hybrid",
      organizer: { name: "ACM Houston Chapter USA", url: "https://houston.acm.org/" },
      technicalSponsor: { name: "The Institution of Engineers and Scientists (IoES)", url: "https://theioes.org/" },
      sourceUrl: "https://houston.acm.org/atai2026.html",
    },
    pdf: null,
    thumbnail: { path: "presentations/beyond-static-access-control.png", source: "PDF_FIRST_PAGE" },
    featured: true,
  },
  {
    slug: "gicite-2026-wru-key-talk",
    title: "WRU Key Talk — GICITE 2026",
    description: "Shubh Prabhat has received an invitation from the World Research Union to deliver a WRU Key Talk as a keynote speaker at GICITE 2026, scheduled for November 6–7 in Berlin, Germany. Participation is confirmed and upcoming; the talk title is to be announced.",
    role: "Invited Keynote Speaker", series: "WRU Key Talks", location: "Berlin, Germany", talkTitle: "To Be Announced",
    category: "Keynote invitation", speaker: "Shubh Prabhat",
    participationStatus: "Upcoming",
    participationNote: "Confirmed — Upcoming",
    abstract: null, publicationStatus: "PUBLISHED", approvedForPublication: true,
    publishedDate: null, delivery: null, pdf: null, thumbnail: null, featured: false,
    conference: {
      name: "Germany–India Conference on Innovation, Technology, and Engineering",
      shortName: "GICITE 2026", startDate: "2026-11-06", endDate: "2026-11-07",
      mode: "Participation format to be confirmed",
      organizer: { name: "World Research Union (WRU) and Organising Committee", url: "https://gicite.com/" },
      venue: "Technische Universität Berlin, Germany (venue stated by organizer)",
      sourceUrl: "https://gicite.com/",
    },
  },
  {
    slug: "etic-2026",
    title: "Speaking engagement — ETIC 2026", talkTitle: null,
    description: "Shubh Prabhat's ETIC 2026 engagement is awaiting written organizer confirmation. The speaking role and talk title are to be confirmed.",
    speaker: "Shubh Prabhat", category: "Conference engagement", role: "To Be Confirmed",
    location: "Los Angeles, California, USA", participationStatus: "Acceptance Sent",
    participationNote: "Acceptance sent — awaiting confirmation", abstract: null,
    publicationStatus: "PUBLISHED", approvedForPublication: true,
    publishedDate: null, delivery: null, pdf: null, thumbnail: null, featured: false,
    conference: {
      name: "Engineering, Technology & Innovation Conference", shortName: "ETIC 2026",
      startDate: "2026-12-11", endDate: "2026-12-12", mode: "Hybrid",
      organizer: { name: "Organizer to be confirmed", url: "https://eticonference.com/" },
      venue: "Pacific States University, Los Angeles (venue stated by organizer)",
      sourceUrl: "https://eticonference.com/",
    },
  },
  ...[
    { slug: "building-ai-driven-incident-response", title: "Building AI-Driven Incident Response for Distributed Systems" },
    { slug: "from-static-security-policies", title: "From Static Security Policies to Risk-Aware Cloud Authorization" },
  ].map(talk => ({
    ...talk, description: `${talk.title}: proposed talk in preparation. Event and participation details are not confirmed.`,
    category: "Research proposal", speaker: "Shubh Prabhat", participationStatus: "Proposed" as const,
    publicationStatus: "PUBLISHED" as const, approvedForPublication: true,
    publishedDate: null, delivery: null, pdf: null, thumbnail: null, abstract: null, featured: false,
  })),
];

function validDate(date: string | null): boolean {
  return date === null || (/^\d{4}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(Date.parse(`${date}T00:00:00Z`)) && new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date);
}
function localAsset(path: string, publicDirectory: string, extensions: string[]): string {
  if (!/^presentations\/[A-Za-z0-9_/-]+\.[A-Za-z0-9]+$/.test(path) || path.split("/").includes("..") || !extensions.includes(extname(path).toLowerCase())) {
    throw new Error(`Presentation asset must be a local public/presentations file: ${path}`);
  }
  const file = resolve(publicDirectory, path);
  if (!existsSync(file) || !statSync(file).isFile()) throw new Error(`Missing presentation asset: ${path}`);
  if (!realpathSync(file).startsWith(`${realpathSync(publicDirectory)}${sep}`)) throw new Error(`Presentation asset escapes public directory: ${path}`);
  return file;
}
export function publishedPresentations(records: Presentation[] = presentations, publicDirectory = resolve("public")): Presentation[] {
  const approved = records.filter(record => record.publicationStatus === "PUBLISHED" && record.approvedForPublication === true);
  const slugs = new Set<string>();
  for (const record of approved) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug) || slugs.has(record.slug)) throw new Error(`Invalid or duplicate presentation slug: ${record.slug}`);
    slugs.add(record.slug);
    if (![record.title, record.description, record.category, record.speaker].every(value => typeof value === "string" && value.trim())) throw new Error(`Incomplete presentation metadata: ${record.slug}`);
    if (!validDate(record.publishedDate) || (record.delivery && (!record.delivery.event.trim() || !validDate(record.delivery.date)))) throw new Error(`Invalid date or unsupported delivery claim: ${record.slug}`);
    if (record.participationStatus && !participationStatuses.includes(record.participationStatus)) throw new Error(`Invalid participation status: ${record.slug}`);
    if (record.participationStatus === "Completed" && !record.delivery) throw new Error(`Completed talk requires recorded delivery: ${record.slug}`);
    if (record.delivery && record.participationStatus && record.participationStatus !== "Completed") throw new Error(`Delivery conflicts with participation status: ${record.slug}`);
    if (record.relatedPaperTitles?.some(title => !papers.includes(title))) throw new Error(`Unknown related publication: ${record.slug}`);
    if (!record.pdf && !record.thumbnail && (!record.participationStatus || record.participationStatus === "Resources")) throw new Error(`Presentation requires an approved PDF or first-page preview: ${record.slug}`);
    if (record.conference) {
      const c = record.conference;
      const links = [c.organizer.url, c.sourceUrl, ...(c.technicalSponsor ? [c.technicalSponsor.url] : [])];
      if (![c.name, c.shortName, c.mode, c.organizer.name, ...(c.technicalSponsor ? [c.technicalSponsor.name] : [])].every(value => typeof value === "string" && value.trim()) || !validDate(c.startDate) || !validDate(c.endDate) || !c.startDate || !c.endDate || c.startDate > c.endDate || !links.every(value => { try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; } catch { return false; } })) throw new Error(`Invalid conference metadata: ${record.slug}`);
    }
    if (record.pdf) {
      const pdf = localAsset(record.pdf.path, publicDirectory, [".pdf"]);
      const signature = Buffer.alloc(5);
      const descriptor = openSync(pdf, "r");
      try { readSync(descriptor, signature, 0, 5, 0); } finally { closeSync(descriptor); }
      if (signature.toString() !== "%PDF-") throw new Error(`Invalid PDF signature: ${record.pdf.path}`);
    }
    if (record.thumbnail) {
      if (record.thumbnail.source !== "PDF_FIRST_PAGE") throw new Error(`Thumbnail must come from the actual PDF: ${record.slug}`);
      localAsset(record.thumbnail.path, publicDirectory, [".png", ".jpg", ".jpeg", ".webp"]);
    }
  }
  return [...approved].sort((a, b) => (b.publishedDate ?? "").localeCompare(a.publishedDate ?? "") || a.slug.localeCompare(b.slug));
}
export function featuredPresentations(records: Presentation[] = presentations, publicDirectory = resolve("public")): Presentation[] {
  return publishedPresentations(records, publicDirectory).filter(record => record.featured).slice(0, 3);
}
export function formatPresentationDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

/** Normalized public view derived from the canonical record; no duplicate stored content. */
export function speakingView(record: Presentation, assetUrl: (path: string) => string = asset) {
  return {
    id: record.slug, title: record.title,
    talkTitle: record.talkTitle === undefined ? record.title : record.talkTitle,
    eventName: record.conference?.name ?? null,
    organizer: record.conference?.organizer.name ?? null,
    role: record.role ?? "Technical presentation",
    series: record.series ?? null,
    eventDate: record.conference ? { start: record.conference.startDate, end: record.conference.endDate } : null,
    location: record.location ?? record.conference?.venue ?? null,
    status: record.participationStatus ?? "Resources",
    abstract: record.abstract === undefined ? record.description : record.abstract,
    slidesUrl: record.pdf ? assetUrl(record.pdf.path) : null,
    thumbnailUrl: record.thumbnail ? assetUrl(record.thumbnail.path) : null,
    slideStatus: record.pdf ? "Published" : record.thumbnail ? "Preview only" : "Not available",
    relatedPublicationIds: (record.relatedPaperTitles ?? []).map(title => `paper-${papers.indexOf(title) + 1}`),
    externalEventUrl: record.conference?.sourceUrl ?? null,
  };
}
export function speakingPortfolio(records: Presentation[] = presentations, publicDirectory = resolve("public")) {
  const approved = publishedPresentations(records, publicDirectory);
  const engagements = approved.filter(record => record.conference && ["Invited", "Confirmed", "Upcoming", "Completed", "Acceptance Sent"].includes(record.participationStatus ?? "Resources"));
  const featured = engagements.filter(record => ["Invited", "Confirmed", "Upcoming"].includes(record.participationStatus!)).sort((a, b) => b.conference!.startDate.localeCompare(a.conference!.startDate))[0] ?? null;
  const library = approved.filter(record => record.participationStatus === "Proposed" || record.pdf || record.thumbnail);
  return { engagements, featured, library };
}
