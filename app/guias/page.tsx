import type { Metadata } from "next";
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";
import { FaqList } from "@/components/guides/FaqList";
import { GuideLibrary } from "@/components/guides/GuideLibrary";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader, SectionHeader } from "@/components/ui/SectionHeader";
import { faq } from "@/content/faq";
import { guides } from "@/content/guides";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Centro de guías",
  description: "Tutoriales de Fluxer en español para principiantes y admins de servidores, y preguntas frecuentes.",
};

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Centro de guías"
        title="Aprende Fluxer a tu ritmo"
        description="Tutoriales en español, ordenados por nivel. Empieza por lo básico o salta directo a gestionar tu servidor."
      />

      <section aria-label="Guías" className="py-12 sm:py-16">
        <Container>
          <GuideLibrary guides={guides} />
        </Container>
      </section>

      <section aria-labelledby="faq" className="border-t border-line py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <SectionHeader
              id="faq"
              eyebrow="FAQ"
              title="Preguntas frecuentes"
              description="Las dudas que más nos llegan al servidor. ¿No encuentras la tuya? Pregunta sin miedo."
            />
            <ButtonLink href={site.socials.github} variant="secondary">
              <GithubLogoIcon size={18} aria-hidden />
              Proponer una guía
            </ButtonLink>
          </div>
          <FaqList items={faq} />
        </Container>
      </section>
    </>
  );
}
