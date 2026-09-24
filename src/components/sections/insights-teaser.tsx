import Link from "next/link";

import { Section, Eyebrow } from "@/components/ui/section";
import { posts } from "@/content/insights";

/**
 * brief §8.14 — one real post as a full-width feature (rendering its honest
 * `excerpt` notice, per `content/insights.ts` — never invented article copy),
 * plus a subdued "more writing is on the way" panel with a non-functional
 * email input (no subscribe backend exists; no fake success state is shown).
 */
export default function InsightsTeaser() {
  const post = posts[0];

  return (
    <Section tone="paper" id="insights">
      <Eyebrow>Insights</Eyebrow>
      <h2 className="mt-4 max-w-[36ch] text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
        From the team
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {post ? (
          <Link
            href={`/insights/${post.slug}`}
            data-cursor="link"
            className="group block border-t border-[var(--color-hairline)] pt-10 lg:col-span-8"
          >
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-mono text-small text-current/70">
                  {new Date(post.date).toLocaleDateString("en-US", { day: "numeric", month: "short" })} ·{" "}
                  {post.category}
                </p>
                <h3 className="mt-4 text-h3 font-[var(--font-display)] transition-transform duration-300 group-hover:translate-x-1.5">
                  {post.title}
                </h3>
                <p className="mt-4 max-w-[52ch] text-body text-current/70">{post.excerpt}</p>
              </div>
              <span className="mt-6 block h-px w-16 bg-[var(--color-green)]" aria-hidden="true" />
            </div>
          </Link>
        ) : null}

        <div className="border-t border-[var(--color-hairline)] pt-10 lg:col-span-4">
          <p className="text-body-lg">More writing is on the way. Tell us what you&apos;d want us to cover.</p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="insights-email" className="sr-only">
              Email address
            </label>
            <input
              id="insights-email"
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-transparent px-3 py-2.5 text-body outline-none transition-colors focus:border-[var(--color-green)]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full border border-[var(--color-hairline)] px-5 py-2.5 text-small font-medium transition-colors hover:border-[var(--color-green)]"
            >
              Notify me
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}
