/**
 * 10.09.26 revision round. Insights (Part 6.1) and Security & compliance
 * (Part 9.5) are hidden — unrouted (404) — but their source stays intact so
 * either can come back later by flipping its flag. Typed `as boolean`
 * (widened, not a literal `false`) so TypeScript's control-flow analysis
 * doesn't mark the guarded code as statically unreachable, which would
 * silently drop type-narrowing checks on it.
 */
export const INSIGHTS_ENABLED = false as boolean;
export const SECURITY_PAGE_ENABLED = false as boolean;
