/** Placeholder shown while a detail page resolves its slug on client navigation. */
export function ArticleSkeleton() {
  return (
    <div aria-busy="true" aria-label="Cargando" className="animate-pulse">
      <div className="border-b border-line pb-8">
        <div className="h-6 w-40 rounded-full bg-surface-muted" />
        <div className="mt-5 h-9 w-4/5 rounded-xl bg-surface-muted" />
        <div className="mt-4 h-5 w-3/5 rounded-lg bg-surface-muted" />
      </div>
      <div className="mt-8 space-y-4">
        <div className="h-5 w-full rounded-lg bg-surface-muted" />
        <div className="h-5 w-11/12 rounded-lg bg-surface-muted" />
        <div className="h-5 w-4/5 rounded-lg bg-surface-muted" />
        <div className="h-24 w-full rounded-2xl bg-surface-muted" />
      </div>
    </div>
  );
}
