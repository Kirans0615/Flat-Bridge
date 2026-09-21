import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { baseMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { posts, formatPostDate } from "@/content/insights";
import { slugifyCategory } from "../slugify-category";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return baseMetadata({ title: "Insight", path: `/insights/${slug}` });
  return baseMetadata({ title: post.title, description: post.excerpt, path: `/insights/${post.slug}` });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = breadcrumbJsonLd([
    { name: "Insights", path: "/insights" },
    { name: post.title, path: `/insights/${post.slug}` },
  ]);

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section tone="paper" id="insight-hero">
        <nav aria-label="Breadcrumb" className="micro text-current/70">
          <Link href="/insights" className="hover:text-[var(--color-green)]">
            Insights
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{post.title}</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-center gap-3 micro text-current/70">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <Link
            href={`/insights/category/${slugifyCategory(post.category)}`}
            className="rounded-full border border-[var(--color-hairline)] px-3 py-1 hover:border-[var(--color-green)]"
          >
            {post.category}
          </Link>
        </div>

        <h1 className="mt-4 max-w-[32ch] text-h1 font-[var(--font-display)] font-semibold">{post.title}</h1>

        <Reveal>
          <div className="mx-auto mt-10 max-w-[68ch]">
            <p className="text-body-lg">{post.excerpt}</p>
            {!post.bodyAvailable ? (
              <p
                role="note"
                className="micro mt-6 rounded-[var(--radius-md)] border border-[var(--color-hairline)] px-5 py-4 text-current/70"
              >
                The full article text wasn&apos;t captured from the legacy site and isn&apos;t reproduced
                here to avoid inventing content on Flat Bridge&apos;s behalf. The complete piece is pending
                from Flat Bridge.
              </p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-10">
          <Link href="/insights" className="text-body-lg underline underline-offset-4">
            Back to insights
          </Link>
        </div>
      </Section>
    </main>
  );
}
