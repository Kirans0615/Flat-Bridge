"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { animate, useInView } from "motion/react";

import { D, E } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const DIGIT_HEIGHT_EM = 1.1;

// Client-only detector: no-op subscription (the value never changes after mount), so this
// swaps in the digit-roll markup post-hydration without a synchronous setState-in-effect.
function subscribeNoop() {
  return () => {};
}
function getClientSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

function formatValue(value: number, decimals: number): string {
  return value.toFixed(decimals);
}

/** A single vertical strip of 0-9, translated to reveal the target digit. */
function DigitStrip({ digit, animateIn }: { digit: number; animateIn: boolean }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!animateIn || !stripRef.current || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    animate(stripRef.current, { y: `-${digit * DIGIT_HEIGHT_EM}em` }, { duration: D.xl, ease: E.out });
  }, [animateIn, digit]);

  return (
    <span
      className="relative inline-block overflow-hidden align-top"
      style={{ height: `${DIGIT_HEIGHT_EM}em`, width: "0.62em" }}
    >
      <span ref={stripRef} className="absolute inset-x-0 top-0 flex flex-col items-center">
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} style={{ height: `${DIGIT_HEIGHT_EM}em`, lineHeight: `${DIGIT_HEIGHT_EM}em` }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

// motion: each digit is a vertical 0-9 strip translated to the target digit, rolling in once when
// the ticker enters the viewport (E.out, ~1.4s). The final formatted value is always present as
// real SSR'd text content (see the `sr-only`/fallback span below) so it stays crawlable; reduced
// motion shows that final value directly with no roll animation.
export function NumberTicker({ value, className, prefix = "", suffix = "", decimals = 0 }: NumberTickerProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement>(null);
  // The ref-bearing wrapper is unconditional (even in the SSR/reduced-motion
  // path) so useInView's observer attaches to a real, stable DOM node from
  // the very first commit — attaching it only in the digit-strip branch
  // meant useInView's one-shot setup effect could fire while ref.current was
  // still null (the SSR-matching first client render), before the branch
  // that actually holds the ref ever mounted, and it would never retry.
  const isInView = useInView(containerRef, { once: true });
  const isClient = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);

  const formatted = formatValue(value, decimals);
  const chars = formatted.split("");

  const showDigitStrips = isClient && !reducedMotion;

  return (
    <span ref={containerRef} className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {showDigitStrips
        ? chars.map((char, index) =>
            /\d/.test(char) ? (
              <DigitStrip key={index} digit={Number(char)} animateIn={isInView} />
            ) : (
              <span key={index}>{char}</span>
            )
          )
        : formatted}
      {suffix}
    </span>
  );
}
