import { MAP_BORDERS, MAP_CITIES, MAP_LAND, MAP_VIEWBOX } from "@/content/nearshore-map-data";

const ORIGIN = "Mandeville";

/** Bowed quadratic arc between two projected points (arcs curve toward the north/west). */
function arcPath([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  // Perpendicular offset, always bowing to the left of the direction of travel.
  const cx = (x1 + x2) / 2 + (dy / len) * len * 0.18;
  const cy = (y1 + y2) / 2 - (dx / len) * len * 0.18;
  return `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`;
}

/**
 * Self-contained dark route map: bundled country outlines + animated arcs from
 * Mandeville to each destination. Pure SVG/CSS — no tile server, API key, or client JS.
 */
export default function NearshoreMap({ routes }: { routes: readonly { to: string }[] }) {
  const origin = MAP_CITIES[ORIGIN];
  const targets = routes.filter((r) => MAP_CITIES[r.to]).map((r) => ({ name: r.to, at: MAP_CITIES[r.to] }));

  return (
    <svg
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid slice"
      className="route-map h-full w-full bg-[var(--color-ink)]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="rm-vignette" cx="50%" cy="50%" r="75%">
          <stop offset="60%" stopColor="#07141e" stopOpacity="0" />
          <stop offset="100%" stopColor="#07141e" stopOpacity="0.85" />
        </radialGradient>
        <filter id="rm-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d={MAP_LAND} fill="#0e1d28" />
      <path d={MAP_BORDERS} fill="none" stroke="#24354a" strokeWidth={0.8} strokeLinejoin="round" />
      <path d={MAP_LAND} fill="none" stroke="#2c4157" strokeWidth={0.9} strokeLinejoin="round" />

      {targets.map((t, i) => {
        const d = arcPath(origin, t.at);
        return (
          <g key={t.name} className="route-map-route">
            <path d={d} fill="none" stroke="#6fb53a" strokeOpacity={0.18} strokeWidth={5} />
            <path
              d={d}
              fill="none"
              stroke="#6fb53a"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="route-arc"
              style={{ animationDelay: `${i * 0.25}s` }}
              filter="url(#rm-glow)"
            />
            <circle r={3} fill="#eaffd6" filter="url(#rm-glow)">
              <animateMotion dur={`${4 + i * 0.5}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        );
      })}

      {targets.map((t) => (
        <g key={t.name}>
          <circle cx={t.at[0]} cy={t.at[1]} r={9} fill="#6fb53a" opacity={0.18} className="route-pulse" />
          <circle cx={t.at[0]} cy={t.at[1]} r={4.5} fill="#6fb53a" />
          <text x={t.at[0] + 12} y={t.at[1] + 4} className="route-map-label">
            {t.name}
          </text>
        </g>
      ))}

      <g>
        <circle cx={origin[0]} cy={origin[1]} r={14} fill="#6fb53a" opacity={0.2} className="route-pulse" />
        <circle cx={origin[0]} cy={origin[1]} r={6} fill="#6fb53a" stroke="#fff" strokeWidth={2} />
        <text x={origin[0] - 14} y={origin[1] + 5} textAnchor="end" className="route-map-label route-map-label-origin">
          {ORIGIN}
        </text>
      </g>

      <rect width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="url(#rm-vignette)" />
    </svg>
  );
}
