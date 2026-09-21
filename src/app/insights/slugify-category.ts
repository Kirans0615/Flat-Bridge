/**
 * brief §13 — category archive routes. No slug field exists on `Post.category`
 * (it's a free-text label, e.g. "BPO success strategies"), so this derives a
 * URL-safe slug the same way at both the index (`/insights`) and the archive
 * (`/insights/category/[slug]`) so the two always agree.
 */
export function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
