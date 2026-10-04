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
  "hackathons/sponsors",
  "hackathons/adaptive-authorization",
  "hackathons/behavioral-risk",
  "hackathons/autonomous-resilience",
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

test("thirteen static pages have unique metadata and accessible landmarks", () => {
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

test("production output contains only the minimal inline theme script and no embeds", () => {
  for (const { html } of pages) {
    assert.doesNotMatch(html, /<iframe\b|<form\b/);
    const scripts = [...html.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/g)];
    assert.equal(scripts.length, 1);
    assert.match(scripts[0][0], /data-theme-init/);
    assert.doesNotMatch(scripts[0][0], /\bsrc=|fetch\(|XMLHttpRequest/);
    assert.ok(html.indexOf('data-theme-init') < html.indexOf('rel="stylesheet"'));
  }
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
    /separate AeglysAI-Portal website repository began in 2026/,
  );
  assert.match(read("publications/index.html"), /Creator profile:/);
});

test("production routes and metadata use the aeglysai.com root", () => {
  assert.equal(site.origin, "https://aeglysai.com");
  assert.equal(base, "/");
  for (const { route, html } of pages) {
    const expected = `https://aeglysai.com/${route ? route + "/" : ""}`;
    assert.ok(html.includes(`property="og:url" content="${expected}"`));
    for (const destination of routes.filter(route => !route.startsWith("hackathons/"))) {
      assert.ok(
        html.includes(`href="/${destination ? destination + "/" : ""}"`),
      );
    }
  }
  assert.ok(
    read("sitemap-index.xml").includes("https://aeglysai.com/sitemap-0.xml"),
  );
  assert.match(read("about/index.html"), /src="\/images\/shubh-prabhat\.jpg"/);
  assert.ok(existsSync("dist/images/shubh-prabhat.jpg"));
  for (const path of walk("dist").filter((path) =>
    /\.(html|css|js|json|xml|txt|svg)$/.test(path),
  )) {
    assert.doesNotMatch(
      readFileSync(path, "utf8"),
      /(?:\/AegisAI-Portal|["\x27(=]\s*\/AeglysAI-Portal)(?:\/|["'?#\s<]|$)|shubh-techie\.github\.io|aegisai\.world/i,
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
  assert.match(landing, /disabled[^>]*>Start Qualification/);
  assert.match(landing, /Opening Soon/);
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
    assert.match(html, route === "hackathons" ? /Start Qualification/ : /Register for Hackathon/);
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


test("launch rubric, submission package and hackathon social metadata are consistent", () => {
  const source = readFileSync("src/data/hackathons.ts", "utf8");
  const weights = [...source.matchAll(/category: "([^"]+)", weight: (\d+)/g)].map(match => ({category: match[1], weight: Number(match[2])}));
  assert.deepEqual(weights.map(item => item.weight), [25, 20, 20, 15, 10, 10]);
  assert.equal(weights.reduce((sum, item) => sum + item.weight, 0), 100);
  const rubric = readFileSync("docs/hackathons/JUDGING_FRAMEWORK.md", "utf8");
  for (const item of weights) assert.ok(rubric.includes(`| ${item.category} | ${item.weight}% |`));
  const events = read("hackathons/events/index.html");
  for (const item of weights) assert.ok(events.includes(`${item.weight}%`));
  for (const artifact of ["README", "Architecture description", "Setup instructions", "Demo", "Test evidence", "Security considerations", "Limitations", "License information", "Video demo", "Benchmark results", "Research notes"])
    assert.ok(events.includes(artifact), artifact);
  assert.match(events, /Public GitHub repository unless an exception is approved before submission/);
  assert.match(read("hackathons/index.html"), /Distributed Systems Engineers/);
  for (const route of ["hackathons", "hackathons/events", "hackathons/community"]) {
    const html = read(`${route}/index.html`);
    assert.match(html, /property="og:description"/);
    assert.match(html, /name="twitter:description"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.doesNotMatch(html, /drive\.google\.com|mailto:|tel:/);
  }
});


test("AeglysAI branding retains only explained legacy references", () => {
  for (const { route, html } of [...pages, {route:"404",html:read("404.html")}]) {
    assert.match(html, /property="og:site_name" content="AeglysAI Research"/);
    assert.match(html, /aria-label="AeglysAI home"/);
    assert.match(html, /<title>[^<]*AeglysAI Research<\/title>/);
    assert.match(html, /property="og:image" content="https:\/\/aeglysai\.com\/images\/aeglysai-social\.png"/);
    assert.match(html, /property="og:image:width" content="1200"/);
    assert.match(html, /property="og:image:height" content="630"/);
    assert.match(html, /name="twitter:image:alt" content="AeglysAI/);
    assert.doesNotMatch(html, /®|™|registered trademark|patented brand|exclusive trademark rights/i);
    assert.doesNotMatch(html, /github\.com\/shubh-techie\/AegisAI(?:[\/"?#\s<]|$)|AegisAI-Portal/);
    assert.ok(html.includes('href="https://github.com/shubh-techie/AeglysAI"'));
    let cleaned=html
      .replaceAll("AeglysAI is the evolution of the research initiative previously known as AegisAI.", "HISTORICAL_TRANSITION")
      .replaceAll("He created the initiative previously known as AegisAI", "HISTORICAL_BIO")
      .replaceAll("An evolution into AegisAI", "HISTORICAL_TIMELINE")
      .replaceAll("The repository evolved into AegisAI, expanding the focus toward adaptive authorization research.", "HISTORICAL_TIMELINE");
    assert.doesNotMatch(cleaned, /aegis\s*ai|aegisai\.world/i,route);
    assert.doesNotMatch(html, /AeglysAi|Aeglys AI|AEGLYS AI/);
  }
  const home=read("index.html");
  assert.match(home,/Adaptive Intelligence for Secure &amp; Resilient Distributed Systems/);
  assert.match(home,/Observe\. Assess\. Authorize\. Respond\./);
  assert.match(read("about/index.html"),/previously known as AegisAI/);
  const png=readFileSync("dist/images/aeglysai-social.png");
  assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
});


test("hackathon visual experience preserves honest empty states and qualification boundaries", () => {
  const html = read("hackathons/index.html");
  for (const section of ["challenges", "how-it-works", "qualification", "qualification-guide", "github-workflow", "why-participate", "engagement", "tracks", "speakers", "judges", "timeline", "judging", "resources", "faq", "code-of-conduct"])
    assert.ok(html.includes(`id="${section}"`), section);
  assert.match(html, /Work in your own fork/);
  assert.match(html, /Participants do not receive write access to the official repository/);
  assert.match(html, /does not guarantee selection/);
  assert.match(html, /Prize eligibility and payment are subject to official event rules/);
  assert.doesNotMatch(html, /Future guest speaker|Independent judge slot|Person to be announced/);
  assert.match(html, /Keynote Speaker · PLANNED/);
  assert.match(html, /Shubh Prabhat/);
  for (const label of ["Start Qualification", "Submit Qualification", "Apply to Judge", "Express Speaker Interest", "Submit Project"])
    assert.ok(html.includes(`disabled aria-describedby=`) && html.includes(label));
  assert.doesNotMatch(html, /href="(?:#|null|undefined)"|mailto:|tel:|drive\.google\.com/);
  for (const {route, html: other} of pages.filter(page => !["hackathons", "hackathons/sponsors"].includes(page.route)))
    assert.doesNotMatch(other, /class="hackathon-experience"/, route);
  const css = readFileSync("src/styles/hackathon-experience.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const selector of css.matchAll(/(?:^|\n)([^@{}][^{}]*)\{/g))
    assert.ok(selector[1].trim().startsWith(".hackathon-experience"), selector[1]);
});

test("form configuration rejects private/unsafe links and keeps collection gated", async () => {
  const { transpileModule } = await import("typescript");
  const { outputText } = transpileModule(readFileSync("src/data/hackathonForms.ts", "utf8"), { compilerOptions: { module: 99, target: 99 } });
  const { hackathonForms, publicFormUrl } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
  assert.ok(Object.values(hackathonForms).every(form => form.url === null && form.open === false));
  assert.equal(publicFormUrl(null, true), null);
  const fixture = "https://forms.gle/synthetic-test-fixture";
  assert.equal(publicFormUrl(fixture, false), null);
  assert.equal(publicFormUrl(fixture, true), fixture);
  for (const invalid of ["javascript:alert(1)", "https://drive.google.com/private", "https://docs.google.com/forms/d/synthetic-test-fixture/edit", "http://forms.gle/synthetic-test-fixture", "https://forms.gle.evil.invalid/test", "not-a-url"])
    assert.throws(() => publicFormUrl(invalid, true));
  assert.doesNotMatch(read("hackathons/index.html"), /synthetic-test-fixture/);
});

test("closure routes preserve event identity, windows and shared fork/certificate guidance", () => {
  const landing = read("hackathons/index.html");
  for (const [id, launch, submission] of [
    ["adaptive-authorization", "November 2026", "January 2027"],
    ["behavioral-risk", "December 2026", "February 2027"],
    ["autonomous-resilience", "January 2027", "March 2027"],
  ]) {
    const html = read(`hackathons/${id}/index.html`);
    assert.ok(landing.includes(`href="/hackathons/${id}/"`));
    assert.ok(html.includes(launch) && html.includes(submission));
    assert.match(html, /hackathons\/#qualification/);
    assert.match(html, /hackathons\/#certificates/);
    assert.match(html, /Opening Soon/);
    assert.match(html, /No appointments or results are claimed/);
    assert.match(html, /Prize eligibility and payment are subject to official event rules/);
    assert.ok(read("hackathons/events/index.html").includes(`id="${id}"`));
  }
  assert.match(landing, /Registration alone does not earn a certificate/);
  assert.match(landing, /qualification\/example-user/);
  assert.match(landing, /qualification branch URL and qualification file URL/);
  assert.match(landing, /Final submission does not guarantee an AeglysAI merge/);
  const template = readFileSync("docs/hackathons/QUALIFICATION_TEMPLATE.md", "utf8");
  for (const heading of ["Build Result", "Test Result", "Architecture Understanding", "Technical Observation", "Improvement Idea", "Why It Matters", "Validation Approach"])
    assert.ok(template.includes(`## ${heading}`));
  const policy = readFileSync("docs/hackathons/CERTIFICATE_POLICY.md", "utf8");
  for (const role of ["P", "F", "W", "J", "S", "M"])
    assert.ok(policy.includes(`AEGLYS-H01-${role}-0001`));
});

test("sponsorship privacy gates exclude review states and unconfirmed prize allocations", async () => {
  const { transpileModule } = await import("typescript");
  const source = readFileSync("src/data/hackathonSponsorship.ts", "utf8")
    .replace('import { events } from "./hackathons";', 'const events = [{ id: "adaptive-authorization", prize: { amount: 300 } }];')
    .replace('import { publicFormUrl } from "./hackathonForms";', 'const publicFormUrl = (url, open) => open ? url : null;');
  const { outputText } = transpileModule(source, { compilerOptions: { module: 99, target: 99 } });
  const config = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
  const approved = { name: "TEST-ONLY-NOT-A-SPONSOR", status: "CONFIRMED", publicDisplayApproved: true, termsAccepted: true, contributionConfirmed: true, nameLogoPermission: true, eventIds: ["adaptive-authorization"], prizeAllocationsUsd: { "adaptive-authorization": 100 } };
  for (const status of ["INTERESTED", "UNDER_REVIEW", "TERMS_PENDING", "COMPLETED"]) {
    const records = [{ ...approved, status }];
    assert.equal(config.confirmedSponsors(records).length, 0);
    assert.equal(config.prizePools(records)[0].additional, 0);
  }
  for (const gate of ["publicDisplayApproved", "termsAccepted", "contributionConfirmed", "nameLogoPermission"])
    assert.equal(config.confirmedSponsors([{ ...approved, [gate]: false }]).length, 0);
  assert.equal(config.prizePools([approved])[0].total, 400);
  assert.throws(() => config.prizePools([{ ...approved, prizeAllocationsUsd: { "adaptive-authorization": -1 } }]));
  assert.equal(config.SPONSOR_INTEREST_FORM_URL, null);
  assert.equal(config.SPONSOR_INTEREST_OPEN, false);
  const html = read("hackathons/sponsors/index.html");
  assert.match(html, /Sponsorship Interest Form — Opening Soon/);
  assert.match(html, /Community sponsorship opportunities are currently open/);
  assert.match(html, /PLANNED BASE/);
  assert.doesNotMatch(html, /TEST-ONLY-NOT-A-SPONSOR|mailto:|drive\.google\.com|INTERESTED|UNDER_REVIEW|TERMS_PENDING/);
  assert.ok(read("hackathons/index.html").includes('href="/hackathons/sponsors/"'));
});
