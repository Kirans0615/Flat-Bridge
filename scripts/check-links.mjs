/**
 * brief §22 item 1 — crawls the built output and fails on any internal href
 * that 404s or any href="#". This is the legacy site's signature failure
 * (defects 5, 7, 16, 17 in docs/legacy-audit.md).
 *
 * Usage: node scripts/check-links.mjs [baseUrl]
 * Requires the app to already be running (npm run dev / next start) at baseUrl.
 */
const BASE = process.argv[2] ?? "http://localhost:3000";

const visited = new Set();
const queue = ["/"];
const broken = [];
const bareHash = [];

async function crawl(path) {
  if (visited.has(path)) return;
  visited.add(path);

  const res = await fetch(`${BASE}${path}`).catch(() => null);
  if (!res || res.status >= 400) {
    broken.push({ path, status: res?.status ?? "no response" });
    return;
  }

  const html = await res.text();
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

  for (const href of hrefs) {
    if (href === "#") {
      bareHash.push(path);
      continue;
    }
    if (href.startsWith("/") && !href.startsWith("//")) {
      const clean = href.split("#")[0].split("?")[0];
      if (clean && !visited.has(clean) && !queue.includes(clean)) queue.push(clean);
    }
  }
}

while (queue.length) {
  await crawl(queue.shift());
}

console.log(`Crawled ${visited.size} internal paths.`);

if (broken.length) {
  console.error("\nBROKEN LINKS:");
  for (const b of broken) console.error(`  ${b.path} -> ${b.status}`);
}
if (bareHash.length) {
  console.error("\nBARE href=\"#\" FOUND ON:");
  for (const p of bareHash) console.error(`  ${p}`);
}

if (broken.length || bareHash.length) {
  process.exit(1);
} else {
  console.log("No broken links, no bare href=\"#\".");
}
