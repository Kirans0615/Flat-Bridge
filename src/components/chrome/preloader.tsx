"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import { E } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * First-visit-only preloader — brief §7.1. Session-gated (`sessionStorage
 * "fb:seen"`), capped at 1.4s no matter what, skipped on reduced motion,
 * repeat visits, and any route other than `/`. Sequence: abyss field ->
 * an abstracted bridge mark drawn as SVG strokes (not a trace of the real
 * logo — out of scope here, see §7.1's own caveat) -> "Bridging the gap"
 * wipes in -> the panel splits top/bottom and slides apart.
 */

const SESSION_KEY = "fb:seen";
const MARK_MS = 500;
const TEXT_MS = 400;
const SPLIT_MS = 600;
const HARD_CAP_MS = 1400;

type Phase = "idle" | "mark" | "text" | "split" | "done";

function BridgeMark({ play }: { play: boolean }) {
  return (
    <svg width="120" height="64" viewBox="0 0 120 64" fill="none" aria-hidden="true">
      <motion.path
        d="M4 52 L30 20 L60 44 L90 16 L116 52"
        stroke="var(--color-green-lift)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={{ duration: MARK_MS / 1000, ease: E.out }}
      />
    </svg>
  );
}

export function Preloader() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    // This effect gates a one-time intro sequence on route + session-storage
    // state that's only knowable post-mount; each branch below is a
    // deliberate phase transition, not a derived-state smell.
    if (pathname !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }
    if (reducedMotion) {
      setPhase("done");
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* private browsing / storage disabled — fine, just skip */
      }
      return;
    }

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* storage unavailable — treat as unseen, don't block on it */
    }
    if (alreadySeen) {
      setPhase("done");
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* nothing to persist to — the preloader will just replay next visit */
    }

    setPhase("mark");
    const timers = [
      window.setTimeout(() => setPhase("text"), MARK_MS),
      window.setTimeout(() => setPhase("split"), MARK_MS + TEXT_MS),
      window.setTimeout(() => setPhase("done"), HARD_CAP_MS),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [pathname, reducedMotion]);

  if (phase === "idle" || phase === "done") return null;

  const splitting = phase === "split";
  const textVisible = phase === "text" || phase === "split";

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[60] overflow-hidden">
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[var(--color-abyss)]"
        animate={{ y: splitting ? "-100%" : "0%" }}
        transition={{ duration: SPLIT_MS / 1000, ease: E.inOut }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[var(--color-abyss)]"
        animate={{ y: splitting ? "100%" : "0%" }}
        transition={{ duration: SPLIT_MS / 1000, ease: E.inOut }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <BridgeMark play />
        <div className="overflow-hidden">
          <motion.p
            className="micro font-display tracking-[0.2em] text-[var(--color-concrete)]"
            style={{ fontStretch: "125%" }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: textVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
            transition={{ duration: TEXT_MS / 1000, ease: E.out }}
          >
            Bridging the gap
          </motion.p>
        </div>
      </div>
    </div>
  );
}
