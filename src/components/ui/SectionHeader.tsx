import type { Icon } from "@phosphor-icons/react";
import { href } from "@/lib/url";

export function SectionHeader({
  id,
  icon: HeadingIcon,
  title,
  description,
  link,
}: {
  id?: string;
  icon?: Icon;
  title: string;
  description?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 id={id} className="flex items-center gap-2.5 text-2xl font-extrabold sm:text-3xl">
          {HeadingIcon && <HeadingIcon size={28} aria-hidden className="shrink-0 text-primary" />}
          {title}
        </h2>
        {description && <p className="mt-2 text-fg-muted">{description}</p>}
      </div>
      {link && (
        <a
          href={href(link.href)}
          className="inline-flex min-h-11 shrink-0 items-center font-semibold text-primary underline-offset-4 hover:text-primary-hover hover:underline"
        >
          {link.label}
        </a>
      )}
    </div>
  );
}

export function PageHeader({
  icon: HeadingIcon,
  title,
  description,
  children,
}: {
  icon: Icon;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-line bg-surface-muted/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold sm:text-4xl">
          <HeadingIcon size={36} aria-hidden className="shrink-0 text-primary" />
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-fg-muted">{description}</p>
        {children}
      </div>
    </header>
  );
}
