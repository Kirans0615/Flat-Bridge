"use client";

import { useId, useState } from "react";
import Link from "next/link";

interface ChallengeTabsProps {
  painPoints: string;
  background: string;
  solution: { slug: string; name: string }[];
}

const TABS = [
  { label: "Pain points", key: "pain-points" },
  { label: "Our background", key: "background" },
  { label: "Our solution", key: "solution" },
] as const;

/**
 * brief §11.2 — the "Pain points / Our background / Our solution" trio.
 * Simplified from the brief's `layoutId`-animated underline + cross-fade
 * spec to a plain state-swapped panel — noted as a candidate for a later
 * polish pass.
 *
 * Two a11y fixes from a live Lighthouse audit: tab/panel ids used the raw
 * label text (with spaces) as an ARIA-referenced id, which is invalid;
 * switched to slug keys. And the active tab used `--color-green` for text on
 * this section's ink background — 3.68:1, fails AA — switched to
 * `--color-green-lift`, the on-dark variant the brief's own token set
 * defines for exactly this case (§4.2).
 */
export function ChallengeTabs({ painPoints, background, solution }: ChallengeTabsProps) {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>(TABS[0].key);
  const baseId = useId();

  return (
    <div>
      <div role="tablist" aria-label="Sector challenge" className="flex flex-wrap gap-1 border-b border-[var(--color-hairline)]">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.key}`}
            aria-selected={active === tab.key}
            aria-controls={`${baseId}-panel-${tab.key}`}
            onClick={() => setActive(tab.key)}
            className="relative px-4 py-3 text-small transition-colors"
            style={{ color: active === tab.key ? "var(--color-green-lift)" : "currentColor" }}
          >
            {tab.label}
            {active === tab.key ? (
              <span
                aria-hidden="true"
                className="absolute inset-x-4 -bottom-px h-[2px] bg-[var(--color-green-lift)]"
              />
            ) : null}
          </button>
        ))}
      </div>

      <div className="py-6">
        {active === "pain-points" ? (
          <p
            role="tabpanel"
            id={`${baseId}-panel-pain-points`}
            aria-labelledby={`${baseId}-tab-pain-points`}
            className="max-w-[62ch] text-body-lg"
          >
            {painPoints}
          </p>
        ) : null}
        {active === "background" ? (
          <p
            role="tabpanel"
            id={`${baseId}-panel-background`}
            aria-labelledby={`${baseId}-tab-background`}
            className="max-w-[62ch] text-body-lg"
          >
            {background}
          </p>
        ) : null}
        {active === "solution" ? (
          <ul
            role="tabpanel"
            id={`${baseId}-panel-solution`}
            aria-labelledby={`${baseId}-tab-solution`}
            className="flex flex-col gap-2"
          >
            {solution.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  data-cursor="link"
                  className="inline-block border-b border-current/20 text-body-lg hover:border-[var(--color-green-lift)]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
