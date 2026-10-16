import { site } from "@/data/site";
import { href } from "@/lib/url";

const steps = [
  {
    title: "Crea tu cuenta",
    text: "Regístrate gratis en Fluxer. Si te atascas, la guía de primeros pasos te acompaña.",
    link: { href: "/guias/primeros-pasos", label: "Ver la guía" },
  },
  {
    title: "Únete al servidor",
    text: `Entra en ${site.inviteLabel} y preséntate. Aquí siempre hay alguien para echarte una mano.`,
    link: { href: site.inviteUrl, label: "Unirme ahora" },
  },
  {
    title: "Explora y comparte",
    text: "Descubre bots, comunidades y herramientas. Y si tienes tu propia comunidad, ¡añádela!",
    link: { href: "/comunidad", label: "Ir a la comunidad" },
  },
];

export function OnboardingSteps() {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {steps.map((step, index) => {
        const external = step.link.href.startsWith("http");
        return (
          <li key={step.title} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
            <span
              aria-hidden
              className="inline-flex size-10 items-center justify-center rounded-full bg-primary-soft font-heading text-lg font-extrabold text-on-primary-soft"
            >
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
            <p className="mt-1 text-[15px] text-fg-muted">{step.text}</p>
            <a
              href={href(step.link.href)}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="mt-auto inline-flex min-h-11 items-center pt-3 font-semibold text-primary hover:text-primary-hover"
            >
              {step.link.label} →
            </a>
          </li>
        );
      })}
    </ol>
  );
}
