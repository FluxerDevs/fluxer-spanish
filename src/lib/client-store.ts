import { useSyncExternalStore } from "react";
import type { DemoUser } from "@/lib/types";

// Tiny localStorage-backed stores for the mockup. Real auth replaces demoUser in Phase 3.

const CHANGE_EVENT = "fluxer-es:store-change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
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

const USER_KEY = "demo-user";

export function useDemoUser() {
  const raw = useSyncExternalStore(subscribe, () => read(USER_KEY), () => null);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DemoUser;
  } catch {
    return null;
  }
}

export function signInDemo() {
  write(USER_KEY, JSON.stringify({ name: "Usuario Demo", handle: "@demo" } satisfies DemoUser));
}

export function signOutDemo() {
  write(USER_KEY, null);
}

export const ANNOUNCEMENT_KEY = "announcement-dismissed";

export function dismissAnnouncement(id: string) {
  document.documentElement.dataset.hideAnnouncement = "";
  write(ANNOUNCEMENT_KEY, id);
}
