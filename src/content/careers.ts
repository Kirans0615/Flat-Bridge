/**
 * brief §14. No real job postings were supplied — the legacy site has zero
 * roles listed. These four are explicitly `status: 'sample'` per brief §14.2
 * and ship with a visible banner saying so. See docs/client-questions.md #14.
 */
export interface Role {
  slug: string;
  title: string;
  location: string;
  type: string;
  responsibilities: string[];
  status: "sample";
}

export const roles: Role[] = [
  {
    slug: "logistics-associate",
    title: "Logistics Associate",
    location: "Mandeville, Jamaica",
    type: "Full-time, on-site",
    responsibilities: [
      "Support daily dispatch, tracking and data-entry work for assigned client accounts",
      "Work inside client TMS platforms alongside the account's dedicated team",
      "Complete the standard training program before taking on client-facing work",
    ],
    status: "sample",
  },
  {
    slug: "carrier-sales-representative",
    title: "Carrier Sales Representative",
    location: "Mandeville, Jamaica",
    type: "Full-time, on-site",
    responsibilities: [
      "Source and develop carrier relationships for assigned lanes",
      "Negotiate rates within client-approved guidelines",
      "Maintain carrier compliance and insurance documentation",
    ],
    status: "sample",
  },
  {
    slug: "track-and-trace-specialist",
    title: "Track & Trace Specialist",
    location: "Mandeville, Jamaica",
    type: "Full-time, on-site",
    responsibilities: [
      "Monitor active shipments and provide status updates to clients and drivers",
      "Escalate exceptions before they become service failures",
      "Maintain accurate records across client TMS and internal systems",
    ],
    status: "sample",
  },
  {
    slug: "tms-data-analyst",
    title: "TMS/Data Analyst",
    location: "Mandeville, Jamaica",
    type: "Full-time, on-site",
    responsibilities: [
      "Support TMS configuration and data quality for client accounts",
      "Build and maintain reporting used by client operations teams",
      "Assist with EDI/API integration work as accounts require it",
    ],
    status: "sample",
  },
];

/** brief §14 hero lede, verbatim from legacy copy. */
export const careersLede =
  "Whether you're a recent college graduate stepping into the professional world or someone re-entering the workforce, there's a place for you on the Flat Bridge team.";
