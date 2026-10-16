import { HashIcon, SpeakerHighIcon } from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/Badge";
import { PendingAction } from "@/components/ui/Button";
import type { ServerTemplate } from "@/lib/types";

export function TemplateCard({ template }: { template: ServerTemplate }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5">
      <h3 className="text-lg font-bold">{template.name}</h3>
      <p className="mt-1 text-[15px] text-fg-muted">{template.description}</p>
      <p className="mt-2 text-sm">
        <span className="font-semibold">Ideal para:</span>{" "}
        <span className="text-fg-muted">{template.idealFor}</span>
      </p>

      {/* Miniature of the server sidebar so people can see the structure at a glance. */}
      <div className="mt-4 rounded-xl bg-surface-muted p-3 text-sm" aria-label="Vista previa de canales">
        {template.categories.map((category) => (
          <div key={category.name} className="mb-2 last:mb-0">
            <p className="px-1 text-xs font-bold tracking-wide text-fg-muted uppercase">{category.name}</p>
            <ul>
              {category.channels.map((channel) => {
                const Icon = category.voice ? SpeakerHighIcon : HashIcon;
                return (
                  <li key={channel} className="flex items-center gap-1.5 px-1 py-0.5 text-fg-muted">
                    <Icon size={14} aria-hidden />
                    <span>{channel}</span>
                    {category.voice && <span className="sr-only">(canal de voz)</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Roles incluidos">
        {template.roles.map((role) => (
          <li key={role}>
            <Badge tone="primary">{role}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        {/* TODO: link to the Fluxer template once the staff publishes it. */}
        <PendingAction label="Usar plantilla" className="w-full" />
      </div>
    </article>
  );
}
