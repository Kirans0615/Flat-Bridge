import type { Metadata } from "next";

import { baseMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { legalPlaceholder } from "@/content/legal";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: legalPlaceholder.terms.title,
    description: legalPlaceholder.terms.body,
    path: "/terms",
  });
}

export default function TermsPage() {
  return (
    <main id="main">
      <Section tone="paper" id="terms">
        <h1 className="max-w-[24ch] text-h1 font-[var(--font-display)] font-semibold">
          {legalPlaceholder.terms.title}
        </h1>
        <p className="mt-6 max-w-[60ch] text-body-lg text-current/70">
          {legalPlaceholder.terms.body}
        </p>
      </Section>
    </main>
  );
}
