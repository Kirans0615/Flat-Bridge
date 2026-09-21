"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { footerColumns, servicePillars } from "@/content/nav";
import { site } from "@/content/site";
import { Parallax } from "@/components/motion/Parallax";

/**
 * Footer — brief §7.6, on `--color-abyss`. Three zones: a contact rail with a
 * live Jamaica clock, sitemap columns (every link resolves to a real route,
 * even ones not built yet — never `href="#"`), and a giant clipped
 * `FLAT BRIDGE` wordmark with a one-time green sweep.
 *
 * CONTENT GAP: the Services column adds the 3 real pillar names from
 * `servicePillars` (`@/content/nav`) as placeholder anchors, all pointing at
 * `/services` — there's no per-pillar route yet. Swap in real hrefs once
 * `@/content/services.ts` defines them.
 */

function useJamaicaClock() {
  const [display, setDisplay] = useState<{ time: string; status: string } | null>(null);

  useEffect(() => {
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Jamaica",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const hourFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Jamaica",
      hour: "numeric",
      hour12: false,
    });

    function tick() {
      const now = new Date();
      const hour = Number(hourFormatter.format(now));
      const online = hour >= 6 && hour < 22;
      setDisplay({
        time: timeFormatter.format(now),
        status: online ? "Our team is online" : "We'll reply first thing.",
      });
    }

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return display;
}

export function Footer() {
  const clock = useJamaicaClock();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-abyss)] text-[var(--color-concrete)]">
      <div className="mx-auto max-w-6xl px-6 pt-20 sm:px-10">
        {/* Zone 1 — contact rail */}
        <div className="flex flex-col gap-6 border-b border-[var(--color-steel-700)] pb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2 text-body-lg">
            <a
              href={site.phoneHref}
              data-cursor="link"
              className="w-fit text-[var(--color-paper)] transition-colors hover:text-[var(--color-green-lift)]"
            >
              {site.phone}
            </a>
            <a
              href={site.emailHref}
              data-cursor="link"
              className="w-fit text-[var(--color-paper)] transition-colors hover:text-[var(--color-green-lift)]"
            >
              {site.email}
            </a>
            <span className="text-small text-current/70">{site.location.label}</span>
          </div>

          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span className="micro font-mono tabular-nums text-[var(--color-concrete)]" suppressHydrationWarning>
              {clock ? `${clock.time} JM` : "--:--:-- JM"}
            </span>
            <span className="micro text-current/70" suppressHydrationWarning>
              {clock ? clock.status : " "}
            </span>
          </div>
        </div>

        {/* Zone 2 — sitemap */}
        <div className="grid grid-cols-2 gap-10 py-14 sm:grid-cols-4">
          <FooterColumn
            heading="Company"
            links={footerColumns.company.map((l) => ({ label: l.label, href: l.href }))}
          />
          <FooterColumn
            heading="Services"
            links={[
              ...footerColumns.services.map((l) => ({ label: l.label, href: l.href })),
              ...servicePillars.map((p) => ({ label: p.name, href: "/services" })),
            ]}
          />
          <FooterColumn
            heading="Sectors"
            links={footerColumns.sectors.map((l) => ({ label: l.label, href: l.href }))}
          />
          <FooterColumn
            heading="Legal"
            links={footerColumns.legal.map((l) => ({ label: l.label, href: l.href }))}
          />
        </div>
      </div>

      {/* Zone 3 — wordmark */}
      <div className="relative mt-4 overflow-hidden">
        <Parallax speed={-0.1} maxOffsetPx={40}>
          <SweepingWordmark />
        </Parallax>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-6 pb-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-center gap-5">
            <SocialLink href={site.socials.linkedin} label="LinkedIn" />
            <SocialLink href={site.socials.facebook} label="Facebook" />
            <SocialLink href={site.socials.x} label="X" />
            <SocialLink href={site.socials.instagram} label="Instagram" />
          </div>
          <p className="micro text-current/70">
            © {year} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="micro font-medium text-current/70">{heading}</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={`${heading}-${link.label}`}>
            <Link
              href={link.href}
              data-cursor="link"
              className="text-small text-[var(--color-concrete)] transition-colors hover:text-[var(--color-green-lift)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="link"
      className="micro text-current/70 transition-colors hover:text-[var(--color-green-lift)]"
    >
      {label}
    </a>
  );
}

function SweepingWordmark() {
  return (
    <div className="relative h-[16vw] max-h-[220px] min-h-[110px] overflow-hidden leading-none">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 block whitespace-nowrap font-display font-semibold text-[var(--color-steel-900)]"
        style={{ fontSize: "19vw", fontStretch: "125%", lineHeight: 0.78 }}
      >
        FLAT BRIDGE
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 block animate-[fb-wordmark-sweep_2.4s_ease-in-out_1] overflow-hidden whitespace-nowrap font-display font-semibold text-[var(--color-green-deep)]"
        style={{ fontSize: "19vw", fontStretch: "125%", lineHeight: 0.78, width: 0 }}
      >
        FLAT BRIDGE
      </span>
      <style>{`
        @keyframes fb-wordmark-sweep {
          0% { width: 0; }
          60% { width: 100%; }
          100% { width: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
