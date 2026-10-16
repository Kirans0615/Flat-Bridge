import type { Metadata } from "next";

import { baseMetadata } from "@/lib/seo";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { SectionVideoBg } from "@/components/sections/section-video-bg";
import { caseStudies } from "@/content/case-studies";
import { media } from "@/lib/media";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: "Case studies",
    description: "Real Flat Bridge engagements and the results they produced.",
    path: "/case-studies",
  });
}

export default function CaseStudiesPage() {
  return (
    <main id="main">
      {/* Paper strip so the nav stays legible over the video (Kiran, 2026-09-23). */}
      <div aria-hidden="true" data-tone="paper" className="h-20 bg-[var(--color-paper)]" />
      <Section tone="ink" id="case-studies-hero" className="overflow-hidden">
        <SectionVideoBg src={media.caseStudiesVideo} overlayOpacity={0.7} />
        <div className="relative z-10">
          <h1 className="max-w-[24ch] text-h1 font-display font-semibold">Case studies</h1>
          <p className="mt-4 max-w-[56ch] text-body-lg text-current/70">
            Client names withheld — every number below is as reported by Flat Bridge.
          </p>
        </div>
      </Section>

      {/* 10.09.26 revision round, Part 7.1 — desktop-only (lg:) density pass:
          smaller vertical rhythm, narrower reading width, tighter grid gap.
          Mobile keeps Section's default padding/grid untouched. */}
      {caseStudies.map((study, index) => (
        <Section
          key={study.slug}
          tone={index % 2 === 0 ? "ink" : "paper"}
          id={study.slug}
          className="lg:!py-[clamp(3rem,5vw,5.5rem)]"
        >
          <div className="lg:mx-auto lg:max-w-[1040px]">
            <Reveal as="div">
              <Eyebrow>Case study</Eyebrow>
              <h2 className="mt-3 text-h2 font-display font-semibold">{study.client}</h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
              <div className="lg:col-span-7">
                <Reveal as="div">
                  <h3 className="text-h3 font-display font-semibold">Situation</h3>
                  <p className="mt-2 max-w-[60ch] text-body-lg">{study.situation}</p>
                </Reveal>

                <Reveal as="div" className="mt-8">
                  <h3 className="text-h3 font-display font-semibold">What Flat Bridge ran</h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {study.approach.map((item) => (
                      <li key={item} className="flex gap-3 text-body-lg">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-green)]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <div className="lg:col-span-4 lg:col-start-9">
                <h3 className="text-h3 font-display font-semibold">Results</h3>
                <ul className="mt-4 flex flex-col gap-6">
                  {study.results.map((result) => (
                    <li key={result.metric} className="border-t border-current/20 pt-4">
                      <p
                        className="text-h3 font-display font-semibold"
                        style={{ color: index % 2 === 0 ? "var(--color-green-lift)" : "var(--color-green)" }}
                      >
                        {result.metric}
                      </p>
                      {result.source ? (
                        <p className="micro mt-2 text-current/70">Source: {result.source}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      ))}
    </main>
  );
}
