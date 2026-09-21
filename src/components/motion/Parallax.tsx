"use client";

import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Parallax intensity. Negative values move slower than scroll (content lags,
   * appears to recede); positive values move faster (content leads).
   * Kept small (e.g. -0.15) so edges never expose a gap — see `maxOffsetPx`.
   */
  speed?: number;
  /** Hard clamp (px) on the transform range in either direction. */
  maxOffsetPx?: number;
}

// motion: translates children on `y` proportionally to scroll progress through the viewport,
// clamped so content never exposes a gap at its edges; reduced motion applies no transform.
export function Parallax({ children, className, speed = -0.15, maxOffsetPx = 120 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clamped = Math.min(Math.abs(speed) * 400, maxOffsetPx) * Math.sign(speed || 1);
  const y = useTransform(scrollYProgress, [0, 1], [-clamped, clamped]);

  if (reducedMotion) {
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={cn(className)} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
