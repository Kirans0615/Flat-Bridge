"use client";

import { useEffect, useRef, useState } from "react";

import { Parallax } from "@/components/motion";
import { Section } from "@/components/ui/section";
import { opsConsole } from "@/content/homepage";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Illustrative, explicitly-fake load rows (brief §8.9) — never a real client. */
const LOADS: Array<{ id: string; status: (typeof opsConsole.statuses)[number]; eta: string }> = [
  { id: "#4021", status: "In transit", eta: "14:32" },
  { id: "#4019", status: "POD received", eta: "—" },
  { id: "#4025", status: "At dock", eta: "09:15" },
  { id: "#4017", status: "Detention", eta: "—" },
  { id: "#4030", status: "In transit", eta: "16:40" },
];

/** Seeded once, illustrative on-time % sparkline — not real telemetry. */
const SPARK_POINTS = [82, 85, 83, 88, 90, 89, 92, 91, 94, 93, 95, 96];

function Sparkline() {
  const width = 220;
  const height = 48;
  const max = Math.max(...SPARK_POINTS);
  const min = Math.min(...SPARK_POINTS);
  const points = SPARK_POINTS.map((value, index) => {
    const x = (index / (SPARK_POINTS.length - 1)) * width;
    const y = height - ((value - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-12 w-full" aria-hidden="true">
      <polyline points={points} fill="none" stroke="var(--color-green-lift)" strokeWidth={1.5} />
    </svg>
  );
}

/**
 * brief §8.9 — the ops console card. Simplification (noted in the report):
 * the brief's full `rotateX` 3D scroll-reveal container (§19.1) is replaced
 * with a `<Parallax>` + fade entrance, per this task's explicit allowance.
 */
export default function OpsConsole() {
  const reducedMotion = useReducedMotion();
  const [feed, setFeed] = useState<string[]>(() => [opsConsole.feedLines[0]]);
  const feedRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      cursorRef.current = (cursorRef.current + 1) % opsConsole.feedLines.length;
      setFeed((prev) => [...prev.slice(-7), opsConsole.feedLines[cursorRef.current]]);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: reducedMotion ? "auto" : "smooth" });
  }, [feed, reducedMotion]);

  const card = (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-steel-700)] bg-[var(--color-steel-900)] p-6 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.55)] sm:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="micro text-current/70">Load status</p>
          <div className="mt-4 flex flex-col divide-y divide-[var(--color-steel-700)] font-mono text-small">
            {LOADS.map((load) => (
              <div key={load.id} className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-[var(--color-concrete)]">{load.id}</span>
                <span className="rounded-full border border-[var(--color-steel-700)] px-2.5 py-1 text-micro text-[var(--color-concrete)]">
                  {load.status}
                </span>
                <span className="tabular-nums text-current/70">{load.eta}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 micro text-current/70">On-time percentage</p>
          <div className="mt-2">
            <Sparkline />
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="micro text-current/70">Check-call feed</p>
          <div
            ref={feedRef}
            className="mt-4 flex h-48 flex-col gap-2 overflow-y-auto font-mono text-micro text-[var(--color-concrete)]"
          >
            {feed.map((line, index) => (
              <p key={`${line}-${index}`} className="border-l border-[var(--color-green)] pl-3 leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Section tone="ink" id="ops-console">
      <h2 className="max-w-[32ch] text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
        {opsConsole.h2}
      </h2>
      <p className="mt-4 max-w-[52ch] text-body-lg text-[var(--color-concrete)]">{opsConsole.sub}</p>

      <div className="mt-12">
        {reducedMotion ? (
          card
        ) : (
          <Parallax speed={-0.08} maxOffsetPx={40}>
            {card}
          </Parallax>
        )}
        <p className={cn("mt-4 micro text-current/70")}>{opsConsole.caption}</p>
      </div>
    </Section>
  );
}
