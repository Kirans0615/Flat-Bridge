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

            {/* 10.09.26 revision round, Part 9.2 — stylised SVG graphic showing
                Mandeville sits in the Eastern Time Zone, near-shore to the US
                East Coast. No third-party map embed, site-palette only. */}
            <div className="mt-10 border-t border-[var(--color-hairline)] pt-6">
              <Eyebrow>Where we are</Eyebrow>
              <svg
                viewBox="0 0 280 210"
                role="img"
                aria-label="Simplified map of the US East Coast and the Caribbean, with the Eastern Time Zone highlighted and Mandeville, Jamaica marked"
                className="mt-4 w-full max-w-[320px]"
              >
                <rect x="0" y="0" width="280" height="210" fill="var(--color-paper-2)" rx="4" />

                {/* Eastern Time Zone band */}
                <rect
                  x="28"
                  y="12"
                  width="110"
                  height="186"
                  fill="var(--color-green)"
                  fillOpacity="0.14"
                  stroke="var(--color-green)"
                  strokeOpacity="0.4"
                  strokeDasharray="4 3"
                />
                <text
                  x="83"
                  y="26"
                  textAnchor="middle"
                  className="font-mono"
                  fontSize="7"
                  letterSpacing="0.5"
                  fill="var(--color-green-deep)"
                >
                  EASTERN TIME ZONE
                </text>

                {/* Simplified US East Coast, Maine down to the Florida peninsula */}
                <path
                  d="M58 34 L84 30 L90 58 L78 86 L88 112 L72 140 L82 158 L66 182 L58 160 L52 128 L60 100 L46 70 L52 44 Z"
                  fill="var(--color-hairline)"
                  stroke="var(--color-steel-700)"
                  strokeWidth="1"
                />
                {/* Simplified Caribbean / Jamaica, south-east of Florida */}
                <ellipse cx="118" cy="182" rx="20" ry="9" fill="var(--color-hairline)" stroke="var(--color-steel-700)" strokeWidth="1" />

                {/* Connector */}
                <line
                  x1="68"
                  y1="150"
                  x2="112"
                  y2="178"
                  stroke="var(--color-green)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* US East Coast marker */}
                <circle cx="68" cy="150" r="4" fill="var(--color-green)" />
                <text x="76" y="148" className="font-mono" fontSize="7" fill="var(--color-ink)">
                  US East Coast
                </text>

                {/* Mandeville marker */}
                <circle cx="118" cy="182" r="5" fill="var(--color-green-wash)" />
                <circle cx="118" cy="182" r="2.5" fill="var(--color-green)" />
                <text x="128" y="186" className="font-mono font-semibold" fontSize="7.5" fill="var(--color-ink)">
                  Mandeville
                </text>
              </svg>
              <p className="mt-3 max-w-[280px] text-small text-current/70">
                Mandeville sits in the Eastern Time Zone — real-time overlap with US East Coast business
                hours.
              </p>
              <p className="mt-1 font-mono text-small text-current/70">{site.location.coordsLabel}</p>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
