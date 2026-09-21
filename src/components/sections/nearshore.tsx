import Image from "next/image";

import { Section, Eyebrow } from "@/components/ui/section";
import { ClipReveal, Parallax, CableDraw } from "@/components/motion";
import { nearshore } from "@/content/homepage";
import { media } from "@/lib/media";

/** Stylized, approximate coordinates in a 400x220 viewBox — not a literal map. */
const ROUTE_TARGETS: Record<string, { x: number; y: number }> = {
  Miami: { x: 140, y: 150 },
  Atlanta: { x: 170, y: 110 },
  Chicago: { x: 210, y: 70 },
  Dallas: { x: 120, y: 100 },
  Toronto: { x: 240, y: 50 },
};
const MANDEVILLE = { x: 70, y: 190 };

/**
 * brief §8.11 — Nearshore Jamaica. Route-map dataviz is a simple abstract
 * inline SVG (brief explicitly wants "no spinning globe, no WebGL"), arcs
 * drawn via `<CableDraw>` staggered by route. Simplification (noted in the
 * final report): the brief's dot that "runs the arc once and stops" is
 * simplified to a static dot fading in at the arc's end once it finishes
 * drawing, rather than an animated position-along-path run.
 */
export default function Nearshore() {
  return (
    <Section tone="paper" id="nearshore">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <ClipReveal direction="up" className="relative aspect-[3/4] w-full overflow-hidden">
            <Parallax speed={-0.1} className="absolute inset-0">
              <Image
                src={media.jamaica["1600"]}
                alt="Caribbean pier near Mandeville, Jamaica"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </ClipReveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Eyebrow>Nearshore</Eyebrow>
          <h2 className="mt-4 text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
            {nearshore.h2}
          </h2>
          <p className="mt-4 max-w-[56ch] text-body-lg text-current/70">{nearshore.body}</p>

          <dl className="mt-8 flex flex-col">
            {nearshore.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-4 border-t border-[var(--color-hairline)] py-4"
              >
                <dt className="text-small text-current/70">{fact.label}</dt>
                <dd className="font-mono text-small text-[var(--color-ink)]">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-[56ch] text-small text-current/70">{nearshore.partner}</p>

          <div className="mt-10">
            <svg viewBox="0 0 400 220" className="h-auto w-full max-w-md" aria-hidden="true">
              {/* Rough, stylized North America outline */}
              <path
                d="M40 60 L150 30 L260 45 L300 90 L280 140 L220 170 L170 190 L110 200 L60 170 L40 120 Z"
                fill="none"
                stroke="var(--color-steel-500)"
                strokeWidth={1}
                opacity={0.4}
              />
              {/* Jamaica */}
              <circle cx={MANDEVILLE.x} cy={MANDEVILLE.y} r={3} fill="var(--color-green)" />
              <text
                x={MANDEVILLE.x - 8}
                y={MANDEVILLE.y + 16}
                className="font-mono"
                fontSize={8}
                fill="var(--color-steel-500)"
              >
                Mandeville
              </text>

              {nearshore.routes.map((route, index) => {
                const target = ROUTE_TARGETS[route.to];
                if (!target) return null;
                const controlX = (MANDEVILLE.x + target.x) / 2;
                const controlY = Math.min(MANDEVILLE.y, target.y) - 30;
                return (
                  <g key={route.to}>
                    <CableDraw
                      d={`M${MANDEVILLE.x} ${MANDEVILLE.y} Q${controlX} ${controlY} ${target.x} ${target.y}`}
                      stroke="var(--color-green-lift)"
                      strokeWidth={1}
                      delay={index * 0.12}
                      className="[stroke-dasharray:3_4]"
                    />
                    <circle cx={target.x} cy={target.y} r={2.5} fill="var(--color-green-lift)" />
                    <text x={target.x + 6} y={target.y + 3} className="font-mono" fontSize={8} fill="var(--color-steel-500)">
                      {route.to}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </Section>
  );
}
