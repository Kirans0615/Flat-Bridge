"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Service } from "@/content/services";
import { serviceCategories } from "@/content/services";
import { useLenis } from "@/lib/use-lenis";

const CATEGORIES: Service["category"][] = serviceCategories.map((c) => c.label);

function categoryFromParam(param: string | null): "All" | Service["category"] {
  if (!param || param === "all") return "All";
  const match = serviceCategories.find((c) => c.id === param);
  return match ? match.label : "All";
}

/**
 * brief §10.1 — filterable index of all 24 capabilities. Simplified from the
 * brief's framer-motion `layout` + `AnimatePresence` row-reflow spec to a
 * plain re-render on filter change (no layout animation) — noted as a
 * candidate for a later polish pass.
 *
 * 10.09.26 revision round, Part 3.4 — initial filter now reads `?category=`
 * from the URL (set by the nav dropdown and footer links), so landing here
 * from "Accounting" etc. opens pre-filtered.
 */
export function ServiceFilterList({ services }: { services: Service[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const lenis = useLenis();
  const [active, setActive] = useState<"All" | Service["category"]>(() =>
    categoryFromParam(categoryParam)
  );

  // The nav dropdown and footer links navigate here with a new `?category=`
  // while this page stays mounted (same route), so the useState initializer
  // above only catches the first load — this keeps later clicks in sync too.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(categoryFromParam(categoryParam));
  }, [categoryParam]);

  // Jump straight to the filtered list, past the hero, whenever a category
  // link lands here — matches the nav dropdown's "take me to that category" intent.
  useEffect(() => {
    if (!categoryParam) return;
    const el = document.getElementById("all-services");
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: 0 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [categoryParam, lenis]);

  const filtered = useMemo(
    () => (active === "All" ? services : services.filter((s) => s.category === active)),
    [services, active]
  );

  return (
    <div>
      <div
        className="sticky top-0 z-10 -mx-[clamp(1.25rem,5vw,6rem)] flex flex-wrap gap-3 bg-[var(--color-paper)]/95 px-[clamp(1.25rem,5vw,6rem)] py-4 backdrop-blur"
        role="group"
        aria-label="Filter capabilities by category"
      >
        {(["All", ...CATEGORIES] as const).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className="rounded-full border px-6 py-2.5 text-body font-medium transition-colors"
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
                <p className="mt-1 text-h3 font-display font-semibold">{service.name}</p>
                <p className="mt-1 max-w-[60ch] text-body text-current/70">{service.lede}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
