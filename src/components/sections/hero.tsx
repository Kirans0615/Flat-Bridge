"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/motion";
import { site, heroContent } from "@/content/site";
import { media } from "@/lib/media";
import { E } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * brief §8.1 — the homepage hero. Full-viewport video, entrance sequence timed
 * to the ms table, scroll-out via framer-motion `useScroll`, corner HUD with a
 * live Jamaica clock, scroll cue into §8.2. Reduced motion: the video is never
 * loaded (poster only), content renders at final state, no scroll transforms.
 */

function useJamaicaClock(): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Jamaica",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoAttached, setVideoAttached] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const jmTime = useJamaicaClock();

  // Load discipline (brief §8.1 / §6.3): never load the video at all under
  // reduced motion; otherwise attach <source>s and call .load() only after
  // requestIdleCallback + document.readyState === 'complete', then fade in
  // on canplaythrough. The poster stays the LCP element throughout.
  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;

    const attachSources = () => {
      if (cancelled || !videoRef.current) return;
      const video = videoRef.current;
      const sources: Array<{ src: string; type: string; media?: string }> = [
        { src: media.heroVideo.webm1080, type: "video/webm", media: "(min-width:768px)" },
        { src: media.heroVideo.mp41080, type: "video/mp4", media: "(min-width:768px)" },
        { src: media.heroVideo.webm720, type: "video/webm" },
        { src: media.heroVideo.mp4720, type: "video/mp4" },
      ];
      sources.forEach(({ src, type, media: mediaQuery }) => {
        const source = document.createElement("source");
        source.src = src;
        source.type = type;
        if (mediaQuery) source.media = mediaQuery;
        video.appendChild(source);
      });
      video.load();
      setVideoAttached(true);
    };

    const scheduleIdle = () => {
      const ric =
        window.requestIdleCallback ??
        ((cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 200));
      ric(attachSources);
    };

    if (document.readyState === "complete") {
      scheduleIdle();
    } else {
      window.addEventListener("load", scheduleIdle, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleIdle);
    };
  }, [reducedMotion]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.7]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      data-tone="ink"
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-[var(--color-ink)] text-[var(--color-concrete)]"
    >
      {/* Video / poster layer */}
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? undefined : { y: videoY, scale: videoScale }}
        initial={reducedMotion ? undefined : { scale: 1.08 }}
        animate={reducedMotion ? undefined : { scale: 1 }}
        transition={reducedMotion ? undefined : { duration: 1.6, ease: E.out }}
      >
        {reducedMotion ? (
          <Image
            src={media.heroVideo.poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_42%] md:object-[62%_50%]"
          />
        ) : (
          <>
            <Image
              src={media.heroVideo.poster}
              alt=""
              fill
              priority
              sizes="100vw"
              className={cn(
                "object-cover object-[72%_42%] transition-opacity duration-700 md:object-[62%_50%]",
                videoVisible ? "opacity-0" : "opacity-100"
              )}
            />
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={media.heroVideo.poster}
              aria-hidden="true"
              onCanPlayThrough={() => setVideoVisible(true)}
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-[72%_42%] transition-opacity duration-700 md:object-[62%_50%]",
                videoVisible ? "opacity-100" : "opacity-0"
              )}
              data-attached={videoAttached}
            />
          </>
        )}
      </motion.div>

      {/* Treatment stack — §8.1(a-c). Grain (d) renders globally from chrome, not here. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(5,18,26,.92) 0%, rgba(5,18,26,.72) 38%, rgba(5,18,26,.25) 68%, rgba(5,18,26,.55) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, #05121A 0%, transparent 42%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "2px 2px",
          maskImage: "radial-gradient(circle at 50% 50%, transparent 0%, black 75%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, transparent 0%, black 75%)",
        }}
      />
      {!reducedMotion ? (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-black"
          style={{ opacity: scrimOpacity }}
        />
      ) : null}
      {/* <Grain /> renders globally from the chrome layer — not duplicated here. */}

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-center px-[clamp(1.25rem,5vw,6rem)]"
        style={reducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="mx-auto w-full max-w-[1440px] text-center md:text-left">
          <div className="max-w-[46rem]">
            <HeroKicker reducedMotion={reducedMotion} />

            {/* Custom clamp rather than the shared --text-d1 token (max 8.5rem) —
                Kiran: too big at full screen. Caps lower and scales less
                aggressively with viewport width; --text-d1 itself is left
                alone since not-found.tsx's "404" also uses it and wasn't
                flagged. */}
            <h1
              className="mt-6 font-[var(--font-display)] font-semibold leading-[0.98] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
            >
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                {reducedMotion ? (
                  heroContent.h1Line1
                ) : (
                  <SplitText as="span" mode="line" delay={0.22}>
                    {heroContent.h1Line1}
                  </SplitText>
                )}
              </span>
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                {reducedMotion ? (
                  heroContent.h1Line2
                ) : (
                  <SplitText as="span" mode="line" delay={0.32}>
                    {heroContent.h1Line2}
                  </SplitText>
                )}
              </span>
            </h1>

            {/* Rendered opacity:1 from first paint deliberately — this is the page's LCP
                candidate (confirmed via Lighthouse). Starting it hidden and fading in
                after hydration made LCP dependent on JS running, badly inflating it
                under throttled conditions. Only `y` (a transform, not opacity) animates,
                so first paint always shows real, final text. */}
            <motion.p
              className="mt-6 max-w-[38rem] text-body-lg text-[var(--color-concrete)] md:mx-0"
              initial={reducedMotion ? undefined : { y: 16 }}
              animate={reducedMotion ? undefined : { y: 0 }}
              transition={reducedMotion ? undefined : { duration: 0.7, delay: 0.62, ease: E.out }}
            >
              {heroContent.sub}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col items-center gap-4 sm:flex-row md:items-start"
              initial={reducedMotion ? undefined : "hidden"}
              animate={reducedMotion ? undefined : "show"}
              variants={
                reducedMotion
                  ? undefined
                  : {
                      hidden: {},
                      show: { transition: { delayChildren: 0.78, staggerChildren: 0.07 } },
                    }
              }
            >
              <motion.div
                className="overflow-hidden rounded-full"
                initial={reducedMotion ? undefined : { clipPath: "inset(0 100% 0 0)" }}
                animate={reducedMotion ? undefined : { clipPath: "inset(0 0% 0 0)" }}
                transition={reducedMotion ? undefined : { duration: 0.5, delay: 0.78, ease: E.out }}
              >
                <Button href={heroContent.ctaPrimary.href} variant="solid">
                  {heroContent.ctaPrimary.label}
                </Button>
              </motion.div>
              <motion.div
                initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reducedMotion ? undefined : { duration: 0.4, delay: 0.85, ease: E.out }}
              >
                <Button href={heroContent.ctaSecondary.href} variant="ghost" data-tone="ink">
                  {heroContent.ctaSecondary.label}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue — bottom-left */}
      <motion.a
        href="#delivers"
        data-cursor="link"
        className="absolute bottom-10 left-[clamp(1.25rem,5vw,6rem)] z-10 hidden flex-col items-center gap-3 md:flex"
        initial={reducedMotion ? undefined : { opacity: 0 }}
        animate={reducedMotion ? undefined : { opacity: 1 }}
        transition={reducedMotion ? undefined : { duration: 0.4, delay: 0.9 }}
        style={reducedMotion ? undefined : { opacity: contentOpacity }}
      >
        <span className="relative block h-12 w-px overflow-hidden bg-[var(--color-steel-700)]">
          {!reducedMotion ? (
            <motion.span
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-green-lift)]"
              animate={{ y: [0, 40, 40] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.9, 1] }}
            />
          ) : (
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-green-lift)]" />
          )}
        </span>
        <span className="micro text-current/70">Scroll</span>
      </motion.a>

      {/* Corner HUD — desktop >=1280px only */}
      <motion.div
        className="absolute bottom-10 right-[clamp(1.25rem,5vw,6rem)] z-10 hidden flex-col items-end gap-1 text-right font-mono text-micro text-current/70 xl:flex"
        initial={reducedMotion ? undefined : { opacity: 0 }}
        animate={reducedMotion ? undefined : { opacity: 1 }}
        transition={reducedMotion ? undefined : { duration: 0.5, delay: 1.1 }}
        style={reducedMotion ? undefined : { opacity: contentOpacity }}
      >
        <span>{site.location.coordsLabel}</span>
        <span>MANDEVILLE JM</span>
        <span className="tabular-nums">{jmTime ?? "--:--:--"}</span>
      </motion.div>
    </section>
  );
}

function HeroKicker({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2 md:justify-start">
      <span className="relative block h-px w-6 overflow-hidden bg-[var(--color-steel-700)]">
        {!reducedMotion ? (
          <motion.span
            className="absolute inset-y-0 left-0 block h-px w-full bg-[var(--color-green)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.32, delay: 0.12, ease: E.out }}
          />
        ) : (
          <span className="absolute inset-y-0 left-0 block h-px w-full bg-[var(--color-green)]" />
        )}
      </span>
      <motion.span
        className="micro text-[var(--color-concrete)]"
        initial={reducedMotion ? undefined : { opacity: 0 }}
        animate={reducedMotion ? undefined : { opacity: 1 }}
        transition={reducedMotion ? undefined : { duration: 0.3, delay: 0.44 }}
      >
        {heroContent.kicker}
      </motion.span>
    </div>
  );
}
