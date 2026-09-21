"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface HoverGlowProps {
  children: ReactNode;
  className?: string;
}

// motion: a radial `--color-green-wash` gradient follows the cursor inside a dark card via CSS
// custom properties (`--x`, `--y`) updated on rAF-throttled pointermove; reduced motion and
// coarse/touch pointers render children with no glow at all.
export function HoverGlow({ children, className }: HoverGlowProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const update = () => setIsFinePointer(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const active = !reducedMotion && isFinePointer;

  if (!active) {
    return <div className={className}>{children}</div>;
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) return;
    const { clientX, clientY } = event;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const node = containerRef.current;
      if (!node) return;
      const bounds = node.getBoundingClientRect();
      node.style.setProperty("--x", `${clientX - bounds.left}px`);
      node.style.setProperty("--y", `${clientY - bounds.top}px`);
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative isolate overflow-hidden", className)}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), var(--color-green-wash), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
