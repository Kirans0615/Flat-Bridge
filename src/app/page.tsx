import { SectionPhotoBg } from "@/components/sections/section-photo-bg";
import { media } from "@/lib/media";
import {
  Hero,
  Delivers,
  Differentiators,
  Advantage,
  FeaturedCapabilities,
  CapabilitiesRail,
  Edge,
  SectorsRows,
  OpsConsole,
  Modes,
  Nearshore,
  Stats,
  Testimonials,
  InsightsTeaser,
  BookACall,
} from "@/components/sections";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Delivers />
      <Differentiators />
      {/* Dark break between the two photo sections (Kiran, 2026-09-23): white looked bad and
          solid black read flat, so it carries the Advantage photo under a heavy blackish
          overlay, feathered to solid ink at the top to meet Differentiators seamlessly. */}
      <div
        aria-hidden="true"
        data-tone="ink"
        className="relative h-[clamp(5rem,10vw,9rem)] overflow-hidden bg-[var(--color-ink)]"
      >
        <SectionPhotoBg src={media.advantageYard} overlayOpacity={0.88} gradient={false} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, var(--color-ink) 0%, transparent 45%)" }}
        />
      </div>
      <Advantage />
      <FeaturedCapabilities />
      <CapabilitiesRail />
      <Edge />
      <SectorsRows />
      <OpsConsole />
      <Modes />
      <Nearshore />
      <Stats />
      <Testimonials />
      <InsightsTeaser />
      <BookACall />
    </main>
  );
}
