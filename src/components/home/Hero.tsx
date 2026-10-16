import { ArrowRightIcon, BookOpenTextIcon, HashIcon } from "@phosphor-icons/react/ssr";
import { LogoMark } from "@/components/layout/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

const previewMessages = [
  { name: "Valeria", hue: 330, time: "18:02", text: "¡Hola! Acabo de llegar desde Discord, ¿por dónde empiezo?" },
  { name: "Mateo", hue: 200, time: "18:03", text: "¡Bienvenida! Mira la guía de primeros pasos, en 5 minutos lo tienes." },
  { name: "Lucía", hue: 150, time: "18:04", text: "Y si tienes servidor, en la web hay plantillas en español." },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm font-semibold text-fg-muted">
            <span className="size-2 rounded-full bg-success" aria-hidden />
            Comunidad hispana de Fluxer
          </p>
          <h1 id="hero-title" className="mt-5 text-4xl font-extrabold sm:text-5xl">
            Tu casa en Fluxer, <span className="text-primary">en español</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-fg-muted">
            Guías paso a paso, bots que te hablan en tu idioma y gente con la que charlar. Todo lo
            que necesitas para sentirte en casa, en un solo lugar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.inviteUrl} size="lg">
              Únete a {site.inviteLabel}
              <ArrowRightIcon size={18} weight="bold" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/guias" variant="secondary" size="lg">
              <BookOpenTextIcon size={20} aria-hidden />
              Empieza con las guías
            </ButtonLink>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {[
              ["+2.000", "miembros"],
              ["6", "guías en español"],
              ["9", "bots revisados"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-heading text-2xl font-extrabold">{value}</dd>
                <dd className="text-sm text-fg-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Decorative chat preview: shows the tone of the community, not real messages. */}
        <div aria-hidden className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary-soft" />
          <div className="rounded-3xl border border-line bg-surface shadow-soft">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
              <LogoMark size={24} />
              <span className="font-heading font-bold">Fluxer Español</span>
              <span className="ml-auto inline-flex items-center gap-1 text-sm text-fg-muted">
                <HashIcon size={15} />
                bienvenida
              </span>
            </div>
            <ul className="space-y-5 px-5 py-5">
              {previewMessages.map((message) => (
                <li key={message.name} className="flex gap-3">
                  <Avatar name={message.name} hue={message.hue} size="sm" />
                  <div>
                    <p className="text-sm">
                      <span className="font-bold">{message.name}</span>{" "}
                      <span className="text-fg-muted">{message.time}</span>
                    </p>
                    <p className="text-[15px]">{message.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-5 py-3.5">
              <div className="rounded-full bg-surface-muted px-4 py-2.5 text-sm text-fg-muted">
                Escribe en #bienvenida
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
