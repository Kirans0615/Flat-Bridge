import type { Metadata } from "next";

import { baseMetadata } from "@/lib/seo";
import { Section, Eyebrow } from "@/components/ui/section";
import { QuoteForm } from "@/components/sections/quote-form";
import { site } from "@/content/site";
import { JmClock } from "./jm-clock";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: "Contact",
    description: "Let's talk about what you're carrying.",
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <main id="main">
      <Section tone="paper" id="contact-hero">
        <h1 className="max-w-[24ch] text-h1 font-[var(--font-display)] font-semibold">
          Let&apos;s talk about what you&apos;re carrying.
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <QuoteForm tone="paper" />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="flex flex-col gap-6 border-t border-[var(--color-hairline)] pt-6">
              <div>
                <p className="micro text-current/70">Phone</p>
                <a href={site.phoneHref} className="mt-1 block text-h3 font-[var(--font-display)] font-semibold">
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="micro text-current/70">Email</p>
                <a href={site.emailHref} className="mt-1 block text-h3 font-[var(--font-display)] font-semibold">
                  {site.email}
                </a>
              </div>
              <div>
                <p className="micro text-current/70">Location</p>
                <p className="mt-1 text-h3 font-[var(--font-display)] font-semibold">{site.location.label}</p>
              </div>
              <JmClock />
            </div>

            {/* Stylised SVG map placeholder — no Google Maps embed per brief §15.1 */}
            <div className="mt-10 border-t border-[var(--color-hairline)] pt-6">
              <Eyebrow>Where we are</Eyebrow>
              <svg
                viewBox="0 0 240 160"
                role="img"
                aria-label={`Map showing ${site.location.label}`}
                className="mt-4 w-full max-w-[280px]"
              >
                <rect x="0" y="0" width="240" height="160" fill="var(--color-paper-2)" rx="4" />
                <path
                  d="M30 90 Q60 70 100 78 T170 82 Q195 84 210 74"
                  fill="none"
                  stroke="var(--color-hairline)"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <line x1="0" y1="80" x2="240" y2="80" stroke="var(--color-hairline)" strokeWidth="1" />
                <line x1="120" y1="0" x2="120" y2="160" stroke="var(--color-hairline)" strokeWidth="1" />
                <circle cx="118" cy="86" r="10" fill="var(--color-green-wash)" />
                <circle cx="118" cy="86" r="4" fill="var(--color-green)" />
                <text x="128" y="90" className="font-mono" fontSize="8" fill="var(--color-ink)">
                  Mandeville
                </text>
              </svg>
              <p className="font-mono text-small text-current/70">{site.location.coordsLabel}</p>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
