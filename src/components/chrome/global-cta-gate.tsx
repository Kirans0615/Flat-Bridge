"use client";

import { usePathname } from "next/navigation";
import { PreFooterCTA } from "./pre-footer-cta";

/**
 * brief §16.1 — PreFooterCTA appears on every page except /contact (its own
 * form is the CTA there) and the homepage (which ends its own dedicated
 * "Book a call" section, brief §8.15 — a second CTA immediately after would
 * be redundant).
 */
export function GlobalCtaGate() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/contact") return null;
  return <PreFooterCTA />;
}
