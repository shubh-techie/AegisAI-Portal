/** Publisher-reported metadata checked 2026-10-07; not endorsements or research validation.
 * Null dates/unverified titles require manual review and never enter homepage recency selection.
 * See SPEC-009-media-coverage.md for evidence and image permissions.
 */
export interface MediaArticle {
  id: string;
  publication: string;
  title: string;
  url: string;
  category: string;
  summary: string;
  publishedDate: string | null; // YYYY-MM-DD, only after source verification
  titleVerified: boolean;
  verifiedOn: string | null;
  dateEvidence: string | null;
  thumbnail: { path: string; alt: string; permission: "ORIGINAL_ARTWORK" | "PERMISSION_CONFIRMED" | "PUBLISHER_METADATA" } | null;
}

export const mediaArticles: MediaArticle[] = [
  {
    id: "techbullion-infrastructure", publication: "TechBullion",
    title: "From Cloud Modernization to Intelligent Infrastructure: How Shubh Prabhat Is Connecting Enterprise Engineering with AeglysAI",
    url: "https://techbullion.com/from-cloud-modernization-to-intelligent-infrastructure-how-shubh-prabhat-is-connecting-enterprise-engineering-with-aeglysai/",
    category: "Engineering Leadership / Cloud Infrastructure",
    summary: "Discusses Shubh Prabhat’s enterprise engineering perspective and its connection to AeglysAI’s research into intelligent infrastructure and distributed-system control.",
    publishedDate: "2026-07-21", titleVerified: true, verifiedOn: "2026-10-07",
    dateEvidence: "Visible July 21, 2026 date and matching article:published_time/datePublished metadata; modified October 7, 2026 is not the publication date.",
    thumbnail: { path: "https://techbullion.com/wp-content/uploads/2026/10/image-30-5-1000x600.jpeg", alt: "", permission: "PUBLISHER_METADATA" },
  },
  {
    id: "business-outstanders-platform", publication: "Business Outstanders",
    title: "Inside AeglysAI: How Shubh Prabhat Is Building an Open-Source Research Platform for Adaptive Security and Resilient Distributed Systems",
    url: "https://businessoutstanders.com/cybersecurity/aeglysai-adaptive-security-distributed-systems",
    category: "Open Source / Cybersecurity",
    summary: "Introduces the project’s open-source research direction, separating intelligent risk evidence from policy authority and encouraging reproducible engineering contributions.",
    publishedDate: "2026-10-07", titleVerified: true, verifiedOn: "2026-10-07",
    dateEvidence: "Visible Published: October 7, 2026 and matching article:published_time/datePublished calendar date.",
    thumbnail: { path: "https://businessoutstanders.s3.amazonaws.com/news/2026/10/aeglysai.webp", alt: "", permission: "PUBLISHER_METADATA" },
  },
  {
    id: "programming-insider-authorization", publication: "Programming Insider",
    title: "Beyond Static Access Control: Shubh Prabhat’s AeglysAI Approach to Adaptive Authorization for Zero-Trust Cloud Systems",
    url: "https://programminginsider.com/beyond-static-access-control-shubh-prabhats-aeglysai-approach-to-adaptive-authorization-for-zero-trust-cloud-systems/",
    category: "Zero Trust / Adaptive Authorization",
    summary: "Explores context-sensitive authorization for cloud systems, with an emphasis on explicit policy boundaries and explainable security decisions.",
    publishedDate: "2026-08-01", titleVerified: true, verifiedOn: "2026-10-07",
    dateEvidence: "Original-page article:published_time and datePublished both identify August 1, 2026; dateModified is October 7, 2026.",
    thumbnail: { path: "https://programminginsider.com/wp-content/uploads/2026/10/Static.jpg", alt: "", permission: "PUBLISHER_METADATA" },
  },
  {
    id: "nerdbot-risk-intelligence", publication: "Nerdbot",
    title: "When AI Advises but Policy Decides: Shubh Prabhat on Explainable Risk Intelligence and the Future of AeglysAI",
    url: "https://nerdbot.com/2026/09/25/when-ai-advises-but-policy-decides-shubh-prabhat-on-explainable-risk-intelligence-and-the-future-of-aeglysai/",
    category: "Explainable AI / Risk Intelligence",
    summary: "Examines behavioral signals, explainability and the planned Model D research direction, treating AI-generated risk assessments as evidence rather than enforcement authority.",
    publishedDate: "2026-09-25", titleVerified: true, verifiedOn: "2026-10-07",
    dateEvidence: "Browser-accessible original article shows September 25, 2026 beside its byline. Direct curl received a Cloudflare 403; no date inferred solely from the URL.",
    thumbnail: { path: "https://i0.wp.com/nerdbot.com/wp-content/uploads/2026/10/image-31.png?resize=571%2C646&ssl=1", alt: "", permission: "PUBLISHER_METADATA" },
  },
  {
    id: "cyber-mag-policy-boundaries", publication: "The Cyber Mag",
    title: "Why Policy-Bounded AI Could Reshape Security in Distributed Systems: Shubh Prabhat on Adaptive Cyber Defense",
    url: "https://thecybermag.com/why-policy-bounded-ai-could-reshape-security-in-distributed-systems-shubh-prabhat-on-adaptive-cyber-defense/",
    category: "AI Security / Distributed Systems",
    summary: "Considers how adaptive cyber-defense research can incorporate intelligence while preserving deterministic limits on security-sensitive actions.",
    publishedDate: "2026-07-02", titleVerified: true, verifiedOn: "2026-10-07",
    dateEvidence: "Article time element shows July 2, 2026, matching article:published_time/datePublished; October 7 modification and sidebar dates are not used.",
    thumbnail: { path: "https://thecybermag.com/wp-content/uploads/2026/10/image1-37.jpg", alt: "", permission: "PUBLISHER_METADATA" },
  },
  {
    id: "cyber-mag-engineering-community", publication: "The Cyber Mag",
    title: "From Research to Community: How AeglysAI Is Bringing Engineers Together Around Adaptive Security",
    url: "https://thecybermag.com/from-research-to-community-how-aeglysai-is-bringing-engineers-together-around-adaptive-security/",
    category: "Research / Engineering Community",
    summary: "Discusses AeglysAI’s proposed contributor and hackathon pathways for exploring adaptive security through documented, reproducible technical work.",
    publishedDate: "2026-09-11", titleVerified: true, verifiedOn: "2026-10-07",
    dateEvidence: "Article time element shows September 11, 2026, matching article:published_time/datePublished; October 7 modification and sidebar dates are not used.",
    thumbnail: { path: "https://thecybermag.com/wp-content/uploads/2026/10/Prabhat.jpg", alt: "", permission: "PUBLISHER_METADATA" },
  },
];
export function sortedMediaArticles(articles: MediaArticle[] = mediaArticles): MediaArticle[] {
  return [...articles].sort((a, b) => (b.publishedDate ?? "").localeCompare(a.publishedDate ?? "") || a.id.localeCompare(b.id));
}
export function featuredMediaArticles(articles: MediaArticle[] = mediaArticles): MediaArticle[] {
  return sortedMediaArticles(articles.filter(article => article.titleVerified && article.publishedDate && article.verifiedOn)).slice(0, 3);
}
export function formatPublicationDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
