"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react/ssr";
import { Logo } from "@/components/layout/Logo";
import { LoginButton } from "@/components/layout/LoginButton";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { mainNav } from "@/content/site";
import { cx } from "@/lib/format";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-sm"
      onKeyDown={(event) => event.key === "Escape" && closeMenu()}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo onNavigate={closeMenu} />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx(
                    "inline-flex min-h-11 items-center rounded-full px-4 font-semibold transition-colors duration-200",
                    isActive(item.href)
                      ? "bg-primary-soft text-on-primary-soft"
                      : "text-fg-muted hover:bg-surface-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <div className="hidden lg:block">
            <LoginButton />
          </div>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-11 items-center justify-center rounded-full text-fg hover:bg-surface-muted lg:hidden"
          >
            {menuOpen ? <XIcon size={22} aria-hidden /> : <ListIcon size={22} aria-hidden />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!menuOpen} className="border-t border-line bg-bg lg:hidden">
        <nav aria-label="Principal (móvil)" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onNavigate={closeMenu}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx(
                    "flex min-h-12 items-center rounded-xl px-3 text-lg font-semibold",
                    isActive(item.href) ? "bg-primary-soft text-on-primary-soft" : "text-fg hover:bg-surface-muted",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-line pt-4 pb-2">
            <LoginButton className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}
