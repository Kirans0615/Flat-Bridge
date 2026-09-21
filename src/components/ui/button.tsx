import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "ghost" | "link";

interface BaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsLink = BaseProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;
type ButtonAsButton = BaseProps & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green-lift)]";

const variants: Record<ButtonVariant, string> = {
  solid:
    "bg-[var(--color-green)] text-white hover:bg-[var(--color-green-deep)]",
  ghost:
    "border border-[var(--color-hairline)] text-current hover:border-[var(--color-green)] data-[tone=ink]:border-[var(--color-steel-700)] data-[tone=ink]:text-[var(--color-concrete)] data-[tone=ink]:hover:border-[var(--color-green-lift)]",
  link: "underline-offset-4 hover:underline px-0 py-0 rounded-none",
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "solid", className, children, href, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        data-cursor="link"
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      data-cursor="link"
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
