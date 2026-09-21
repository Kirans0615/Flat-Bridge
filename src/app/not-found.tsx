import Link from "next/link";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <main id="main">
      <Section tone="ink" id="not-found" className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 240 40"
          className="mb-8 w-56 text-[var(--color-green-lift)]"
        >
          <path d="M0 20 L100 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M140 26 L240 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <rect x="96" y="17" width="6" height="6" transform="rotate(45 99 20)" fill="currentColor" />
          <rect x="136" y="23" width="6" height="6" transform="rotate(45 139 26)" fill="currentColor" />
        </svg>

        <h1 className="text-d1 font-[var(--font-display)] font-semibold text-white">404</h1>
        <p className="mt-4 max-w-[44ch] text-body-lg text-[var(--color-concrete)]">
          Something snapped — this cable doesn&apos;t reach a page.
        </p>

        <Link
          href="/"
          data-cursor="link"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-green)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-green-deep)]"
        >
          Back to solid ground
        </Link>
      </Section>
    </main>
  );
}
