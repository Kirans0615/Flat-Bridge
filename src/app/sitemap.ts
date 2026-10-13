import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";

// Fully static — required by `output: 'export'` for the GitHub Pages
// mockup build; harmless and correct for the normal build too.
export const dynamic = "force-static";

// 10.09.26 revision round, Parts 6.1 + 9.5 — /insights and /security are
// unrouted (404), so neither they nor their dynamic sub-routes belong here.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/sectors",
    "/case-studies",
    "/careers",
    "/contact",
    "/process",
  ];

  const dynamicRoutes = [
    ...services.map((s) => `/services/${s.slug}`),
    ...sectors.map((s) => `/sectors/${s.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
