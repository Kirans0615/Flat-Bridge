import type { Metadata } from "next";

import { baseMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { legalPlaceholder } from "@/content/legal";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: legalPlaceholder.privacy.title,
    description: legalPlaceholder.privacy.body,
    path: "/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <main id="main">
      <Section tone="paper" id="privacy">
        <h1 className="max-w-[24ch] text-h1 font-display font-semibold">
          {legalPlaceholder.privacy.title}
        </h1>
        <p className="mt-6 max-w-[60ch] text-body-lg text-current/70">
          {legalPlaceholder.privacy.body}
        </p>

        {/* 10.09.26 revision round, Part 9.3 — the client will paste the
            previous privacy policy here. Do not render placeholder text on
            the live page; nothing renders until that copy is supplied. */}
      </Section>
    </main>
  );
}
