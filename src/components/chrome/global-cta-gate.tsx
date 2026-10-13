"use client";

import { usePathname } from "next/navigation";
import { PreFooterCTA } from "./pre-footer-cta";

/**
 * brief §16.1 — PreFooterCTA appears on every page except /contact (its own
 * form is the CTA there) and the homepage (which ends its own dedicated
 * "Book a call" section, brief §8.15 — a second CTA immediately after would
 * be redundant). 10.09.26 revision round, Part 8.6 — also excluded on
 * /careers: a client-sales block doesn't belong on a recruiting page.
 */
export function GlobalCtaGate() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/contact" || pathname === "/careers") return null;
  return <PreFooterCTA />;
}
