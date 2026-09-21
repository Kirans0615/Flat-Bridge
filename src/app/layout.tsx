import type { Metadata } from "next";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { baseMetadata, organizationJsonLd, siteUrl } from "@/lib/seo";
import { LenisProvider } from "@/lib/use-lenis";
import { Nav, Footer, Cursor, Grain, Preloader } from "@/components/chrome";
import { HomeCableRail } from "@/components/chrome/home-cable-rail";
import { GlobalCtaGate } from "@/components/chrome/global-cta-gate";
import { PageCurtain } from "@/components/chrome";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...baseMetadata({
    title: "Building bridges. Perfecting processes.",
    path: "/",
  }),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[var(--radius-md)] focus:bg-[var(--color-green)] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <LenisProvider>
          <Preloader />
          <Grain />
          <Cursor />
          <HomeCableRail />
          <Nav />
          <PageCurtain>{children}</PageCurtain>
          <GlobalCtaGate />
          <Footer />
        </LenisProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
