import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const routes = [
  "",
  "research",
  "architecture",
  "experiments",
  "publications",
  "about",
  "hackathons",
  "hackathons/events",
  "hackathons/community",
];
const read = (path) => readFileSync(join("dist", path), "utf8");
const pages = routes.map((route) => ({
  route,
  html: read(route ? `${route}/index.html` : "index.html"),
}));
const homeCanonical = pages[0].html.match(
  /rel="canonical" href="([^"]+)"/,
)?.[1];
assert.ok(homeCanonical, "Home canonical exists");
const site = new URL(homeCanonical);
const base = site.pathname;
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

test("nine static pages have unique metadata and accessible landmarks", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const { route, html } of pages) {
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, route);
    assert.match(html, /<html lang="en">/);
    assert.match(html, /<main id="main"/);
    assert.match(html, /href="#main"/);
    assert.match(html, /name="description" content="[^"]+"/);
    assert.match(html, /property="og:title"/);
    assert.match(html, /name="twitter:card"/);
    assert.ok(
      html.includes(
        `rel="canonical" href="${site.origin}${base}${route ? route + "/" : ""}"`,
      ),
    );
    titles.add(html.match(/<title>(.*?)<\/title>/)[1]);
    descriptions.add(html.match(/name="description" content="([^"]+)"/)[1]);
    assert.equal(
      (html.match(/aria-current="page"/g) || []).length,
      route && !route.startsWith("hackathons/") ? 1 : 0,
    );
  }
  assert.equal(titles.size, routes.length);
  assert.equal(descriptions.size, routes.length);
});

test("all generated local links and assets resolve under the configured base", () => {
  for (const { html } of [...pages, { html: read("404.html") }]) {
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = match[1];
      if (url.startsWith("#") || /^https?:/.test(url)) continue;
      assert.ok(url.startsWith(base), `${url} must respect ${base}`);
      let local = decodeURIComponent(url.slice(base.length).split(/[?#]/)[0]);
      if (!local || local.endsWith("/")) local += "index.html";
      assert.ok(existsSync(join("dist", local)), `Missing target ${url}`);
    }
    for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
      assert.match(match[0], /rel="noopener noreferrer"/);
    }
  }
});

test("crawl artifacts and custom 404 are emitted", () => {
  assert.ok(existsSync("dist/.nojekyll"));
  assert.ok(
    read("robots.txt").includes(
      `Sitemap: ${site.origin}${base}sitemap-index.xml`,
    ),
  );
  const sitemap = read("sitemap-0.xml");
  for (const route of routes)
    assert.ok(
      sitemap.includes(
        `<loc>${site.origin}${base}${route ? route + "/" : ""}</loc>`,
      ),
    );
  assert.ok(!sitemap.includes("/404"));
  assert.match(read("404.html"), /name="robots" content="noindex, follow"/);
});

test("research claims keep planned work and unpublished results explicit", () => {
  assert.match(
    read("research/index.html"),
    /Research hypotheses will be published after the research specification is finalized\./,
  );
  assert.match(read("research/index.html"), /Model D is not implemented\./);
  assert.match(
    read("experiments/index.html"),
    /Experimental results in progress\./,
  );
  assert.match(
    read("experiments/index.html"),
    /RBAC \+ deterministic contextual risk/,
  );
  assert.match(
    read("publications/index.html"),
    /no publication or conference acceptance is claimed/,
  );
  for (const { html } of pages)
    assert.match(html, /Model D is planned research/);
});

test("production output has no client scripts or third-party embeds", () => {
  for (const { html } of pages)
    assert.doesNotMatch(html, /<script\b|<iframe\b|<form\b/);
  assert.equal(walk("dist").filter((path) => /\.(m?js)$/.test(path)).length, 0);
});

test("production artifacts contain no development URLs or custom domain file", () => {
  for (const path of walk("dist").filter((path) =>
    /\.(html|css|xml|txt|svg)$/.test(path),
  )) {
    const content = readFileSync(path, "utf8");
    assert.doesNotMatch(
      content,
      /(?:localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|https?:\/\/[^\s"'<>]*(?:\.local|\.localhost|\.test|\.invalid)(?:[/:\s"'<>]|$)|https?:\/\/(?:[^/\s]+\.)?example\.(?:com|org|net)|\/@(?:vite|fs|id)\/|astro-dev-toolbar)/i,
      `Development reference in ${path}`,
    );
  }
  assert.ok(!existsSync("public/CNAME"));
  assert.ok(!existsSync("dist/CNAME"));
});

test("creator identity is accessible without inventing social profiles", () => {
  for (const { html } of [...pages, { html: read("404.html") }]) {
    assert.match(html, /name="author" content="Shubh Prabhat"/);
    assert.match(html, /href="https:\/\/github\.com\/shubh-techie"/);
    assert.match(html, /scholar\.google\.com\/citations\?user=HrEzOfIAAAAJ/);
    assert.doesNotMatch(html, /href="[^"]*linkedin/i);
  }
  const about = read("about/index.html");
  assert.match(about, /id="creator-heading"/);
  assert.match(about, /Software &amp; Distributed Systems Engineer/);
  assert.match(about, /LinkedIn/);
  assert.match(
    about,
    /separate AegisAI-Portal website repository began in 2026/,
  );
  assert.match(read("publications/index.html"), /Creator profile:/);
});

test("production routes and metadata use the aegisai.world root", () => {
  assert.equal(site.origin, "https://aegisai.world");
  assert.equal(base, "/");
  for (const { route, html } of pages) {
    const expected = `https://aegisai.world/${route ? route + "/" : ""}`;
    assert.ok(html.includes(`property="og:url" content="${expected}"`));
    for (const destination of routes.filter(route => !route.startsWith("hackathons/"))) {
      assert.ok(
        html.includes(`href="/${destination ? destination + "/" : ""}"`),
      );
    }
  }
  assert.ok(
    read("sitemap-index.xml").includes("https://aegisai.world/sitemap-0.xml"),
  );
  assert.match(read("about/index.html"), /src="\/images\/shubh-prabhat\.jpg"/);
  assert.ok(existsSync("dist/images/shubh-prabhat.jpg"));
  for (const path of walk("dist").filter((path) =>
    /\.(html|css|js|json|xml|txt|svg)$/.test(path),
  )) {
    assert.doesNotMatch(
      readFileSync(path, "utf8"),
      /\/AegisAI-Portal(?:\/|["'?#\s<]|$)|shubh-techie\.github\.io/i,
      `Former deployment URL in ${path}`,
    );
  }
});


test("hackathon foundation keeps events provisional and registration unavailable", () => {
  const landing = read("hackathons/index.html");
  const events = read("hackathons/events/index.html");
  const community = read("hackathons/community/index.html");
  for (const html of [landing, events, community]) {
    assert.match(html, /PLANNED/);
    assert.doesNotMatch(html, /docs\.google\.com\/forms|forms\.gle/);
    assert.doesNotMatch(html, /immigration|profile.building/i);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, "IDs must be unique");
    for (const link of html.matchAll(/href="(\/[^"]*)#([^"]+)"/g)) {
      const target = read(`${link[1].slice(1)}index.html`);
      assert.ok(target.includes(`id="${link[2]}"`), `Missing fragment ${link[0]}`);
    }
  }
  assert.match(landing, /Participation is FREE/);
  assert.match(landing, /USD \$300 prize per hackathon/);
  assert.match(landing, /subject to official event terms until finalized/);
  assert.match(landing, /disabled[^>]*>Register for Hackathon/);
  for (const id of ["adaptive-authorization", "behavioral-risk", "autonomous-resilience"])
    assert.ok(events.includes(`id="${id}"`));
  for (const month of ["November 2026", "December 2026", "January 2027", "February 2027", "March 2027"])
    assert.ok(events.includes(month));
  assert.match(events, /Model D is planned research, not an existing implemented capability/);
  assert.match(community, /src="\/images\/shubh-prabhat\.jpg"/);
  assert.equal((community.match(/Future guest speaker [123]/g) || []).length, 3);
  assert.equal((community.match(/Independent judge slot [123]/g) || []).length, 3);
});


test("participation CTAs stay unavailable without official forms", () => {
  const community = read("hackathons/community/index.html");
  assert.match(community, /disabled[^>]*>Apply to Judge/);
  assert.match(community, /disabled[^>]*>Register for Hackathon/);
  assert.match(community, /Google Forms\/Drive/);
  assert.doesNotMatch(community, /mailto:|tel:|drive\.google\.com|docs\.google\.com\/forms|forms\.gle/);
  for (const route of ["hackathons", "hackathons/events", "hackathons/community"]) {
    const html = read(`${route}/index.html`);
    assert.match(html, /Register for Hackathon/);
    assert.doesNotMatch(html, /Register Interest/);
  }
});

test("public profiles require both confirmation and explicit display permission", async () => {
  const { transpileModule } = await import("typescript");
  const source = readFileSync("src/data/hackathonPeople.ts", "utf8");
  const { outputText } = transpileModule(source, { compilerOptions: { module: 99, target: 99 } });
  const { approvedPublicPerson, speakers, judges } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
  const approved = { name: "Synthetic test fixture", status: "CONFIRMED", publicDisplayApproved: true };
  assert.equal(approvedPublicPerson(approved), approved);
  assert.equal(approvedPublicPerson({ ...approved, status: "INVITED" }), null);
  assert.equal(approvedPublicPerson({ ...approved, publicDisplayApproved: false }), null);
  assert.equal(approvedPublicPerson({ name: "Synthetic test fixture", status: "CONFIRMED" }), null);
  assert.equal(approvedPublicPerson(null), null);
  assert.equal(speakers.length, 3);
  assert.equal(judges.length, 3);
  assert.ok([...speakers, ...judges].every(slot => slot.person === null));
  assert.doesNotMatch(read("hackathons/community/index.html"), /Synthetic test fixture/);
});
