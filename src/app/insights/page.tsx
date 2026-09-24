import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { baseMetadata } from "@/lib/seo";
import { media } from "@/lib/media";
import { Section, Eyebrow } from "@/components/ui/section";
import { SectionVideoBg } from "@/components/sections/section-video-bg";
import { Reveal, ClipReveal } from "@/components/motion";
import { posts, formatPostDate } from "@/content/insights";
import { slugifyCategory } from "./slugify-category";

export function generateMetadata(): Metadata {
  return baseMetadata({
    title: "Insights",
    description: "Notes on running logistics back-office and contact-centre work from Mandeville, Jamaica.",
    path: "/insights",
  });
}

export default function InsightsPage() {
  return (
    <main id="main">
      {/* Paper strip so the nav stays legible over the video (Kiran, 2026-09-23). */}
      <div aria-hidden="true" data-tone="paper" className="h-20 bg-[var(--color-paper)]" />
      <Section tone="ink" id="insights-hero" className="overflow-hidden">
        <SectionVideoBg src={media.insightsVideo} overlayOpacity={0.7} />
        <div className="relative z-10">
          <h1 className="max-w-[24ch] text-h1 font-[var(--font-display)] font-semibold">Insights</h1>
          <p className="mt-4 max-w-[56ch] text-body-lg text-current/70">
            Notes from the operations side of logistics BPO.
          </p>
        </div>
      </Section>

      {posts.length > 0 ? (
        <Section tone="ink" id="posts" className="!py-0">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="grid grid-cols-1 items-center gap-10 border-b border-[var(--color-steel-700)] px-[clamp(1.25rem,5vw,6rem)] py-[clamp(4rem,8vw,6rem)] lg:grid-cols-12"
            >
              <div className="lg:col-span-6">
                <div className="micro flex flex-wrap items-center gap-3 text-current/70">
                  <time dateTime={post.date}>{formatPostDate(post.date)}
                  </time>
                  <Link
                    href={`/insights/category/${slugifyCategory(post.category)}`}
                    data-cursor="link"
                    className="rounded-full border border-[var(--color-steel-700)] px-3 py-1 hover:border-[var(--color-green-lift)]"
                  >
                    {post.category}
                  </Link>
                </div>
                <Reveal as="div">
                  <h2 className="mt-4 text-h2 font-[var(--font-display)] font-semibold text-white">
                    <Link href={`/insights/${post.slug}`} data-cursor="link">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-[60ch] text-body-lg text-[var(--color-concrete)]">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/insights/${post.slug}`}
                    data-cursor="link"
                    className="mt-6 inline-block border-b border-[var(--color-green-lift)] text-body-lg text-white"
                  >
                    Read more<span className="sr-only"> about {post.title}</span>
                  </Link>
                </Reveal>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <ClipReveal direction="up" className="aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
                  <Image
                    src={media.yard["900"]}
                    alt=""
                    aria-hidden="true"
                    width={900}
                    height={675}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 40vw, 90vw"
                  />
                </ClipReveal>
              </div>
            </article>
          ))}
        </Section>
      ) : null}

      <Section tone="paper" id="subscribe">
        <Eyebrow>More on the way</Eyebrow>
        <h2 className="mt-3 max-w-[32ch] text-h2 font-[var(--font-display)] font-semibold">
          More writing is on the way. Tell us what you&apos;d want us to cover.
        </h2>
        <form className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row" aria-label="Notify me of new insights">
          <label htmlFor="insights-email" className="sr-only">
            Email address
          </label>
          <input
            id="insights-email"
            type="email"
            placeholder="you@company.com"
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-transparent px-3 py-2.5 text-body outline-none focus:border-[var(--color-green)]"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-green)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-green-deep)]"
          >
            Notify me
          </button>
        </form>
        <p className="micro mt-3 text-current/70">
          Demo build — this form isn&apos;t wired to a live subscription list yet.
        </p>
      </Section>
    </main>
  );
}
