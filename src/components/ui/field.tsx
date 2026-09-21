"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (props: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean }) => React.ReactNode;
}

/**
 * brief §21 accessibility: real <label> always, aria-describedby for errors.
 * Wraps any input/textarea/select — pass a render prop so the field owns id
 * wiring without every call site repeating it.
 */
export function Field({ label, error, required, className, children }: FieldProps) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-small text-current/70">
        {label}
        {required ? " *" : ""}
      </label>
      {children({
        id,
        "aria-describedby": errorId,
        "aria-invalid": Boolean(error),
      })}
      {error ? (
        <p id={errorId} className="text-small text-[var(--color-warn)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputBase =
  "w-full rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-transparent px-3 py-2.5 text-body text-current outline-none transition-colors focus:border-[var(--color-green)] aria-invalid:border-[var(--color-warn)]";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputBase, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} {...props} className={cn(inputBase, "resize-y", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputBase, props.className)} />;
}
