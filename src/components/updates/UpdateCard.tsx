import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";
import { href } from "@/lib/url";
import type { Update } from "@/lib/types";

export function UpdateKindBadge({ update }: { update: Update }) {
  return update.kind === "build" ? (
    <Badge tone="primary">Build {update.version}</Badge>
  ) : (
    <Badge tone="success">Novedad</Badge>
  );
}

export function UpdateCard({ update }: { update: Update }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-primary">
      <div className="flex flex-wrap items-center gap-2 text-sm text-fg-muted">
        <UpdateKindBadge update={update} />
        <time dateTime={update.date}>{formatDate(update.date)}</time>
      </div>
      <h3 className="mt-3 text-lg font-bold">
        <a
          href={href(`/novedades/${update.slug}`)}
          className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-primary"
        >
          {update.title}
        </a>
      </h3>
      <p className="mt-2 text-[15px] text-fg-muted">{update.summary}</p>
      <p className="mt-auto pt-4 text-sm text-fg-muted">
        Anunciado por <span className="font-semibold text-fg">{update.author}</span>
      </p>
    </article>
  );
}

/** Compact row for the home page: date, type and title, newest first. */
export function UpdateRow({ update }: { update: Update }) {
  return (
    <li className="group relative grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
      <div className="flex items-center gap-2 text-sm text-fg-muted sm:flex-col sm:items-start sm:gap-1.5">
        <time dateTime={update.date}>{formatDate(update.date)}</time>
        <UpdateKindBadge update={update} />
      </div>
      <div>
        <h3 className="font-heading text-lg font-bold">
          <a href={href(`/novedades/${update.slug}`)} className="after:absolute after:inset-0 group-hover:text-primary">
            {update.title}
          </a>
        </h3>
        <p className="mt-1 text-[15px] text-fg-muted">{update.summary}</p>
      </div>
    </li>
  );
}
