import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon, PencilSimpleIcon } from "@phosphor-icons/react/ssr";
import { GuideBody } from "@/components/guides/GuideBody";
import { GuideLevelBadge } from "@/components/guides/GuideCard";
import { ArticleSkeleton } from "@/components/ui/ArticleSkeleton";
import { Container } from "@/components/ui/Container";
import { getGuide, guides } from "@/content/guides";
import { site } from "@/content/site";

type Params = PageProps<"/guias/[slug]">["params"];

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata(props: PageProps<"/guias/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  return guide ? { title: guide.title, description: guide.summary } : {};
}

// Only the slug-dependent content waits behind Suspense, so guide-to-guide navigation stays instant.
export default function GuidePage(props: PageProps<"/guias/[slug]">) {
  return (
    <article className="py-10 sm:py-14">
      <Container className="max-w-3xl">
        <Suspense fallback={<ArticleSkeleton />}>
          <GuideContent params={props.params} />
        </Suspense>
      </Container>
    </article>
  );
}

async function GuideContent({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const index = guides.indexOf(guide);
  const previous = guides[index - 1];
  const next = guides[index + 1];

  return (
    <>
      <nav aria-label="Ruta de navegación" className="text-sm text-fg-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/guias" className="hover:text-primary">
              Guías
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-fg">
            {guide.title}
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-fg-muted">
          <GuideLevelBadge level={guide.level} />
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon size={16} aria-hidden />
            {guide.readMinutes} min de lectura
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{guide.title}</h1>
        <p className="mt-3 text-lg text-fg-muted">{guide.summary}</p>
      </header>

      <div className="mt-8">
        <GuideBody blocks={guide.body} />
      </div>

      <p className="mt-12 flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-surface p-5 text-[15px] text-fg-muted">
        <PencilSimpleIcon size={18} aria-hidden className="text-primary" />
        ¿Ves algo mejorable?
        <a href={site.socials.github} className="font-semibold text-primary hover:text-primary-hover">
          Sugiere cambios en GitHub
        </a>
      </p>

      <nav aria-label="Más guías" className="mt-8 grid gap-4 sm:grid-cols-2">
        {previous && (
          <Link
            href={`/guias/${previous.slug}`}
            prefetch
            className="group rounded-2xl border border-line p-5 hover:border-primary"
          >
            <span className="flex items-center gap-1.5 text-sm text-fg-muted">
              <ArrowLeftIcon size={16} aria-hidden /> Anterior
            </span>
            <span className="mt-1 block font-heading font-bold group-hover:text-primary">{previous.title}</span>
          </Link>
        )}
        {next && (
          <Link
            href={`/guias/${next.slug}`}
            prefetch
            className="group rounded-2xl border border-line p-5 text-right hover:border-primary sm:col-start-2"
          >
            <span className="flex items-center justify-end gap-1.5 text-sm text-fg-muted">
              Siguiente <ArrowRightIcon size={16} aria-hidden />
            </span>
            <span className="mt-1 block font-heading font-bold group-hover:text-primary">{next.title}</span>
          </Link>
        )}
      </nav>
    </>
  );
}
