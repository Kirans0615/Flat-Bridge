import type { Metadata } from "next";
import Image from "next/image";

import { baseMetadata } from "@/lib/seo";
import { media } from "@/lib/media";
import { Section, Eyebrow } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal, SplitText, ClipReveal, NumberTicker } from "@/components/motion";
import {
  aboutHero,
  whoWeAre,
  timeline,
  howWeWork,
  whyChooseUs,
  aboutCounters,
  ourTeam,
} from "@/content/about";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: "About",
    description:
      "Flat Bridge Limited has been building the bridge between logistics operations and the people who run them since 1997.",
    path: "/about",
  });
}

function PendingNote({ children }: { children: React.ReactNode }) {
  return <p className="micro mt-3 text-current/70">{children}</p>;
}

export default function AboutPage() {
  const currentYearsInLogistics = new Date().getFullYear() - 1997;

  return (
    <main id="main">
      {/* Hero — text-only. The real team photo appears exactly once on this
          page, in the "Our team" section at the bottom, per Kiran's
          instruction (2026-09-10): never repeat it elsewhere. */}
      <Section tone="ink" id="about-hero">
        <div className="max-w-[48rem]">
          <SplitText
            as="h1"
            mode="line"
            className="text-h1 font-[var(--font-display)] font-semibold text-white"
          >
            {aboutHero.h1}
          </SplitText>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[52ch] text-body-lg text-[var(--color-concrete)]">
              {aboutHero.lede}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Button href={aboutHero.cta.href} variant="solid" className="mt-8">
              {aboutHero.cta.label}
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* Who we are */}
      <Section tone="paper" id="who-we-are">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>About Flat Bridge</Eyebrow>
              <h2 className="mt-3 text-h2 font-[var(--font-display)] font-semibold">{whoWeAre.h2}</h2>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal as="div" className="flex flex-col gap-5">
              {whoWeAre.body.map((paragraph) => (
                <p key={paragraph} className="max-w-[68ch] text-body-lg">
                  {paragraph}
                </p>
              ))}
            </Reveal>
            {whoWeAre.placeholder ? (
              <PendingNote>Fuller detail here is pending from Flat Bridge.</PendingNote>
            ) : null}
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section tone="ink" id="timeline">
        <Eyebrow>Since 1997</Eyebrow>
        <h2 className="mt-3 text-h2 font-[var(--font-display)] font-semibold">Where we&apos;ve been</h2>
        <Reveal
          as="ul"
          className="mt-12 flex flex-col gap-8 border-l border-[var(--color-steel-700)] pl-6 sm:flex-row sm:gap-0 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-8"
        >
          {timeline.map((node) => (
            <li key={node.year} className="relative flex-1 sm:px-6 sm:first:pl-0">
              <span
                aria-hidden="true"
                className="absolute -left-[calc(1.5rem+1px)] top-0 h-2 w-2 rotate-45 bg-[var(--color-green-lift)] sm:-top-[calc(2rem+4px)] sm:left-0"
              />
              <p className="font-mono text-small text-[var(--color-green-lift)]">{node.year}</p>
              <p className="mt-1 text-body-lg">{node.label}</p>
            </li>
          ))}
        </Reveal>
        <PendingNote>
          Only two milestones are confirmed today. Further history to come as Flat Bridge supplies it —
          nothing here is invented.
        </PendingNote>
      </Section>

      {/* How we work */}
      <Section tone="paper" id="how-we-work">
        <Eyebrow>Approach</Eyebrow>
        <h2 className="mt-3 text-h2 font-[var(--font-display)] font-semibold">{howWeWork.h2}</h2>
        <div className="mt-12 flex flex-col divide-y divide-[var(--color-hairline)] border-y border-[var(--color-hairline)]">
          {howWeWork.rows.map((row, index) => (
            <Reveal key={row.title} as="div" delay={index * 0.05}>
              <div className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-12">
                <p className="font-mono text-small text-current/70 lg:col-span-2">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-h3 font-[var(--font-display)] font-semibold lg:col-span-3">
                  {row.title}
                </h3>
                <p className="max-w-[60ch] text-body-lg lg:col-span-7">{row.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {howWeWork.placeholder ? (
          <PendingNote>Fuller detail here is pending from Flat Bridge.</PendingNote>
        ) : null}
      </Section>

      {/* Why choose us */}
      <Section tone="ink" id="why-choose-us">
        <Eyebrow>Why Flat Bridge</Eyebrow>
        <h2 className="mt-3 text-h2 font-[var(--font-display)] font-semibold">{whyChooseUs.h2}</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {whyChooseUs.rows.map((row) => (
            <Reveal key={row.title} as="div">
              <div className="border-t border-[var(--color-steel-700)] pt-5">
                <h3 className="text-h3 font-[var(--font-display)] font-semibold">{row.title}</h3>
                <p className="mt-2 max-w-[52ch] text-body-lg text-[var(--color-concrete)]">{row.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {whyChooseUs.placeholder ? (
          <PendingNote>Fuller detail here is pending from Flat Bridge.</PendingNote>
        ) : null}
      </Section>

      {/* Counters */}
      <Section tone="paper" id="counters">
        <div className="grid grid-cols-1 gap-8 divide-y divide-[var(--color-hairline)] sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {aboutCounters.map((counter) => (
            <div key={counter.label} className="pt-6 first:pt-0 sm:px-8 sm:pt-0 sm:first:pl-0">
              <NumberTicker
                value={"computed" in counter && counter.computed ? currentYearsInLogistics : counter.value}
                suffix={counter.suffix}
                decimals={counter.decimals}
                className="text-d2 font-[var(--font-display)] font-semibold"
              />
              <p className="mt-2 text-body-lg text-current/70">{counter.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Our team */}
      <Section tone="ink" id="our-team" className="!px-0">
        <div className="px-[clamp(1.25rem,5vw,6rem)]">
          <Eyebrow>Our team</Eyebrow>
          <h2 className="mt-3 text-h2 font-[var(--font-display)] font-semibold">{ourTeam.h2}</h2>
          <Reveal>
            <p className="mt-4 max-w-[68ch] text-body-lg text-[var(--color-concrete)]">{ourTeam.body}</p>
          </Reveal>
        </div>
        <ClipReveal direction="up" className="relative mt-10 aspect-[21/9] w-full overflow-hidden">
          <Image
            src={media.team["2400"]}
            alt={ourTeam.caption}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </ClipReveal>
        <p className="mt-3 px-[clamp(1.25rem,5vw,6rem)] font-mono text-small text-current/70">
          {ourTeam.caption}
        </p>
      </Section>
    </main>
  );
}
