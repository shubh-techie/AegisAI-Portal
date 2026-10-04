/** Approved public social assets only; null means text-only previews.
 * Image path is relative to public/. Add a real asset before configuring it.
 */
export interface SocialImage { path: string; alt: string; width: number; height: number; }
import { socialPreview } from "./social";
export const hackathonSocialPreview: { image: SocialImage | null } = { image: socialPreview };
export const hackathonSeo = {
  program: { title: "Community Hackathons", description: "Free, planned AeglysAI hackathons for platform engineers, SREs, cloud, security and distributed-systems engineers exploring authorization, identity, risk, observability and resilience." },
  events: { title: "Hackathon Events", description: "Three planned AeglysAI challenges: adaptive authorization, behavioral risk and autonomous resilience. Review dates, submission requirements and the proposed judging rubric." },
  community: { title: "Hackathon Community", description: "AeglysAI creator Shubh Prabhat and planned speaker and independent judge roles. Participant and judge application forms are pending; public profiles require confirmation and permission." },
};
