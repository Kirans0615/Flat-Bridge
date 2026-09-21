/**
 * brief §15.2 — demo build, forms never actually send anything. Behind
 * NEXT_PUBLIC_FORMS_LIVE the real path would POST to /api/contact; that
 * route handler doesn't exist in this build (no backend per brief §0/§23),
 * so it's not implemented. Swapping in a real handler is scoped to this one
 * file, per the pattern carried forward from v1's CLAUDE.md.
 */
export async function submitForm(_data: Record<string, unknown>): Promise<{ ok: true }> {
  const live = process.env.NEXT_PUBLIC_FORMS_LIVE === "true";

  if (!live) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { ok: true };
  }

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(_data),
  });
  if (!res.ok) throw new Error("Form submission failed");
  return { ok: true };
}
