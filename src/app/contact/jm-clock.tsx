"use client";

import { useEffect, useState } from "react";

/**
 * brief §15.1 — live Jamaica-timezone clock. Deliberately not shared via
 * `src/lib` or `src/components` (task scope: "don't try to share one across
 * pages") — this is the one page that needs it.
 */
const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Jamaica",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function JmClock() {
  // Lazy initializer keeps this out of an effect body — avoids the extra
  // render an effect-driven `setNow(new Date())` on mount would cause.
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatted = formatter.format(now);

  return (
    <p className="font-mono text-small text-current/70">
      <span suppressHydrationWarning>{formatted}</span> local time, Mandeville · Typical reply: within one
      business day
    </p>
  );
}
