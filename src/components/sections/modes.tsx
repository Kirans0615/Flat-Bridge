import { Section } from "@/components/ui/section";
import { SplitText } from "@/components/motion";
import { modes } from "@/content/homepage";
import { cn } from "@/lib/utils";

/**
 * brief §8.10 — three columns divided by full-height vertical hairlines.
 * Hover lifts the column background; the brief's extra detail of a green dot
 * travelling the length of the dividing hairline on hover is simplified to a
 * static fade-in accent dot at the divider's top edge — a true top-to-bottom
 * travel animation would need to animate a `top`/`height` value (banned by
 * brief §4.6's transform/opacity-only rule) rather than a real transform.
 * Noted in the final report.
 */
export default function Modes() {
  return (
    <Section tone="ink" id="modes" className="px-0">
      <div className="px-[clamp(1.25rem,5vw,6rem)]">
        <h2 className="max-w-[36ch] text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
          Three ways we plug in
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
        {modes.items.map((mode, index) => (
          <div
            key={mode.title}
            className={cn(
              "group relative px-[clamp(1.25rem,5vw,6rem)] py-12 transition-colors duration-300 hover:bg-[var(--color-steel-900)] md:px-10",
              index > 0 && "md:border-l md:border-[var(--color-steel-700)]"
            )}
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="absolute left-[-1px] top-0 hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-green-lift)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block"
              />
            ) : null}
            <h3 className="text-h3 font-[var(--font-display)]">
              <SplitText as="span" mode="word" delay={index * 0.09}>
                {mode.title}
              </SplitText>
            </h3>
            <p className="mt-4 max-w-[36ch] text-body text-[var(--color-concrete)]">{mode.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
