/**
 * brief §8.8, §11.2, §18.2. Order and promise lines are verbatim from brief
 * §8.8 (already carries the §18 fixes: "Trucking and drayage" retitled off
 * the mismatched "Shippers Logistics" card, and the smart-quote "OR" fix).
 *
 * The deeper per-sector "challenge" copy (Pain points / Background /
 * Solution) that brief §11.2 describes does not exist verbatim in
 * docs/legacy-audit.md beyond structure and, for trucking only, four benefit
 * category labels — the audit explicitly says all six sector pages "follow
 * the same template with swapped copy" but only summarises rather than
 * transcribing that copy. Rather than invent six sets of pain points, this
 * ships the one template structure the audit *does* confirm (the four
 * benefit labels), a Solution column built only from real service links
 * (structural, not a factual claim), and Pain points / Background left as
 * an honest placeholder pending the client. See docs/client-questions.md.
 */
import { services } from "./services";

export interface Sector {
  slug: string;
  name: string;
  promise: string;
  heroIntro: string[];
  benefits: { label: string; body: string }[];
  challenge: { painPoints: string; background: string; solution: string[] };
  serviceSlugs: string[];
  imageKey:
    | "port"
    | "yard"
    | "jamaica"
    | "sectorTrucking"
    | "sectorBrokers"
    | "sectorWarehouse"
    | "sectorIntermodal"
    | "sectorThreepl"
    | "sectorShippers";
  quote: { text: string; author: string };
  rewrittenNote?: string;
  placeholder?: boolean;
}

const sharedBenefitLabels = [
  {
    label: "Operational efficiency",
    body: "Streamlined processes that remove manual steps from the day-to-day operation.",
  },
  {
    label: "Client-centric approach",
    body: "Solutions shaped around how your team already works, not a fixed package.",
  },
  {
    label: "Expertise",
    body: "A team trained specifically in this sector's systems and workflows.",
  },
  {
    label: "Balanced workload",
    body: "Capacity that flexes with volume instead of your team absorbing every spike.",
  },
];

const jpMorganQuote = {
  text: "The wise man bridges the gap by laying out the path by means of which he can get from where he is to where he wants to go.",
  author: "J. P. Morgan",
};

function servicesFor(slug: string) {
  return services.filter((s) => s.sectorSlugs.includes(slug)).map((s) => s.slug);
}

export const sectors: Sector[] = [
  {
    slug: "trucking-drayage",
    name: "Trucking and drayage",
    promise:
      "Free yourself from data entry and load board hassles. Concentrate on client relationships while we optimize your trucking company's operations for profitability.",
    heroIntro: [
      "Elevate your trucking and drayage business with a team built to run dispatch, tracking and load-board work alongside you.",
      "We take the operational load off so your team can focus on the relationships that grow the business.",
    ],
    benefits: sharedBenefitLabels,
    challenge: {
      painPoints:
        "Pending — the legacy source text for this section is truncated. See docs/client-questions.md #5.",
      background:
        "Pending — the legacy source text ends mid-sentence ('…All these'). See docs/client-questions.md #5.",
      solution: servicesFor("trucking-drayage"),
    },
    serviceSlugs: servicesFor("trucking-drayage"),
    imageKey: "sectorTrucking",
    quote: jpMorganQuote,
    placeholder: true,
  },
  {
    slug: "freight-brokers-forwarders",
    name: "Freight brokers and forwarders",
    promise:
      'Navigate the competitive freight industry with our decades of forwarding expertise, combating thin margins and escalating operational costs for your success.',
    heroIntro: [
      "Freight brokerage runs on margin and speed. We handle the load postings, carrier searches and audit work that eat into both.",
      "A trained team working inside your existing systems, not asking you to adopt new ones.",
    ],
    benefits: sharedBenefitLabels,
    challenge: {
      painPoints: "Pending client-supplied copy. See docs/client-questions.md.",
      background: "Pending client-supplied copy. See docs/client-questions.md.",
      solution: servicesFor("freight-brokers-forwarders"),
    },
    serviceSlugs: servicesFor("freight-brokers-forwarders"),
    imageKey: "sectorBrokers",
    quote: jpMorganQuote,
    placeholder: true,
  },
  {
    slug: "warehousing-management",
    name: "Warehousing management",
    promise:
      "In Warehousing Management, precision is vital. Let our streamlined processes handle backend tasks while you drive profits per square foot, gaining a competitive edge.",
    heroIntro: [
      "Streamlining warehousing management with Flat Bridge.",
      "Backend accuracy — data entry, appointment scheduling, claims — handled so your floor operation can focus on throughput.",
    ],
    benefits: sharedBenefitLabels,
    challenge: {
      painPoints: "Pending client-supplied copy. See docs/client-questions.md.",
      background: "Pending client-supplied copy. See docs/client-questions.md.",
      solution: servicesFor("warehousing-management"),
    },
    serviceSlugs: servicesFor("warehousing-management"),
    imageKey: "sectorWarehouse",
    quote: jpMorganQuote,
    placeholder: true,
  },
  {
    slug: "intermodal-management",
    name: "Intermodal management",
    promise:
      "Enhance capacity, streamline efficiency, and cut costs in Intermodal Management. Allow us to connect reliable railway strategies with productivity gains, fostering profitability.",
    heroIntro: [
      "Intermodal moves depend on hand-offs between modes staying clean. We handle the documentation and tracking that keep them that way.",
      "Reliable coordination across the legs of a move, not just the ones on the road.",
    ],
    benefits: sharedBenefitLabels,
    challenge: {
      painPoints: "Pending client-supplied copy. See docs/client-questions.md.",
      background: "Pending client-supplied copy. See docs/client-questions.md.",
      solution: servicesFor("intermodal-management"),
    },
    serviceSlugs: servicesFor("intermodal-management"),
    imageKey: "sectorIntermodal",
    quote: jpMorganQuote,
    placeholder: true,
  },
  {
    slug: "3pl-providers",
    name: "Third-party logistics (3PL)",
    promise:
      "Elevate capacity, efficiency, and cost-effectiveness in 3PL services. We bridge reliable strategies, productivity, and profit, delivering a competitive advantage.",
    heroIntro: [
      "3PLs sit between shippers and capacity — every efficiency gain compounds across every client you serve.",
      "We extend that capacity: back-office support, EDI integration and carrier compliance work sized to your book of business.",
    ],
    benefits: sharedBenefitLabels,
    challenge: {
      // REWRITTEN — needs client sign-off (brief §11.2: legacy copy for this
      // page was a verbatim copy of the freight-broker page, talking about
      // "freight forwarders". Rewritten here using only claims made
      // elsewhere on the site (capacity, efficiency, cost, scalability,
      // technology) — no new facts introduced.
      painPoints:
        "3PLs manage capacity and cost pressure across every client relationship at once, with less room to absorb administrative overhead than a single shipper carries alone.",
      background:
        "REWRITTEN — needs client sign-off. Flat Bridge extends a 3PL's back office and systems capacity — data entry, EDI/API integration, carrier compliance monitoring and freight audit — without adding headcount that scales linearly with client count.",
      solution: servicesFor("3pl-providers"),
    },
    serviceSlugs: servicesFor("3pl-providers"),
    imageKey: "sectorThreepl",
    quote: jpMorganQuote,
    rewrittenNote:
      "Pain points / Background rewritten from the legacy freight-broker copy — needs client sign-off before this ships beyond the demo.",
    placeholder: true,
  },
  {
    slug: "shippers-logistics",
    name: "Shippers logistics",
    promise:
      'Navigating transportation spend for Shippers Logistics demands attention. Neglecting it constrains profits. Choose Flat Bridge as your inclusive "AND" solution, not an "OR" trade-off.',
    heroIntro: [
      "Transportation spend rarely gets the attention it deserves until it's already a problem.",
      "Freight audit, pricing engines and TMS support that treat cost control and service level as one problem, not a trade-off.",
    ],
    benefits: sharedBenefitLabels,
    challenge: {
      painPoints: "Pending client-supplied copy. See docs/client-questions.md.",
      background: "Pending client-supplied copy. See docs/client-questions.md.",
      solution: servicesFor("shippers-logistics"),
    },
    serviceSlugs: servicesFor("shippers-logistics"),
    imageKey: "sectorShippers",
    quote: jpMorganQuote,
    placeholder: true,
  },
];
