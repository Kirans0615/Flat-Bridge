import type { Metadata } from "next";

import { baseMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { securityRows } from "@/content/security";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: "Security & compliance",
    description: "What Flat Bridge has confirmed about data handling, and what's still pending.",
    path: "/security",
  });
}

export default function SecurityPage() {
  return (
    <main id="main">
      <Section tone="paper" id="security-hero">
        <h1 className="max-w-[24ch] text-h1 font-[var(--font-display)] font-semibold">
          Security &amp; compliance
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-current/70">
          A structured record of what&apos;s confirmed today, and what&apos;s still awaiting confirmation
          from Flat Bridge. Nothing here is claimed that isn&apos;t already backed by the site&apos;s own
          copy.
        </p>
      </Section>

      <Section tone="ink" id="security-table">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-steel-700)] text-small text-current/70">
                <th scope="col" className="py-3 pr-4 font-mono font-normal">
                  ID
                </th>
                <th scope="col" className="py-3 pr-4 font-normal">
                  Control
                </th>
                <th scope="col" className="py-3 pr-4 font-normal">
                  Status
                </th>
                <th scope="col" className="py-3 font-normal">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {securityRows.map((row) => (
                <tr key={row.id} className="border-b border-[var(--color-steel-700)]">
                  <td className="py-4 pr-4 font-mono text-small text-current/70">{row.id}</td>
                  <td className="py-4 pr-4 text-body-lg font-medium text-white">{row.label}</td>
                  <td className="py-4 pr-4">
                    <span
                      className="inline-block rounded-full px-3 py-1 text-small"
                      style={
                        row.status === "confirmed"
                          ? { backgroundColor: "var(--color-green-wash)", color: "var(--color-green-lift)" }
                          : {
                              border: "1px solid var(--color-steel-700)",
                              color: "var(--color-concrete)",
                            }
                      }
                    >
                      {row.status === "confirmed" ? "Confirmed" : "Pending"}
                    </span>
                  </td>
                  <td className="py-4 max-w-[40ch] text-body text-[var(--color-concrete)]">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </main>
  );
}
