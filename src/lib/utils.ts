import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's built-in scale — it has no idea this
 * project's `@theme` block (globals.css) defines its own `text-*` font-size
 * tokens and a `font-display` font-family. Left unextended, it misclassifies
 * those as conflicting with a trailing color/weight class (e.g. `text-h1 ...
 * text-white`) and silently drops the size/family class, shrinking headings
 * to the browser default. Registering them here fixes every `cn()` call site.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-d1",
        "text-d2",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-body-lg",
        "text-body",
        "text-small",
        "text-micro",
      ],
      "font-family": ["font-display"],
    },
  },
});

/**
 * Merge Tailwind class names, resolving conflicts left-to-right.
 * Required by the provided `_design-refs` components, which import `@/lib/utils`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
