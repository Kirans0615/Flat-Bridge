import type { Metadata } from "next";

import { baseMetadata } from "@/lib/seo";
import { Section, Eyebrow } from "@/components/ui/section";
import { Marquee } from "@/components/motion";
import { services } from "@/content/services";
import { servicePillars } from "@/content/nav";
import { platforms } from "@/content/site";
import { ServiceFilterList } from "./service-filter-list";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: "Services",
    description: "Take a single function off your desk, or hand us the whole back office.",
    path: "/services",
  });
}

export default function ServicesPage() {
  return (
    <main id="main">
      <Section tone="paper" id="services-hero">
        <h1 className="max-w-[20ch] text-h1 font-[var(--font-display)] font-semibold">
          Sixteen capabilities, three ways to buy them.
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-current/70">
          Take a single function off your desk, or hand us the whole back office.
        </p>
      </Section>

      {/* Three pillars — sequential numbering earned here per brief §4.3 */}
      <Section tone="ink" id="pillars" className="!py-0">
        <div className="grid grid-cols-1 divide-y divide-[var(--color-steel-700)] border-y border-[var(--color-steel-700)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {servicePillars.map((pillar, index) => (
            <div key={pillar.slug} className="px-2 py-10 lg:px-8">
              <p className="font-mono text-small text-[var(--color-green-lift)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 text-h3 font-[var(--font-display)] font-semibold text-white">
                {pillar.name}
              </h2>
              <p className="mt-3 max-w-[42ch] text-body text-[var(--color-concrete)]">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The 16, filterable */}
      <Section tone="paper" id="all-services">
        <Eyebrow>All 16 capabilities</Eyebrow>
        <ServiceFilterList services={services} />
      </Section>

      {/* Platform marquee */}
      <Section tone="ink" id="platforms">
        <Eyebrow>Systems we work in</Eyebrow>
        <Marquee speed={40} pauseOnHover className="mt-8">
          {platforms.map((platform) => (
            <span
              key={platform}
              className="px-6 text-h3 font-[var(--font-display)] font-semibold text-current/70"
            >
              {platform}
            </span>
          ))}
        </Marquee>
        <p className="micro mt-6 text-current/70">
          Platform names are the property of their respective owners.
        </p>
      </Section>
    </main>
  );
}
