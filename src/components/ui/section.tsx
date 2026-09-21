import { cn } from "@/lib/utils";

interface SectionProps {
  tone: "ink" | "paper" | "abyss";
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const toneClasses: Record<SectionProps["tone"], string> = {
  ink: "bg-[var(--color-ink)] text-[var(--color-concrete)]",
  paper: "bg-[var(--color-paper)] text-[var(--color-ink)]",
  abyss: "bg-[var(--color-abyss)] text-[var(--color-concrete)]",
};

/**
 * Every homepage/page section wraps in this so chrome/Nav and chrome/CableRail
 * can detect ink/paper tone via the data-tone attribute (brief §7.2, §5).
 */
export function Section({ tone, id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        "relative px-[clamp(1.25rem,5vw,6rem)] py-[clamp(6rem,12vw,11rem)]",
        toneClasses[tone],
        className
      )}
    >
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

/**
 * `text-current/75` rather than a fixed `--color-steel-500` — steel-500 on
 * `--color-ink` measured 3.3:1 in a Lighthouse a11y audit (needs 4.5:1 for
 * this 12px "micro" text). Deriving from the section's own tone-correct
 * `currentColor` at reduced opacity clears AA on both ink (concrete-on-ink
 * stays >6:1 at 75%) and paper (ink-on-paper stays >10:1 at 75%) without
 * needing every one of Eyebrow's ~30 call sites to pass a tone prop.
 */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("micro flex items-center gap-2 text-current/75", className)}>
      <span className="h-px w-6 bg-[var(--color-green)]" aria-hidden="true" />
      {children}
    </p>
  );
}
