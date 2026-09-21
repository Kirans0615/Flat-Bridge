"use client";

import { Children, type ReactNode, isValidElement } from "react";
import { motion } from "motion/react";

import { D, E, STAGGER } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

// Pre-built at module scope (never inside the component) so the wrapper never mints a fresh
// component identity on render — `motion.create()` is deliberately not used here.
const TAGS = {
  div: motion.div,
  span: motion.span,
  section: motion.section,
  article: motion.article,
  figure: motion.figure,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  a: motion.a,
  button: motion.button,
} as const;

type RevealTag = keyof typeof TAGS;

interface RevealProps {
  /** One of the pre-registered tags in `TAGS`. Defaults to "div". */
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  /** Delay (seconds) before the first child starts. */
  delay?: number;
  /** Stagger (seconds) between each direct child. Defaults to STAGGER.base. */
  stagger?: number;
  /** Viewport margin passed to framer-motion's `whileInView` trigger. */
  margin?: string;
}

// motion: children rise 24px + fade + 6px blur->0 on scroll-in (once); reduced motion renders
// final state with only a 150ms opacity transition, no rise/blur.
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  stagger = STAGGER.base,
  margin = "-12% 0px",
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const Wrapper = TAGS[as];
  const items = Children.toArray(children);
  // Wrapping each child in its own element (the multi-child stagger path
  // below) breaks list semantics when `as` is "ul"/"ol" — <li> stops being
  // a direct child, which Lighthouse (correctly) flags. Multiple <li>
  // children still get the single-wrapper fade/rise treatment on the <ul>
  // itself instead of a real per-item stagger; a real fix (cloning motion
  // props onto each <li> in place) isn't worth the complexity for the one
  // caller (About's 2-item timeline) that currently needs this.
  const isSingleChild = items.length <= 1 || as === "ul" || as === "ol";

  if (reducedMotion) {
    return (
      <Wrapper
        className={cn(className)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin }}
        transition={{ duration: 0.15, ease: "linear" }}
      >
        {children}
      </Wrapper>
    );
  }

  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: D.md, ease: E.out },
    },
  };

  // Single child: animate the wrapper itself directly (no need for a stagger container).
  if (isSingleChild) {
    return (
      <Wrapper
        className={cn(className)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin }}
        variants={item}
        transition={{ duration: D.md, ease: E.out, delay }}
      >
        {children}
      </Wrapper>
    );
  }

  return (
    <Wrapper
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      variants={container}
    >
      {items.map((child, index) => (
        <motion.div
          key={isValidElement(child) && child.key !== null ? child.key : index}
          variants={item}
        >
          {child}
        </motion.div>
      ))}
    </Wrapper>
  );
}
