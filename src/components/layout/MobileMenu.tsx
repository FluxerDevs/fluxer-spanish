import { useEffect, useRef, useState } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react/ssr";
import { LoginButton } from "@/components/layout/LoginButton";
import { cx } from "@/lib/format";

interface NavLink {
  href: string;
  label: string;
  active: boolean;
}

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu wherever focus is, and hands focus back to the toggle.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-full text-fg hover:bg-surface-muted"
      >
        {open ? <XIcon size={22} aria-hidden /> : <ListIcon size={22} aria-hidden />}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-line bg-bg"
      >
        <nav aria-label="Principal (móvil)" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  className={cx(
                    "flex min-h-12 items-center rounded-xl px-3 text-lg font-semibold",
                    link.active ? "bg-primary-soft text-on-primary-soft" : "text-fg hover:bg-surface-muted",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-line pt-4 pb-2">
            <LoginButton className="w-full" />
          </div>
        </nav>
      </div>
    </div>
  );
}
