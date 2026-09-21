import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Fully static — required by `output: 'export'` for the GitHub Pages
// mockup build; harmless and correct for the normal build too.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
