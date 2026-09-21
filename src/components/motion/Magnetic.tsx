"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** 0-1: how much of the pointer offset is applied as translation. */
  strength?: number;
}

// motion: translates the wrapped element toward the pointer while hovered, spring-back to origin
// on pointer leave; gated to `(pointer: fine)` (no-op on touch/coarse pointers) and disabled
// entirely under reduced motion, in both cases rendering children with zero wrapper behaviour.
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 12 });
  const springY = useSpring(y, { stiffness: 200, damping: 12 });

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const update = () => setIsFinePointer(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const active = !reducedMotion && isFinePointer;

  if (!active) {
    return <div className={className}>{children}</div>;
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const relativeX = event.clientX - (bounds.left + bounds.width / 2);
    const relativeY = event.clientY - (bounds.top + bounds.height / 2);
    x.set(relativeX * strength);
    y.set(relativeY * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}
