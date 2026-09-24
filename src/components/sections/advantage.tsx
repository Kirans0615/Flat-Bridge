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
 * Background: sunlit aerial container-yard photo (Kiran, 2026-09-23), replacing
 * the earlier ship-bow thumbnail. High-res source, so no blur/duotone; a
 * flat 0.92 ink overlay (no bottom gradient) keeps the photo clearly visible while the text
 * stays legible.
 */
export default function Advantage() {
  return (
    <Section tone="ink" id="advantage" className="overflow-hidden">
      <SectionPhotoBg src={media.advantageYard} overlayOpacity={0.92} gradient={false} />

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
