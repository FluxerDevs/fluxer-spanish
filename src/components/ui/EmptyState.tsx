import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-strong px-6 py-12 text-center">
      <MagnifyingGlassIcon size={32} aria-hidden className="mb-3 text-fg-muted" />
      <p className="font-heading text-lg font-bold">{title}</p>
      <p className="mt-1 max-w-sm text-fg-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
