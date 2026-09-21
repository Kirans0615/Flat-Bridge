"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Custom pointer chrome — brief §7.4. Desktop (`pointer: fine`) only; renders
 * nothing on touch or under reduced motion. A 6px green dot tracks tightly,
 * a 28px hairline ring trails with more lag (two independent springs). State
 * is read off a `data-cursor="link|drag|view|play"` attribute on whatever
 * element the pointer is currently over, via a single document-level
 * `pointerover`/`pointerout` listener pair — any component that wants a
 * custom cursor state just adds the attribute, no context/provider needed.
 */

type CursorState = "default" | "link" | "drag" | "view" | "play";

const RING_SCALE: Record<CursorState, number> = {
  default: 1,
  link: 1.8,
  drag: 1.5,
  view: 1.4,
  play: 1.5,
};

const RING_LABEL: Partial<Record<CursorState, string>> = {
  view: "View",
  play: "▶",
  drag: "↔",
};

export function Cursor() {
  const reducedMotion = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>("default");

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const dotSpringX = useSpring(dotX, { stiffness: 400, damping: 30 });
  const dotSpringY = useSpring(dotY, { stiffness: 400, damping: 30 });
  const ringSpringX = useSpring(ringX, { stiffness: 120, damping: 18 });
  const ringSpringY = useSpring(ringY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    // Syncing with a browser API unavailable during SSR — must happen post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || !isFinePointer) return;

    function handleMove(event: PointerEvent) {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      ringX.set(event.clientX);
      ringY.set(event.clientY);
      setVisible(true);
    }
    function handleOver(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-cursor]");
      setState((el?.dataset.cursor as CursorState | undefined) ?? "default");
    }
    function handleOut(event: PointerEvent) {
      const related = event.relatedTarget as HTMLElement | null;
      if (!related?.closest("[data-cursor]")) setState("default");
    }
    function handleWindowLeave() {
      setVisible(false);
    }
    function handleWindowEnter() {
      setVisible(true);
    }

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerout", handleOut);
    document.documentElement.addEventListener("mouseleave", handleWindowLeave);
    document.documentElement.addEventListener("mouseenter", handleWindowEnter);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
      document.documentElement.removeEventListener("mouseleave", handleWindowLeave);
      document.documentElement.removeEventListener("mouseenter", handleWindowEnter);
    };
  }, [reducedMotion, isFinePointer, dotX, dotY, ringX, ringY]);

  if (reducedMotion || !isFinePointer) return null;

  const label = RING_LABEL[state];
  const ringFilled = state === "view";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 150ms linear" }}
    >
      <motion.span
        className="fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[var(--color-green-lift)]"
        style={{ x: dotSpringX, y: dotSpringY, opacity: state === "link" ? 0 : 1 }}
      />
      <motion.span
        className="fixed left-0 top-0 -ml-3.5 -mt-3.5 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-green-lift)]"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          scale: RING_SCALE[state],
          backgroundColor: ringFilled ? "var(--color-green-lift)" : "transparent",
        }}
      >
        {label ? (
          <span
            className="micro font-mono text-[9px] leading-none"
            style={{ color: ringFilled ? "var(--color-ink)" : "var(--color-green-lift)" }}
          >
            {label}
          </span>
        ) : null}
      </motion.span>
    </div>
  );
}
