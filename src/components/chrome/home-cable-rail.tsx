"use client";

import { usePathname } from "next/navigation";
import { CableRail, type CableRailSection } from "./cable-rail";

/**
 * CableRail is rendered only on the homepage. Brief §4.7: "spend the
 * boldness in one place" — the homepage is the one page long and varied
 * enough for a 15-node scroll rail to read as structure rather than clutter;
 * inner pages keep the rail out per that same restraint principle.
 */
const HOME_SECTIONS: CableRailSection[] = [
  { id: "hero", label: "Hero" },
  { id: "delivers", label: "Flat Bridge delivers" },
  { id: "differentiators", label: "What sets us apart" },
  { id: "advantage", label: "Competitive advantage" },
  { id: "capabilities", label: "Featured capabilities" },
  { id: "capabilities-rail", label: "Sixteen capabilities" },
  { id: "edge", label: "Competitive edge" },
  { id: "sectors", label: "Sectors" },
  { id: "ops-console", label: "Ops console" },
  { id: "modes", label: "Modes" },
  { id: "nearshore", label: "Nearshore" },
  { id: "stats", label: "Stats" },
  { id: "testimonials", label: "Testimonials" },
  { id: "insights", label: "Insights" },
  { id: "book-a-call", label: "Book a call" },
];

export function HomeCableRail() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <CableRail sections={HOME_SECTIONS} />;
}
