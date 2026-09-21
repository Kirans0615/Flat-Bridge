export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Sectors", href: "/sectors" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
] as const;

export const navCta = { label: "Book a discovery call", href: "/contact" } as const;

export const servicePillars = [
  {
    slug: "contact-centre",
    name: "Contact centre",
    body: "Voice, chat, web and email — a trained, English-speaking team handling inbound and outbound contact for your operation.",
  },
  {
    slug: "back-office-support",
    name: "Back office support",
    body: "Data cleansing and entry, finance, HR and payroll support that runs behind the scenes so your team doesn't have to.",
  },
  {
    slug: "digital-transformation-ai",
    name: "Digital transformation and AI",
    body: "RPA, chatbots, voice biometrics and speech analytics layered onto the systems you already run.",
  },
] as const;

export const footerColumns = {
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Careers", href: "/careers" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ],
  services: [{ label: "All 16 capabilities", href: "/services" }],
  sectors: [{ label: "All sectors", href: "/sectors" }],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security & compliance", href: "/security" },
  ],
} as const;
