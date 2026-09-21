/**
 * brief §7.6 lists Privacy/Terms in the footer's Legal column; §2's route
 * list doesn't include them and the legacy site has neither page. Writing
 * actual privacy/terms legal text would be inventing a legal claim on the
 * client's behalf, so these ship as honest holding pages. See
 * docs/client-questions.md #23.
 */
export const legalPlaceholder = {
  privacy: {
    title: "Privacy policy",
    body: "A full privacy policy for Flat Bridge Limited is being finalized. In the meantime, contact us directly with any questions about how information is handled.",
  },
  terms: {
    title: "Terms of service",
    body: "Terms of service for Flat Bridge Limited are being finalized. In the meantime, contact us directly with any questions.",
  },
} as const;
