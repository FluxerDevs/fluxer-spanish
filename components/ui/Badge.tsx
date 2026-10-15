import { cx } from "@/lib/format";

type Tone = "neutral" | "primary" | "success" | "warning";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-muted text-fg-muted",
  primary: "bg-primary-soft text-on-primary-soft",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-semibold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
