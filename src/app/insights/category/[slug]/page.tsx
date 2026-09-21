import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { baseMetadata } from "@/lib/seo";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { posts, categories, formatPostDate } from "@/content/insights";
import { slugifyCategory } from "../../slugify-category";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: slugifyCategory(category) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => slugifyCategory(c) === slug);
  if (!category) return baseMetadata({ title: "Insights", path: `/insights/category/${slug}` });
  return baseMetadata({
    title: category,
    description: `Insights filed under ${category}.`,
    path: `/insights/category/${slug}`,
  });
}

export default async function InsightsCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => slugifyCategory(c) === slug);
  if (!category) notFound();

  const matches = posts.filter((post) => slugifyCategory(post.category) === slug);

  return (
    <main id="main">
      <Section tone="paper" id="category-hero">
        <nav aria-label="Breadcrumb" className="micro text-current/70">
          <Link href="/insights" className="hover:text-[var(--color-green)]">
            Insights
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{category}</span>
        </nav>
        <h1 className="mt-4 max-w-[32ch] text-h1 font-[var(--font-display)] font-semibold">{category}</h1>
        <p className="mt-4 text-body-lg text-current/70">
          {matches.length} {matches.length === 1 ? "post" : "posts"} in this category.
        </p>
      </Section>

      {matches.length > 0 ? (
        <Section tone="ink" id="category-posts" className="!py-0">
          {matches.map((post) => (
            <article
              key={post.slug}
              className="border-b border-[var(--color-steel-700)] px-[clamp(1.25rem,5vw,6rem)] py-[clamp(3rem,6vw,5rem)]"
            >
              <Reveal as="div">
                <time dateTime={post.date} className="micro text-current/70">
                  {formatPostDate(post.date)}
                </time>
                <h2 className="mt-3 max-w-[40ch] text-h2 font-[var(--font-display)] font-semibold text-white">
                  <Link href={`/insights/${post.slug}`} data-cursor="link">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-[60ch] text-body-lg text-[var(--color-concrete)]">{post.excerpt}</p>
              </Reveal>
            </article>
          ))}
        </Section>
      ) : (
        <Section tone="ink" id="category-empty">
          <Eyebrow>Nothing here yet</Eyebrow>
          <p className="mt-3 max-w-[52ch] text-body-lg text-[var(--color-concrete)]">
            No posts are filed under {category} yet.
          </p>
        </Section>
      )}
    </main>
  );
}
