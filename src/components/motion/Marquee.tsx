"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /**
   * Track speed in px/second. Accepts a plain number, or a framer-motion
   * `MotionValue<number>` for consumers (e.g. `ScrollVelocity`) that need to
   * modulate speed every frame without re-running this component's rAF loop.
   */
  speed?: number | MotionValue<number>;
  pauseOnHover?: boolean;
  reverse?: boolean;
}

function readSpeed(speed: number | MotionValue<number>): number {
  return typeof speed === "number" ? speed : speed.get();
}

// motion: an internal rAF loop translates a duplicated track on `transform: translateX` (never a
// CSS animation, so velocity can be modulated live by ScrollVelocity); reduced motion renders a
// static, non-duplicated list of the first 6 items in a horizontally scrollable (overflow-x:
// auto) row instead.
export function Marquee({ children, className, speed = 60, pauseOnHover = false, reverse = false }: MarqueeProps) {
  const reducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const trackWidthRef = useRef(0);
  const pausedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (reducedMotion || !trackRef.current) return;

    const track = trackRef.current;
    const firstCopy = track.children[0] as HTMLElement | undefined;

    const measure = () => {
      trackWidthRef.current = firstCopy?.getBoundingClientRect().width ?? 0;
      setIsReady(true);
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    if (firstCopy) resizeObserver.observe(firstCopy);

    let rafId: number;
    let lastTime: number | null = null;

    const tick = (time: number) => {
      if (lastTime === null) lastTime = time;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const width = trackWidthRef.current;
      if (width > 0 && !pausedRef.current) {
        // `offsetRef` tracks how far into one copy's width the visible window has scrolled,
        // always kept in [0, width) via modulo — the transform is always <= 0, so neither
        // direction ever exposes a gap past either duplicated copy.
        const direction = reverse ? -1 : 1;
        const next = offsetRef.current + direction * readSpeed(speed) * dt;
        offsetRef.current = ((next % width) + width) % width;

        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [reducedMotion, speed, reverse]);

  if (reducedMotion) {
    const items = Children.toArray(children).slice(0, 6);
    return (
      <div className={cn("flex gap-6 overflow-x-auto", className)}>
        {items.map((child, index) => (
          <div key={index} className="shrink-0">
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden", className)}
      onPointerEnter={() => {
        if (pauseOnHover) pausedRef.current = true;
      }}
      onPointerLeave={() => {
        if (pauseOnHover) pausedRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max"
        style={{ willChange: "transform", visibility: isReady ? "visible" : "hidden" }}
      >
        <div className="flex shrink-0 items-center gap-6">{children}</div>
        <div className="flex shrink-0 items-center gap-6" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
