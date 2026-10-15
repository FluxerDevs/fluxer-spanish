"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { CheckIcon, SignInIcon, SignOutIcon, XIcon } from "@phosphor-icons/react/ssr";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/layout/Logo";
import { signInDemo, signOutDemo, useDemoUser } from "@/lib/client-store";
import { cx } from "@/lib/format";

export function LoginButton({ className }: { className?: string }) {
  const user = useDemoUser();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const titleId = useId();

  // Close the transient menu if this component is hidden by a navigation.
  useLayoutEffect(() => () => setMenuOpen(false), []);

  if (user) {
    return (
      <div className={cx("relative", className)}>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-haspopup="true"
          aria-label={`Cuenta de ${user.name}`}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex size-11 items-center justify-center rounded-full hover:bg-surface-muted"
        >
          <Avatar name={user.name} hue={270} size="sm" />
        </button>
        {menuOpen && (
          <div
            className="absolute right-0 z-40 mt-2 w-56 rounded-2xl border border-line bg-surface p-2 shadow-soft"
            onKeyDown={(event) => event.key === "Escape" && setMenuOpen(false)}
          >
            <p className="px-3 pt-1 pb-2 text-sm">
              <span className="block font-bold">{user.name}</span>
              <span className="text-fg-muted">{user.handle} · demo</span>
            </p>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                signOutDemo();
              }}
              className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-left font-semibold hover:bg-surface-muted"
            >
              <SignOutIcon size={18} aria-hidden />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Button
        variant="secondary"
        className={className}
        onClick={() => dialogRef.current?.showModal()}
      >
        <SignInIcon size={18} aria-hidden />
        Entrar con Fluxer
      </Button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-[min(92vw,26rem)] rounded-3xl border border-line bg-surface p-0 text-fg shadow-soft backdrop:bg-black/40"
        onClick={(event) => event.target === dialogRef.current && dialogRef.current?.close()}
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <LogoMark size={40} />
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => dialogRef.current?.close()}
              className="-mt-2 -mr-2 inline-flex size-11 items-center justify-center rounded-full text-fg-muted hover:bg-surface-muted hover:text-fg"
            >
              <XIcon size={20} aria-hidden />
            </button>
          </div>
          <h2 id={titleId} className="mt-4 text-xl font-extrabold">
            Entra con tu cuenta de Fluxer
          </h2>
          <p className="mt-2 text-fg-muted">
            Usamos el inicio de sesión oficial de Fluxer. Nunca vemos tu contraseña.
          </p>
          <ul className="mt-4 space-y-2 text-[15px]">
            {["Añadir tu comunidad al directorio", "Sugerir bots y herramientas", "Guardar guías favoritas"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon size={18} weight="bold" aria-hidden className="text-success" />
                  {item}
                </li>
              ),
            )}
          </ul>
          <Button
            size="lg"
            className="mt-6 w-full"
            onClick={() => {
              signInDemo();
              dialogRef.current?.close();
            }}
          >
            Continuar con Fluxer
          </Button>
          <p className="mt-3 text-center text-sm text-fg-muted">
            Esto es una demo: no se conecta a ninguna cuenta real.
          </p>
        </div>
      </dialog>
    </>
  );
}
