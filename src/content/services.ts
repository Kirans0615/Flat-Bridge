/**
 * brief §8.5, §8.6, §10.2, §18.1 item 3. Slugs and order fixed by brief §8.6.
 *
 * Body copy: the four "featured capabilities" (driver-dispatch,
 * tracking-and-tracing, data-entry, load-postings) are verbatim from brief
 * §8.5. The remaining twelve have no full paragraph anywhere in
 * docs/legacy-audit.md or the brief beyond a name (plus a couple of specific
 * facts noted inline below) — those ship with `placeholder: true` and a
 * short, deliberately generic functional description that makes NO claim
 * about Flat Bridge's specific performance, volume or methodology beyond
 * what's already stated elsewhere on the site. See docs/client-questions.md.
 */
export interface Service {
  slug: string;
  name: string;
  category: "Dispatch & drivers" | "Documents & data" | "Carriers & rates" | "Systems & integration";
  lede: string;
  body: string;
  whatYouGet: string[];
  systems?: string[];
  sectorSlugs: string[];
  /** True where no client-supplied paragraph exists yet — see docs/client-questions.md. */
  placeholder?: boolean;
}

export const services: Service[] = [
  {
    slug: "driver-dispatch",
    name: "Driver dispatch",
    category: "Dispatch & drivers",
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
    category: "Dispatch & drivers",
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
    slug: "data-entry",
    name: "Data entry",
    category: "Documents & data",
    lede: "Fast, accurate entry across the platforms you already run.",
    body: "Data entry is a key function of any operations department. Our processes are fast, accurate and reliable. Flat Bridge associates are familiar with a host of transportation and warehouse related enterprise software platforms.",
    whatYouGet: [
      "Fast, accurate, reliable data entry as a standing function",
      "Associates trained across transportation and warehouse enterprise software",
      "Freed-up operations staff who aren't buried in entry work",
    ],
    sectorSlugs: ["warehousing-management", "3pl-providers", "intermodal-management"],
  },
  {
    slug: "air-waybill-and-bill-of-lading-processing",
    name: "Air waybill and bill of lading processing",
    category: "Documents & data",
    lede: "Keeping shipment paperwork moving with the freight.",
    body: "Air waybills and bills of lading are the documents that move with every shipment. This function keeps that paperwork prepared, processed and on file so it never becomes the bottleneck.",
    whatYouGet: ["Preparation and processing of air waybills and bills of lading"],
    sectorSlugs: ["freight-brokers-forwarders", "intermodal-management"],
    placeholder: true,
  },
  {
    slug: "appointment-scheduling",
    name: "Appointment scheduling",
    category: "Dispatch & drivers",
    lede: "Coordinating pickup and delivery windows.",
    body: "Appointment scheduling coordinates pickup and delivery windows across shippers, receivers and carriers, so a load has a confirmed time before a driver is on the road for it.",
    whatYouGet: ["Coordination of pickup and delivery appointment windows"],
    sectorSlugs: ["warehousing-management", "trucking-drayage"],
    placeholder: true,
  },
  {
    slug: "load-postings",
    name: "Load postings",
    category: "Dispatch & drivers",
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
    category: "Carriers & rates",
    lede: "Finding available capacity for a load.",
    body: "Truck searches locate available capacity for a load — matching freight that needs to move with a carrier that has the equipment to move it.",
    whatYouGet: ["Searching for available truck capacity against open loads"],
    sectorSlugs: ["freight-brokers-forwarders", "shippers-logistics"],
    placeholder: true,
  },
  {
    slug: "carrier-development",
    name: "Carrier development",
    category: "Carriers & rates",
    lede: "Building and maintaining a network of carrier relationships.",
    body: "Carrier development builds and maintains the network of carrier relationships a brokerage or shipper depends on to keep freight moving.",
    whatYouGet: ["Ongoing sourcing and relationship management of carrier partners"],
    sectorSlugs: ["freight-brokers-forwarders"],
    placeholder: true,
  },
  {
    slug: "carrier-compliance",
    name: "Carrier compliance",
    category: "Carriers & rates",
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
    slug: "claims-processing",
    name: "Claims processing",
    category: "Documents & data",
    lede: "Handling freight claims from filing through resolution.",
    body: "Claims processing handles a freight claim from initial filing through documentation and resolution, so damaged or lost freight doesn't become an open-ended administrative problem.",
    whatYouGet: ["Handling of freight claims from filing through resolution"],
    sectorSlugs: ["trucking-drayage", "3pl-providers", "warehousing-management"],
    placeholder: true,
  },
  {
    slug: "transportation-management-systems",
    name: "Transportation management systems",
    category: "Systems & integration",
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
    slug: "freight-audit-and-payment",
    name: "Freight audit and payment",
    category: "Documents & data",
    lede: "Catching billing errors before they cost you.",
    body: "Freight audit and payment reviews carrier invoices against the agreed rate and accessorials before payment goes out. We find an error on about 25% of freight bills.",
    whatYouGet: [
      "Line-by-line audit of carrier invoices before payment",
      "An error caught on roughly 1 in 4 freight bills reviewed",
    ],
    sectorSlugs: ["shippers-logistics", "freight-brokers-forwarders", "3pl-providers"],
  },
  {
    slug: "pricing-engines",
    name: "Pricing engines",
    category: "Systems & integration",
    lede: "Getting a working rate engine in place fast.",
    body: "A pricing engine can be in place in under 24 hours, giving your team a working rate tool without a long implementation cycle.",
    whatYouGet: ["A working pricing engine set up in under 24 hours"],
    sectorSlugs: ["freight-brokers-forwarders", "shippers-logistics"],
    placeholder: true,
  },
  {
    slug: "edi-and-api-integration",
    name: "EDI and API integration",
    category: "Systems & integration",
    lede: "Connecting your systems to your partners' systems.",
    body: "EDI and API integration connects your transportation and warehouse systems to the systems your partners and carriers already run, so data moves without manual re-entry on either side.",
    whatYouGet: ["Connection of your systems to partner/carrier EDI and API endpoints"],
    sectorSlugs: ["3pl-providers", "warehousing-management", "intermodal-management"],
    placeholder: true,
  },
  {
    slug: "load-searches",
    name: "Load searches",
    category: "Carriers & rates",
    lede: "Finding freight to fill available capacity.",
    body: "Load searches find freight to fill available carrier capacity, drawing on over 20 years of experience working the major load boards.",
    whatYouGet: ["Sourcing of available loads to fill open capacity"],
    systems: ["DAT", "Truckstop.com"],
    sectorSlugs: ["trucking-drayage", "freight-brokers-forwarders"],
  },
  {
    slug: "back-office-support",
    name: "Back office support",
    category: "Systems & integration",
    lede: "The administrative layer that runs behind the scenes.",
    body: "Back office support covers data cleansing and entry, finance, HR and payroll support that runs behind the scenes so your operations team doesn't have to carry it.",
    whatYouGet: [
      "Data cleansing and entry",
      "Finance support",
      "HR and payroll support",
    ],
    sectorSlugs: ["warehousing-management", "3pl-providers", "shippers-logistics"],
  },
];

export const capabilitySlugOrder = services.map((s) => s.slug);
