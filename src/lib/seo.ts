import type { Metadata } from "next";
import { site } from "@/content/site";

export const siteUrl = "https://goflatbridge.com";

/** brief §20.1 — per-route generateMetadata should spread this with a title/description override. */
export function baseMetadata(opts: { title: string; description?: string; path: string }): Metadata {
  const description =
    opts.description ??
    "Flat Bridge Ltd develops, implements and supports applications and processes for logistics-focused organizations.";
  const url = `${siteUrl}${opts.path}`;

  return {
    title: opts.path === "/" ? `${site.displayName} — ${site.tagline}` : `${opts.title} — ${site.displayName}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description,
      url,
      siteName: site.displayName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
    },
  };
}

/** brief §20.3 — Organization JSON-LD, present sitewide via the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: siteUrl,
    logo: `${siteUrl}/media/logo-black-green.png`,
    foundingDate: String(site.foundedYear),
    areaServed: "North America",
    sameAs: [site.socials.linkedin],
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    provider: { "@type": "Organization", name: site.legalName },
    url: `${siteUrl}${path}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
