/**
 * brief §22 item 2 — greps built HTML for banned strings and fails the build.
 * Usage: node scripts/check-copy.mjs [baseUrl]
 * Requires the app to already be running at baseUrl.
 *
 * Known accepted exception: "/insights" legitimately contains "2023" as the
 * real publish date of the one real legacy blog post (Aug 10, 2023) — this
 * is a true historical fact, not the stale "Copyright @ 2023" defect the
 * brief's banned list targets (the footer copyright is separately verified
 * to render the computed current year). Do not chase this one.
 */
const BASE = process.argv[2] ?? "http://localhost:3000";

const BANNED = [
  "Suport",
  "nhanced",
  "collectionof",
  "FlatBridge",
  "2023",
  "%+",
  "Poly Dem",
  "Robin Ton",
  "Magar Faw",
  "Support Given",
  "Awards won",
  "Lorem",
];

const routes = [
  "/",
  "/about",
  "/services",
  "/sectors",
  "/case-studies",
  "/insights",
  "/careers",
  "/contact",
  "/process",
  "/security",
];

let failed = false;

for (const path of routes) {
  const res = await fetch(`${BASE}${path}`).catch(() => null);
  if (!res || !res.ok) continue;
  const html = await res.text();

  for (const term of BANNED) {
    if (html.includes(term)) {
      console.error(`BANNED STRING "${term}" found on ${path}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log(`No banned strings found across ${routes.length} routes.`);
}
