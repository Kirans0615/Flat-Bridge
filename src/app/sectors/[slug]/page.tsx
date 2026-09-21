import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { baseMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { media } from "@/lib/media";
import { Section, Eyebrow } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal, SplitText, Marquee } from "@/components/motion";
import { sectors } from "@/content/sectors";
import { services } from "@/content/services";
import { industries } from "@/content/site";
import { ChallengeTabs } from "./challenge-tabs";

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);
  if (!sector) return baseMetadata({ title: "Sector", path: `/sectors/${slug}` });
  return baseMetadata({ title: sector.name, description: sector.promise, path: `/sectors/${sector.slug}` });
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);
  if (!sector) notFound();

  const solutionServices = sector.challenge.solution
    .map((serviceSlug) => services.find((s) => s.slug === serviceSlug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  const chipServices = sector.serviceSlugs
    .map((serviceSlug) => services.find((s) => s.slug === serviceSlug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  const jsonLd = breadcrumbJsonLd([
    { name: "Sectors", path: "/sectors" },
    { name: sector.name, path: `/sectors/${sector.slug}` },
  ]);

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Section tone="ink" id="sector-hero" className="!py-0">
        <div className="relative flex min-h-[55vh] flex-col justify-end overflow-hidden px-[clamp(1.25rem,5vw,6rem)] py-[clamp(4rem,8vw,7rem)]">
          <Image
            src={media[sector.imageKey]["2400"]}
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
                "linear-gradient(to top, var(--color-abyss) 10%, rgba(5,18,26,0.6) 55%, rgba(5,18,26,0.25) 100%)",
            }}
          />
          <div className="relative z-10">
            <nav aria-label="Breadcrumb" className="micro text-current/70">
              <Link href="/sectors" className="hover:text-[var(--color-green-lift)]">
                Sectors
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-[var(--color-concrete)]">{sector.name}</span>
            </nav>
            <SplitText
              as="h1"
              mode="line"
              className="mt-4 max-w-[24ch] text-h1 font-[var(--font-display)] font-semibold text-white"
            >
              {sector.name}
            </SplitText>
            <Reveal as="div" delay={0.2} className="mt-4 flex flex-col gap-3">
              {sector.heroIntro.map((paragraph) => (
                <p key={paragraph} className="max-w-[60ch] text-body-lg text-[var(--color-concrete)]">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="paper" id="benefits">
        <Eyebrow>What you get</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {sector.benefits.map((benefit) => (
            <Reveal key={benefit.label} as="div">
              <div className="relative pl-4">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-full w-[2px] bg-[var(--color-green)]"
                />
                <h2 className="text-h3 font-[var(--font-display)] font-semibold">{benefit.label}</h2>
                <p className="mt-2 text-body text-current/70">{benefit.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Challenge tabs */}
      <Section tone="ink" id="challenge">
        <Eyebrow>The challenge</Eyebrow>
        <h2 className="mt-3 text-h2 font-[var(--font-display)] font-semibold text-white">
          Where the work actually goes
        </h2>
        <div className="mt-8">
          <ChallengeTabs
            painPoints={sector.challenge.painPoints}
            background={sector.challenge.background}
            solution={solutionServices}
          />
        </div>
        {sector.rewrittenNote ? (
          <p className="micro mt-4 max-w-[60ch] text-current/70">{sector.rewrittenNote}</p>
        ) : null}
      </Section>

      {/* Services chips */}
      <Section tone="paper" id="services">
        <Eyebrow>Capabilities we bring to {sector.name.toLowerCase()}</Eyebrow>
        <ul className="mt-6 flex flex-wrap gap-2">
          {chipServices.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                data-cursor="link"
                className="inline-block rounded-full border border-[var(--color-hairline)] px-4 py-1.5 text-small hover:border-[var(--color-green)]"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Industries marquee */}
      <Section tone="ink" id="industries">
        <Eyebrow>Industries we serve</Eyebrow>
        <Marquee speed={35} pauseOnHover className="mt-8">
          {industries.map((industry) => (
            <span
              key={industry}
              className="px-6 text-h3 font-[var(--font-display)] font-semibold text-current/70"
            >
              {industry}
            </span>
          ))}
        </Marquee>
      </Section>

      {/* Pull quote */}
      <Section tone="paper" id="quote">
        <Reveal>
          <blockquote className="mx-auto max-w-[44ch] text-center">
            <SplitText as="p" mode="line" className="text-h2 font-[var(--font-display)] font-semibold">
              {`"${sector.quote.text}"`}
            </SplitText>
            <cite className="mt-6 block text-body text-current/70 not-italic">
              — {sector.quote.author}
            </cite>
          </blockquote>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section tone="ink" id="cta">
        <h2 className="text-h2 font-[var(--font-display)] font-semibold text-white">
          Ready to hand something off?
        </h2>
        <p className="mt-3 max-w-[52ch] text-body-lg text-[var(--color-concrete)]">
          Tell us what {sector.name.toLowerCase()} is costing your team. We&apos;ll scope it on the call.
        </p>
        <div className="mt-8">
          <Button href="/contact" variant="solid">
            Book a discovery call
          </Button>
        </div>
      </Section>
    </main>
  );
}
