import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { SectionPhotoBg } from "@/components/sections/section-photo-bg";
import { differentiators } from "@/content/homepage";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * brief §8.3 — two full-width rows (not cards), heading left / body right.
 * Simplification: the brief's sticky-heading-swap-per-row interaction (text
 * mask-wipes as each row crosses 50% viewport) is simplified to an always-
 * visible sticky label + heading, per this task's explicit allowance — the
 * swap-on-scroll logic was judged not worth the complexity for a homepage
 * section that isn't the set-piece.
 *
 * Background: the real night container-port photo, overlay lightened from
 * the original 0.8 (Kiran, 2026-09-10: "make the image... be able to be
 * seen more") — kept dark enough at the gradient's lower/edge reach for
 * text contrast, just less of a flat wash over the crane-lit midground.
 */
export default function Differentiators() {
  return (
    <Section tone="ink" id="differentiators" className="overflow-hidden">
      <SectionPhotoBg src={media.portNight} overlayOpacity={0.55} />

      <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-[40vh]">
            <Eyebrow>{differentiators.label}</Eyebrow>
            <h2 className="mt-4 text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
              {differentiators.h2}
            </h2>
          </div>
        </div>

        <div className="md:col-span-8 md:col-start-6">
          {differentiators.rows.map((row, index) => (
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
      </div>
    </Section>
  );
}
