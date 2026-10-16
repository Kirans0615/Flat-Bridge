import type { Metadata } from "next";

import { Suspense } from "react";
import Image from "next/image";

import { baseMetadata } from "@/lib/seo";
import { media } from "@/lib/media";
import { Section, Eyebrow } from "@/components/ui/section";
import { services } from "@/content/services";
import { platforms } from "@/content/site";
import { ServiceFilterList } from "./service-filter-list";
import { PlatformMarquee } from "./platform-marquee";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: "Services",
    description: "Take a single function off your desk or we'll support your back-office operations.",
    path: "/services",
  });
}

export default function ServicesPage() {
  return (
    <main id="main">
      {/* White bar above the photo so the floating navbar reads dark on light */}
      <div aria-hidden="true" data-tone="paper" className="h-20 bg-[var(--color-paper)]" />

      <Section tone="ink" id="services-hero" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--color-ink)]">
          <Image
            src={media.heroServices["contact-centre"]}
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
        <div className="relative z-10 max-w-[56rem]">
          <h1 className="max-w-[24ch] text-h1 font-display font-semibold text-white">
            Twenty-four capabilities. Your unique service package.
          </h1>
          <p className="mt-4 max-w-[56ch] text-body-lg text-[var(--color-concrete)]">
            Take a single function off your desk or we&apos;ll support your back-office operations.
          </p>
        </div>
      </Section>

      {/* The 24, filterable */}
      <Section tone="paper" id="all-services">
        <Eyebrow>All 24 capabilities</Eyebrow>
        <Suspense fallback={null}>
          <ServiceFilterList services={services} />
        </Suspense>
      </Section>

      {/* Platform marquee */}
      <Section tone="ink" id="platforms">
        <Eyebrow>Systems we work in</Eyebrow>
        <PlatformMarquee platforms={platforms} />
        <p className="micro mt-6 text-current/70">
          Platform names are the property of their respective owners.
        </p>
      </Section>
    </main>
  );
}
