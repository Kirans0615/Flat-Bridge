# Flat Bridge Client Revision Round (10.09.26) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Adaptation note:** This repo has no unit test runner (`package.json` scripts: dev, build, start, lint, typecheck, preview, deploy, analyze, check:links, check:copy — no `test`). This is a content/structure/copy revision, not new logic. The verification gate for every task is: `npm run typecheck`, `npm run lint`, a visual check in Chrome (mobile ~390px + desktop ~1440px) for any task that touches layout, and `npm run check:links` / `check:copy` where relevant. No fake unit tests are written.

**Goal:** Implement the client's 10.09.26 revision round (Parts 1-9 of the pasted spec) across the Flat Bridge Next.js site. Part 10 items are explicitly out of scope — do not touch them.

**Architecture:** Next.js 16 (App Router) + TypeScript + Tailwind, content separated into `src/content/*.ts` modules consumed by page components in `src/app/**/page.tsx` and shared chrome in `src/components/chrome/*`. No CMS — all copy is hardcoded in content modules.

**Tech Stack:** Next.js 16 (Turbopack), React 19, Tailwind v4, motion/react, lucide-react.

**Spec:** The full client brief is the user's pasted message in this conversation (titled "Flat Bridge website — client revision round (10.09.26)"), reproduced in full below for travel-with-the-plan purposes.

## Global Constraints

- Use the client's copy exactly as quoted — no rewording.
- Shared components (header/nav, "Ready to hand something off?" CTA band, footer) change once in their shared file so the change propagates everywhere, unless an item restricts it to one page (Careers CTA removal, 8.6).
- When a section is deleted: remove it from the page file entirely, including now-unused imports/components/content exports. No empty wrappers.
- Keep the existing design system, animations, and responsive behavior unless an item says otherwise. Check mobile (~390px) and desktop (~1440px).
- Do not invent facts, statistics, legal text, or client claims. New service placeholder copy must not claim volumes, results, or clients.
- End of work: `npm run build` and `npm run lint` must be clean; report placeholder copy (Part 3.1) and anything not done.

---

## File Map (what exists today, confirmed by reading the repo)

- Shared chrome: `src/components/chrome/nav.tsx` (header + mega-menus + mobile sheet), `src/components/chrome/footer.tsx`, `src/components/chrome/pre-footer-cta.tsx` (the CTA band itself), `src/components/chrome/global-cta-gate.tsx` (page-based show/hide of the CTA band).
- Nav/footer content: `src/content/nav.ts` (`primaryNav`, `servicePillars`, `footerColumns`).
- Sitewide constants: `src/content/site.ts` (`site.email`, `heroContent`, `platforms`).
- Services: `src/content/services.ts` (`Service` interface + 16-item array, `category` union type), `src/app/services/page.tsx`, `src/app/services/service-filter-list.tsx` (client-side filter, local state only — no URL sync yet), `src/app/services/[slug]/page.tsx` (`generateStaticParams` from the array — renaming/removing a slug auto-updates routes), `src/lib/media.ts` (`media.heroServices` keyed by old slugs — fine if new slugs have no entry, code already null-safe).
- Redirects: `next.config.ts` (`legacyRedirects` array, 301s via `redirects()` — add old→new service slugs here).
- About: `src/app/about/page.tsx`, `src/content/about.ts`.
- Sectors: `src/app/sectors/page.tsx` (landing page ALREADY EXISTS and is fully built — the desktop bug is that the nav's "Sectors" click only toggles the dropdown, never links to it), `src/components/chrome/nav.tsx`'s `SectorsMegaMenu`.
- Insights: `src/app/insights/page.tsx`, `src/app/insights/[slug]/page.tsx`, `src/app/insights/category/[slug]/page.tsx`, `src/content/insights.ts`, `src/components/sections/insights-teaser.tsx` (homepage teaser card), `src/app/sitemap.ts`, `src/app/robots.ts`.
- Case studies: `src/app/case-studies/page.tsx`.
- Careers: `src/app/careers/page.tsx`, `src/content/careers.ts`, `src/components/sections/application-form.tsx`.
- Contact: `src/app/contact/page.tsx`, `src/app/contact/jm-clock.tsx`, `src/components/sections/nearshore-map.tsx` + `src/content/nearshore-map-data.ts` (if this is the "Where we are" map — confirm when editing 9.2).
- Legal: `src/content/legal.ts`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/security/page.tsx`.
- Logo assets: `public/media/logo-green.png` (all-green, currently `logoDark`), `public/media/logo-black-green.png` (black+green, currently `logoLight`), **`public/media/logo-white.png` already generated this session** (pure-white silhouette derived from `logo-green.png`'s alpha channel, verified against a dark background) — needs registering in `src/lib/media.ts` and wiring into `nav.tsx`.

---

## Task 1: Part 1.1 — Header logo + nav items (`src/lib/media.ts`, `src/components/chrome/nav.tsx`, `src/content/nav.ts`)

- [ ] Add `logoWhite: \`${LOCAL}/logo-white.png\`` to `media.ts`.
- [ ] In `nav.tsx`, change `const logo = isPaper ? media.logoLight : media.logoDark;` to use `media.logoWhite` for the non-paper (dark/photo) case instead of `media.logoDark`. Keep `media.logoLight` for the paper (light-background) case.
- [ ] Increase the logo's rendered size: change `h-8 w-auto` (both the `<Link>` wrapper and the `<img>`) to `h-10 sm:h-12 w-auto` (noticeably bigger, still fits the 20/py-5 header on mobile).
- [ ] In `src/content/nav.ts`: remove `{ label: "Insights", href: "/insights" }` from `primaryNav`; insert `{ label: "Process", href: "/process" }` right after `{ label: "Sectors", href: "/sectors" }`. Final order: About, Services, Sectors, Process, Case studies, Careers.
- [ ] Verify `/process` route exists (`src/app/process/page.tsx` — confirmed present) so the new nav link isn't dead.
- [ ] Visual check: screenshot header on `/` (dark/photo bg) and `/contact` (paper bg, if contact page is paper-toned) at mobile + desktop. Confirm logo is legible on both and the new nav order shows.

## Task 2: Part 1.2 — Services mega-menu → compact dropdown (`src/components/chrome/nav.tsx`, `src/content/services.ts` category IDs)

- [ ] This depends on Task 7's new 4-category catalog existing first (do Task 7 before this one, or at minimum land the new `category` union + a `serviceCategories` registry with `{ id, label }` for the 4 categories + slugified ids for query params).
- [ ] Replace `ServicesMegaMenu()` in `nav.tsx`: drop the 3-column `servicePillars`-based layout (with descriptions) for a single-column compact list: "All 24 capabilities" (links to `/services?category=all`) then the 4 category names (`/services?category=<slug>`), no description paragraphs.
- [ ] Confirm `MobileSheet` doesn't need special-case changes — mobile nav doesn't render the mega-menu today (primaryNav items render as plain links), so the Services dropdown is desktop-only already; the client's "must work on mobile, inside the mobile menu" requirement means the equivalent category links need to appear in the mobile sheet too. Add a small expandable/stacked list of the 4 categories + "All 24 capabilities" under the "Services" mobile nav link (simplest: render the same 5 links indented under the Services link in `MobileSheet`, each closing the sheet on click).
- [ ] `servicePillars` export in `nav.ts` becomes unused once this lands — remove it (and its only other consumer, `src/app/services/page.tsx`'s Block 2, which Task 8 deletes anyway).

## Task 3: Part 1.3 — Shared CTA band + contact strip (`src/components/chrome/pre-footer-cta.tsx`, `src/components/chrome/footer.tsx`)

- [ ] `pre-footer-cta.tsx`: replace the paragraph text with "Describe the function that's costing you the most hours. Let's talk about how we can find efficiencies for you." Change the secondary link label "See our capabilities" → "Explore our capabilities."
- [ ] `footer.tsx`: the clock + "Our team is online" block is the `useJamaicaClock` display in Zone 1. Make it bigger/brighter: change `micro font-mono tabular-nums text-[var(--color-concrete)]` → a larger size (e.g. `text-small` or `text-body`) with `text-white` (pure white, not concrete/dim), and the status line similarly bigger/brighter than its current `micro text-current/70`.
- [ ] Email constant change is Task 9 (9.1) — `footer.tsx` already reads `site.email`, no separate edit needed here once 9.1 lands.

## Task 4: Part 1.4 — Footer services column (`src/content/nav.ts` footerColumns, `src/components/chrome/footer.tsx`)

- [ ] Depends on Task 7 (new catalog) for the 4 category names + slugs.
- [ ] `footerColumns.services`: change `{ label: "All 16 capabilities", href: "/services" }` → `{ label: "All 24 capabilities", href: "/services?category=all" }`.
- [ ] Footer currently appends `servicePillars.map(...)` for the 3 extra service links — once `servicePillars` is removed (Task 2), replace that with the 4 new category objects (reuse the `serviceCategories` registry from Task 7), each linking to `/services?category=<slug>`.
- [ ] Remove "Security & compliance" from `footerColumns.legal` (Task 9.5 will also unroute the page itself).
- [ ] Company column: confirm already correct (About, Process, Careers, Case studies, Contact) — no edit expected, just verify after Task 1 removes Insights from primaryNav that nothing else links to `/insights`.

## Task 5: Part 2.1 — Home hero (`src/content/site.ts`, `src/components/sections/hero.tsx`)

- [ ] Already done earlier this session: `heroContent.h1Line2` ("since 1997") removed, single-line H1 "Built to carry the load" renders cleanly (verified in browser).
- [ ] Update `heroContent.sub` to the new client-provided descriptor (already done this session, verified in browser): "Strategic and skilled supply chain and logistics BPO. We handle the load boards, check calls, appointments, troubleshooting, and claims – so your team can grow your business." — **note the client's Part 2 text differs slightly from the earlier mid-session request** (adds "supply chain and" before "logistics BPO", uses an en/hyphen "–" instead of em dash "—"). Reconcile: update `sub` to match this Part 2.1 wording exactly (client's most recent, most specific instruction), keeping the em dash style already used elsewhere on the site for the dash (consistent typography — flag the hyphen-vs-em-dash swap in the summary as a judgment call, not invented content).
- [ ] Confirm no other "1997"/"since 1997" string remains on the Home page specifically (`src/app/page.tsx` and whatever sections it renders) — if any is found, report it per the client's instruction, do not change it.

## Task 6: Part 3.1-3.2, 3.4 — New 24-service catalog (`src/content/services.ts`, `src/content/nav.ts`, `src/app/services/page.tsx`, `src/app/services/service-filter-list.tsx`, `next.config.ts`)

- [ ] Rewrite `Service["category"]` union to `"Accounting" | "Carrier Services" | "Load Management & Documentation" | "Technology"`.
- [ ] Add a `serviceCategories` export: `[{ id: "accounting", label: "Accounting" }, { id: "carrier-services", label: "Carrier Services" }, { id: "load-management-documentation", label: "Load Management & Documentation" }, { id: "technology", label: "Technology" }]` for query-param mapping shared by nav dropdown, footer, and the filter list.
- [ ] Replace the `services` array with the 24-item catalog (slugs kept stable where reused, new slugs kebab-cased from the new names). Reuse `lede`/`body`/`whatYouGet`/`systems`/`sectorSlugs` from the matching old entry for: Driver dispatch, Tracking and tracing, Claims processing, Load postings, Truck searches, Load searches, Carrier compliance, Carrier development, Appointment scheduling, EDI and API integration. Rename+adjust: Transportation management systems → TMS operations; Pricing engines → Pricing support (reword the "under 24 hours" lede/body to fit the renamed service without changing the underlying claim). Split: Air waybill and bill of lading processing → "Air waybills" (Load Mgmt, keeps the air-waybill half of the old body) + "Bill of lading processing" (Accounting, keeps the bill-of-lading half). Donor: "Invoice auditing" (Accounting) takes its body from the old "Freight audit and payment" entry (the "about 25%" claim stays — it's an existing site claim, not newly invented) per the client's explicit instruction ("Invoice auditing can take its description from Freight audit and payment if it fits").
- [ ] Remove old entries with no new equivalent at all: `data-entry`, `freight-audit-and-payment` (content moved to invoice-auditing, old slug removed), `back-office-support`.
- [ ] Write new placeholder `lede`/`body`/`whatYouGet` (`placeholder: true`) for the 9 genuinely new services with no donor text — same tone/length as existing placeholders, no volume/result/client claims: Billing and invoicing support (Accounting), Collections (Accounting), Entering carriers (Carrier Services), Updating carrier files (Carrier Services), Freight rating (Load Mgmt), Load building (Load Mgmt), POD close outs (Load Mgmt), Email and workflow automation (Technology), AI integration (Technology).
- [ ] Assign `sectorSlugs` for every service (reuse old assignments where the service is reused/split/renamed; for the 9 new ones, assign sensible sectors by analogy to sibling services in the same category — e.g. "Collections" → sectors that had "Freight audit and payment"; this is categorization judgment, not a new factual claim, same disclaimer already used for `PILLAR_CAPABILITY_SAMPLES`).
- [ ] `src/app/services/page.tsx` hero: headline → "Twenty-four capabilities. Your unique service package." paragraph → "Take a single function off your desk or we'll support your back-office operations."
- [ ] `src/app/services/page.tsx`: delete the `{/* Three pillars */}` `<Section id="pillars">` block entirely (3.3), including the now-dead `servicePillars` import if nothing else in the file needs it.
- [ ] `src/app/services/page.tsx`: Eyebrow "All 16 capabilities" → "All 24 capabilities" (3.4).
- [ ] `src/app/services/service-filter-list.tsx`: swap the hardcoded `CATEGORIES` array for `serviceCategories` (labels only, from `services.ts`); increase filter button font size (`text-small` → `text-body` or similar) and scale padding (`px-4 py-1.5` → e.g. `px-5 py-2.5`); confirm `flex-wrap` already present (it is) so mobile wrapping stays clean. Read the initial active category from the URL: wrap the component to read `useSearchParams()` for a `category` param, map it through `serviceCategories` (fall back to "All" if missing/unrecognized), and use that as `useState`'s initial value.
- [ ] Each row's category label already renders `service.category` directly — no change needed beyond the data itself now holding the new category names.

## Task 7: Part 3.1 redirects + detail-page slugs (`next.config.ts`)

- [ ] Add to `legacyRedirects`: `/services/data-entry` → `/services`; `/services/air-waybill-and-bill-of-lading-processing` → `/services/air-waybills`; `/services/freight-audit-and-payment` → `/services/invoice-auditing`; `/services/back-office-support` → `/services`; `/services/transportation-management-systems` → `/services/tms-operations`; `/services/pricing-engines` → `/services/pricing-support`.
- [ ] Confirm `src/app/services/[slug]/page.tsx` needs no code changes — `generateStaticParams`/`notFound()` already derive entirely from the `services` array.

## Task 8: Part 3.5 — Platform marquee mobile fix (`src/app/services/page.tsx`, possibly a small new mobile-only block; do NOT touch `src/content/site.ts`'s `platforms` array — Part 10 says keep the current list)

- [ ] Keep the existing `<Marquee speed={40} pauseOnHover>` block for desktop only (wrap in `hidden sm:block`).
- [ ] Add a mobile-only (`sm:hidden`) block: when not reduced-motion, a `<Marquee speed={20}>` (no `pauseOnHover` — avoids the likely touch-pointer "stuck paused" bug on touch devices) over the same `platforms` list; when `useReducedMotion()` is true, render `platforms` as a centered `flex flex-wrap justify-center gap-x-6 gap-y-3` static multi-row list instead of the Marquee component's own reduced-motion fallback (which is a horizontal-scroll row of 6 — not what 3.5 asks for on mobile).
- [ ] Visual check at ~390px: confirm it auto-scrolls continuously without requiring a swipe, and loops without a visible seam.

## Task 9: Part 4 — About page reorder/trim (`src/app/about/page.tsx`, `src/content/about.ts`)

Final order: Hero photo block (new copy) → Why choose us → Our team → CTA band (global, already there via `GlobalCtaGate`, no page-level change needed since About isn't excluded).

- [ ] 4.1: In `content/about.ts`, change `aboutHero.h1` to "Flat Bridge is a trusted resource of English-speaking, logistics-minded professionals." and `aboutHero.lede` to "Flat Bridge's skilled workforce is trained in industry trends, supply chain platforms, and best practices in tracking, tracing, appointments, and carrier sales. They bring their training into your systems." Keep `aboutHero.cta` ("Talk to us") unchanged. Confirm the hero `<Section tone="ink" id="about-hero">` overlay (the `linear-gradient` over `media.aboutHeroBg`) already provides enough contrast — it does, reuse as-is (ground rule: keep existing design unless told otherwise).
- [ ] 4.2: Delete the `{/* Who we are */}` `<Section id="who-we-are">` block from `about/page.tsx`. Remove the now-unused `whoWeAre` import/usage — but check `ourTeam` section (4.7) also maps over `whoWeAre.body` to repeat it next to the team photo; re-read that block before deleting `whoWeAre` from `content/about.ts` entirely. Decision: keep the `whoWeAre` export in `about.ts` (content still used by the Our Team section's repeated paragraphs) but remove only the standalone "Who we are" `<Section>`.
- [ ] 4.3: Delete the `{/* Timeline */}` `<Section id="timeline">` block entirely (the "Timeline" eyebrow from this session's earlier edit goes with it). Remove the `timeline` import from `about/page.tsx` and the `timeline` export from `content/about.ts` if nothing else uses it (confirm via grep before deleting the export).
- [ ] 4.4: Delete the `{/* How we work */}` `<Section id="how-we-work">` block. Remove `howWeWork` import from the page; remove the export from `content/about.ts` if unused elsewhere (grep first).
- [ ] 4.5: In `content/about.ts`, replace the "Advanced technology" row in `whyChooseUs.rows` with `{ title: "Evolving Technological Expertise", body: "Work carried out inside clients' current platforms, while ready to adapt to platform or technology upgrades and innovations." }`. This section becomes the page's 2nd section (reorder in `about/page.tsx` — move the "Why choose us" `<Section>` to directly follow the hero).
- [ ] 4.6: Delete the `{/* Counters */}` `<Section id="counters">` block entirely (the stats strip). Remove `aboutCounters` import from the page and `currentYearsInLogistics` (now fully unused since the only consumer was this counter) from `about/page.tsx`. Remove the `aboutCounters` export from `content/about.ts` if unused elsewhere.
- [ ] 4.7: Keep `{/* Our team */}` unchanged, reorder to 3rd section.
- [ ] Final page order check: Hero → Why choose us → Our team → (global CTA band renders after via layout, not page-authored).
- [ ] Visual check at mobile + desktop.

## Task 10: Part 5.1 — Sectors desktop landing page access (`src/components/chrome/nav.tsx`)

- [ ] In `SectorsMegaMenu()`, add an "All sectors" link at the **top** of the panel (above the sector grid), styled consistently with the existing bottom one (or move the existing bottom one to the top — client accepts either "Sectors" trigger itself linking out, or an "All sectors" item at the top of the dropdown; adding one at the top is the lower-risk change since it doesn't alter the nav's click/hover interaction model for both Services and Sectors).
- [ ] Confirm footer's `footerColumns.sectors` → "All sectors" → `/sectors` already correct (it is, per the read in this session) — no change, mention as already-correct in the summary.
- [ ] Do not touch sector content (Part 10).

## Task 11: Part 6.1 — Hide Insights (`src/content/nav.ts` [done in Task 1], `src/components/sections/insights-teaser.tsx` consumer, `src/app/page.tsx`, `src/app/insights/**`, `src/app/sitemap.ts`, `src/app/robots.ts`)

- [ ] Confirm `src/app/page.tsx` renders an `InsightsTeaser`/similar section — if so, remove that section + its import (check `src/components/sections/index.ts` barrel too).
- [ ] Grep the whole `src` tree for `"/insights"` after Task 1's nav removal to find any remaining internal links/cards (e.g. a "Latest insights" card elsewhere) and remove them.
- [ ] `src/app/insights/page.tsx`, `[slug]/page.tsx`, `category/[slug]/page.tsx`: make each return `notFound()` (or redirect to `/`) at the top of the route — client wants a 404/redirect, not a visible page, while keeping the source files intact behind this route-level gate. Add `export const metadata = { robots: { index: false, follow: false } }` only if the 404 path still renders something crawlable; simplest compliant approach is an unconditional `notFound()` call (404 status, nothing to index).
- [ ] `src/app/sitemap.ts`: remove any `/insights` or `/insights/<slug>` entries it generates.
- [ ] `src/app/robots.ts`: optionally add a `disallow: ["/insights", "/insights/*"]` rule as defense-in-depth (not required if the routes 404, but cheap and matches "noindex if any part stays reachable").
- [ ] Verify `npm run check:links` (an existing project script) still passes after this — it may be exactly the kind of check meant to catch dead/orphaned links.

## Task 12: Part 7.1 — Case studies desktop card layout (`src/app/case-studies/page.tsx`)

- [ ] Read the current grid/card classes. Tighten desktop spacing/card size (denser grid columns and/or a narrower `max-w-*` container, smaller card padding) using a `lg:`/`xl:`-scoped class change only — leave the base (mobile) classes untouched so mobile is provably unaffected.
- [ ] Do not change case-study text content (Part 10).
- [ ] Visual check both breakpoints, confirm mobile pixel-identical before/after (screenshot diff by eye).

## Task 13: Part 8 — Careers page (`src/app/careers/page.tsx`, `src/content/careers.ts`, `src/components/sections/application-form.tsx`, `src/components/chrome/global-cta-gate.tsx`)

- [ ] 8.1: Keep hero headline; replace the paragraph with the client's exact new sentence.
- [ ] 8.2: Add the intro paragraph under "What it's like here" eyebrow (exact client text). Replace the 3 cards' content per spec (We are / We are not / Compensation & benefits) as short stacked lists in the existing card component/classes — reuse whatever list-item pattern the codebase already has (e.g. the same bullet pattern as `whatYouGet` on service pages) rather than inventing a new one.
- [ ] 8.3/8.4: no changes (confirm by reading, don't touch).
- [ ] 8.5: In `application-form.tsx`, change the LinkedIn field label "LinkedIn" → "Your LinkedIn Profile", mark it required (add to whatever required-field validation list/array exists, add the same asterisk marker other required fields use).
- [ ] 8.6: In `global-cta-gate.tsx`, extend the exclusion to `pathname === "/careers"` so the CTA band doesn't render there.
- [ ] Visual check mobile + desktop on `/careers`.

## Task 14: Part 9 — Contact + legal pages

- [ ] 9.1: Add `discovery: "discovery@goflatbridge.com"` style single source of truth — simplest: change `site.email`/`site.emailHref` in `content/site.ts` directly to `discovery@goflatbridge.com` / `mailto:discovery@goflatbridge.com` (it's already the single shared constant everything reads from — Contact page + footer + CTA band contact strip all consume `site.email`, confirm Contact page does too when reading it). **Flag in the summary per Part 10: confirm this inbox exists before deploying.**
- [ ] 9.2: Read `src/components/sections/nearshore-map.tsx` + `src/content/nearshore-map-data.ts` to confirm this is the Contact page's "Where we are" map. Replace with a lightweight inline SVG/CSS graphic: simplified US East Coast + Caribbean outline, an Eastern-Time band highlight, Mandeville marked — site-palette colors only, no third-party embed, readable at mobile width. (This is the one genuinely new visual asset in the whole spec — build it as a self-contained SVG component, no external map tiles/scripts.)
- [ ] 9.3: In `content/legal.ts` (or wherever Privacy's paragraph lives — confirm path when editing), replace the privacy paragraph with the client's exact new sentence. Add a single HTML/JSX comment placeholder (e.g. `{/* PREVIOUS PRIVACY POLICY: client to supply text — do not render placeholder copy here */}`) for the previous-policy section — render nothing visible for it yet.
- [ ] 9.4: Replace the Terms paragraph with the client's exact new sentence.
- [ ] 9.5: `src/app/security/page.tsx`: make it `notFound()` at the top (same pattern as Task 11's Insights gate), keep the file/content behind that gate. Confirm Task 4 already dropped the footer link. Remove from `sitemap.ts` if listed; add to `robots.ts` disallow list alongside `/insights`.

## Self-Review Checklist (run before executing)

1. **Spec coverage:** Every Part 1-9 sub-item above maps to a Task. Part 10 items appear nowhere as an edit target — confirmed by cross-reading each Task's scope against the "On hold" list (sector content, case-study text, platforms list beyond the mobile marquee mechanics, careers application form fields beyond the LinkedIn label, security page body copy, discovery@ confirmation, previous privacy policy text).
2. **Ordering dependencies:** Task 7 (new catalog) must land before Task 2 (Services dropdown) and Task 4 (footer services column), since both need the new category names/slugs. Task 1 (nav content incl. Insights removal) should land before Task 11 (Insights hide) confirms no stray links remain.
3. **Shared-component risk:** Tasks 1, 3, 4, 10 all touch `nav.tsx`/`footer.tsx`/`pre-footer-cta.tsx`/`global-cta-gate.tsx` — do these as isolated, sequential edits with a typecheck after each to avoid compounding merge conflicts within the same file across tasks.

## Execution

Inline execution in this session, task-by-task, in the dependency order above (7 → 2 → 4, then the rest in roughly spec order), with `npm run typecheck` after each content/type change and a final `npm run build` + `npm run lint` pass at the end, per the user's explicit instruction to implement everything now and report back — not deferred to a separate subagent-driven session.
