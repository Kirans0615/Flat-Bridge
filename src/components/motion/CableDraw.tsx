"use client";

import { motion } from "motion/react";

import { D, E } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface CableDrawProps {
  /** SVG path data. */
  d: string;
  className?: string;
  /** Delay (seconds) before the draw starts. */
  delay?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
}

// motion: animates `pathLength` from 0 to 1 as the path scrolls into view, for any decorative
// line-drawing use (the cable motif and its variants); reduced motion renders the path fully
// drawn immediately.
export function CableDraw({
  d,
  className,
  delay = 0,
  stroke = "currentColor",
  strokeWidth = 1,
  fill = "none",
}: CableDrawProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <path
        d={d}
        className={cn(className)}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        pathLength={1}
      />
    );
  }

  return (
    <motion.path
      d={d}
      className={cn(className)}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: D.lg, ease: E.out, delay }}
    />
  );
}
