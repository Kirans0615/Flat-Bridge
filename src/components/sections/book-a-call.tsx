"use client";

import { useEffect, useState } from "react";

import { QuoteForm } from "@/components/sections/quote-form";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

/**
 * brief §8.15 — left: heading + direct contact rail + live Jamaica clock.
 * Right: the shared `<QuoteForm>` (already built — imported directly, not
 * rebuilt). The clock here is a self-contained duplicate of the one in
 * `hero.tsx`, per this task's instruction not to share state between them.
 */
function useJamaicaClock(): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Jamaica",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export default function BookACall() {
  const jmTime = useJamaicaClock();

  return (
    <Section tone="ink" id="book-a-call">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="max-w-[20ch] text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
            Tell us what&apos;s eating your week.
          </h2>

          <dl className="mt-10 flex flex-col">
            <div className="flex items-baseline justify-between gap-4 border-t border-[var(--color-steel-700)] py-4">
              <dt className="text-small text-current/70">Phone</dt>
              <dd>
                <a href={site.phoneHref} data-cursor="link" className="font-mono text-small">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-[var(--color-steel-700)] py-4">
              <dt className="text-small text-current/70">Email</dt>
              <dd>
                <a href={site.emailHref} data-cursor="link" className="font-mono text-small">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-[var(--color-steel-700)] py-4">
              <dt className="text-small text-current/70">Location</dt>
              <dd className="font-mono text-small">{site.location.label}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-b border-[var(--color-steel-700)] py-4">
              <dt className="text-small text-current/70">Local time</dt>
              <dd className="font-mono text-small tabular-nums">{jmTime ?? "--:--:--"}</dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <QuoteForm tone="ink" />
        </div>
      </div>
    </Section>
  );
}
