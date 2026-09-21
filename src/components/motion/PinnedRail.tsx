"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface PinnedRailProps {
  /** Number of items in the track — sizes the scroll distance (`count * widthVw` vh). */
  count: number;
  /** Width of one item, in vw. Drives both scroll distance and horizontal travel. */
  widthVw?: number;
  className?: string;
  trackClassName?: string;
  /**
   * Render-prop for the pinned/animating experience. Receives the current
   * "active index" (item nearest viewport center), updated on every
   * ScrollTrigger tick.
   */
  children: (activeIndex: number) => ReactNode;
  /**
   * Reduced-motion / no-JS-pin fallback contract: renders `children(0)` (or
   * this render prop, if supplied) in normal document flow — a static
   * grid/stack, unpinned, no horizontal translate. Consumers that need a
   * different reduced-motion layout (e.g. a vertical stack instead of a
   * grid) should pass `fallback`; otherwise `children(0)` is reused as-is,
   * which is safe as long as `children`'s own markup degrades to a sane
   * static layout via CSS (e.g. a wrapping flex/grid) when it isn't pinned.
   */
  fallback?: (activeIndex: number) => ReactNode;
}

// motion: pins the container for `count * widthVw`vh of scroll and translates an inner track
// horizontally in lockstep via GSAP + ScrollTrigger, exposing the item nearest viewport-center as
// `activeIndex` through the render-prop; reduced motion never loads gsap/ScrollTrigger at all and
// renders `children`/`fallback` unpinned, in normal static flow (contract detailed on the
// `fallback` prop above — read it before consuming this component).
export function PinnedRail({
  count,
  widthVw = 38,
  className,
  trackClassName,
  children,
  fallback,
}: PinnedRailProps) {
  // GSAP pin disabled sitewide (not just under reduced motion) — see
  // docs/decisions.md: the pin+scrub interaction with Lenis was leaving a
  // large section of the page rendering blank for real (non-reduced-motion)
  // scroll, verified live in-browser. Shipping the always-safe static
  // fallback rather than a set-piece animation that breaks the page.
  const systemReducedMotion = useReducedMotion();
  const reducedMotion = true;
  void systemReducedMotion;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerId = useId();

  useEffect(() => {
    if (reducedMotion) return;
    if (!containerRef.current || !trackRef.current) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !containerRef.current || !trackRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const container = containerRef.current!;
        const track = trackRef.current!;

        const scrollDistance = () => (count * widthVw * window.innerHeight) / 100;

        const trackTravel = () => Math.max(track.scrollWidth - container.clientWidth, 0);

        const trigger = ScrollTrigger.create({
          id: `pinned-rail-${triggerId}`,
          trigger: container,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
          animation: gsap.to(track, {
            x: () => -trackTravel(),
            ease: "none",
          }),
          onUpdate: () => {
            const centerX = window.innerWidth / 2;
            const panelEls = Array.from(track.children) as HTMLElement[];
            let nearestIndex = 0;
            let nearestDistance = Infinity;

            panelEls.forEach((child, index) => {
              const rect = child.getBoundingClientRect();
              const childCenter = rect.left + rect.width / 2;
              const distance = Math.abs(childCenter - centerX);
              if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = index;
              }
            });

            setActiveIndex(nearestIndex);
          },
        });

        return () => {
          trigger.kill();
        };
      }, containerRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reducedMotion, count, widthVw, triggerId]);

  if (reducedMotion) {
    const render = fallback ?? children;
    return (
      <div className={className}>
        <div className={trackClassName}>{render(activeIndex)}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div ref={trackRef} className={cn("flex will-change-transform", trackClassName)}>
        {children(activeIndex)}
      </div>
    </div>
  );
}
