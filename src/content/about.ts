/**
 * brief §9. Hero h1/lede/cta and the "Watch Video" removal are verbatim/exact
 * per the brief. "Who we are", "How we work" and "Why choose us" existed on
 * the legacy site with confirmed headings/labels (docs/legacy-audit.md) but
 * their full paragraph bodies were never captured in the audit crawl — each
 * ships with a short, deliberately generic one-line elaboration of its own
 * heading rather than invented paragraph copy. See docs/client-questions.md.
 */
export const aboutHero = {
  h1: "It's not what we do, but how we do it.",
  lede: "Flat Bridge Limited has been building the bridge between logistics operations and the people who run them since 1997.",
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

export const timeline = [
  { year: "1997", label: "Founded" },
  { year: "Today", label: "Mandeville, Jamaica" },
] as const;

export const howWeWork = {
  h2: "How we work",
  rows: [
    {
      title: "Responsibility",
      body: "Ownership of the function we're handed, not just the tasks inside it.",
    },
    {
      title: "Collaborative impact",
      body: "Working inside a client's team and systems rather than alongside them.",
    },
    {
      title: "Innovation excellence",
      body: "Applying current systems and methods rather than legacy manual process.",
    },
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
      title: "Advanced technology",
      body: "Work carried out inside established transportation and logistics platforms.",
    },
    {
      title: "Customer-centric focus",
      body: "Built around the client relationship, not a fixed service package.",
    },
  ],
  placeholder: true,
} as const;

export const aboutCounters = [
  { value: 75000, suffix: "+", decimals: 0, label: "Loads processed" },
  { value: 29, suffix: "", decimals: 0, label: "Years in logistics", computed: true },
  { value: 94, suffix: "%", decimals: 0, label: "Client satisfaction" },
] as const;

export const ourTeam = {
  h2: "Our team",
  body: "Our team is not just a collection of individuals — it's a group of trained professionals working every day on behalf of the clients we serve.",
  caption: "Members of the Flat Bridge team, Mandeville, Jamaica.",
} as const;
