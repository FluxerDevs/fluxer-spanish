import { CircleIcon, MapPinIcon, UsersIcon } from "@phosphor-icons/react/ssr";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses, isPendingUrl, PendingAction } from "@/components/ui/Button";
import { communityTopicLabels } from "@/data/community";
import { formatNumber } from "@/lib/format";
import type { Community } from "@/lib/types";

export function CommunityCard({ community }: { community: Community }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-start gap-3">
        <Avatar name={community.name} hue={community.hue} src={community.iconUrl} shape="rounded" />
        <div className="min-w-0">
          <h3 className="text-lg font-bold">{community.name}</h3>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg-muted">
            <span className="inline-flex items-center gap-1">
              <UsersIcon size={15} aria-hidden />
              {formatNumber(community.members)} miembros
            </span>
            {community.online !== undefined && (
              <span className="inline-flex items-center gap-1">
                <CircleIcon size={10} weight="fill" aria-hidden className="text-success" />
                {formatNumber(community.online)} en línea
              </span>
            )}
            {community.country && (
              <span className="inline-flex items-center gap-1">
                <MapPinIcon size={15} aria-hidden />
                {community.country}
              </span>
            )}
          </p>
        </div>
      </div>
      <p className="mt-4 text-[15px] text-fg-muted">{community.description}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Temas">
        {community.topics.map((topic) => (
          <li key={topic}>
            <Badge>{communityTopicLabels[topic]}</Badge>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-5">
        {isPendingUrl(community.inviteUrl) ? (
          <PendingAction label="Unirse" className="w-full" />
        ) : (
          <a
            href={community.inviteUrl}
            className={buttonClasses("secondary", "md", "w-full")}
            aria-label={`Unirse a ${community.name}`}
          >
            Unirse
          </a>
        )}
      </div>
    </article>
  );
}
