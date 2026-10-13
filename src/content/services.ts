/**
 * brief §8.5, §8.6, §10.2, §18.1 item 3 — superseded by the client's 10.09.26
 * revision round, Part 3.1: 16 services -> 24 services across 4 new
 * categories (Accounting, Carrier Services, Load Management & Documentation,
 * Technology), replacing the old 3-pillar grouping.
 *
 * Reused verbatim from the old catalog: Driver dispatch, Tracking and
 * tracing, Claims processing, Load postings, Truck searches, Load searches,
 * Carrier compliance, Carrier development, Appointment scheduling, EDI and
 * API integration. Renamed with adjusted wording per the client's explicit
 * instruction: Transportation management systems -> TMS operations, Pricing
 * engines -> Pricing support. Split: the old combined "Air waybill and bill
 * of lading processing" becomes "Air waybills" (here) and "Bill of lading
 * processing" (Accounting), each keeping its half of the old body text.
 * Donor: "Invoice auditing" takes its body from the old "Freight audit and
 * payment" entry per the client's instruction ("can take its description
 * from Freight audit and payment if it fits") — the "about 25%" figure is an
 * existing site claim carried over, not newly invented.
 *
 * Removed with no replacement: Data entry, Freight audit and payment (merged
 * into Invoice auditing above), Back office support — all three per the
 * client's explicit removal list. See next.config.ts `legacyRedirects` for
 * the old-slug -> new-slug/​`/services` redirects.
 *
 * The 9 services with no old-catalog equivalent (Billing and invoicing
 * support, Collections, Entering carriers, Updating carrier files, Freight
 * rating, Load building, POD close outs, Email and workflow automation, AI
 * integration) ship with `placeholder: true` and a short, generic functional
 * description in the same tone as the existing placeholders — no claim about
 * volume, results, methodology or clients. Flagged for client approval in
 * the revision-round summary.
 */
export interface Service {
  slug: string;
  name: string;
  category: "Accounting" | "Carrier Services" | "Load Management & Documentation" | "Technology";
  lede: string;
  body: string;
  whatYouGet: string[];
  systems?: string[];
  sectorSlugs: string[];
  /** True where no client-supplied paragraph exists yet — see docs/client-questions.md. */
  placeholder?: boolean;
}

/** Shared by the services page filter, the nav dropdown and the footer column. */
export const serviceCategories: { id: string; label: Service["category"] }[] = [
  { id: "accounting", label: "Accounting" },
  { id: "carrier-services", label: "Carrier Services" },
  { id: "load-management-documentation", label: "Load Management & Documentation" },
  { id: "technology", label: "Technology" },
];

export const services: Service[] = [
  // ---- Accounting (5) ----
  {
    slug: "invoice-auditing",
    name: "Invoice auditing",
    category: "Accounting",
    lede: "Catching billing errors before they cost you.",
    body: "Invoice auditing reviews carrier invoices against the agreed rate and accessorials before payment goes out. We find an error on about 25% of freight bills.",
    whatYouGet: [
      "Line-by-line audit of carrier invoices before payment",
      "An error caught on roughly 1 in 4 freight bills reviewed",
    ],
    sectorSlugs: ["shippers-logistics", "freight-brokers-forwarders", "3pl-providers"],
  },
  {
    slug: "billing-and-invoicing-support",
    name: "Billing and invoicing support",
    category: "Accounting",
    lede: "Keeping invoices accurate and moving without delay.",
    body: "Billing and invoicing support covers preparing, checking and issuing invoices so they go out accurate and on time, without backlogs building up behind the work.",
    whatYouGet: [
      "Preparation and issuing of client and carrier invoices",
      "Accuracy checks before an invoice goes out the door",
    ],
    sectorSlugs: ["shippers-logistics", "freight-brokers-forwarders", "3pl-providers"],
    placeholder: true,
  },
  {
    slug: "claims-processing",
    name: "Claims processing",
    category: "Accounting",
    lede: "Handling freight claims from filing through resolution.",
    body: "Claims processing handles a freight claim from initial filing through documentation and resolution, so damaged or lost freight doesn't become an open-ended administrative problem.",
    whatYouGet: ["Handling of freight claims from filing through resolution"],
    sectorSlugs: ["trucking-drayage", "3pl-providers", "warehousing-management"],
    placeholder: true,
  },
  {
    slug: "bill-of-lading-processing",
    name: "Bill of lading processing",
    category: "Accounting",
    lede: "Keeping bill-of-lading paperwork accurate and on file.",
    body: "Bill of lading processing keeps this core shipment document prepared, checked and on file for every load, so it's never the piece missing when it's needed.",
    whatYouGet: [
      "Preparation and processing of bills of lading",
      "Documentation kept on file and ready when needed",
    ],
    sectorSlugs: ["freight-brokers-forwarders", "intermodal-management"],
    placeholder: true,
  },
  {
    slug: "collections",
    name: "Collections",
    category: "Accounting",
    lede: "Following up on outstanding balances so cash keeps moving.",
    body: "Collections follows up on outstanding invoices and balances, keeping communication professional and consistent so receivables don't sit longer than they should.",
    whatYouGet: [
      "Consistent follow-up on outstanding balances",
      "Professional, on-brand communication with the accounts involved",
    ],
    sectorSlugs: ["shippers-logistics", "freight-brokers-forwarders", "3pl-providers"],
    placeholder: true,
  },

  // ---- Carrier Services (6) ----
  {
    slug: "driver-dispatch",
    name: "Driver dispatch",
    category: "Carrier Services",
    lede: "Keeping drivers moving, informed and supported.",
    body: "Drivers are our best resource for accomplishing organizational goals. By listening to their needs, quickly addressing their problems, and keeping them on the road we create value for our clients, and provide an environment where drivers can thrive.",
    whatYouGet: [
      "A dispatch team focused on keeping drivers moving and informed",
      "Fast response to driver needs and problems as they come up",
      "An environment built around driver retention, not just load counts",
    ],
    sectorSlugs: ["trucking-drayage", "freight-brokers-forwarders"],
  },
  {
    slug: "tracking-and-tracing",
    name: "Tracking and tracing",
    category: "Carrier Services",
    lede: "Accurate, timely visibility for everyone in the chain.",
    body: "Transparency is key to maintaining healthy supply chain resources. This begins by providing clients, shippers, consignees, dispatchers and drivers with accurate information and timely updates when changes occur.",
    whatYouGet: [
      "Timely updates to clients, shippers and consignees when a shipment's status changes",
      "One point of accurate information shared across dispatchers and drivers",
      "Transparency built into the process, not bolted on after a problem",
    ],
    sectorSlugs: ["trucking-drayage", "freight-brokers-forwarders", "3pl-providers"],
  },
  {
    slug: "entering-carriers",
    name: "Entering carriers",
    category: "Carrier Services",
    lede: "Getting new carrier partners set up correctly from the start.",
    body: "Entering carriers covers setting up a new carrier's profile correctly from the first load, so the information your team relies on later is accurate from day one.",
    whatYouGet: [
      "Carrier profile setup handled at onboarding",
      "Accurate records from the first load forward",
    ],
    sectorSlugs: ["freight-brokers-forwarders", "3pl-providers"],
    placeholder: true,
  },
  {
    slug: "updating-carrier-files",
    name: "Updating carrier files",
    category: "Carrier Services",
    lede: "Keeping carrier records current as details change.",
    body: "Updating carrier files keeps insurance, authority and contact details current as they change, so the carrier record your team works from is never out of date.",
    whatYouGet: [
      "Ongoing maintenance of carrier insurance, authority and contact details",
      "Records kept current as a standing function, not a periodic cleanup",
    ],
    sectorSlugs: ["freight-brokers-forwarders", "3pl-providers"],
    placeholder: true,
  },
  {
    slug: "carrier-compliance",
    name: "Carrier compliance",
    category: "Carrier Services",
    lede: "Monitoring the insurance and safety standing of carrier partners.",
    body: "Carrier compliance covers monitoring a carrier's insurance coverage and safety-score standing before and during a partnership, so a load isn't handed to a carrier that shouldn't be carrying it.",
    whatYouGet: [
      "Monitoring of carrier insurance coverage",
      "Monitoring of carrier safety-score standing",
    ],
    sectorSlugs: ["freight-brokers-forwarders", "3pl-providers"],
    placeholder: true,
  },
  {
    slug: "carrier-development",
    name: "Carrier development",
    category: "Carrier Services",
    lede: "Building and maintaining a network of carrier relationships.",
    body: "Carrier development builds and maintains the network of carrier relationships a brokerage or shipper depends on to keep freight moving.",
    whatYouGet: ["Ongoing sourcing and relationship management of carrier partners"],
    sectorSlugs: ["freight-brokers-forwarders"],
    placeholder: true,
  },

  // ---- Load Management & Documentation (8) ----
  {
    slug: "load-postings",
    name: "Load postings",
    category: "Load Management & Documentation",
    lede: "Getting available freight in front of the right carriers.",
    body: "Often times load boards are the best platform for marketing available shipments. The Flat Bridge training process includes multiple workshops on how to effectively interact with over 100 load boards throughout North America.",
    whatYouGet: [
      "Postings managed across 100+ load boards throughout North America",
      "A training process built specifically around effective load-board use",
    ],
    systems: ["DAT", "Truckstop.com"],
    sectorSlugs: ["freight-brokers-forwarders", "trucking-drayage"],
  },
  {
    slug: "truck-searches",
    name: "Truck searches",
    category: "Load Management & Documentation",
    lede: "Finding available capacity for a load.",
    body: "Truck searches locate available capacity for a load — matching freight that needs to move with a carrier that has the equipment to move it.",
    whatYouGet: ["Searching for available truck capacity against open loads"],
    sectorSlugs: ["freight-brokers-forwarders", "shippers-logistics"],
    placeholder: true,
  },
  {
    slug: "load-searches",
    name: "Load searches",
    category: "Load Management & Documentation",
    lede: "Finding freight to fill available capacity.",
    body: "Load searches find freight to fill available carrier capacity, drawing on over 20 years of experience working the major load boards.",
    whatYouGet: ["Sourcing of available loads to fill open capacity"],
    systems: ["DAT", "Truckstop.com"],
    sectorSlugs: ["trucking-drayage", "freight-brokers-forwarders"],
  },
  {
    slug: "freight-rating",
    name: "Freight rating",
    category: "Load Management & Documentation",
    lede: "Getting an accurate rate in front of the right people fast.",
    body: "Freight rating puts together an accurate rate for a load quickly, so pricing isn't the step that slows a quote down.",
    whatYouGet: [
      "Rate preparation turned around quickly",
      "Pricing built on the systems and data your team already works in",
    ],
    sectorSlugs: ["freight-brokers-forwarders", "shippers-logistics"],
    placeholder: true,
  },
  {
    slug: "appointment-scheduling",
    name: "Appointment scheduling",
    category: "Load Management & Documentation",
    lede: "Coordinating pickup and delivery windows.",
    body: "Appointment scheduling coordinates pickup and delivery windows across shippers, receivers and carriers, so a load has a confirmed time before a driver is on the road for it.",
    whatYouGet: ["Coordination of pickup and delivery appointment windows"],
    sectorSlugs: ["warehousing-management", "trucking-drayage"],
    placeholder: true,
  },
  {
    slug: "load-building",
    name: "Load building",
    category: "Load Management & Documentation",
    lede: "Putting together loads that make sense for the lane.",
    body: "Load building puts together shipments that make sense for the lane and the equipment available, so a load is ready to move rather than needing rework after it's posted.",
    whatYouGet: [
      "Load construction matched to lane and equipment",
      "Fewer reworked postings once a load is live",
    ],
    sectorSlugs: ["warehousing-management", "trucking-drayage"],
    placeholder: true,
  },
  {
    slug: "air-waybills",
    name: "Air waybills",
    category: "Load Management & Documentation",
    lede: "Keeping air waybill paperwork moving with the freight.",
    body: "Air waybills are the documents that move with every air shipment. This function keeps that paperwork prepared, processed and on file so it never becomes the bottleneck.",
    whatYouGet: ["Preparation and processing of air waybills"],
    sectorSlugs: ["freight-brokers-forwarders", "intermodal-management"],
    placeholder: true,
  },
  {
    slug: "pod-close-outs",
    name: "POD close outs",
    category: "Load Management & Documentation",
    lede: "Closing the loop on proof of delivery.",
    body: "POD close outs collect and file proof of delivery for each load, closing it out cleanly so it's not left open on the books.",
    whatYouGet: [
      "Collection and filing of proof of delivery",
      "Loads closed out cleanly once delivery is confirmed",
    ],
    sectorSlugs: ["trucking-drayage", "warehousing-management"],
    placeholder: true,
  },

  // ---- Technology (5) ----
  {
    slug: "tms-operations",
    name: "TMS operations",
    category: "Technology",
    lede: "Operating inside the TMS platforms you already use.",
    body: "Flat Bridge associates work directly inside the transportation management systems our clients already run, rather than asking a client to adopt a new platform.",
    whatYouGet: [
      "Operation inside your existing TMS rather than a new platform to learn",
    ],
    systems: [
      "Oracle OTM",
      "SAP Transportation Management",
      "MercuryGate",
      "BlueJay",
      "One Network Enterprises",
    ],
    sectorSlugs: ["freight-brokers-forwarders", "3pl-providers", "shippers-logistics"],
  },
  {
    slug: "pricing-support",
    name: "Pricing support",
    category: "Technology",
    lede: "Getting a working rate tool in place fast.",
    body: "A pricing support engagement can be in place in under 24 hours, giving your team a working rate tool without a long implementation cycle.",
    whatYouGet: ["A working rate tool set up in under 24 hours"],
    sectorSlugs: ["freight-brokers-forwarders", "shippers-logistics"],
    placeholder: true,
  },
  {
    slug: "edi-and-api-integration",
    name: "EDI and API integration",
    category: "Technology",
    lede: "Connecting your systems to your partners' systems.",
    body: "EDI and API integration connects your transportation and warehouse systems to the systems your partners and carriers already run, so data moves without manual re-entry on either side.",
    whatYouGet: ["Connection of your systems to partner/carrier EDI and API endpoints"],
    sectorSlugs: ["3pl-providers", "warehousing-management", "intermodal-management"],
    placeholder: true,
  },
  {
    slug: "email-and-workflow-automation",
    name: "Email and workflow automation",
    category: "Technology",
    lede: "Automating the repetitive steps around email and workflow.",
    body: "Email and workflow automation handles the repetitive steps around routing, follow-up and status updates, so the manual work behind a process gets lighter without changing the systems you already use.",
    whatYouGet: [
      "Automated routing and follow-up for repetitive email/workflow steps",
      "Built on top of the systems you already run",
    ],
    sectorSlugs: ["freight-brokers-forwarders", "shippers-logistics", "3pl-providers"],
    placeholder: true,
  },
  {
    slug: "ai-integration",
    name: "AI integration",
    category: "Technology",
    lede: "Layering AI tools onto the systems you already run.",
    body: "AI integration applies current AI tools and methods to the systems you already run, rather than asking a client to adopt a new platform to get the benefit.",
    whatYouGet: [
      "AI tooling applied inside your existing systems",
      "No new platform required to get the benefit",
    ],
    sectorSlugs: ["freight-brokers-forwarders", "shippers-logistics", "3pl-providers"],
    placeholder: true,
  },
];

export const capabilitySlugOrder = services.map((s) => s.slug);
