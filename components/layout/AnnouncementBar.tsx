import Link from "next/link";
import { ArrowRightIcon, MegaphoneSimpleIcon } from "@phosphor-icons/react/ssr";
import { DismissAnnouncement } from "@/components/layout/DismissAnnouncement";
import type { Update } from "@/lib/types";

export function AnnouncementBar({ update }: { update: Update }) {
  const label = update.kind === "build" ? "Nueva build" : "Novedad";

  return (
    <div data-announcement className="bg-primary text-on-primary">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <MegaphoneSimpleIcon size={20} aria-hidden className="hidden shrink-0 sm:block" />
        <p className="min-w-0 flex-1 text-[15px] leading-snug">
          <span className="font-bold">{label}:</span>{" "}
          <Link
            href={`/novedades/${update.slug}`}
            prefetch
            className="group inline-flex flex-wrap items-center gap-1 underline decoration-on-primary/40 underline-offset-4 hover:decoration-on-primary"
          >
            {update.title} — léelo en español
            <ArrowRightIcon size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
        <DismissAnnouncement id={update.slug} />
      </div>
    </div>
  );
}
