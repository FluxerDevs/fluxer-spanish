import Link from "next/link";
import { ClockIcon, ShieldStarIcon, SparkleIcon } from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/Badge";
import { guideLevelLabels } from "@/content/guides";
import type { Guide } from "@/lib/types";

export function GuideLevelBadge({ level }: { level: Guide["level"] }) {
  const Icon = level === "beginner" ? SparkleIcon : ShieldStarIcon;
  return (
    <Badge tone={level === "beginner" ? "success" : "primary"}>
      <Icon size={15} weight="bold" aria-hidden />
      {guideLevelLabels[level]}
    </Badge>
  );
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-primary">
      <GuideLevelBadge level={guide.level} />
      <h3 className="mt-3 text-lg font-bold">
        <Link
          href={`/guias/${guide.slug}`}
          prefetch
          className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-primary"
        >
          {guide.title}
        </Link>
      </h3>
      <p className="mt-2 text-[15px] text-fg-muted">{guide.summary}</p>
      <p className="mt-auto flex items-center gap-1.5 pt-4 text-sm text-fg-muted">
        <ClockIcon size={16} aria-hidden />
        {guide.readMinutes} min de lectura
      </p>
    </article>
  );
}
