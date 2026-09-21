/**
 * Single resolver for every media path (brief §3.4). Never hard-code a path
 * to public/media or the assets repo anywhere else in the codebase.
 *
 * Source of record (human-browsable): https://github.com/Kirans0615/Flat-Bridge
 */
const GH = "https://raw.githubusercontent.com/Kirans0615/Flat-Bridge/main";
const LOCAL =
  process.env.NEXT_PUBLIC_MEDIA_URL ??
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media`;

export const media = {
  heroVideo: {
    webm1080: `${LOCAL}/hero-1080.webm`,
    mp41080: `${LOCAL}/hero-1080.mp4`,
    webm720: `${LOCAL}/hero-720.webm`,
    mp4720: `${LOCAL}/hero-720.mp4`,
    poster: `${LOCAL}/hero-poster.webp`,
    /** Plan B fallback only — never the primary source (brief §3.4). */
    original: `${GH}/bridge_8s_4k.mp4`,
  },
  logoDark: `${LOCAL}/logo-green.png`,
  logoLight: `${LOCAL}/logo-black-green.png`,
  team: {
    "480": `${LOCAL}/team-flatbridge-480.webp`,
    "900": `${LOCAL}/team-flatbridge-900.webp`,
    "1600": `${LOCAL}/team-flatbridge-1600.webp`,
    "2400": `${LOCAL}/team-flatbridge-2400.webp`,
  },
  culture: {
    "480": `${LOCAL}/culture-stock-480.webp`,
    "900": `${LOCAL}/culture-stock-900.webp`,
    "1600": `${LOCAL}/culture-stock-1600.webp`,
    "2400": `${LOCAL}/culture-stock-2400.webp`,
  },
  port: {
    "480": `${LOCAL}/port-golden-hour-480.webp`,
    "900": `${LOCAL}/port-golden-hour-900.webp`,
    "1600": `${LOCAL}/port-golden-hour-1600.webp`,
    "2400": `${LOCAL}/port-golden-hour-2400.webp`,
  },
  yard: {
    "480": `${LOCAL}/container-yard-480.webp`,
    "900": `${LOCAL}/container-yard-900.webp`,
    "1600": `${LOCAL}/container-yard-1600.webp`,
    "2400": `${LOCAL}/container-yard-2400.webp`,
  },
  jamaica: {
    "480": `${LOCAL}/caribbean-pier-480.webp`,
    "900": `${LOCAL}/caribbean-pier-900.webp`,
    "1600": `${LOCAL}/caribbean-pier-1600.webp`,
    "2400": `${LOCAL}/caribbean-pier-2400.webp`,
  },
  /** Night container port, COSCO SHIPPING vessel under crane lights — Differentiators bg. */
  portNight: {
    "480": `${LOCAL}/port-night-480.webp`,
    "900": `${LOCAL}/port-night-900.webp`,
    "1600": `${LOCAL}/port-night-1600.webp`,
    "2400": `${LOCAL}/port-night-2400.webp`,
  },
  /** Container-ship bow, head-on — Advantage bg. Source is a small 370x523 stock
   * thumbnail (asset repo's own "service-01.jpg"), so this renders blurred —
   * upscaling it sharp would look pixelated at section-background size. */
  vesselBow: {
    "480": `${LOCAL}/vessel-bow-480.webp`,
    "900": `${LOCAL}/vessel-bow-900.webp`,
    "1600": `${LOCAL}/vessel-bow-1600.webp`,
    "2400": `${LOCAL}/vessel-bow-2400.webp`,
  },
} as const;

/** Fallback source used only if a processed local file never landed (Plan B, brief §3.4). */
export const mediaFallback = {
  team: `${GH}/1%20(1).png`,
  culture: `${GH}/employees-selfie-and-business-people-with-diversity-happiness-and-profile-picture-for-about-us-p.jpg`,
  port: `${GH}/pexels-tomfisk-3338019.jpg`,
  yard: `${GH}/pexels-jan-van-der-wolf-11680885-33537946.jpg`,
  jamaica: `${GH}/pexels-dirk-schuneman-113939707-9720445.jpg`,
  portNight: `${GH}/pexels-a-p-363022294-15348182.jpg`,
  vesselBow: `${GH}/service-01.jpg`,
} as const;
