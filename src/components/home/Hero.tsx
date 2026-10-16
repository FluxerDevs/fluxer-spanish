import { BookOpenTextIcon } from "@phosphor-icons/react/ssr";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { href } from "@/lib/url";

const steps = [
  {
    text: "Crea tu cuenta gratis en Fluxer.",
    link: { href: href("/guias/primeros-pasos"), label: "Cómo hacerlo" },
  },
  {
    text: `Únete al servidor en ${site.inviteLabel} y preséntate en #presentaciones.`,
    link: { href: site.inviteUrl, label: "Abrir invitación" },
  },
  {
    text: "Busca bots en español o añade tu comunidad al directorio.",
    link: { href: href("/comunidad"), label: "Ir a la comunidad" },
  },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:py-24">
        <div>
          <h1 id="hero-title" className="text-4xl font-extrabold sm:text-5xl">
            Tu casa en Fluxer, <span className="text-primary">en español</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-fg-muted">
            Guías escritas por la comunidad, las novedades de Fluxer traducidas y un directorio de
            bots y servidores que hablan español.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.inviteUrl} size="lg">
              Únete a {site.inviteLabel}
            </ButtonLink>
            <ButtonLink href="/guias" variant="secondary" size="lg">
              <BookOpenTextIcon size={20} aria-hidden />
              Leer las guías
            </ButtonLink>
          </div>
        </div>

        <div className="border-l-0 border-line lg:border-l lg:pl-10">
          <h2 className="font-heading text-lg font-bold">Si acabas de llegar</h2>
          <ol className="mt-4 space-y-4">
            {steps.map((step, index) => (
              <li key={step.text} className="flex gap-3">
                <span aria-hidden className="w-5 shrink-0 font-heading text-lg font-extrabold text-primary">
                  {index + 1}.
                </span>
                <p>
                  {step.text}{" "}
                  <a
                    href={step.link.href}
                    {...(step.link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    className="font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
                  >
                    {step.link.label}
                  </a>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
