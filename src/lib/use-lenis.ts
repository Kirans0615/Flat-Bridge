"use client";

import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import Lenis from "lenis";

import { useReducedMotion } from "./use-reduced-motion";

/**
 * Global smooth-scroll provider — brief §6.1. Mounted once (in `app/layout.tsx`
 * by the page-owning agent), it constructs a single Lenis instance
 * (`lerp: 0.09`, `duration: 1.1`, `wheelMultiplier: 1`, `syncTouch: false`) and
 * exposes it via `useLenis()` so any chrome/motion component can call
 * `.scrollTo()` without reaching for a singleton or a global.
 *
 * If GSAP's ScrollTrigger has already been registered elsewhere on the page
 * (routes that pin dynamically import `gsap` + `gsap/ScrollTrigger` per brief
 * §6.4), Lenis hands its clock over to `gsap.ticker` and forwards its scroll
 * event to `ScrollTrigger.update` — brief §6.1. Everywhere else it drives
 * itself with a plain `requestAnimationFrame` loop. GSAP is only ever
 * imported dynamically here (`import("gsap")`), so routes that never pin
 * never pay for it.
 *
 * Under `prefers-reduced-motion: reduce` (or a save-data/slow connection —
 * `useReducedMotion` folds both in), Lenis is never constructed at all:
 * native scroll stays active and `useLenis()` returns `null` so callers fall
 * back to `element.scrollIntoView({ behavior: "smooth" })` or similar.
 */

const LenisContext = createContext<Lenis | null>(null);

interface GsapTickerLike {
  ticker: {
    add: (fn: (time: number) => void) => void;
    remove: (fn: (time: number) => void) => void;
  };
  core?: { globals?: () => Record<string, unknown> };
}

function getScrollTrigger(gsap: GsapTickerLike) {
  const globals = gsap.core?.globals?.();
  const ScrollTrigger = globals?.ScrollTrigger as
    | { update: () => void; refresh: () => void }
    | undefined;
  return ScrollTrigger ?? null;
}

export function LenisProvider({ children }: { children: ReactNode }): ReactElement {
  const reducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // This effect owns the Lenis instance's whole lifecycle (construct here,
    // destroy in the cleanup below) — the setLenis calls publish that
    // instance, they don't derive state from props/state already in scope.
    if (reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLenis(null);
      return;
    }

    const instance = new Lenis({
      lerp: 0.09,
      duration: 1.1,
      wheelMultiplier: 1,
      syncTouch: false,
    });
    setLenis(instance);

    let rafId = 0;
    let drivenByGsap = false;
    let tickerFn: ((time: number) => void) | undefined;
    let scrollHandler: (() => void) | undefined;
    let cancelled = false;

    function plainRaf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(plainRaf);
    }
    rafId = requestAnimationFrame(plainRaf);

    // Best-effort: only take over with GSAP's ticker if ScrollTrigger is
    // already registered somewhere on this route. This dynamic import is
    // code-split, so routes that never pin never fetch the GSAP chunk here.
    import("gsap")
      .then((mod) => {
        if (cancelled) return;
        const gsap = (mod as unknown as { gsap?: GsapTickerLike }).gsap ?? (mod.default as unknown as GsapTickerLike);
        const ScrollTrigger = getScrollTrigger(gsap);
        if (!ScrollTrigger) return;

        cancelAnimationFrame(rafId);
        drivenByGsap = true;
        tickerFn = (time: number) => instance.raf(time * 1000);
        gsap.ticker.add(tickerFn);
        scrollHandler = () => ScrollTrigger.update();
        instance.on("scroll", scrollHandler);
      })
      .catch(() => {
        /* GSAP unavailable — plain rAF loop above keeps driving Lenis. */
      });

    return () => {
      cancelled = true;
      if (drivenByGsap) {
        if (scrollHandler) instance.off("scroll", scrollHandler);
        if (tickerFn) {
          import("gsap")
            .then((mod) => {
              const gsap = (mod as unknown as { gsap?: GsapTickerLike }).gsap ?? (mod.default as unknown as GsapTickerLike);
              gsap.ticker.remove(tickerFn!);
            })
            .catch(() => {});
        }
      } else {
        cancelAnimationFrame(rafId);
      }
      instance.destroy();
    };
  }, [reducedMotion]);

  return createElement(LenisContext.Provider, { value: lenis }, children);
}

/** Returns the shared Lenis instance, or `null` under reduced motion / before mount. */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
