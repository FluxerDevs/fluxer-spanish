import type { Metadata } from "next";
import { Suspense } from "react";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { BotDirectory, BotDirectoryFallback } from "@/components/bots/BotDirectory";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/SectionHeader";
import { bots } from "@/content/bots";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Directorio de bots",
  description: "Bots para Fluxer con soporte en español, filtrados por categoría. También bots útiles en inglés, bien señalados.",
};

export default function BotsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio de bots"
        title="Bots para tu servidor"
        description="Elegidos por la comunidad. Te indicamos claramente cuáles hablan español y cuáles no."
      >
        <div className="mt-6">
          <ButtonLink href={site.socials.github} variant="secondary">
            <PlusIcon size={18} weight="bold" aria-hidden />
            Sugerir un bot
          </ButtonLink>
        </div>
      </PageHeader>
      <section aria-label="Bots" className="py-12 sm:py-16">
        <Container>
          {/* useSearchParams needs a Suspense boundary; the fallback keeps the full list in the static HTML. */}
          <Suspense fallback={<BotDirectoryFallback bots={bots} />}>
            <BotDirectory bots={bots} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
