import { Avatar } from "@/components/ui/Avatar";
import { isPendingUrl } from "@/components/ui/Button";
import type { Creator } from "@/lib/types";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <article className="flex h-full flex-col items-center rounded-2xl border border-line bg-surface p-5 text-center">
      <Avatar name={creator.name} hue={creator.hue} size="lg" />
      <h3 className="mt-3 text-lg font-bold">{creator.name}</h3>
      <p className="text-sm text-fg-muted">
        {creator.handle} · {creator.country}
      </p>
      <p className="mt-3 text-[15px] text-fg-muted">{creator.description}</p>
      <ul className="mt-auto flex flex-wrap justify-center gap-2 pt-4">
        {creator.links.map((link) => (
          <li key={link.label}>
            {isPendingUrl(link.url) ? (
              <span
                aria-disabled="true"
                className="inline-flex min-h-10 cursor-not-allowed items-center rounded-full border border-line px-3.5 text-sm font-semibold text-fg-muted"
              >
                {link.label}
                <span className="sr-only"> de {creator.name}, próximamente</span>
              </span>
            ) : (
            <a
              href={link.url}
              className="inline-flex min-h-10 items-center rounded-full border border-line px-3.5 text-sm font-semibold hover:border-primary hover:text-primary"
            >
              {link.label}
              <span className="sr-only"> de {creator.name}</span>
            </a>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
