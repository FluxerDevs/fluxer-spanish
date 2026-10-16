import { cx, initials } from "@/lib/format";

const sizes = {
  sm: "size-9 text-sm",
  md: "size-12 text-base",
  lg: "size-16 text-xl",
};

/** Initials avatar used for placeholder data until real images exist. */
export function Avatar({
  name,
  hue,
  size = "md",
  shape = "circle",
  className,
}: {
  name: string;
  hue: number;
  size?: keyof typeof sizes;
  shape?: "circle" | "rounded";
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={name}
      style={{ "--hue": hue } as React.CSSProperties}
      className={cx(
        "avatar-tint inline-flex shrink-0 items-center justify-center font-heading font-extrabold select-none",
        shape === "circle" ? "rounded-full" : "rounded-2xl",
        sizes[size],
        className,
      )}
    >
      <span aria-hidden>{initials(name)}</span>
    </span>
  );
}
