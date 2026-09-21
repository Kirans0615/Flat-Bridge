/**
 * brief §8.12. Legacy bug fixed: percentages never carry a trailing "+" — only
 * the raw count does. All four figures are the client's own published claims;
 * none are independently verified (see docs/client-questions.md #3 re: the
 * 100% retention figure specifically).
 */
export const stats = [
  { value: 75000, suffix: "+", decimals: 0, label: "Loads processed" },
  { value: 94, suffix: "%", decimals: 0, label: "Client acceptance rate" },
  { value: 92, suffix: "%", decimals: 0, label: "On-time deliveries" },
  { value: 100, suffix: "%", decimals: 0, label: "Client retention rate" },
] as const;

/** brief §8.2 — computed at render time, never hard-coded. */
export const foundedYear = 1997;
