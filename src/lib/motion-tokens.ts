/**
 * Shared motion vocabulary — brief §4.6. Every animated component imports
 * from here instead of hard-coding an easing curve, duration or stagger.
 */
export const E = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  snap: [0.34, 1.56, 0.64, 1],
} as const;

export const D = {
  xs: 0.18,
  sm: 0.32,
  md: 0.6,
  lg: 0.9,
  xl: 1.4,
} as const;

export const STAGGER = {
  tight: 0.04,
  base: 0.07,
  loose: 0.12,
} as const;
