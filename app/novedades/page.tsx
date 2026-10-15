import type { Metadata } from "next";
import { TranslateIcon } from "@phosphor-icons/react/ssr";
import { UpdateCard } from "@/components/updates/UpdateCard";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/SectionHeader";
import { updates } from "@/content/updates";

export const metadata: Metadata = {
  title: "Novedades",
  description: "Las novedades y builds de Fluxer, traducidas al español por la comunidad.",
};

export default function UpdatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Novedades"
        title="Fluxer, al día y en español"
        description="Cada anuncio y cada build, traducidos por la comunidad. Siempre con enlace al original."
      >
        <p className="mt-5 inline-flex items-center gap-2 text-sm text-fg-muted">
          <TranslateIcon size={18} aria-hidden className="text-primary" />
          Traducción no oficial. Ante cualquier duda, manda el texto original.
        </p>
      </PageHeader>
      <section aria-label="Lista de novedades" className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {updates.map((update) => (
              <UpdateCard key={update.slug} update={update} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
