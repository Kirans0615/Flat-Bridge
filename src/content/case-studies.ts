/**
 * brief §12. No real case studies exist yet — the legacy site promises
 * "stories of success" and delivers none (docs/legacy-audit.md notes this
 * under "Template leftovers"). These three are anonymised, explicitly
 * `status: 'placeholder'`, and every number is footnoted to the existing
 * site claim it's drawn from — nothing here is a new statistic.
 */
export interface CaseStudy {
  slug: string;
  client: string;
  situation: string;
  approach: string[];
  results: { metric: string; source: string }[];
  status: "placeholder";
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "us-freight-brokerage",
    client: "A US freight brokerage",
    situation:
      "A brokerage whose team was spending most of each day on load posting, carrier vetting and check calls instead of growing the book of business.",
    approach: [
      "Load postings managed across 100+ load boards",
      "Carrier development and compliance monitoring",
      "Daily check-call coverage",
    ],
    results: [
      {
        metric: "Up to 60% reduction in employee costs",
        source: "Flat Bridge service description",
      },
    ],
    status: "placeholder",
  },
  {
    slug: "midwest-3pl",
    client: "A Midwest 3PL",
    situation:
      "A 3PL whose back-office workload — appointment scheduling, claims, data entry — was scaling linearly with every new client account.",
    approach: [
      "Back-office support across data entry, scheduling and claims",
      "EDI/API integration into existing client systems",
    ],
    results: [
      {
        metric: "30% reduction in inventory and data-management costs in the first month",
        source: "Flat Bridge service description",
      },
    ],
    status: "placeholder",
  },
  {
    slug: "asset-based-trucking-fleet",
    client: "An asset-based trucking fleet",
    situation:
      "A fleet where dispatch, tracking and freight-bill review were consuming operations staff time that could otherwise go to driver support.",
    approach: [
      "Driver dispatch and tracking and tracing",
      "Freight audit and payment review",
    ],
    results: [
      {
        metric: "An error found on roughly 25% of freight bills reviewed",
        source: "Flat Bridge service description",
      },
    ],
    status: "placeholder",
  },
];
