"use client";

import { type ElementType, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate } from "motion/react";
import SplitTypeLib from "split-type";

import { E, STAGGER } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

type SplitMode = "word" | "char" | "line";

interface SplitTextProps {
  as?: ElementType;
  children: string;
  className?: string;
  mode?: SplitMode;
  /** Delay (seconds) before the first unit starts. */
  delay?: number;
  /** Stagger (seconds) between units. Defaults to STAGGER.tight. */
  stagger?: number;
}

const MODE_TO_SPLIT_TYPE: Record<SplitMode, "lines" | "words" | "chars"> = {
  line: "lines",
  word: "words",
  char: "chars",
};

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// motion: splits text into words/chars/lines, each masked inside overflow:hidden and animated
// from y:110% -> y:0 with a tight stagger; reduced motion renders the final text immediately,
// with no splitting/masking at all.
export function SplitText({
  as = "p",
  children,
  className,
  mode = "word",
  delay = 0,
  stagger = STAGGER.tight,
}: SplitTextProps) {
  const Tag = as;
  const containerRef = useRef<HTMLElement | null>(null);
  const splitRef = useRef<SplitTypeLib | null>(null);
  const reducedMotion = useReducedMotion();
  // Forces a re-split (and re-run of the reveal animation) after resize / font load.
  const [splitGeneration, setSplitGeneration] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const splitTypeKey = MODE_TO_SPLIT_TYPE[mode];
    const instance = new SplitTypeLib(containerRef.current, {
      types: splitTypeKey,
      split: splitTypeKey,
    });
    splitRef.current = instance;

    const units =
      mode === "line" ? instance.lines : mode === "char" ? instance.chars : instance.words;

    if (units && units.length > 0) {
      // Mask each unit inside an overflow:hidden shell so the y:110% start stays clipped.
      units.forEach((unit) => {
        const parent = unit.parentElement;
        if (parent && !parent.dataset.splitMask) {
          const mask = document.createElement("span");
          mask.dataset.splitMask = "true";
          mask.style.display = mode === "line" ? "block" : "inline-block";
          mask.style.overflow = "hidden";
          mask.style.verticalAlign = "top";
          // Tight line-heights put descenders (g, y, p) below the line box, so the mask
          // clips them. Pad the mask down and pull it back with a negative margin so the
          // layout is unchanged.
          mask.style.paddingBottom = "0.18em";
          mask.style.marginBottom = "-0.18em";
          parent.insertBefore(mask, unit);
          mask.appendChild(unit);
        }
        unit.style.display = "inline-block";
        unit.style.willChange = "transform";
      });

      animate(
        units,
        { y: ["110%", "0%"] },
        {
          duration: 0.6,
          delay: (i) => delay + i * stagger,
          ease: E.out,
          onComplete: () => {
            units.forEach((unit) => {
              unit.style.willChange = "auto";
            });
          },
        }
      );
    }

    return () => {
      splitRef.current?.revert();
      splitRef.current = null;
    };
  }, [reducedMotion, mode, children, splitGeneration, delay, stagger]);

  useEffect(() => {
    if (reducedMotion) return;

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => setSplitGeneration((g) => g + 1), 200);
    };
    window.addEventListener("resize", onResize);

    let cancelled = false;
    document.fonts?.ready?.then(() => {
      if (!cancelled) setSplitGeneration((g) => g + 1);
    });

    return () => {
      cancelled = true;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <Tag ref={containerRef} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag ref={containerRef} className={cn(className)}>
      {children}
    </Tag>
  );
}
