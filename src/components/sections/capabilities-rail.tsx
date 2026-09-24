"use client";

import { useRef } from "react";
import Link from "next/link";

import { PinnedRail } from "@/components/motion";
import { Section } from "@/components/ui/section";
import { services, type Service } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * brief §8.6 — the set-piece. Renders all 16 `services` (already in the
 * brief's fixed slug order) inside `<PinnedRail>`.
 *
 * The sticky "N / 16" counter + progress bar live outside PinnedRail's own
 * translated track (so they stay fixed while the track scrolls). PinnedRail
 * only exposes the active index synchronously inside its render-prop, so
 * rather than lifting it into this component's React state (which would mean
 * calling setState while a descendant — PinnedRail — is rendering, an
 * anti-pattern React warns about), the counter/progress bar are written
 * directly via refs from inside the render-prop. This is a deliberate wiring
 * choice, not a visual simplification.
 *
 * Simplifications (noted in the final report): the brief's separate
 * `overflow-x: auto` always-available a11y fallback and the <768px
 * scroll-snap mobile carousel are not implemented — only PinnedRail's actual,
 * documented reduced-motion contract (an unpinned static grid) is wired,
 * since PinnedRail's file is authoritative over the brief text here.
 */
export default function CapabilitiesRail() {
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const total = services.length;

  return (
    <Section
      tone="paper"
      id="capabilities-rail"
      className="px-0 pt-[clamp(3rem,6vw,5.5rem)] bg-[linear-gradient(180deg,#c5dbb5_0%,#f2f3f1_100%)]"
    >
      <div className="grid grid-cols-1 gap-10 px-[clamp(1.25rem,5vw,6rem)] md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <div className="md:sticky md:top-24">
            <h2 className="text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
              Sixteen things we take off your desk
            </h2>
            <div className="mt-8 flex items-baseline gap-1 font-mono text-small">
              <span ref={counterRef} className="tabular-nums text-[var(--color-ink)]">
                01
              </span>
              <span className="text-current/70">/ {String(total).padStart(2, "0")}</span>
            </div>
            <div className="mt-3 h-px w-full bg-[var(--color-hairline)]">
              <div
                ref={progressRef}
                className="h-full bg-[var(--color-green)] transition-[width] duration-300"
                style={{ width: `${(1 / total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-9">
          <PinnedRail
            count={total}
            widthVw={38}
            fallback={() => <StaticGrid />}
          >
            {(activeIndex) => {
              if (counterRef.current) {
                counterRef.current.textContent = String(activeIndex + 1).padStart(2, "0");
              }
              if (progressRef.current) {
                progressRef.current.style.width = `${((activeIndex + 1) / total) * 100}%`;
              }
              return services.map((service, index) => (
                <RailPanel key={service.slug} service={service} active={index === activeIndex} />
              ));
            }}
          </PinnedRail>
        </div>
      </div>
    </Section>
  );
}

function RailPanel({ service, active }: { service: Service; active: boolean }) {
  return (
    <div
      className={cn(
        "flex w-[78vw] shrink-0 flex-col justify-between border-l border-[var(--color-hairline)] px-8 py-10 transition-colors duration-300 md:w-[38vw]",
        active && "bg-[var(--color-paper-2)]"
      )}
    >
      <div>
        <h3
          className={cn(
            "text-h3 font-[var(--font-display)] transition-colors duration-300",
            active ? "text-[var(--color-ink)]" : "text-current/70"
          )}
        >
          {service.name}
        </h3>
        <p className="mt-4 max-w-[42ch] text-body text-current/70">{service.lede}</p>
        <ul className="mt-6 flex flex-col gap-2">
          {service.whatYouGet.slice(0, 2).map((item) => (
            <li key={item} className="flex gap-2 text-small text-[var(--color-ink)]">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-green)]" />
              {item}
            </li>
          ))}
        </ul>
        {service.systems?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {service.systems.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[var(--color-hairline)] px-3 py-1 font-mono text-micro text-current/70"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <Link
        href={`/services/${service.slug}`}
        data-cursor="link"
        className="group mt-8 inline-flex w-fit items-center gap-2 text-small font-medium"
      >
        Read the detail
        <span
          className={cn(
            "block h-px bg-[var(--color-green)] transition-all duration-300",
            active ? "w-8" : "w-4 group-hover:w-8"
          )}
        />
      </Link>
    </div>
  );
}

function StaticGrid() {
  return (
    <div className="grid grid-cols-1 border-l border-t border-[var(--color-hairline)] sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <div key={service.slug} className="flex flex-col justify-between border-b border-r border-[var(--color-hairline)] p-6">
          <div>
            <h3 className="text-h3 font-[var(--font-display)]">{service.name}</h3>
            <p className="mt-3 text-small text-current/70">{service.lede}</p>
          </div>
          <Link href={`/services/${service.slug}`} data-cursor="link" className="mt-6 w-fit text-small font-medium">
            Read the detail
          </Link>
        </div>
      ))}
    </div>
  );
}
