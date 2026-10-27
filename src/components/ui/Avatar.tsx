import { cx, initials } from "@/lib/format";

const sizes = {
  sm: "size-9 text-sm",
  md: "size-12 text-base",
  lg: "size-16 text-xl",
};

/** Image avatar from Fluxer when there is one, otherwise initials on a tinted background. */
export function Avatar({
  name,
  hue,
  src,
  size = "md",
  shape = "circle",
  className,
}: {
  name: string;
  hue: number;
  src?: string;
  size?: keyof typeof sizes;
  shape?: "circle" | "rounded";
  className?: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        className={cx(
          "shrink-0 bg-surface-muted object-cover",
          shape === "circle" ? "rounded-full" : "rounded-2xl",
          sizes[size],
          className,
        )}
      />
    );
  }
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
