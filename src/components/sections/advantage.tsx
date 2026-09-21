import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { SectionPhotoBg } from "@/components/sections/section-photo-bg";
import { advantage } from "@/content/homepage";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * brief §8.4 — same shape as Differentiators, mirrored: heading right, body
 * left, so the two ink sections in a row don't read as a repeated template.
 *
 * Background: a container-ship bow photo (Kiran, 2026-09-10), distinct from
 * Differentiators' port-at-night photo above it. Heavy overlay per the
 * original ask, plus a green duotone tint (the source photo's natural reds/
 * blues/greens on its stacked containers would otherwise fight the site's
 * "green is load-bearing only" rule) and a blur — the source file is a
 * small 370×523 stock thumbnail, and blurring it hides the upscale rather
 * than showing it off sharp and pixelated.
 */
export default function Advantage() {
  return (
    <Section tone="ink" id="advantage" className="overflow-hidden">
      <SectionPhotoBg src={media.vesselBow} overlayOpacity={0.8} duotone blur />

      <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-7 md:col-start-1">
          {advantage.rows.map((row, index) => (
            <div
              key={row.heading}
              className={cn("border-[var(--color-steel-700)] py-10", index > 0 && "border-t")}
            >
              <Reveal as="div" delay={index * 0.06}>
                <h3 className="text-h3 font-[var(--font-display)]">{row.heading}</h3>
                <p className="mt-4 max-w-[68ch] text-body text-[var(--color-concrete)]">{row.body}</p>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="md:col-span-4 md:col-start-9 md:text-right">
          <div className="md:sticky md:top-[40vh]">
            <Eyebrow className="md:justify-end">{advantage.label}</Eyebrow>
            <h2 className="mt-4 text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
              {advantage.h2}
            </h2>
          </div>
        </div>
      </div>
    </Section>
  );
}
