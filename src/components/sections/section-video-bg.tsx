"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/lib/use-reduced-motion";

interface SectionVideoBgProps {
  src: string;
  /** 0-1 ink wash over the video. */
  overlayOpacity?: number;
}

/**
 * Full-bleed looping background video with an ink overlay. Autoplays muted (required
 * for browsers to allow autoplay); under reduced-motion / data-saver it stays paused on
 * the first frame instead of playing.
 */
export function SectionVideoBg({ src, overlayOpacity = 0.7 }: SectionVideoBgProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
    } else {
      void video.play().catch(() => {
        /* autoplay blocked — leave on first frame */
      });
    }
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      data-video-bg
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--color-ink)] [contain:strict]"
    >
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="h-full w-full transform-gpu object-cover [backface-visibility:hidden]"
      />
      <div className="absolute inset-0 bg-[var(--color-ink)]" style={{ opacity: overlayOpacity }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,18,26,0.35) 0%, rgba(5,18,26,0) 40%, rgba(5,18,26,0.6) 100%)",
        }}
      />
    </div>
  );
}
