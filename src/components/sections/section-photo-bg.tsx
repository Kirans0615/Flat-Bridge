import Image from "next/image";

import { cn } from "@/lib/utils";

type ResponsiveSrc = Record<"480" | "900" | "1600" | "2400", string>;

interface SectionPhotoBgProps {
  src: ResponsiveSrc;
  alt?: string;
  className?: string;
  /** 0-1. How heavy the ink wash reads — brief default is heavy (0.8); pass
   * lower to let more of the photo show through. */
  overlayOpacity?: number;
  /** Desaturates the photo and tints it toward the brand green, so a photo
   * with its own vivid natural colors (e.g. red/blue shipping containers)
   * reads as part of the site's palette rather than fighting it. */
  duotone?: boolean;
  /** Softens a low-resolution source so it doesn't read as pixelated when
   * stretched to full-bleed section-background size. */
  blur?: boolean;
  /** Directional ink gradient (darkens toward the bottom). Turn off when the
   * photo should read evenly across the whole section. Defaults to on. */
  gradient?: boolean;
}

/**
 * Generic full-bleed section background photo with an ink overlay — used by
 * Differentiators and Advantage, each with different treatment (Kiran,
 * 2026-09-10: lighten Differentiators' overlay so the photo shows more;
 * give Advantage a different photo, heavily overlaid and color-adjusted to
 * fit the theme).
 */
export function SectionPhotoBg({
  src,
  alt = "",
  className,
  overlayOpacity = 0.8,
  duotone = false,
  blur = false,
  gradient = true,
}: SectionPhotoBgProps) {
  return (
    <div aria-hidden="true" className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
      <Image
        src={src["2400"]}
        alt={alt}
        fill
        sizes="100vw"
        className={cn("object-cover", duotone && "grayscale", blur && "blur-md scale-110")}
      />
      {duotone ? (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--color-green-deep)", mixBlendMode: "color" }}
        />
      ) : null}
      {/* Ink wash plus a directional gradient for depth. */}
      <div className="absolute inset-0 bg-[var(--color-ink)]" style={{ opacity: overlayOpacity }} />
      {gradient ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,18,26,0.5) 0%, rgba(5,18,26,0.75) 55%, var(--color-ink) 100%)",
          }}
        />
      ) : null}
    </div>
  );
}
