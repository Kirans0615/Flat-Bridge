/**
 * Homepage section copy not already covered by site.ts/stats.ts/testimonials.ts.
 * §8.2-§8.4, §8.7, §8.9-§8.11 verbatim where the brief/audit give it; the nine
 * "competitive edge" items only ever had headings on the legacy site (the
 * audit confirms only item 1 of 9 ever had body copy, and doesn't capture
 * even that) — their one-line bodies here are deliberately generic
 * elaborations of the heading itself, inventing no new claim or number.
 */

export const delivers = {
  eyebrow: "Flat Bridge Ltd",
  h2: "Flat Bridge delivers",
  lede: "Supply chain and logistics BPO services.",
  body: [
    "Flat Bridge Ltd provides labor solutions and process refinement for logistics focused organizations. Allow our resources and solutions to construct the bridge between your goals and accomplishments.",
    "Flat Bridge delivers benefits which extend beyond cost savings through standardizing business processes, increasing revenue and consolidating logistics operations.",
  ],
} as const;

export const differentiators = {
  label: "Why Flat Bridge",
  h2: "What sets Flat Bridge apart",
  rows: [
    {
      heading: "Strategic knowledge for growth",
      body: "Our commitment to prioritizing knowledge over intuition drives revenue growth and optimizes shared services costs, fostering continuous improvement. Our experienced professionals, skilled in efficient and reliable supply chain management, combine their expertise with strong communication and customer service skills. This ensures that we can bridge the gap between goals and accomplishments while delivering unparalleled value.",
    },
    {
      heading: "Tailored partnerships",
      body: "What truly sets us apart is our adaptable approach. We place paramount importance on partnering with clients to deliver services that are not only flexible but also customized to their specific industry needs. Our team's deep logistics industry expertise and commitment to understanding each client's unique requirements ensure that our solutions seamlessly integrate into their operations, providing the highest level of customer-focused outcomes.",
    },
  ],
} as const;

export const advantage = {
  label: "Flat Bridge",
  h2: "Competitive advantage",
  rows: [
    {
      heading: "Experienced workforce for excellence",
      body: "At Flat Bridge, we provide a distinct competitive advantage through our highly experienced, qualified, and service-oriented English-speaking workforce. This team ensures efficient communication, seamless operations, and tailored solutions for our nearshore and North American clientele.",
    },
    {
      heading: "Empowering small to mid-sized companies",
      body: "Our leveraged buying power bridges the gap for small to mid-sized businesses, offering them a competitive advantage that's usually associated with larger corporations. We empower companies to access the resources they need to thrive, fostering growth and success in the dynamic logistics landscape.",
    },
  ],
} as const;

/** brief §8.7 — legacy claimed "8", listed 9. Ship 9, titled honestly. */
export const edge = {
  h2: "Where the savings actually come from",
  items: [
    {
      title: "Reducing employee costs by up to 60%",
      body: "Lower labor cost per function without lowering coverage.",
    },
    {
      title: "No long-term commitments",
      body: "Engagements scoped to the work, not locked into multi-year terms.",
    },
    {
      title: "Minimal upfront investment",
      body: "Capacity added without a large upfront implementation cost.",
    },
    {
      title: "Industry-leading systems",
      body: "Work carried out inside established transportation and logistics platforms.",
    },
    {
      title: "Your culture and productivity, preserved",
      body: "Support added around your team's existing workflow, not a replacement for it.",
    },
    {
      title: "Less revenue leakage",
      body: "Fewer billing and process errors slipping through unnoticed.",
    },
    {
      title: "Lower attrition",
      body: "A dedicated, trained team behind the function reduces the cost of turnover.",
    },
    {
      title: "No infrastructure investment",
      body: "No new facilities, hardware or systems required on your end.",
    },
    {
      title: "Employee legal liability transferred",
      body: "Staffing risk sits with Flat Bridge rather than your organization.",
    },
  ],
} as const;

export const modes = {
  items: [
    {
      title: "Road freight logistics",
      body: "At Flat Bridge, we excel in optimizing road transport solutions, leveraging our expertise to navigate complex routes, manage shipments, and meet delivery timelines.",
    },
    {
      title: "Dedicated services",
      body: "Our dedicated services are tailored to meet your unique business needs, providing a personalized approach that goes beyond traditional solutions.",
    },
    {
      title: "Back office support",
      body: "Flat Bridge's Back Office Support offers a comprehensive suite of services designed to streamline your administrative tasks, optimize financial processes, and enhance overall efficiency.",
    },
  ],
} as const;

export const nearshore = {
  h2: "Nearshore, not offshore",
  body: "Our team works from Mandeville, Jamaica — same-day time zone with North America, English as a first language, and a one-year training program before an associate touches your freight.",
  facts: [
    { label: "Time zone", value: "UTC−5 · no overnight handoffs" },
    { label: "Language", value: "English, first language" },
    { label: "Training", value: "12 months before client work" },
  ],
  partner:
    "Caribbean Maritime University — internships, employment and career development for CMU students.",
  routes: [
    { to: "Miami" },
    { to: "Atlanta" },
    { to: "Chicago" },
    { to: "Dallas" },
    { to: "Toronto" },
  ],
} as const;

/** brief §8.9 — explicitly fake, generic illustrative UI data. Never a real client name. */
export const opsConsole = {
  h2: "You can see everything we do",
  sub: "Every load, every call, every exception — logged, timestamped and reportable.",
  caption: "Illustrative view of the reporting we provide. Not a customer portal.",
  statuses: ["In transit", "At dock", "Detention", "POD received"] as const,
  feedLines: [
    "Load #4021 — check call completed, on schedule",
    "Load #4019 — POD received, closing out",
    "Load #4025 — appointment confirmed for 14:30",
    "Load #4017 — detention timer started at dock 6",
    "Load #4030 — carrier assigned, dispatch confirmed",
    "Load #4014 — exception flagged, ops team notified",
    "Load #4028 — in transit, ETA unchanged",
    "Load #4022 — rate confirmation sent to carrier",
  ],
} as const;
