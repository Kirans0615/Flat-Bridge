import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal, NumberTicker, CableDraw } from "@/components/motion";
import { delivers } from "@/content/homepage";
import { stats, foundedYear } from "@/content/stats";

/**
 * brief §8.2 — calm, static-feeling section right after the loud hero.
 * SplitText/Reveal on the copy, NumberTicker stats, a CableDraw hairline
 * between the two counters (rendered as a vertical divider, per this task's
 * layout — the two stats sit side by side rather than literally stacked so
 * "a hairline draws vertically between them" reads correctly).
 */
export default function Delivers() {
  const yearsInLogistics = new Date().getFullYear() - foundedYear;
  const retention = stats[3];

  return (
    <Section tone="paper" id="delivers">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <Eyebrow>{delivers.eyebrow}</Eyebrow>
          <Reveal as="h2" className="mt-4 text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
            {delivers.h2}
          </Reveal>
          <p className="mt-4 text-body-lg text-current/70">{delivers.lede}</p>
          <Reveal as="div" className="mt-6 flex flex-col gap-4" delay={0.1}>
            {delivers.body.map((paragraph) => (
              <p key={paragraph} className="max-w-[68ch] text-body">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <div className="relative grid grid-cols-2 gap-8">
            <div className="border-t border-[var(--color-hairline)] pt-6">
              <NumberTicker value={yearsInLogistics} className="text-d2 font-[var(--font-display)]" />
              <p className="mt-2 text-small text-current/70">Years in logistics</p>
            </div>
            <div className="border-t border-[var(--color-hairline)] pt-6">
              <NumberTicker
                value={retention.value}
                suffix={retention.suffix}
                decimals={retention.decimals}
                className="text-d2 font-[var(--font-display)]"
              />
              <p className="mt-2 text-small text-current/70">{retention.label}</p>
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 1 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute left-1/2 top-6 h-[calc(100%-1.5rem)] w-px -translate-x-1/2"
            >
              <CableDraw
                d="M0.5 0 L0.5 100"
                stroke="var(--color-green)"
                strokeWidth={2}
                delay={0.2}
                className="[vector-effect:non-scaling-stroke]"
              />
            </svg>
          </div>
        </div>
      </div>
    </Section>
  );
}
