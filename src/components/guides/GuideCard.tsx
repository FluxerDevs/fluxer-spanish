import { ClockIcon, PlantIcon, ShieldStarIcon } from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/Badge";
import type { GuideLevel, GuideSummary } from "@/lib/types";

const levelLabels: Record<GuideLevel, string> = {
  beginner: "Principiantes",
  admin: "Admins de servidores",
};

export function GuideLevelBadge({ level }: { level: GuideLevel }) {
  const Icon = level === "beginner" ? PlantIcon : ShieldStarIcon;
  return (
    <Badge tone={level === "beginner" ? "success" : "primary"} className="self-start">
      <Icon size={15} weight="bold" aria-hidden />
      {levelLabels[level]}
    </Badge>
  );
}

export function GuideCard({ guide }: { guide: GuideSummary }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-primary">
      <GuideLevelBadge level={guide.level} />
      <h3 className="mt-3 text-lg font-bold">
        <a href={guide.href} className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-primary">
          {guide.title}
        </a>
      </h3>
      <p className="mt-2 text-[15px] text-fg-muted">{guide.description}</p>
      {guide.readMinutes && (
        <p className="mt-auto flex items-center gap-1.5 pt-4 text-sm text-fg-muted">
          <ClockIcon size={16} aria-hidden />
          {guide.readMinutes} min de lectura
        </p>
      )}
    </article>
  );
}
