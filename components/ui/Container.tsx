import { cx } from "@/lib/format";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}
