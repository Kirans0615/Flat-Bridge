import type { Metadata } from "next";
import Image from "next/image";

import { baseMetadata } from "@/lib/seo";
import { media } from "@/lib/media";
import { Section, Eyebrow } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal, SplitText, ClipReveal } from "@/components/motion";
import { aboutHero, whoWeAre, whyChooseUs, ourTeam } from "@/content/about";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: "About",
    description:
      "Flat Bridge Limited has been building the bridge between logistics operations and the people who run them.",
    path: "/about",
  });
}

function PendingNote({ children }: { children: React.ReactNode }) {
  return <p className="micro mt-3 text-current/70">{children}</p>;
}

/**
 * 10.09.26 revision round, Part 4 — page reordered and trimmed to: hero
 * (new copy) -> Why choose us -> Our team -> global CTA band (rendered by
 * layout via GlobalCtaGate, not authored here). "Who we are" (4.2),
 * "Where we've been" timeline (4.3), "How we work" (4.4) and the stats
 * strip (4.6) are removed entirely. `whoWeAre` content stays imported from
 * `@/content/about` — the Our Team section below still repeats its body
 * paragraphs (pre-existing behavior, untouched).
 */
export default function AboutPage() {
  return (
    <main id="main">
      {/* Hero — text-only. The real team photo appears exactly once on this
          page, in the "Our team" section at the bottom, per Kiran's
          instruction (2026-09-10): never repeat it elsewhere. */}
      {/* White bar above the hero so the floating navbar reads dark on light (same as the sector pages) */}
      <div aria-hidden="true" data-tone="paper" className="h-20 bg-[var(--color-paper)]" />

      <Section tone="ink" id="about-hero" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--color-ink)]">
          <Image
            src={media.aboutHeroBg}
            alt=""
            aria-hidden="true"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(5,18,26,0.92) 0%, rgba(5,18,26,0.72) 55%, rgba(5,18,26,0.5) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-[48rem]">
          <SplitText
            as="h1"
            mode="line"
            className="text-h1 font-display font-semibold text-white"
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

      {/* Why choose us */}
      <Section tone="paper" id="why-choose-us">
        <Eyebrow>Why Flat Bridge</Eyebrow>
        <h2 className="mt-3 text-h2 font-display font-semibold">{whyChooseUs.h2}</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {whyChooseUs.rows.map((row) => (
            <Reveal key={row.title} as="div">
              <div className="border-t border-[var(--color-hairline)] pt-5">
                <h3 className="text-h3 font-display font-semibold">{row.title}</h3>
                <p className="mt-2 max-w-[52ch] text-body-lg text-current/70">{row.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {whyChooseUs.placeholder ? (
          <PendingNote>Fuller detail here is pending from Flat Bridge.</PendingNote>
        ) : null}
      </Section>

      {/* Our team */}
      <Section tone="ink" id="our-team" className="!px-0">
        <div className="grid grid-cols-1 items-center gap-10 px-[clamp(1.25rem,5vw,6rem)] lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Our team</Eyebrow>
            <h2 className="mt-3 text-h2 font-display font-semibold">{ourTeam.h2}</h2>
            <Reveal>
              <div className="mt-6 flex max-w-[60ch] flex-col gap-5 text-body-lg text-[var(--color-concrete)]">
                <p>{ourTeam.body}</p>
                {whoWeAre.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
          <figure className="m-0">
            <ClipReveal direction="up" className="relative aspect-square w-full overflow-hidden">
              <Image
                src={media.teamPhoto}
                alt={ourTeam.caption}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </ClipReveal>
            <figcaption className="mt-3 font-mono text-small text-current/70">{ourTeam.caption}</figcaption>
          </figure>
        </div>
      </Section>
    </main>
  );
}
