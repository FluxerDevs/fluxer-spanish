import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, CheckIcon } from "@phosphor-icons/react/ssr";
import { SubmitCommunityForm } from "@/components/community/SubmitCommunityForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Añade tu comunidad",
  description: "Envía tu comunidad en español para que aparezca en el directorio de Fluxer Español.",
};

const checklist = [
  "La comunidad habla principalmente en español.",
  "Tiene normas claras y moderación activa.",
  "El enlace de invitación no caduca.",
];

export default function SubmitCommunityPage() {
  return (
    <Container className="py-10 sm:py-14">
      <Link href="/comunidad" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-fg-muted hover:text-primary">
        <ArrowLeftIcon size={16} aria-hidden />
        Volver a la comunidad
      </Link>

      <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Añade tu comunidad</h1>
          <p className="mt-3 text-lg text-fg-muted">
            ¿Tienes un servidor en español? Cuéntanos de qué va y lo añadimos al directorio para
            que más gente lo descubra.
          </p>
          <div className="mt-8 rounded-2xl bg-surface-muted p-5">
            <h2 className="font-heading font-bold">Antes de enviarla, comprueba que:</h2>
            <ul className="mt-3 space-y-2 text-[15px]">
              {checklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckIcon size={18} weight="bold" aria-hidden className="mt-0.5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-fg-muted">Revisamos cada solicitud a mano, normalmente en pocos días.</p>
          </div>
        </div>
        <SubmitCommunityForm />
      </div>
    </Container>
  );
}
