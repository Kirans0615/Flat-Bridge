"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

import { E } from "@/lib/motion-tokens";
import { useLenis } from "@/lib/use-lenis";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Route-change chrome for `app/template.tsx` — brief §7.3. An ink panel with
 * a thin green cable down its centre wipes up from the bottom over the
 * outgoing/incoming route, holds briefly, then wipes off the top — a single
 * `clipPath` keyframe sequence, so there is never a separate covered/exposed
 * pair of elements to keep in sync. `AnimatePresence mode="wait"` keyed by
 * `usePathname()` retriggers it on every navigation. Reduced motion drops the
 * wipe geometry for a plain 120ms cross-fade.
 */

const WIPE_UP_MS = 420;
const HOLD_MS = 120;
const WIPE_OFF_MS = 420;
const TOTAL_MS = WIPE_UP_MS + HOLD_MS + WIPE_OFF_MS;

function CurtainPanel({ pathKey }: { pathKey: string }) {
  return (
    <motion.div
      key={pathKey}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 bg-[var(--color-ink)]"
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{
        clipPath: [
          "inset(0% 0% 100% 0%)",
          "inset(0% 0% 0% 0%)",
          "inset(0% 0% 0% 0%)",
          "inset(100% 0% 0% 0%)",
        ],
      }}
      transition={{
        duration: TOTAL_MS / 1000,
        times: [0, WIPE_UP_MS / TOTAL_MS, (WIPE_UP_MS + HOLD_MS) / TOTAL_MS, 1],
        ease: [E.inOut, "linear", E.inOut],
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-[var(--color-green-lift)]"
      />
    </motion.div>
  );
}

export function PageCurtain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();

  // Scroll resets to 0 under the curtain, and any already-loaded
  // ScrollTrigger instances are told to remeasure the new route.
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    import("gsap")
      .then((mod) => {
        const gsap = (mod as unknown as { gsap?: { core?: { globals?: () => Record<string, unknown> } } }).gsap
          ?? (mod.default as unknown as { core?: { globals?: () => Record<string, unknown> } });
        const ScrollTrigger = gsap?.core?.globals?.()?.ScrollTrigger as
          | { refresh: () => void }
          | undefined;
        ScrollTrigger?.refresh();
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (reducedMotion) {
    return (
      <>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-40 bg-[var(--color-ink)]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "linear" }}
          />
        </AnimatePresence>
        {children}
      </>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <CurtainPanel key={pathname} pathKey={pathname} />
      </AnimatePresence>
      {children}
    </>
  );
}
