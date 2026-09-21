import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { baseMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal, SplitText, Magnetic } from "@/components/motion";
import { QuoteForm } from "@/components/sections/quote-form";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return baseMetadata({ title: "Service", path: `/services/${slug}` });
  return baseMetadata({ title: service.name, description: service.lede, path: `/services/${service.slug}` });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const service = services[index];
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  const relatedSectors = sectors.filter((sector) => service.sectorSlugs.includes(sector.slug));

  const jsonLd = [
    serviceJsonLd(service.name, service.lede, `/services/${service.slug}`),
    breadcrumbJsonLd([
      { name: "Services", path: "/services" },
      { name: service.name, path: `/services/${service.slug}` },
    ]),
  ];

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section tone="paper" id="service-hero">
        <nav aria-label="Breadcrumb" className="micro text-current/70">
          <Link href="/services" className="hover:text-[var(--color-green)]">
            Services
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{service.name}</span>
        </nav>

        <SplitText
          as="h1"
          mode="line"
          className="mt-4 max-w-[24ch] text-h1 font-[var(--font-display)] font-semibold"
        >
          {service.name}
        </SplitText>
        <p className="mt-4 max-w-[56ch] text-body-lg text-current/70">{service.lede}</p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="border-l border-[var(--color-hairline)] pl-6 lg:col-span-7">
            <Reveal>
              <p className="max-w-[68ch] text-body-lg">{service.body}</p>
            </Reveal>
            {service.placeholder ? (
              <p className="micro mt-4 text-current/70">
                Fuller detail on this service is pending from Flat Bridge.
              </p>
            ) : null}

            <div className="mt-12">
              <Eyebrow>What you get</Eyebrow>
              <ul className="mt-4 flex flex-col gap-3">
                {service.whatYouGet.map((item) => (
                  <li key={item} className="flex gap-3 text-body-lg">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-green)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {service.systems && service.systems.length > 0 ? (
              <div className="mt-12">
                <Eyebrow>Systems we work in</Eyebrow>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.systems.map((system) => (
                    <li
                      key={system}
                      className="rounded-full border border-[var(--color-hairline)] px-4 py-1.5 text-small"
                    >
                      {system}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Eyebrow>Who this is for</Eyebrow>
            <ul className="mt-4 flex flex-col gap-2">
              {relatedSectors.map((sector) => (
                <li key={sector.slug}>
                  <Link
                    href={`/sectors/${sector.slug}`}
                    data-cursor="link"
                    className="inline-block border-b border-[var(--color-hairline)] py-2 text-body-lg hover:border-[var(--color-green)]"
                  >
                    {sector.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="paper" id="service-nav" className="!pt-0">
        <div className="grid grid-cols-1 gap-6 border-t border-[var(--color-hairline)] pt-8 sm:grid-cols-2">
          <Magnetic strength={0.2}>
            <Link href={`/services/${prev.slug}`} data-cursor="link" className="block">
              <p className="micro text-current/70">Previous capability</p>
              <p className="mt-1 text-h3 font-[var(--font-display)] font-semibold">{prev.name}</p>
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link href={`/services/${next.slug}`} data-cursor="link" className="block sm:text-right">
              <p className="micro text-current/70">Next capability</p>
              <p className="mt-1 text-h3 font-[var(--font-display)] font-semibold">{next.name}</p>
            </Link>
          </Magnetic>
        </div>
      </Section>

      <Section tone="ink" id="service-cta">
        <h2 className="text-h2 font-[var(--font-display)] font-semibold text-white">
          Book a discovery call
        </h2>
        <p className="mt-3 max-w-[52ch] text-body-lg text-[var(--color-concrete)]">
          Tell us about {service.name.toLowerCase()} and we&apos;ll scope it on the call.
        </p>
        <div className="mt-8 max-w-xl">
          <QuoteForm tone="ink" />
        </div>
      </Section>
    </main>
  );
}
