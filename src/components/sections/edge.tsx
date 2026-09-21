"use client";

import { motion } from "motion/react";

import { Section } from "@/components/ui/section";
import { edge } from "@/content/homepage";
import { E } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// brief §8.7 stagger is called out explicitly as "roughly .06s" for this
// section — kept literal rather than reusing STAGGER.tight (0.04) so the
// column reads as a deliberate bar chart, not a generic reveal.
const EDGE_STAGGER = 0.06;

/**
 * brief §8.7 — nine-item ledger, three columns, each item's vertical green
 * bar grows 0 -> full height on enter. The "36 animated SVG paths" background
 * flourish (§19.2/§8.7) is cut per this task's explicit allowance — a static
 * ink background is used instead. Noted in the final report.
 */
export default function Edge() {
  const reducedMotion = useReducedMotion();

  return (
    <Section tone="ink" id="edge">
      <h2 className="max-w-[36ch] text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
        {edge.h2}
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-flow-col lg:grid-rows-3 lg:grid-cols-3">
        {edge.items.map((item, index) => (
          <div key={item.title} className="flex gap-4">
            <span className="relative block h-16 w-px shrink-0 overflow-hidden bg-[var(--color-steel-700)]">
              {reducedMotion ? (
                <span className="absolute inset-0 bg-[var(--color-green-lift)]" />
              ) : (
                <motion.span
                  className="absolute inset-x-0 top-0 h-full origin-top bg-[var(--color-green-lift)]"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-12% 0px" }}
                  transition={{ duration: 0.5, ease: E.out, delay: index * EDGE_STAGGER }}
                />
              )}
            </span>
            <div>
              <h3 className="text-body-lg font-medium">{item.title}</h3>
              <p className="mt-2 max-w-[32ch] text-small text-current/70">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
