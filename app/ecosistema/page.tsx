import type { Metadata } from "next";
import { ToolCard } from "@/components/ecosystem/ToolCard";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/SectionHeader";
import { toolGroupLabels, tools } from "@/content/tools";
import type { ToolGroup } from "@/lib/types";

export const metadata: Metadata = {
  title: "Ecosistema y herramientas",
  description: "Fluxer.host, Fluxername, feedback y más: enlaces útiles explicados en español.",
};

const groups = Object.keys(toolGroupLabels) as ToolGroup[];

export default function EcosystemPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ecosistema"
        title="Herramientas, explicadas en sencillo"
        description="Todo lo que rodea a Fluxer, con una explicación corta de para qué sirve cada cosa."
      >
        <nav aria-label="Grupos" className="mt-6 flex flex-wrap gap-2">
          {groups.map((group) => (
            <a
              key={group}
              href={`#${group}`}
              className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold hover:border-primary hover:text-primary"
            >
              {toolGroupLabels[group].title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <Container className="py-12 sm:py-16">
        <div className="space-y-14">
          {groups.map((group) => (
            <section key={group} aria-labelledby={group} className="scroll-mt-24">
              <h2 id={group} className="scroll-mt-24 text-2xl font-extrabold">
                {toolGroupLabels[group].title}
              </h2>
              <p className="mt-1 text-fg-muted">{toolGroupLabels[group].description}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools
                  .filter((tool) => tool.group === group)
                  .map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
