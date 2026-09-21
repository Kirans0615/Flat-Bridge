import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { baseMetadata } from "@/lib/seo";
import { media } from "@/lib/media";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal, SplitText, ClipReveal, Parallax, NumberTicker } from "@/components/motion";
import { sectors } from "@/content/sectors";
import { services } from "@/content/services";
import { pullQuotes } from "@/content/site";
import { stats } from "@/content/stats";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: "Sectors",
    description:
      "At Flat Bridge, we take pride in delivering tailored logistics solutions that cater to the distinct demands of various industries.",
    path: "/sectors",
  });
}

export default function SectorsPage() {
  return (
    <main id="main">
      {/* Hero */}
      <Section tone="ink" id="sectors-hero" className="!py-0">
        <div className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden px-[clamp(1.25rem,5vw,6rem)] py-[clamp(4rem,8vw,7rem)]">
          <Image
            src={media.port["2400"]}
            alt=""
            aria-hidden="true"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--color-abyss) 5%, rgba(5,18,26,0.55) 55%, rgba(5,18,26,0.25) 100%)",
            }}
          />
          <div className="relative z-10">
            <SplitText
              as="h1"
              mode="line"
              className="max-w-[24ch] text-h1 font-[var(--font-display)] font-semibold text-white"
            >
              Tailored solutions for varied sectors
            </SplitText>
            <Reveal delay={0.2}>
              <p className="mt-4 max-w-[56ch] text-body-lg text-[var(--color-concrete)]">
                At Flat Bridge, we take pride in delivering tailored logistics solutions that cater to the
                distinct demands of various industries.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Six alternating blocks */}
      {sectors.map((sector, index) => {
        const reversed = index % 2 === 1;
        return (
          <Section
            key={sector.slug}
            tone={index % 2 === 0 ? "paper" : "ink"}
            id={sector.slug}
          >
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className={`lg:col-span-6 ${reversed ? "lg:order-2 lg:col-start-7" : "lg:col-start-1"}`}>
                <ClipReveal
                  direction="up"
                  className="aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]"
                >
                  <Parallax speed={-0.1} className="h-full w-full">
                    <Image
                      src={media[sector.imageKey]["1600"]}
                      alt=""
                      aria-hidden="true"
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 45vw, 90vw"
                    />
                  </Parallax>
                </ClipReveal>
              </div>
              <div className={`lg:col-span-5 ${reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                <Reveal as="div">
                  <h2 className="text-h2 font-[var(--font-display)] font-semibold">{sector.name}</h2>
                  <p className="mt-4 max-w-[52ch] text-body-lg">{sector.promise}</p>
                  <ul className="mt-6 flex flex-col gap-2">
                    {sector.serviceSlugs.slice(0, 3).map((slug) => {
                      const relatedService = services.find((s) => s.slug === slug);
                      if (!relatedService) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/services/${slug}`}
                            data-cursor="link"
                            className="inline-block border-b border-current/20 text-small hover:border-[var(--color-green)]"
                          >
                            {relatedService.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Button href={`/sectors/${sector.slug}`} variant="ghost" className="mt-6">
                    View sector
                  </Button>
                </Reveal>
              </div>
            </div>
          </Section>
        );
      })}

      {/* Who we are + pull quote */}
      <Section tone="ink" id="who-we-are">
        <Reveal>
          <blockquote className="mx-auto max-w-[44ch] text-center">
            <SplitText
              as="p"
              mode="line"
              className="text-h2 font-[var(--font-display)] font-semibold text-white"
            >
              {`"${pullQuotes.jpMorgan.text}"`}
            </SplitText>
            <cite className="mt-6 block text-body text-current/70 not-italic">
              — {pullQuotes.jpMorgan.author}
            </cite>
          </blockquote>
        </Reveal>
      </Section>

      {/* Real stats, not the legacy demo counters */}
      <Section tone="paper" id="stats">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-[var(--color-hairline)] pt-4">
              <NumberTicker
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                className="text-d2 font-[var(--font-display)] font-semibold"
              />
              <p className="mt-2 text-small text-current/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA band */}
      <Section tone="ink" id="cta">
        <h2 className="text-h2 font-[var(--font-display)] font-semibold text-white">
          Ready to hand something off?
        </h2>
        <p className="mt-3 max-w-[52ch] text-body-lg text-[var(--color-concrete)]">
          Tell us the function that&apos;s costing you the most hours. We&apos;ll scope it on the call.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact" variant="solid">
            Book a discovery call
          </Button>
          <Button href="/services" variant="ghost">
            See our capabilities
          </Button>
        </div>
      </Section>
    </main>
  );
}
