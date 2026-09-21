import Image from "next/image";
import Link from "next/link";

import { Section, Eyebrow } from "@/components/ui/section";
import { sectors } from "@/content/sectors";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * brief §8.8 — six full-width hairline rows, hover reveals a large image on
 * the right ~40%.
 *
 * Two simplifications, both explicitly allowed by this task:
 * 1. "Only one open at a time, cross-fade" is simplified to independent
 *    per-row hover reveals (pure CSS `group-hover`, no shared open-row state).
 * 2. The image reveal itself uses a plain opacity/transform hover transition
 *    rather than the `<ClipReveal>` primitive — ClipReveal's contract is
 *    scroll-into-view triggered (`whileInView`, once), not hover-triggered,
 *    so it doesn't fit a repeatable hover interaction without extending its
 *    API, which is out of scope here.
 */
export default function SectorsRows() {
  return (
    <Section tone="paper" id="sectors">
      <Eyebrow>Sectors</Eyebrow>
      <h2 className="mt-4 max-w-[36ch] text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
        Built for how each sector actually runs
      </h2>

      <div className="mt-12">
        {sectors.map((sector, index) => (
          <Link
            key={sector.slug}
            href={`/sectors/${sector.slug}`}
            data-cursor="view"
            className={cn(
              "group relative isolate flex min-h-[120px] items-center overflow-hidden border-[var(--color-hairline)] py-8",
              index > 0 && "border-t"
            )}
          >
            {/* Mobile: image always visible, stacked above text */}
            <div className="flex w-full flex-col gap-4 md:hidden">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image src={media[sector.imageKey]["900"]} alt="" fill sizes="100vw" className="object-cover" />
              </div>
              <div>
                <h3 className="text-h3 font-[var(--font-display)]">{sector.name}</h3>
                <p className="mt-2 text-small text-current/70">{sector.promise}</p>
              </div>
            </div>

            {/* Desktop: hover reveal */}
            <div className="hidden w-full md:flex md:items-center md:justify-between md:gap-8">
              <div className="relative z-10 flex items-baseline gap-8 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-6">
                <h3 className="text-h3 font-[var(--font-display)]">{sector.name}</h3>
                <p className="max-w-[38ch] text-small text-current/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {sector.promise}
                </p>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-[40%] origin-right scale-x-0 opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-out)] group-hover:scale-x-100 group-hover:opacity-100"
              >
                <Image src={media[sector.imageKey]["1600"]} alt="" fill sizes="40vw" className="object-cover" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
