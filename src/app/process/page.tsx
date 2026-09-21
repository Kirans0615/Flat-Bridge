import type { Metadata } from "next";

import { baseMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { processSteps } from "@/content/process";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: "Process",
    description: "Discovery call, scoped pilot, trained team assigned, run and report.",
    path: "/process",
  });
}

export default function ProcessPage() {
  return (
    <main id="main">
      <Section tone="paper" id="process-hero">
        <h1 className="max-w-[24ch] text-h1 font-[var(--font-display)] font-semibold">
          Four steps to a running team.
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-current/70">
          Genuinely sequential — from the first call to KPI reporting.
        </p>
      </Section>

      <Section tone="ink" id="process-steps">
        <div className="relative flex flex-col gap-0 pl-8 sm:pl-10">
          <span
            aria-hidden="true"
            className="absolute left-3 top-2 bottom-2 w-px bg-[var(--color-steel-700)] sm:left-4"
          />

          {processSteps.map((step, index) => (
            <Reveal key={step.number} as="div" delay={index * 0.08}>
              <div
                className={`relative flex flex-col gap-2 border-b border-[var(--color-steel-700)] py-10 last:border-b-0 sm:max-w-[60ch] ${
                  index % 2 === 1 ? "sm:ml-auto sm:text-right" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-11 h-2 w-2 rotate-45 bg-[var(--color-green-lift)] sm:-left-10"
                />
                <p className="font-mono text-small text-[var(--color-green-lift)]">{step.number}</p>
                <h2 className="text-h2 font-[var(--font-display)] font-semibold text-white">{step.title}</h2>
                <p className="max-w-[56ch] text-body-lg text-[var(--color-concrete)]">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
