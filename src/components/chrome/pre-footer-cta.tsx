"use client";

import Link from "next/link";

import { media } from "@/lib/media";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Pre-footer CTA band — brief §16.1. Sits on `--color-steel-900` with a slow
 * (24s) horizontal drift of a faded container-yard shot behind a flat
 * (non-gradient) scrim — brief §4.3/§4.7 ban gradient washes, so the scrim is
 * a single solid tone, not a fade. Reduced motion keeps the image static.
 */
export function PreFooterCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      data-tone="ink"
      className="relative overflow-hidden bg-[var(--color-steel-900)] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 -left-[10%] -right-[10%] bg-cover bg-center opacity-[0.14]",
          !reducedMotion && "animate-[fb-cta-drift_24s_linear_infinite_alternate]",
        )}
        style={{ backgroundImage: `url(${media.yard["1600"]})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--color-steel-900)]/80" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="font-display text-h2 font-semibold text-[var(--color-paper)]">
          Ready to hand something off?
        </h2>
        <p className="max-w-xl text-body-lg text-[var(--color-concrete)]">
          Tell us the function that&apos;s costing you the most hours. We&apos;ll scope it on the
          call.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            data-cursor="link"
            className="rounded-full bg-[var(--color-green)] px-6 py-3 text-small font-medium text-white transition-colors hover:bg-[var(--color-green-lift)]"
          >
            Book a discovery call
          </Link>
          <Link
            href="/services"
            data-cursor="link"
            className="rounded-full border border-[var(--color-steel-700)] px-6 py-3 text-small font-medium text-[var(--color-concrete)] transition-colors hover:border-[var(--color-green-lift)] hover:text-[var(--color-paper)]"
          >
            See our capabilities
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fb-cta-drift {
          from { transform: translateX(0); }
          to { transform: translateX(-6%); }
        }
      `}</style>
    </section>
  );
}
