import Link from "next/link";

import { Section, Eyebrow } from "@/components/ui/section";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

const FEATURED_SLUGS = ["driver-dispatch", "tracking-and-tracing", "data-entry", "load-postings"] as const;

/**
 * brief §8.5 — asymmetric 2x2, not four equal cards. Items 1+4 span 7 cols,
 * 2+3 span 5. Hover fill is implemented as a transform-scale wipe rather
 * than the brief's clip-path-from-cursor-edge version: brief §4.6 itself
 * says "animate transform and opacity only", and tracking the cursor's entry
 * edge to drive a directional clip-path is materially more complex for the
 * same visual result — a deliberate simplification, noted in the report.
 */
export default function FeaturedCapabilities() {
  const items = FEATURED_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(
    (s): s is (typeof services)[number] => Boolean(s)
  );

  const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

  return (
    <Section
      tone="paper"
      id="capabilities"
      className="pb-[clamp(3rem,6vw,5.5rem)] bg-[linear-gradient(180deg,#f2f3f1_0%,#c5dbb5_100%)]"
    >
      <Eyebrow>Featured capabilities</Eyebrow>
      <h2 className="mt-4 max-w-[36ch] text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
        Four things clients ask for first
      </h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-12">
        {items.map((service, index) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            data-cursor="link"
            className={cn(
              "group relative isolate overflow-hidden border-[var(--color-hairline)] px-6 py-10 sm:px-8 sm:py-12",
              spans[index],
              index >= 2 && "border-t",
              index % 2 === 1 && "md:border-l"
            )}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[var(--color-paper-2)] transition-transform duration-[380ms] ease-[var(--ease-out)] group-hover:scale-x-100"
            />
            <h3 className="text-h3 font-[var(--font-display)] transition-transform duration-300 group-hover:translate-x-1.5">
              {service.name}
            </h3>
            <p className="mt-4 max-w-[52ch] text-body text-current/70">{service.body}</p>
            <span className="mt-6 block h-px w-0 bg-[var(--color-green)] transition-[width] duration-300 group-hover:w-16" />
          </Link>
        ))}
      </div>
    </Section>
  );
}
