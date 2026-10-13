/**
 * brief §7.6 lists Privacy/Terms in the footer's Legal column; §2's route
 * list doesn't include them and the legacy site has neither page. Writing
 * actual privacy/terms legal text would be inventing a legal claim on the
 * client's behalf, so these ship as honest holding pages. See
 * docs/client-questions.md #23.
 */
export const legalPlaceholder = {
  /** 10.09.26 revision round, Part 9.3 — replaces the old holding copy. */
  privacy: {
    title: "Privacy policy",
    body: "Our full privacy policy is being updated to ensure the strictest adherence to current mandates. Contact us directly with any questions regarding how information is securely handled.",
  },
  /** 10.09.26 revision round, Part 9.4 — replaces the old holding copy. */
  terms: {
    title: "Terms of service",
    body: "Terms of service are uniquely and explicitly defined in your service contract. One size does not fit all.",
  },
} as const;
