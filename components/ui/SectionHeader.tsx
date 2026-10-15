import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  link,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-sm font-bold tracking-wide text-primary uppercase">{eyebrow}</p>
        )}
        <h2 id={id} className="text-2xl font-extrabold sm:text-3xl">
          {title}
        </h2>
        {description && <p className="mt-2 text-fg-muted">{description}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 font-semibold text-primary hover:text-primary-hover"
        >
          {link.label}
          <ArrowRightIcon
            size={18}
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-line bg-surface-muted/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-2 text-sm font-bold tracking-wide text-primary uppercase">{eyebrow}</p>
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-fg-muted">{description}</p>
        {children}
      </div>
    </header>
  );
}
