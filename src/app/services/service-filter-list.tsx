"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Service } from "@/content/services";

const CATEGORIES: Service["category"][] = [
  "Dispatch & drivers",
  "Documents & data",
  "Carriers & rates",
  "Systems & integration",
];

/**
 * brief §10.1 — filterable index of all 16 capabilities. Simplified from the
 * brief's framer-motion `layout` + `AnimatePresence` row-reflow spec to a
 * plain re-render on filter change (no layout animation) — noted as a
 * candidate for a later polish pass.
 */
export function ServiceFilterList({ services }: { services: Service[] }) {
  const [active, setActive] = useState<"All" | Service["category"]>("All");

  const filtered = useMemo(
    () => (active === "All" ? services : services.filter((s) => s.category === active)),
    [services, active]
  );

  return (
    <div>
      <div
        className="sticky top-0 z-10 -mx-[clamp(1.25rem,5vw,6rem)] flex flex-wrap gap-2 bg-[var(--color-paper)]/95 px-[clamp(1.25rem,5vw,6rem)] py-4 backdrop-blur"
        role="group"
        aria-label="Filter capabilities by category"
      >
        {(["All", ...CATEGORIES] as const).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className="rounded-full border px-4 py-1.5 text-small transition-colors"
            style={{
              borderColor: active === category ? "var(--color-green)" : "var(--color-hairline)",
              color: active === category ? "var(--color-green)" : "var(--color-ink)",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="mt-4 flex flex-col divide-y divide-[var(--color-hairline)] border-t border-[var(--color-hairline)]">
        {filtered.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              data-cursor="link"
              className="group flex items-center gap-4 py-5"
            >
              <span
                aria-hidden="true"
                className="h-full w-[3px] self-stretch bg-transparent transition-colors group-hover:bg-[var(--color-green)]"
              />
              <div className="flex-1 transition-transform group-hover:translate-x-2">
                <p className="micro text-current/70">{service.category}</p>
                <p className="mt-1 text-h3 font-[var(--font-display)] font-semibold">{service.name}</p>
                <p className="mt-1 max-w-[60ch] text-body text-current/70">{service.lede}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
