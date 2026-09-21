import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { posts } from "@/content/insights";

// Fully static — required by `output: 'export'` for the GitHub Pages
// mockup build; harmless and correct for the normal build too.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/sectors",
    "/case-studies",
    "/insights",
    "/careers",
    "/contact",
    "/process",
    "/security",
  ];

  const dynamicRoutes = [
    ...services.map((s) => `/services/${s.slug}`),
    ...sectors.map((s) => `/sectors/${s.slug}`),
    ...posts.map((p) => `/insights/${p.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
