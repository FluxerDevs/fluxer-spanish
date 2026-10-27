import type { AstroCookieSetOptions } from "astro";
import { SITE_URL } from "astro:env/server";

/** Holds the OAuth state, PKCE verifier and return path between /cuenta/entrar and the callback. */
export const OAUTH_COOKIE = "fluxer-es-oauth";

export const oauthCookieOptions = (): AstroCookieSetOptions => ({
  path: "/cuenta",
  httpOnly: true,
  secure: SITE_URL.startsWith("https:"),
  sameSite: "lax",
  maxAge: 600,
});

const base64Url = (bytes: Uint8Array) => Buffer.from(bytes).toString("base64url");

export const randomToken = () => base64Url(crypto.getRandomValues(new Uint8Array(32)));

/** PKCE S256 code challenge. */
export async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return base64Url(new Uint8Array(digest));
}
