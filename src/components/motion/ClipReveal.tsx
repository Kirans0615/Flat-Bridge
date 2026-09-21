"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { E } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left";
  /** Delay (seconds) before the clip starts opening. */
  delay?: number;
}

const CLIPPED: Record<"up" | "left", string> = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
};

const REVEALED = "inset(0% 0% 0% 0%)";

// motion: clip-path animates from fully clipped to inset(0) over 900ms, no opacity fade — the
// clip does the work; reduced motion renders fully revealed immediately.
export function ClipReveal({ children, className, direction = "up", delay = 0 }: ClipRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ clipPath: CLIPPED[direction] }}
      whileInView={{ clipPath: REVEALED }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, ease: E.out, delay }}
    >
      {children}
    </motion.div>
  );
}
