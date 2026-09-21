/**
 * brief §13. Exactly one real post exists on the legacy site
 * (docs/legacy-audit.md: "Latest Media"). Its title, date, author byline and
 * category are confirmed; its ~650-word body text was never captured in the
 * audit crawl (only a paraphrase exists) and the brief does not reproduce
 * it — inventing 650 words of article copy would violate the project's
 * hard no-fabrication rule, so the body ships as an honest pending notice
 * rather than invented prose. See docs/client-questions.md.
 */
export interface Post {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  bodyAvailable: false;
}

export const posts: Post[] = [
  {
    slug: "enhance-your-supply-chain-with-flat-bridges-expert-logistics-bpo-services",
    title: "Enhance Your Supply Chain with Flat Bridge's Expert Logistics BPO Services",
    author: "WebAdmin",
    date: "2023-08-10",
    category: "BPO success strategies",
    excerpt:
      "The full article text wasn't captured from the legacy site and isn't reproduced here to avoid inventing content on Flat Bridge's behalf.",
    bodyAvailable: false,
  },
];

export const categories = Array.from(new Set(posts.map((p) => p.category)));

/**
 * Formats a `YYYY-MM-DD` date-only string without a timezone shift.
 * `new Date("2023-08-10")` parses as UTC midnight; formatting it in a
 * negative-UTC-offset local timezone rolls it back a day ("Aug 9" instead
 * of "Aug 10"). Forcing `timeZone: "UTC"` keeps the date-only value stable
 * regardless of server/client timezone.
 */
export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
