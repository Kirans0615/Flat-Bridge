"use client";

import { useEffect, useState } from "react";

/**
 * Brief §6.3's reduced-motion contract in one hook. Also trips on
 * navigator.connection.saveData / a slow effectiveType, since both get the
 * same treatment (poster instead of video, no grain, no pin).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const slowConnection =
      connection?.saveData === true ||
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g";

    const update = () => setReduced(mql.matches || slowConnection);
    update();

    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return reduced;
}
