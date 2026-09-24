"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Grain overlay — brief §7.5. A `feTurbulence` filter rasterised once into a
 * 128×128 tile (encoded as an inline SVG data URI, no network request), then
 * repeated as a CSS background and "flickered" by stepping
 * `background-position` between 8 fixed offsets rather than animating it
 * continuously (`animation-timing-function: steps(1, jump-end)` per
 * keyframe, so each step is an instant jump, never a smooth slide). Skipped
 * entirely under reduced motion or save-data/slow-connection —
 * `useReducedMotion` already folds both in.
 */

const TILE = 128;

const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE}' height='${TILE}'><filter id='fb-noise'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' result='t'/><feColorMatrix in='t' type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(#fb-noise)'/></svg>`;

const NOISE_URL = `data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}`;

// 8 fixed, non-multiple-of-tile offsets so each "step" reads as a different
// speckle pattern rather than an invisible whole-tile crawl.
const OFFSETS: Array<[number, number]> = [
  [0, 0],
  [-32, -16],
  [16, -48],
  [-48, 32],
  [32, 16],
  [-16, -32],
  [48, 0],
  [0, -48],
];

const KEYFRAMES = (() => {
  const stops = OFFSETS.map(([x, y], i) => {
    const pct = (i / OFFSETS.length) * 100;
    return `${pct}% { background-position: ${x}px ${y}px; animation-timing-function: steps(1, jump-end); }`;
  }).join("\n");
  return `@keyframes fb-grain-shift { ${stops} 100% { background-position: 0px 0px; } }`;
})();

export function Grain() {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      data-grain
      className="pointer-events-none fixed inset-0 z-40"
      style={{
        opacity: 0.035,
        mixBlendMode: "overlay",
        backgroundImage: `url("${NOISE_URL}")`,
        backgroundSize: `${TILE}px ${TILE}px`,
        backgroundRepeat: "repeat",
        animation: "fb-grain-shift 1s infinite",
      }}
    >
      <style>{KEYFRAMES}</style>
    </div>
  );
}
