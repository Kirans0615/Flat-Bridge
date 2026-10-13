/** 10.09.26 revision round, Part 1.1 — Insights removed (hidden per Part 6.1),
 * Process added right after Sectors. */
export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Sectors", href: "/sectors" },
  { label: "Process", href: "/process" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
] as const;

export const navCta = { label: "Book a discovery call", href: "/contact" } as const;

export const footerColumns = {
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Careers", href: "/careers" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ],
  /** 10.09.26 revision round, Part 1.4 — "All 24 capabilities" + the 4 new
   * service categories, each pointing at its filtered /services view. */
  services: [
    { label: "All 24 capabilities", href: "/services?category=all" },
  ],
  sectors: [{ label: "All sectors", href: "/sectors" }],
  /** Part 1.4 — "Security & compliance" link removed (page unrouted, 9.5). */
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
