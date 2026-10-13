import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Fully static — required by `output: 'export'` for the GitHub Pages
// mockup build; harmless and correct for the normal build too.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // 10.09.26 revision round, Parts 6.1 + 9.5 — both routes already 404;
    // this is defense-in-depth, not the primary mechanism.
    rules: { userAgent: "*", allow: "/", disallow: ["/insights", "/insights/*", "/security"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
