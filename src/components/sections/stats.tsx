import { Section } from "@/components/ui/section";
import { NumberTicker, CableDraw } from "@/components/motion";
import { stats } from "@/content/stats";

/**
 * brief §8.12 — four figures across, mono, hairline above each, a hairline
 * sweep beneath the row as the last number lands (a horizontal `CableDraw`,
 * per this task's allowance in place of a bespoke "on landing" trigger).
 */
export default function Stats() {
  return (
    <Section tone="paper" id="stats">
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-t border-[var(--color-hairline)] pt-6">
            <NumberTicker
              value={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals}
              className="text-d2 font-[var(--font-display)]"
            />
            <p className="mt-2 text-small text-current/70">{stat.label}</p>
          </div>
        ))}
      </div>

      <svg viewBox="0 0 100 1" preserveAspectRatio="none" className="mt-10 h-px w-full" aria-hidden="true">
        <CableDraw
          d="M0 0.5 L100 0.5"
          stroke="var(--color-green)"
          strokeWidth={1}
          delay={1.2}
          className="[vector-effect:non-scaling-stroke]"
        />
      </svg>
    </Section>
  );
}
