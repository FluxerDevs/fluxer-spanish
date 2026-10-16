import { ArrowSquareOutIcon, PlusIcon } from "@phosphor-icons/react/ssr";
import { LanguageBadge } from "@/components/bots/LanguageBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses, isPendingUrl, PendingAction } from "@/components/ui/Button";
import { botCategoryLabels } from "@/data/bots";
import type { Bot } from "@/lib/types";

export function BotCard({ bot }: { bot: Bot }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-start gap-3">
        <Avatar name={bot.name} hue={bot.hue} shape="rounded" />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold">{bot.name}</h3>
          <div className="mt-1">
            <LanguageBadge language={bot.language} />
          </div>
        </div>
      </div>
      <p className="mt-4 text-[15px] text-fg-muted">{bot.description}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Categorías">
        {bot.categories.map((category) => (
          <li key={category}>
            <Badge>{botCategoryLabels[category]}</Badge>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {isPendingUrl(bot.inviteUrl) ? (
          <PendingAction label="Invitar" className="flex-1" />
        ) : (
          <a
            href={bot.inviteUrl}
            className={buttonClasses("primary", "md", "flex-1")}
            aria-label={`Invitar a ${bot.name}`}
          >
            <PlusIcon size={18} weight="bold" aria-hidden />
            Invitar
          </a>
        )}
        {!isPendingUrl(bot.website) && (
          <a
            href={bot.website}
            className={buttonClasses("secondary", "md")}
            aria-label={`Web de ${bot.name}`}
          >
            <ArrowSquareOutIcon size={18} aria-hidden />
            Web
          </a>
        )}
      </div>
    </article>
  );
}
