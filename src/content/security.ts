/**
 * brief §15.4. A BPO handles other people's operational and financial data,
 * and the legacy site says nothing about it. Only line items the existing
 * copy actually supports are filled in; everything else is honestly marked
 * pending rather than a fabricated compliance claim.
 */
export interface SecurityRow {
  id: string;
  label: string;
  status: "confirmed" | "pending";
  detail: string;
}

export const securityRows: SecurityRow[] = [
  {
    id: "SEC-01",
    label: "Data entry authentication",
    status: "confirmed",
    detail: "Multiple layers of authentication on data entry (legacy site copy).",
  },
  {
    id: "SEC-02",
    label: "Carrier insurance monitoring",
    status: "confirmed",
    detail: "Carrier insurance monitored as part of carrier compliance work.",
  },
  {
    id: "SEC-03",
    label: "Carrier safety-score monitoring",
    status: "confirmed",
    detail: "Carrier safety-score standing monitored as part of carrier compliance work.",
  },
  {
    id: "SEC-04",
    label: "Document imaging",
    status: "confirmed",
    detail: "Documents processed and retained via imaging (legacy site copy).",
  },
  { id: "SEC-05", label: "SOC 2 / ISO certification", status: "pending", detail: "Awaiting confirmation from Flat Bridge." },
  { id: "SEC-06", label: "Data residency / hosting location", status: "pending", detail: "Awaiting confirmation from Flat Bridge." },
  { id: "SEC-07", label: "Employee background checks", status: "pending", detail: "Awaiting confirmation from Flat Bridge." },
  { id: "SEC-08", label: "Incident response process", status: "pending", detail: "Awaiting confirmation from Flat Bridge." },
  { id: "SEC-09", label: "Data retention / deletion policy", status: "pending", detail: "Awaiting confirmation from Flat Bridge." },
];
