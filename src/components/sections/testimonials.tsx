"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { Section, Eyebrow } from "@/components/ui/section";
import { testimonials } from "@/content/testimonials";

/**
 * brief §8.13 — three real testimonials, Embla carousel, mono "N / 3"
 * counter, keyboard arrows, no autoplay. When `author` is null (the
 * withheld-attribution slot, brief §18.2 item 13) no attribution line is
 * rendered — never "Anonymous", never an invented name.
 *
 * Simplification (noted in the report): the brief's "outgoing lines mask
 * down, incoming lines mask up" `SplitText`-driven turnover is replaced with
 * Embla's native slide transition (a straightforward slide), per this task's
 * explicit allowance.
 */
export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Embla starts at index 0 by default (matching `selectedIndex`'s initial
    // state), so only future changes need to be subscribed here — no direct
    // setState call is needed on mount.
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <Section tone="ink" id="testimonials">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Testimonials</Eyebrow>
          <h2 className="mt-4 text-h2 font-[var(--font-display)] font-semibold tracking-[-0.03em]">
            What partners say
          </h2>
        </div>
        <span className="font-mono text-small tabular-nums text-current/70">
          {selectedIndex + 1} / {testimonials.length}
        </span>
      </div>

      <div
        ref={emblaRef}
        className="mt-12 overflow-hidden outline-none"
        data-cursor="drag"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") scrollPrev();
          if (event.key === "ArrowRight") scrollNext();
        }}
      >
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%]" aria-hidden={index !== selectedIndex}>
              <blockquote className="max-w-[68ch]">
                <p className="text-h3 font-[var(--font-display)] leading-snug">
                  <span aria-hidden="true" className="mr-1 text-[var(--color-green-lift)]">
                    [
                  </span>
                  {testimonial.quote}
                  <span aria-hidden="true" className="ml-1 text-[var(--color-green-lift)]">
                    ]
                  </span>
                </p>
                {testimonial.author ? (
                  <footer className="mt-6 text-small text-current/70">
                    {testimonial.author}
                    {testimonial.role ? `, ${testimonial.role}` : ""}
                    {testimonial.org ? ` — ${testimonial.org}` : ""}
                  </footer>
                ) : null}
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-6">
        <button
          type="button"
          onClick={scrollPrev}
          className="text-small text-[var(--color-concrete)] underline-offset-4 hover:underline"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="text-small text-[var(--color-concrete)] underline-offset-4 hover:underline"
        >
          Next
        </button>
      </div>
    </Section>
  );
}
