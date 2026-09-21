"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useScroll, useSpring } from "motion/react";

import { useLenis } from "@/lib/use-lenis";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * THE signature motif — brief §5. A fixed vertical cable in the left gutter,
 * desktop-only (≥1024px). One static steel strand bowed into a slight
 * catenary; a second green strand whose `pathLength` is driven directly by
 * whole-document scroll progress — the site's only scroll-progress
 * indicator. One 6px diamond "clamp" node per registered section, filling
 * green at ≥50% in view, clickable (via Lenis when available), with a
 * hover/focus label. On `pointer: fine` the cable "plucks" 3px sideways at
 * the cursor's Y and springs back; it also breathes with a very slight idle
 * sway. Reduced motion keeps the static bow and the scroll-progress fill,
 * but drops the pluck and the idle sway entirely.
 */

export interface CableRailSection {
  id: string;
  label: string;
}

interface CableRailProps {
  sections: CableRailSection[];
  className?: string;
}

// SVG-unit geometry for the catenary. The path is sampled as a polyline
// rather than a single <path d> string so the pluck bump (a Gaussian bump
// centred on the cursor's Y) and the idle sway can both be layered onto the
// same base curve without fighting a bezier control point.
const VIEWBOX_W = 44;
const VIEWBOX_H = 1000;
const BASELINE_X = 16;
const BOW_OFFSET = 28; // max sag at t=0.5 is BOW_OFFSET / 2 = 14px, per brief.
const SAMPLES = 48;
const PLUCK_SIGMA = 0.09;

function bezierX(t: number, x0: number, bowOffset: number): number {
  return x0 + 2 * t * (1 - t) * bowOffset;
}

function buildPolyline(bump: number, pointerT: number, sway: number): string {
  let d = "";
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const base = bezierX(t, BASELINE_X, BOW_OFFSET + sway);
    const gauss =
      bump * Math.exp(-((t - pointerT) ** 2) / (2 * PLUCK_SIGMA * PLUCK_SIGMA));
    const x = base + gauss;
    const y = t * VIEWBOX_H;
    d += i === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : ` L${x.toFixed(2)},${y.toFixed(2)}`;
  }
  return d;
}

export function CableRail({ sections, className }: CableRailProps) {
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();
  const pluck = useSpring(0, { stiffness: 200, damping: 12 });

  const containerRef = useRef<HTMLElement>(null);
  const steelRef = useRef<SVGPathElement>(null);
  const greenRef = useRef<SVGPathElement>(null);
  const pointerTRef = useRef(0.5);
  const isFinePointerRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const [positions, setPositions] = useState<Record<string, number>>({});
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    isFinePointerRef.current =
      typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  }, []);

  // Where along the whole document does each registered section begin?
  // Expressed as a 0..1 fraction of total scrollable distance, which is also
  // where its node sits along the rail's full-viewport height.
  useEffect(() => {
    function measure() {
      const scrollable = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const next: Record<string, number> = {};
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        next[s.id] = Math.min(Math.max(top / scrollable, 0), 1);
      }
      setPositions(next);
    }
    measure();
    const settle = window.setTimeout(measure, 500);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(settle);
    };
  }, [sections]);

  // ≥50% in view -> node fills green.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (!el) continue;
      const io = new IntersectionObserver(
        ([entry]) => {
          setActive((prev) => ({
            ...prev,
            [s.id]: entry.isIntersecting && entry.intersectionRatio >= 0.5,
          }));
        },
        { threshold: [0, 0.5, 1] },
      );
      io.observe(el);
      observers.push(io);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const draw = useCallback(
    (bump: number, pointerT: number, sway: number) => {
      const d = buildPolyline(bump, pointerT, sway);
      steelRef.current?.setAttribute("d", d);
      greenRef.current?.setAttribute("d", d);
    },
    [],
  );

  useEffect(() => {
    if (reducedMotion) {
      draw(0, 0.5, 0);
      return;
    }
    function frame(time: number) {
      const sway = Math.sin(time / 4000) * 1.5;
      draw(pluck.get(), pointerTRef.current, sway);
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, draw, pluck]);

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (reducedMotion || !isFinePointerRef.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerTRef.current = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
    pluck.set(3);
  }

  function handlePointerLeave() {
    pluck.set(0);
  }

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: 0 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      aria-label="Page sections"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "pointer-events-none fixed inset-y-0 left-6 z-30 hidden w-11 lg:block",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <path ref={steelRef} stroke="var(--color-steel-700)" strokeWidth={1} fill="none" />
        <motion.path
          ref={greenRef}
          stroke="var(--color-green-lift)"
          strokeWidth={1.5}
          fill="none"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>

      {sections.map((section) => {
        const fraction = positions[section.id] ?? 0;
        const x = bezierX(fraction, BASELINE_X, BOW_OFFSET);
        const isActive = Boolean(active[section.id]);
        const isHovered = hovered === section.id;

        return (
          <button
            key={section.id}
            type="button"
            aria-label={section.label}
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setHovered(section.id)}
            onMouseLeave={() => setHovered((h) => (h === section.id ? null : h))}
            onFocus={() => setHovered(section.id)}
            onBlur={() => setHovered((h) => (h === section.id ? null : h))}
            className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 items-center focus-visible:outline-none"
            style={{ left: `${(x / VIEWBOX_W) * 100}%`, top: `${fraction * 100}%` }}
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-1.5 w-1.5 rotate-45 border transition-colors duration-200",
                isActive
                  ? "border-[var(--color-green-lift)] bg-[var(--color-green-lift)]"
                  : "border-[var(--color-steel-700)] bg-[var(--color-ink)]",
              )}
            />
            {isHovered && (
              <span className="micro pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-[var(--color-ink)] px-2 py-1 text-[var(--color-concrete)]">
                {section.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
