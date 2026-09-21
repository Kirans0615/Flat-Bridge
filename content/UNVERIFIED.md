# Unverified content blocking launch

Every row here is a factual claim, asset or section that is NOT cleared to ship.
Per BRIEF §11.1 the `<Unverified>` component throws on production builds, and
per §17 the site is not done until this file is empty.

Gate policy (see docs/decisions.md D-004): the CI check that fails on a
non-empty file runs on the release branch only, not on phase PRs — this file is
expected to be non-empty throughout Phases 1–6 by design.

| ID | Item | Blocks | Owner | Opened |
|----|------|--------|-------|--------|
| U-001 | Nine stat values in `content/facts.yaml` unverified | Home stats, About, calculator | Client | 2026-09-05 |
| U-002 | No cleared photography of Mandeville facility or team | Home §7.1.9, About §7.2, Careers §7.7, coverflow slides §8.2 | Client | 2026-09-05 |
| U-003 | No client logos or case studies cleared | `/results` route — omit entirely if none | Client | 2026-09-05 |
| U-004 | No brochure / pricing PDF confirmed to exist | `/pricing-guide` §7.10 | Client | 2026-09-05 |
| U-005 | Full street address for LocalBusiness schema + map | Contact §7.8, JSON-LD §13.1 | Client | 2026-09-05 |
| U-006 | Coverage window (is it genuinely 24/7, staffed how?) | Nearshore wedge, footer, Contact | Client | 2026-09-05 |
| U-007 | Second testimonial quote on the live site has no identifiable speaker once the merged Sam quote is split. Text begins "The Flat Bridge Team inspires trust with their customers and carriers…" | Home §7.1.8 — quote withheld rather than misattributed | Client | 2026-09-05 |
