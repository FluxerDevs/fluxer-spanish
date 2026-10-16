import { cx } from "@/lib/format";

export function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(
        "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors duration-200",
        pressed
          ? "border-primary bg-primary text-on-primary"
          : "border-line bg-surface text-fg hover:border-primary hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
