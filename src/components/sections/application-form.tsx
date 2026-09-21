"use client";

import { useId, useState } from "react";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { submitForm } from "@/lib/submit-form";
import { roles } from "@/content/careers";

/**
 * brief §14.3 — careers application form. Simulated submit only.
 * motion: drag-active state solidifies the dashed drop border to solid green;
 * reduced motion just toggles the border color instantly.
 */
export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
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
      <div role="status" aria-live="polite">
        <h3 id={headingId} tabIndex={-1} ref={(el) => el?.focus()} className="text-h3 font-[var(--font-display)]">
          Application received. We&apos;ll be in touch.
        </h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-busy={status === "pending"}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          {(p) => <Input {...p} name="name" required autoComplete="name" />}
        </Field>
        <Field label="Email" required>
          {(p) => <Input {...p} name="email" type="email" required autoComplete="email" />}
        </Field>
        <Field label="Phone">{(p) => <Input {...p} name="phone" type="tel" autoComplete="tel" />}</Field>
        <Field label="Role" required>
          {(p) => (
            <Select {...p} name="role" required defaultValue="">
              <option value="" disabled>
                Choose a role
              </option>
              {roles.map((r) => (
                <option key={r.slug} value={r.title}>
                  {r.title}
                </option>
              ))}
              <option value="General application">General application</option>
            </Select>
          )}
        </Field>
      </div>

      <div
        className="flex flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed p-8 text-center transition-colors"
        style={{
          borderColor: dragActive ? "var(--color-green)" : "var(--color-hairline)",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const f = e.dataTransfer.files?.[0];
          if (f) setFileName(f.name);
        }}
      >
        <label htmlFor="cv-upload" className="text-small text-current/70">
          {fileName ?? "Drag a CV here, or choose a file (.pdf, .docx, up to 5MB)"}
        </label>
        <input
          id="cv-upload"
          name="cv"
          type="file"
          accept=".pdf,.docx"
          className="text-small"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </div>

      <Field label="LinkedIn">{(p) => <Input {...p} name="linkedin" type="url" />}</Field>
      <Field label="Message">{(p) => <Textarea {...p} name="message" />}</Field>

      {status === "error" ? (
        <p role="alert" className="text-small text-[var(--color-warn)]">
          Something went wrong — try again in a moment.
        </p>
      ) : null}

      <Button type="submit" className="self-start">
        {status === "pending" ? "Sending…" : "Submit application"}
      </Button>
    </form>
  );
}
