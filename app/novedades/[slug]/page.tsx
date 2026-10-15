import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowSquareOutIcon,
  BugBeetleIcon,
  SparkleIcon,
  TranslateIcon,
  TrendUpIcon,
} from "@phosphor-icons/react/ssr";
import { UpdateKindBadge } from "@/components/updates/UpdateCard";
import { ArticleSkeleton } from "@/components/ui/ArticleSkeleton";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getUpdate, updates } from "@/content/updates";
import { formatDate } from "@/lib/format";
import type { ChangelogSection } from "@/lib/types";

const sectionIcons: Record<ChangelogSection["title"], typeof SparkleIcon> = {
  Nuevo: SparkleIcon,
  Mejoras: TrendUpIcon,
  Correcciones: BugBeetleIcon,
};

type Params = PageProps<"/novedades/[slug]">["params"];

export function generateStaticParams() {
  return updates.map((update) => ({ slug: update.slug }));
}

export async function generateMetadata(props: PageProps<"/novedades/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const update = getUpdate(slug);
  return update ? { title: update.title, description: update.summary } : {};
}

// The slug is URL data, so only the part that reads it sits behind Suspense;
// the frame around it stays in the shared shell and navigations render instantly.
export default function UpdatePage(props: PageProps<"/novedades/[slug]">) {
  return (
    <article className="py-10 sm:py-14">
      <Container className="max-w-3xl">
        <Suspense fallback={<ArticleSkeleton />}>
          <UpdateContent params={props.params} />
        </Suspense>
      </Container>
    </article>
  );
}

async function UpdateContent({ params }: { params: Params }) {
  const { slug } = await params;
  const update = getUpdate(slug);
  if (!update) notFound();

  return (
    <>
      <nav aria-label="Ruta de navegación" className="text-sm text-fg-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/novedades" className="hover:text-primary">
              Novedades
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-fg">
            {update.version ? `Build ${update.version}` : update.title}
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-fg-muted">
          <UpdateKindBadge update={update} />
          <time dateTime={update.date}>{formatDate(update.date)}</time>
          <span>· Anunciado por {update.author}</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{update.title}</h1>
        <p className="mt-3 text-lg text-fg-muted">{update.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={update.originalUrl} variant="secondary">
            <ArrowSquareOutIcon size={18} aria-hidden />
            Ver original (inglés)
          </ButtonLink>
        </div>
      </header>

      <div className="mt-8 space-y-10">
        {update.sections.map((section) => {
          const Icon = sectionIcons[section.title];
          return (
            <section key={section.title} aria-labelledby={`section-${section.title}`}>
              <h2 id={`section-${section.title}`} className="flex items-center gap-2 text-2xl font-extrabold">
                <Icon size={24} aria-hidden className="text-primary" />
                {section.title}
              </h2>
              <ul className="mt-4 space-y-3 text-[17px]">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-12 flex gap-2.5 rounded-2xl border border-line bg-surface p-5 text-[15px] text-fg-muted">
        <TranslateIcon size={20} aria-hidden className="mt-0.5 shrink-0 text-primary" />
        <span>
          Traducido por <strong className="text-fg">{update.translatedBy}</strong>. Es una
          traducción no oficial: si algo no cuadra, el texto original manda.
        </span>
      </p>
    </>
  );
}
