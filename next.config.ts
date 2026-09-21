import type { NextConfig } from "next";
import createBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/**
 * Legacy URL map — every URL discovered in the WordPress sitemaps plus the
 * known-404 that the old home page linked to. Source of truth is
 * docs/redirects.csv; keep the two in sync.
 *
 * Note: WordPress matched /Contact-us/ case-insensitively and returned 200.
 * Next matches case-sensitively, so the capital-C variant needs its own rule.
 */
const legacyRedirects = [
  // About — /about_us/ is a live 404 that the old home page's "Learn More" buttons point at
  { source: "/about_us", destination: "/about" },
  { source: "/about-us", destination: "/about" },

  // Contact — both cases, WP served both
  { source: "/Contact-us", destination: "/contact" },
  { source: "/contact-us", destination: "/contact" },

  // Sectors: flat legacy URLs move under /sectors
  { source: "/trucking-drayage", destination: "/sectors/trucking-drayage" },
  { source: "/freight-brokers-forwarders", destination: "/sectors/freight-brokers-forwarders" },
  { source: "/warehousing-management", destination: "/sectors/warehousing-management" },
  { source: "/intermodal-management", destination: "/sectors/intermodal-management" },
  { source: "/shippers-logistics", destination: "/sectors/shippers-logistics" },
  // Brief v2 §11.2 keeps the slug as-is: /sectors/3pl-providers (v1's Q18 rename to
  // third-party-logistics is superseded, see docs/decisions.md D-017).
  { source: "/3pl-providers", destination: "/sectors/3pl-providers" },

  // Services: WP custom post type archive + Elementor artifact
  { source: "/service", destination: "/services" },
  { source: "/service/elementor-958", destination: "/services" },

  // Insights
  { source: "/blog-posts", destination: "/insights" },
  { source: "/category/bpo-success-strategies", destination: "/insights" },
  {
    source: "/enhance-your-supply-chain-with-flat-bridges-expert-logistics-bpo-services",
    destination: "/insights/enhance-your-supply-chain-with-flat-bridges-expert-logistics-bpo-services",
  },

  // Elementor MetForm artifacts — all four resolve to the real contact page
  { source: "/metform-form/:slug*", destination: "/contact" },
];

/**
 * Static-export mode — used only for the one-off "push the homepage to a
 * standalone GitHub Pages mockup" build (2026-09-10), never for the real
 * Cloudflare/OpenNext deploy. Gated behind an env var so `npm run build`
 * (the actual production build target) is completely unaffected when it's
 * unset. `output: 'export'` is incompatible with `redirects()` and with
 * `next/image`'s optimization API, so both are conditionally handled below
 * rather than permanently changing this file's normal behavior.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const staticExportBasePath = process.env.STATIC_EXPORT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: staticExportBasePath },
  poweredByHeader: false,

  // Pin the workspace root: an unrelated package-lock.json in $HOME otherwise
  // makes Turbopack infer the wrong root.
  turbopack: { root: __dirname },

  ...(isStaticExport
    ? {
        output: "export" as const,
        basePath: staticExportBasePath,
        assetPrefix: staticExportBasePath ? `${staticExportBasePath}/` : undefined,
      }
    : {}),

  images: {
    unoptimized: isStaticExport,
    // Plan B fallback (brief §3.4): if a media file failed to transcode/land in
    // public/media, lib/media.ts can point at the source repo directly.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/Kirans0615/Flat-Bridge/**",
      },
    ],
  },

  ...(isStaticExport
    ? {}
    : {
        async redirects() {
          // 301 (not Next's default 308) — BRIEF §4.1 specifies 301 explicitly.
          return legacyRedirects.map((r) => ({ ...r, statusCode: 301 }));
        },
      }),
};

export default withBundleAnalyzer(nextConfig);
