"use client";

import { Marquee } from "@/components/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * 10.09.26 revision round, Part 3.5 — on phones the shared `Marquee`
 * component's `pauseOnHover` gets stuck paused on a touch tap (there's no
 * reliable `pointerleave` on touch, so once you've touched it it never
 * resumes), which reads as "you have to swipe sideways." Desktop keeps the
 * exact original block unchanged; mobile gets its own continuous,
 * slower-paced marquee with `pauseOnHover` off, and — the one new behaviour
 * the client asked for — a centered, wrapped, static layout under
 * `prefers-reduced-motion` instead of the shared component's own
 * horizontal-scroll-of-6 fallback.
 */
export function PlatformMarquee({ platforms }: { platforms: readonly string[] }) {
  const reducedMotion = useReducedMotion();

  const item = (platform: string) => (
    <span
      key={platform}
      className="px-6 text-h3 font-display font-semibold text-current/70"
    >
      {platform}
    </span>
  );

  return (
    <>
      {/* Desktop — unchanged from before this revision round. */}
      <div className="hidden sm:block">
        <Marquee speed={40} pauseOnHover className="mt-8">
          {platforms.map(item)}
        </Marquee>
      </div>

      {/* Mobile */}
      <div className="mt-8 sm:hidden">
        {reducedMotion ? (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {platforms.map(item)}
          </div>
        ) : (
          <Marquee speed={20}>{platforms.map(item)}</Marquee>
        )}
      </div>
    </>
  );
}
