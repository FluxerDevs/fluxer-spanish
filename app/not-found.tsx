import { CompassIcon } from "@phosphor-icons/react/ssr";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <CompassIcon size={56} aria-hidden className="text-primary" />
      <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">Esta página se ha perdido</h1>
      <p className="mt-3 max-w-md text-lg text-fg-muted">
        Puede que el enlace esté mal o que la hayamos movido. Vuelve al inicio y seguimos desde ahí.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
        <ButtonLink href="/guias" variant="secondary">
          Ver las guías
        </ButtonLink>
      </div>
    </Container>
  );
}
