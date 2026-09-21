"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useTransform, useVelocity } from "motion/react";
import type { MotionValue } from "motion/react";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

import { Marquee, type MarqueeProps } from "./Marquee";

interface ScrollVelocityProps extends Omit<MarqueeProps, "speed"> {
  /** Base track speed (px/second) before any velocity boost is applied. */
  baseSpeed?: number;
  /**
   * Optional externally-sourced velocity (e.g. Lenis's scroll velocity from
   * the chrome layer). When omitted, velocity is derived from window scroll
   * via framer-motion's `useScroll`/`useVelocity`.
   */
  velocity?: MotionValue<number>;
  /** Hard clamp on the extra px/second added on top of baseSpeed. */
  maxBoost?: number;
  /** Hard clamp on skew, in degrees. */
  maxSkewDeg?: number;
}

const CLAMP_SCROLL_VELOCITY = 3000;

// motion: reads scroll velocity (window scroll by default, or an injected MotionValue) to skew
// the marquee track up to +/-maxSkewDeg and to speed its rAF-driven translateX proportionally,
// both hard-clamped; reduced motion skips velocity entirely and passes straight through to
// Marquee's reduced-motion behaviour (static list, no skew).
export function ScrollVelocity({
  children,
  className,
  baseSpeed = 60,
  velocity,
  maxBoost = 400,
  maxSkewDeg = 4,
  pauseOnHover,
  reverse,
}: ScrollVelocityProps) {
  const reducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const derivedVelocity = useVelocity(scrollY);
  const activeVelocity = velocity ?? derivedVelocity;

  const clampedVelocity = useTransform(
    activeVelocity,
    [-CLAMP_SCROLL_VELOCITY, CLAMP_SCROLL_VELOCITY],
    [-CLAMP_SCROLL_VELOCITY, CLAMP_SCROLL_VELOCITY],
    { clamp: true }
  );

  const skew = useTransform(
    clampedVelocity,
    [-CLAMP_SCROLL_VELOCITY, CLAMP_SCROLL_VELOCITY],
    [-maxSkewDeg, maxSkewDeg]
  );

  const trackSpeed = useTransform(clampedVelocity, (v) => {
    const boost = Math.min(Math.abs(v) * (maxBoost / CLAMP_SCROLL_VELOCITY), maxBoost);
    const direction = v < 0 ? -1 : 1;
    return baseSpeed + boost * direction * (reverse ? -1 : 1);
  });

  if (reducedMotion) {
    return (
      <Marquee className={className} speed={baseSpeed} pauseOnHover={pauseOnHover} reverse={reverse}>
        {children as ReactNode}
      </Marquee>
    );
  }

  return (
    <motion.div className={cn(className)} style={{ skewX: skew }}>
      <Marquee speed={trackSpeed} pauseOnHover={pauseOnHover} reverse={reverse}>
        {children as ReactNode}
      </Marquee>
    </motion.div>
  );
}
