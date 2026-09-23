import type { APIRoute } from "astro";
import { asset } from "../data/project";
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL(asset("sitemap-index.xml"), site)}\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
