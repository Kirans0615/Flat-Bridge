/**
 * brief §12. The legacy site promises "stories of success" and delivered
 * none (docs/legacy-audit.md, "Template leftovers"). The first three below
 * are anonymised placeholders — `status: 'placeholder'` — and every number
 * is footnoted to the existing site claim it's drawn from, nothing invented.
 * `us-food-ingredients-shipper` and `multi-site-warehouse-operator`
 * (2026-10-16) are real, client-supplied case studies — `status: 'real'`,
 * no footnote needed since the numbers came directly from Flat Bridge.
 */
export interface CaseStudy {
  slug: string;
  client: string;
  situation: string;
  approach: string[];
  results: { metric: string; source?: string }[];
  status: "placeholder" | "real";
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
  {
    slug: "food-ingredients-shipper",
    client: "A food ingredients shipper",
    situation:
      "A shipper that needed full load-management capability (pricing, tendering, tracking) without the cost of licensing, configuring and staffing its own TMS.",
    approach: [
      "Shipper's freight run on Flat Bridge's best-in-class TMS instance",
      "Load pricing and carrier tendering managed by the Flat Bridge team",
      "Shipment tracking and status updates through delivery",
    ],
    results: [{ metric: "28% reduction in annual freight spend" }],
    status: "real",
  },
  {
    slug: "multi-site-warehouse-operator",
    client: "A multi-site warehouse operator",
    situation:
      "A warehouse operator whose locations in Chicago, Portland and Los Angeles each carried their own back-office load (inventory, dock scheduling and shipping paperwork) on top of floor operations.",
    approach: [
      "Inventory management and reconciliation",
      "Inbound and outbound appointment scheduling",
      "Bill of lading creation and shipping documentation",
    ],
    results: [
      {
        metric: "30% leaner on-site headcount across three locations, with zero on-site admin staff",
      },
    ],
    status: "real",
  },
];
