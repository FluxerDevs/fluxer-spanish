import type { APIRoute } from "astro";
import { safeReturnPath } from "@/lib/server/auth";
import { authorizeUrl } from "@/lib/server/fluxer";
import { OAUTH_COOKIE, oauthCookieOptions, randomToken, sha256 } from "@/lib/server/oauth";

export const prerender = false;

/** Starts "Entrar con Fluxer": OAuth2 authorization code flow with PKCE. */
export const GET: APIRoute = async ({ cookies, redirect, url }) => {
  const state = randomToken();
  const verifier = randomToken();
  const next = safeReturnPath(url.searchParams.get("volver"));
  cookies.set(OAUTH_COOKIE, JSON.stringify({ state, verifier, next }), oauthCookieOptions());
  return redirect(authorizeUrl({ state, codeChallenge: await sha256(verifier) }));
};
