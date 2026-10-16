import { MoonIcon, SunIcon } from "@phosphor-icons/react/ssr";
import { setTheme, useTheme } from "@/lib/client-store";

export function ThemeToggle() {
  const theme = useTheme();
  const isDark = theme === "dark";
  const label = theme === null ? "Cambiar tema" : isDark ? "Activar modo claro" : "Activar modo oscuro";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center rounded-full text-fg-muted transition-colors duration-200 hover:bg-surface-muted hover:text-fg"
    >
      {/* Both icons render; CSS picks one so the server HTML is already correct. */}
      <MoonIcon size={20} aria-hidden className="dark:hidden" />
      <SunIcon size={20} aria-hidden className="hidden dark:block" />
    </button>
  );
}
