import type { Metadata } from "next";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { CommunityDirectory } from "@/components/community/CommunityDirectory";
import { CreatorCard } from "@/components/community/CreatorCard";
import { TemplateCard } from "@/components/community/TemplateCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader, SectionHeader } from "@/components/ui/SectionHeader";
import { communities, creators, templates } from "@/content/community";

export const metadata: Metadata = {
  title: "Rincón de la comunidad",
  description: "Comunidades en español para unirte, plantillas de servidor preconfiguradas y creadores hispanos en Fluxer.",
};

const sections = [
  { id: "comunidades", label: "Comunidades" },
  { id: "plantillas", label: "Plantillas" },
  { id: "creadores", label: "Creadores" },
];

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rincón de la comunidad"
        title="Hecho por gente como tú"
        description="Explora comunidades en español, monta tu servidor con una plantilla y conoce a creadores hispanos."
      >
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <ButtonLink href="/comunidad/enviar">
            <PlusIcon size={18} weight="bold" aria-hidden />
            Añade tu comunidad
          </ButtonLink>
          <nav aria-label="Secciones de la página" className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold hover:border-primary hover:text-primary"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </PageHeader>

      <section aria-labelledby="comunidades" className="scroll-mt-20 py-12 sm:py-16">
        <Container>
          <SectionHeader
            id="comunidades"
            title="Comunidades en español"
            description="Servidores revisados por el equipo. Únete al que más te guste."
          />
          <CommunityDirectory communities={communities} />
        </Container>
      </section>

      <section aria-labelledby="plantillas" className="scroll-mt-20 border-y border-line bg-surface-muted/60 py-12 sm:py-16">
        <Container>
          <SectionHeader
            id="plantillas"
            title="Plantillas de servidor"
            description="Canales y roles ya organizados, con nombres en español. Úsalas tal cual o adáptalas."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="creadores" className="scroll-mt-20 py-12 sm:py-16">
        <Container>
          <SectionHeader
            id="creadores"
            title="Creadores hispanos"
            description="Streamers, artistas y divulgadores de la comunidad que están en Fluxer."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
