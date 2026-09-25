import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // GitHub Pages serves the custom domain from its root.
  site: "https://aegisai.world",
  base: "/",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap({ filter: (page) => !page.endsWith("/404/") })],
});
