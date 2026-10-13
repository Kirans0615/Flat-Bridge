/**
 * brief §9. Hero h1/lede/cta and the "Watch Video" removal are verbatim/exact
 * per the brief. "Who we are", "How we work" and "Why choose us" existed on
 * the legacy site with confirmed headings/labels (docs/legacy-audit.md) but
 * their full paragraph bodies were never captured in the audit crawl — each
 * ships with a short, deliberately generic one-line elaboration of its own
 * heading rather than invented paragraph copy. See docs/client-questions.md.
 */
/** 10.09.26 revision round, Part 4.1 — hero copy replaced; the hero photo
 * block is now this page's "who we are" statement (Part 4.2's standalone
 * section is removed). */
export const aboutHero = {
  h1: "Flat Bridge is a trusted resource of English-speaking, logistics-minded professionals.",
  lede: "Flat Bridge's skilled workforce is trained in industry trends, supply chain platforms, and best practices in tracking, tracing, appointments, and carrier sales. They bring their training into your systems.",
  cta: { label: "Talk to us", href: "/contact" },
} as const;

export const whoWeAre = {
  h2: "Who we are",
  body: [
    "Flat Bridge is built around the people doing the work — a trained, English-speaking team in Mandeville, Jamaica, operating inside the systems our clients already run.",
    "The goal is the same one behind every engagement: take the operational load off a client's team so they can focus on the relationships and decisions that grow the business.",
  ],
  placeholder: true,
} as const;

export const whyChooseUs = {
  h2: "Why choose us",
  rows: [
    {
      title: "Expertise and experience",
      body: "A team trained specifically in logistics and supply-chain workflows.",
    },
    {
      title: "Customized solutions",
      body: "Engagements shaped around a client's specific systems and needs.",
    },
    {
      /** 10.09.26 revision round, Part 4.5 — replaces "Advanced technology". */
      title: "Evolving Technological Expertise",
      body: "Work carried out inside clients' current platforms, while ready to adapt to platform or technology upgrades and innovations.",
    },
    {
      title: "Customer-centric focus",
      body: "Built around the client relationship, not a fixed service package.",
    },
  ],
  placeholder: true,
} as const;

export const ourTeam = {
  h2: "Our team",
  body: "Our team is not just a collection of individuals — it's a group of trained professionals working every day on behalf of the clients we serve.",
  caption: "Members of the Flat Bridge team, Mandeville, Jamaica.",
} as const;
