import type { Metadata } from "next";
import Image from "next/image";

import { baseMetadata } from "@/lib/seo";
import { media } from "@/lib/media";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal, ClipReveal } from "@/components/motion";
import { ApplicationForm } from "@/components/sections/application-form";
import { roles, careersLede } from "@/content/careers";
import { nearshore } from "@/content/homepage";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: "Careers",
    description: careersLede,
    path: "/careers",
  });
}

const whatItsLikeHere = [
  {
    title: "A structured training program",
    body:
      nearshore.facts.find((f) => f.label === "Training")?.value ??
      "A defined training period before an associate takes on client-facing work.",
  },
  {
    title: "A partnership with CMU",
    body: nearshore.partner,
  },
  {
    title: "A range of roles",
    body: "Dispatch, track & trace, carrier sales, data, claims and TMS work — not one fixed job description.",
  },
];

export default function CareersPage() {
  return (
    <main id="main">
      {/* Hero — text-only. The real team photo is reserved for the About
          page's "Our team" section only (Kiran, 2026-09-10); this page's own
          photo (the stock culture image below) is never captioned as staff. */}
      <Section tone="ink" id="careers-hero">
        <div className="max-w-[44rem]">
          <h1 className="text-h1 font-[var(--font-display)] font-semibold text-white">
            Build a career in logistics, from Mandeville.
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[60ch] text-body-lg text-[var(--color-concrete)]">{careersLede}</p>
          </Reveal>
        </div>
      </Section>

      {/* What it's like here */}
      <Section tone="paper" id="what-its-like">
        <Eyebrow>What it&apos;s like here</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {whatItsLikeHere.map((item) => (
            <Reveal key={item.title} as="div">
              <div className="border-t border-[var(--color-hairline)] pt-5">
                <h2 className="text-h3 font-[var(--font-display)] font-semibold">{item.title}</h2>
                <p className="mt-2 max-w-[36ch] text-body text-current/70">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Open roles */}
      <Section tone="ink" id="open-roles">
        <Eyebrow>Open roles</Eyebrow>
        <h2 className="mt-3 text-h2 font-[var(--font-display)] font-semibold text-white">
          Current openings
        </h2>
        <div
          role="note"
          className="mt-6 max-w-[56ch] rounded-[var(--radius-md)] border border-[var(--color-steel-700)] px-5 py-4 text-body text-[var(--color-concrete)]"
        >
          Sample postings — Flat Bridge to confirm current openings.
        </div>

        {roles.length > 0 ? (
          <div className="mt-8 flex flex-col divide-y divide-[var(--color-steel-700)] border-y border-[var(--color-steel-700)]">
            {roles.map((role) => (
              <details key={role.slug} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <div>
                    <p className="text-h3 font-[var(--font-display)] font-semibold text-white">
                      {role.title}
                    </p>
                    <p className="mt-1 text-small text-current/70">
                      {role.location} · {role.type}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-h3 text-[var(--color-green-lift)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="mt-4">
                  <p className="micro text-current/70">Responsibilities</p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {role.responsibilities.map((item) => (
                      <li key={item} className="flex gap-3 text-body-lg text-[var(--color-concrete)]">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-green-lift)]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#apply"
                    className="mt-5 inline-block border-b border-[var(--color-green-lift)] text-body-lg text-white"
                  >
                    Apply for this role
                  </a>
                </div>
              </details>
            ))}
          </div>
        ) : (
          <p className="mt-8 max-w-[56ch] text-body-lg text-[var(--color-concrete)]">
            No specific openings are listed right now — send a general application below and we&apos;ll be
            in touch when a role fits.
          </p>
        )}
      </Section>

      {/* Culture photo */}
      <Section tone="paper" id="culture" className="!px-0">
        <ClipReveal direction="up" className="relative aspect-[21/9] w-full overflow-hidden">
          <Image src={media.culture["1600"]} alt="" aria-hidden="true" fill className="object-cover" sizes="100vw" />
        </ClipReveal>
        <p className="mt-3 px-[clamp(1.25rem,5vw,6rem)] font-mono text-small text-current/70">
          Illustrative office culture photo — stock image, not Flat Bridge staff.
        </p>
      </Section>

      {/* Application form */}
      <Section tone="ink" id="apply">
        <Eyebrow>Apply</Eyebrow>
        <h2 className="mt-3 text-h2 font-[var(--font-display)] font-semibold text-white">
          Send us your application
        </h2>
        <div className="mt-8 max-w-2xl">
          <ApplicationForm />
        </div>
      </Section>
    </main>
  );
}
