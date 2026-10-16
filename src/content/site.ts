/**
 * Single source of truth for sitewide facts — brief §26. Nothing here is
 * invented; every field traces to brief §26 or docs/legacy-audit.md.
 * Components read from here, never from inline strings.
 */
export const site = {
  legalName: "Flat Bridge Limited",
  displayName: "Flat Bridge",
  tagline: "Building bridges. Perfecting processes.",
  positioning: "Bridging the gap",
  category: "Supply chain and logistics BPO",
  /** [ASK] client-questions.md #1 — confirm founding year. */
  foundedYear: 1997,
  location: {
    city: "Mandeville",
    country: "Jamaica",
    label: "Mandeville, Jamaica",
    lat: 18.04,
    lng: -77.51,
    coordsLabel: "18.04° N, 77.51° W",
  },
  phone: "+1 (754) 273-8895",
  phoneHref: "tel:+17542738895",
  /** 10.09.26 revision round, Part 9.1 — changed from sales@ to match the
   * "Book a discovery call" CTA. FLAG (Part 10): client to confirm this
   * inbox exists before deploying. */
  email: "discovery@goflatbridge.com",
  emailHref: "mailto:discovery@goflatbridge.com",
  socials: {
    linkedin: "https://linkedin.com/company/flat-bridge-limited",
    facebook: "https://facebook.com",
    x: "https://x.com",
    instagram: "https://instagram.com",
  },
  namedPartner: "Caribbean Maritime University",
  namedClient: "J&A Freight Systems",
} as const;

export const heroContent = {
  kicker: "Flat Bridge Ltd · Mandeville, Jamaica",
  h1Line1: "Built To Carry The Load.",
  sub: "Strategic and skilled supply chain and logistics BPO. We handle the load boards, check calls, appointments, troubleshooting, and claims — so your team can grow your business.",
  /** Legacy subhead, kept for client comparison per brief §8.1 — not shipped as primary copy. */
  heroSubAlt:
    "Expanding Supply Chain & Logistics BPO Services for Enhanced Efficiency and Growth",
  ctaPrimary: { label: "Book a discovery call", href: "/contact" },
  ctaSecondary: { label: "See what we handle", href: "/services" },
} as const;

export const pullQuotes = {
  jpMorgan: {
    text: "The wise man bridges the gap by laying out the path by means of which he can get from where he is to where he wants to go.",
    author: "J. P. Morgan",
  },
  robertHenri: {
    text: "Good composition is like a suspension bridge — each line adds strength and takes none away.",
    author: "Robert Henri",
  },
} as const;

/** brief §10.1 — the platforms the legacy copy actually names. Text only, no logo files. */
export const platforms = [
  "Oracle OTM",
  "SAP Transportation Management",
  "MercuryGate",
  "BlueJay",
  "One Network Enterprises",
  "Realtime Freight",
  "LoadTech",
  "Freight Management Systems",
  "AppointmentPlus",
  "Retalix",
  "DAT",
  "Truckstop.com",
] as const;

/** brief §11.2 "industries" row / legacy "Industries" leftover, sentence-cased. */
export const industries = [
  "Transportation",
  "Healthcare",
  "Finance",
  "Food & beverage",
  "Agriculture",
  "Insurance",
  "Hospitality",
  "Office & industrial",
  "Retail",
] as const;
