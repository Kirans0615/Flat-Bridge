/**
 * brief §15.3. Genuinely sequential — numbering is earned here (unlike
 * sectors/services/edge, which brief §4.3 bans numbering on).
 */
export const processSteps = [
  {
    number: "01",
    title: "Discovery call",
    body: "A conversation about what's actually costing your team the most time — dispatch, documents, carrier work, or the back office as a whole.",
  },
  {
    number: "02",
    title: "Scoped pilot",
    body: "A defined pilot scope with no long-term commitment and minimal upfront investment.",
  },
  {
    number: "03",
    title: "Trained team assigned",
    body: "A team trained specifically for your account before they touch client-facing work — up to a one-year training program.",
  },
  {
    number: "04",
    title: "Run and report",
    body: "Ongoing work inside your existing systems, with KPI reporting and a pricing engine that can be in place in under 24 hours.",
  },
] as const;
