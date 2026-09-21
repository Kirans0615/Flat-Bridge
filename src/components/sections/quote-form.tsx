"use client";

import { useId, useState } from "react";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { submitForm } from "@/lib/submit-form";
import { site } from "@/content/site";

/**
 * brief §8.15 / §15.1 — the "Book a discovery call" form, shared between the
 * homepage CTA band and /contact. Simulated submit only (no live backend,
 * brief §0/§15.2): label -> pending -> success panel, in place.
 * motion: pending state travels a hairline dot along the submit button;
 * reduced motion just swaps text with no travel animation.
 */
const needOptions = [
  "Trucking & drayage",
  "Freight brokerage",
  "Warehousing",
  "Intermodal",
  "3PL",
  "Shipper",
  "Not sure",
];

export function QuoteForm({ tone = "ink" as "ink" | "paper" }) {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const headingId = useId();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
    try {
      const form = new FormData(e.currentTarget);
      await submitForm(Object.fromEntries(form.entries()));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="flex flex-col gap-2">
        <h3 id={headingId} tabIndex={-1} className="text-h3 font-[var(--font-display)]" ref={(el) => el?.focus()}>
          Got it. We&apos;ll reply within one business day.
        </h3>
        <p className="font-mono text-small text-current/70">
          {site.location.label} · local time
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-busy={status === "pending"}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          {(p) => <Input {...p} name="name" required autoComplete="name" />}
        </Field>
        <Field label="Work email" required>
          {(p) => <Input {...p} name="email" type="email" required autoComplete="email" />}
        </Field>
        <Field label="Company">{(p) => <Input {...p} name="company" autoComplete="organization" />}</Field>
        <Field label="Role">{(p) => <Input {...p} name="role" />}</Field>
      </div>
      <Field label="What you need help with">
        {(p) => (
          <Select {...p} name="need" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {needOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <Field label="Message">{(p) => <Textarea {...p} name="message" />}</Field>
      {status === "error" ? (
        <p role="alert" className="text-small text-[var(--color-warn)]">
          Something went wrong — try again in a moment.
        </p>
      ) : null}
      <Button type="submit" variant={tone === "ink" ? "solid" : "solid"} className="self-start">
        {status === "pending" ? "Sending…" : "Book a discovery call"}
      </Button>
    </form>
  );
}
