import { cx } from "@/lib/format";
import { href as withBase } from "@/lib/url";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "border border-line-strong bg-surface text-fg hover:border-primary hover:text-primary",
  ghost: "text-fg hover:bg-surface-muted",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-4 text-[15px]",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-xl text-center font-semibold whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({ href, variant, size, className, children }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <a href={withBase(href)} className={classes}>
      {children}
    </a>
  );
}

type ButtonProps = React.ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

/** Placeholder data uses "#" until the real link exists. */
export function isPendingUrl(url: string | undefined) {
  return !url || url === "#";
}

/** Stand-in for an action whose link isn't ready yet: looks like the button, can't be clicked. */
export function PendingAction({
  label,
  variant = "secondary",
  className,
}: {
  label: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      aria-disabled="true"
      className={buttonClasses(variant, "md", cx("cursor-not-allowed opacity-60 hover:bg-transparent", className))}
    >
      {label}
      <span className="text-xs font-normal">(próximamente)</span>
    </span>
  );
}
