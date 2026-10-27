import { useSyncExternalStore } from "react";
import type { SessionState } from "@/lib/types";
import { href } from "@/lib/url";

// Small client-side stores: theme and announcement in localStorage, the session from the server.

const CHANGE_EVENT = "fluxer-es:store-change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode); the UI still updates via the event.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export type Theme = "light" | "dark";
// Shared with Starlight so /guias and the rest of the site keep the same theme.
export const THEME_KEY = "starlight-theme";

export function useTheme() {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dataset.theme as Theme | undefined) ?? null,
    () => null,
  );
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  write(THEME_KEY, theme);
}

// Fetched once per page load and shared by every island (the header and mobile menu both need it).
let session: SessionState | undefined;
let sessionRequest: Promise<void> | undefined;

function loadSession() {
  sessionRequest ??= fetch(href("/api/sesion"), { credentials: "same-origin" })
    .then((response) => (response.ok ? (response.json() as Promise<SessionState>) : null))
    .catch(() => null)
    .then((state) => {
      session = state ?? { user: null, isStaff: false };
      window.dispatchEvent(new Event(CHANGE_EVENT));
    });
}

/** The logged-in user, or `undefined` while it's loading. */
export function useSession() {
  return useSyncExternalStore(
    (callback) => {
      loadSession();
      return subscribe(callback);
    },
    () => session,
    () => undefined,
  );
}

/** Where "Entrar con Fluxer" goes; it comes back to the current page afterwards. */
export function loginUrl() {
  const back = `${location.pathname}${location.search}${location.hash}`;
  return `${href("/cuenta/entrar")}?volver=${encodeURIComponent(back)}`;
}

export const ANNOUNCEMENT_KEY = "announcement-dismissed";

export function dismissAnnouncement(id: string) {
  document.documentElement.dataset.hideAnnouncement = "";
  write(ANNOUNCEMENT_KEY, id);
}
