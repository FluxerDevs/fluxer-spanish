import { ArrowUpRightIcon, SealCheckIcon } from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/Badge";
import { isPendingUrl } from "@/components/ui/Button";
import type { Tool } from "@/lib/types";

export function ToolCard({ tool, compact = false }: { tool: Tool; compact?: boolean }) {
  const external = tool.url.startsWith("http");
  const pending = isPendingUrl(tool.url);

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-primary">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold">
          {pending ? (
            tool.name
          ) : (
            <a
              href={tool.url}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-primary"
            >
              {tool.name}
            </a>
          )}
        </h3>
        {pending ? (
          <Badge>Próximamente</Badge>
        ) : (
          <ArrowUpRightIcon
            size={20}
            aria-label="Abre otra web"
            className="mt-1 shrink-0 text-fg-muted group-hover:text-primary"
          />
        )}
      </div>
      <p className="mt-1 text-[15px] font-semibold text-fg-muted">{tool.tagline}</p>
      {!compact && (
        <div className="mt-4 rounded-xl bg-surface-muted p-4">
          <p className="text-sm font-bold">¿Para qué sirve?</p>
          <p className="mt-1 text-[15px] text-fg-muted">{tool.purpose}</p>
        </div>
      )}
      <div className="mt-auto pt-4">
        {tool.official ? (
          <Badge tone="primary">
            <SealCheckIcon size={15} weight="bold" aria-hidden />
            Oficial de Fluxer
          </Badge>
        ) : (
          <Badge>Proyecto de la comunidad</Badge>
        )}
      </div>
    </article>
  );
}

/** One-line entry for the home page list: name, what it is for, and where it goes. */
export function ToolRow({ tool }: { tool: Tool }) {
  const external = tool.url.startsWith("http");
  return (
    <li className="group relative flex items-start justify-between gap-4 py-3">
      <div>
        <a
          href={tool.url}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          className="font-heading font-bold after:absolute after:inset-0 group-hover:text-primary"
        >
          {tool.name}
        </a>
        <p className="text-[15px] text-fg-muted">{tool.tagline}</p>
      </div>
      {external && (
        <ArrowUpRightIcon size={18} aria-label="Abre otra web" className="mt-1 shrink-0 text-fg-muted group-hover:text-primary" />
      )}
    </li>
  );
}
