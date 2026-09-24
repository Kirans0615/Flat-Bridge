"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";

import { navCta, primaryNav, servicePillars } from "@/content/nav";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { media } from "@/lib/media";
import { D, E, STAGGER } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Global nav — brief §7.2. Fixed, z-50, cross-fades (200ms) between a
 * transparent over-hero state and a floating glass bar once `scrollY` passes
 * 88vh. The floating bar's tint depends on which `data-tone="ink"|"paper"`
 * section is currently under the mid-viewport band — page sections carry
 * that attribute; this component only ever queries for it, it doesn't
 * define any. Hides on scroll-down past 400px, reappears instantly on
 * scroll-up. Desktop mega-menus for Services/Sectors (120ms open / 240ms
 * close hover-intent, Escape + a lightweight focus trap); mobile collapses
 * to a full-screen sheet.
 *
 * Services/Sectors mega-menus read the real `@/content/services` (16) and
 * `@/content/sectors` (6) modules directly — each pillar column samples a
 * few representative capabilities rather than every one of the 16, to keep
 * the menu from becoming a wall of text; "All 16 capabilities" links to the
 * full filterable index at /services.
 */

const FLOAT_THRESHOLD_RATIO = 0.88;
const HIDE_THRESHOLD_PX = 400;

/**
 * Set only for the homepage-only GitHub Pages mockup build (docs/decisions.md
 * D-028/D-031) — every taskbar item other than the logo points at a route
 * that isn't in that export, so this blurs and disables them instead of
 * shipping dead links on a client-facing preview. Never set for the real
 * Cloudflare/OpenNext build, where every route exists.
 */
const MOCKUP_HOME_ONLY = process.env.NEXT_PUBLIC_MOCKUP_HOME_ONLY === "true";
// One shared box for every desktop nav item (links, dropdown triggers, disabled
// spans) so they all sit on the same line regardless of element type.
const NAV_ITEM =
  "micro inline-flex h-9 items-center gap-1 font-medium uppercase leading-none tracking-wide";
const DISABLED_NAV_CLASSES =
  "pointer-events-none select-none opacity-45 blur-[2.5px]";

// `primaryNav`'s hrefs are a literal union that never includes "/" — widen to
// `string` so this doesn't read as an always-true comparison to TS.
function isHome(href: string): boolean {
  return href === "/";
}

const SECTOR_LINKS = sectors.map((s) => ({
  name: s.name,
  href: `/sectors/${s.slug}`,
  promise: s.promise,
}));

/** Heuristic grouping of the 16 capabilities under the 3 service pillars — a
 * nav/UX judgment call, not a claim about Flat Bridge's org structure. */
const PILLAR_CAPABILITY_SAMPLES: Record<string, string[]> = {
  "contact-centre": ["driver-dispatch", "tracking-and-tracing", "appointment-scheduling"],
  "back-office-support": ["data-entry", "claims-processing", "freight-audit-and-payment"],
  "digital-transformation-ai": [
    "transportation-management-systems",
    "pricing-engines",
    "edi-and-api-integration",
  ],
};

type MegaMenu = "services" | "sectors" | null;
type Tone = "ink" | "paper";

function NavChevron({ open }: { open: boolean }) {
  return (
    <ChevronDown
      aria-hidden="true"
      strokeWidth={2.25}
      className={cn(
        "size-3.5 shrink-0 opacity-80 transition-transform duration-200 ease-out",
        open && "rotate-180 opacity-100",
      )}
    />
  );
}

function trapTabKey(event: ReactKeyboardEvent, container: HTMLElement | null) {
  if (event.key !== "Tab" || !container) return;
  const focusable = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function Nav() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const [isFloating, setIsFloating] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tone, setTone] = useState<Tone>("ink");
  const [openMenu, setOpenMenu] = useState<MegaMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const lastScrollYRef = useRef(0);
  const openTimerRef = useRef<number | undefined>(undefined);
  const closeTimerRef = useRef<number | undefined>(undefined);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const sectorsTriggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Floating-bar threshold + hide-on-scroll-down/show-on-scroll-up.
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setIsFloating(y > window.innerHeight * FLOAT_THRESHOLD_RATIO);
        if (y > HIDE_THRESHOLD_PX && y > lastScrollYRef.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastScrollYRef.current = y;
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tone detection — watches whatever the current route has tagged
  // data-tone="ink|paper", re-queried whenever the route changes.
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const next = visible.target.getAttribute("data-tone");
          if (next === "ink" || next === "paper") setTone(next);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Escape closes whatever's open, returning focus sensibly.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      } else if (openMenu) {
        const trigger = openMenu === "services" ? servicesTriggerRef : sectorsTriggerRef;
        setOpenMenu(null);
        trigger.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, openMenu]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  // Close everything on route change.
  useEffect(() => {
    // Deliberate reset keyed on the route changing, not a derived-state smell.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const openWithIntent = useCallback((menu: Exclude<MegaMenu, null>) => {
    window.clearTimeout(closeTimerRef.current);
    openTimerRef.current = window.setTimeout(() => setOpenMenu(menu), 120);
  }, []);

  const closeWithIntent = useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setOpenMenu(null), 240);
  }, []);

  const isPaperFloating = isFloating && tone === "paper";
  const logo = isFloating ? (isPaperFloating ? media.logoLight : media.logoDark) : media.logoDark;
  const linkColor = isFloating
    ? isPaperFloating
      ? "text-[var(--color-ink)]"
      : "text-[var(--color-concrete)]"
    : "text-[var(--color-concrete)]";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out",
          hidden && "-translate-y-full",
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between transition-[background-color,border-color,backdrop-filter,margin,border-radius,padding] duration-200",
            isFloating
              ? "mt-4 max-w-6xl rounded-lg border px-5 py-3 backdrop-blur-xl"
              : "max-w-none border-transparent px-6 py-5 sm:px-10",
          )}
          style={
            isFloating
              ? {
                  backgroundColor: isPaperFloating
                    ? "rgba(242,243,241,0.78)"
                    : "rgba(7,20,30,0.72)",
                  borderColor: "var(--color-hairline)",
                }
              : undefined
          }
        >
          <Link href="/" data-cursor="link" className="relative z-10 block h-8 w-auto shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="Flat Bridge" className="h-8 w-auto" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) => {
              if (item.label === "Services" || item.label === "Sectors") {
                const menu = item.label.toLowerCase() as Exclude<MegaMenu, null>;
                const triggerRef = menu === "services" ? servicesTriggerRef : sectorsTriggerRef;

                if (MOCKUP_HOME_ONLY) {
                  return (
                    <span
                      key={item.href}
                      aria-disabled="true"
                      className={cn(
                        NAV_ITEM,
                        linkColor,
                        DISABLED_NAV_CLASSES,
                      )}
                    >
                      {item.label}
                      <NavChevron open={false} />
                    </span>
                  );
                }

                return (
                  <div
                    key={item.href}
                    className="relative flex h-9 items-center"
                    onMouseEnter={() => openWithIntent(menu)}
                    onMouseLeave={closeWithIntent}
                  >
                    <button
                      ref={triggerRef}
                      type="button"
                      data-cursor="link"
                      aria-expanded={openMenu === menu}
                      aria-haspopup="true"
                      onClick={() => setOpenMenu((prev) => (prev === menu ? null : menu))}
                      className={cn(
                        NAV_ITEM, "transition-colors hover:text-[var(--color-green-lift)]",
                        linkColor,
                      )}
                    >
                      {item.label}
                      <NavChevron open={openMenu === menu} />
                    </button>

                    <AnimatePresence>
                      {openMenu === menu && (
                        <motion.div
                          ref={panelRef}
                          role="menu"
                          aria-label={item.label}
                          onKeyDown={(e) => trapTabKey(e, panelRef.current)}
                          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                          transition={{ duration: D.xs, ease: E.out }}
                          className="absolute left-1/2 top-full mt-3 w-[min(90vw,720px)] -translate-x-1/2 rounded-lg border border-[var(--color-hairline)] bg-[var(--color-paper)] p-6 text-[var(--color-ink)] shadow-xl"
                        >
                          {menu === "services" ? <ServicesMegaMenu /> : <SectorsMegaMenu />}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (MOCKUP_HOME_ONLY && !isHome(item.href)) {
                return (
                  <span
                    key={item.href}
                    aria-disabled="true"
                    className={cn(
                      NAV_ITEM,
                      linkColor,
                      DISABLED_NAV_CLASSES,
                    )}
                  >
                    {item.label}
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="link"
                  className={cn(
                    NAV_ITEM, "transition-colors hover:text-[var(--color-green-lift)]",
                    linkColor,
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            {MOCKUP_HOME_ONLY ? (
              <span
                aria-disabled="true"
                className={cn(
                  "hidden micro rounded-full border border-[var(--color-green-lift)] px-5 py-2.5 font-medium sm:inline-block",
                  isFloating ? "text-inherit" : "text-[var(--color-concrete)]",
                  DISABLED_NAV_CLASSES,
                )}
              >
                {navCta.label}
              </span>
            ) : (
              <Link
                href={navCta.href}
                data-cursor="link"
                className={cn(
                  "hidden micro rounded-full border px-5 py-2.5 font-medium transition-colors sm:inline-block",
                  isFloating
                    ? "border-[var(--color-green-lift)] text-inherit hover:bg-[var(--color-green-lift)] hover:text-[var(--color-ink)]"
                    : "border-[var(--color-green-lift)] text-[var(--color-concrete)] hover:bg-[var(--color-green-lift)] hover:text-[var(--color-ink)]",
                )}
              >
                {navCta.label}
              </Link>
            )}

            <button
              ref={hamburgerRef}
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className={cn("-mr-2 p-2 lg:hidden", linkColor)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <MobileSheet open={mobileOpen} onClose={() => setMobileOpen(false)} sheetRef={sheetRef} />
    </>
  );
}

function ServicesMegaMenu() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {servicePillars.map((pillar) => {
        const sample = PILLAR_CAPABILITY_SAMPLES[pillar.slug] ?? [];
        const items = services.filter((s) => sample.includes(s.slug));
        return (
          <div key={pillar.slug} className="group">
            <Link href="/services" data-cursor="link" className="block">
              <h3 className="text-small font-display font-semibold tracking-tight">
                {pillar.name}
              </h3>
              <span className="mt-1 block h-px w-0 bg-[var(--color-green)] transition-all duration-200 group-hover:w-full" />
            </Link>
            <p className="mt-2 text-small text-current/70">{pillar.body}</p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    data-cursor="link"
                    className="text-small text-current underline-offset-4 hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <div className="col-span-full mt-2 border-t border-[var(--color-hairline)] pt-4">
        <Link
          href="/services"
          data-cursor="link"
          className="micro font-medium text-[var(--color-green)] hover:text-[var(--color-green-deep)]"
        >
          All 16 capabilities
        </Link>
      </div>
    </div>
  );
}

function SectorsMegaMenu() {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
      {SECTOR_LINKS.map((sector) => (
        <Link
          key={sector.href}
          href={sector.href}
          data-cursor="view"
          className="group flex flex-col justify-center rounded-md px-3 py-2.5 transition-colors hover:bg-[var(--color-paper-2)]"
        >
          <span className="flex items-center justify-between">
            <span className="text-small font-medium">{sector.name}</span>
            <span
              aria-hidden="true"
              className="h-px w-4 bg-[var(--color-green)] opacity-0 transition-opacity group-hover:opacity-100"
            />
          </span>
          <span className="mt-0.5 text-small text-current/70 line-clamp-1">
            {sector.promise}
          </span>
        </Link>
      ))}
      <div className="col-span-full mt-2 border-t border-[var(--color-hairline)] pt-4">
        <Link
          href="/sectors"
          data-cursor="link"
          className="micro font-medium text-[var(--color-green)] hover:text-[var(--color-green-deep)]"
        >
          All sectors
        </Link>
      </div>
    </div>
  );
}

interface MobileSheetProps {
  open: boolean;
  onClose: () => void;
  sheetRef: RefObject<HTMLDivElement | null>;
}

// Kept inline rather than as a separate `mobile-sheet.tsx` — it shares all of
// Nav's open/close state and only Nav ever renders it, so extracting it
// would just move props across a file boundary for no reuse benefit.
function MobileSheet({ open, onClose, sheetRef }: MobileSheetProps) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--color-abyss)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: D.sm }}
            style={{
              backgroundImage: `linear-gradient(rgba(5,18,26,0.88), rgba(5,18,26,0.94)), url(${media.heroVideo.poster})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={onClose}
          />

          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onKeyDown={(e) => trapTabKey(e, sheetRef.current)}
            className="absolute inset-y-0 right-0 flex w-[86vw] max-w-sm flex-col justify-center gap-8 bg-[var(--color-ink)] px-8 py-10"
            initial={reducedMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reducedMotion ? 0.15 : D.md, ease: E.inOut }}
          >
            <svg
              aria-hidden="true"
              className="absolute inset-y-0 left-0 h-full w-px overflow-visible"
              viewBox="0 0 1 100"
              preserveAspectRatio="none"
            >
              <motion.line
                x1={0.5}
                y1={0}
                x2={0.5}
                y2={100}
                stroke="var(--color-green-lift)"
                strokeWidth={1.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: open ? 1 : 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, ease: E.out }}
              />
            </svg>

            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="absolute right-6 top-6 p-2 text-[var(--color-concrete)]"
            >
              <X size={22} />
            </button>

            <nav aria-label="Mobile" className="flex flex-col gap-6">
              {primaryNav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{
                    duration: D.sm,
                    ease: E.out,
                    delay: reducedMotion ? 0 : index * STAGGER.base,
                  }}
                >
                  {MOCKUP_HOME_ONLY && !isHome(item.href) ? (
                    <span
                      aria-disabled="true"
                      className={cn("text-h3 font-display text-[var(--color-paper)]", DISABLED_NAV_CLASSES)}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      data-cursor="link"
                      onClick={onClose}
                      className="text-h3 font-display text-[var(--color-paper)]"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {MOCKUP_HOME_ONLY ? (
              <span
                aria-disabled="true"
                className={cn(
                  "micro inline-block w-fit rounded-full bg-[var(--color-green)] px-5 py-3 font-medium text-white",
                  DISABLED_NAV_CLASSES,
                )}
              >
                {navCta.label}
              </span>
            ) : (
              <Link
                href={navCta.href}
                data-cursor="link"
                onClick={onClose}
                className="micro inline-block w-fit rounded-full bg-[var(--color-green)] px-5 py-3 font-medium text-white"
              >
                {navCta.label}
              </Link>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
