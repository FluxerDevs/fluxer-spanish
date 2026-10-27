import type { APIRoute } from "astro";
import { safeReturnPath, signIn } from "@/lib/server/auth";
import { exchangeCode } from "@/lib/server/fluxer";
import { OAUTH_COOKIE } from "@/lib/server/oauth";
import { href } from "@/lib/url";

export const prerender = false;

/** OAuth2 redirect URI: Fluxer sends the user back here with `code` and `state`. */
export const GET: APIRoute = async (context) => {
  const { cookies, redirect, url } = context;
  const saved = cookies.get(OAUTH_COOKIE)?.json() as
    | { state: string; verifier: string; next: string }
    | undefined;
  cookies.delete(OAUTH_COOKIE, { path: "/cuenta" });

  const code = url.searchParams.get("code");
  // Missing code means the user cancelled on Fluxer's consent screen.
  if (!saved || !code || url.searchParams.get("state") !== saved.state) {
    return redirect(href(`/cuenta/error?motivo=${code ? "estado" : "cancelado"}`));
  }

  try {
    await signIn(context, await exchangeCode(code, saved.verifier));
  } catch (error) {
    console.error("Fluxer login failed", error);
    return redirect(href("/cuenta/error?motivo=fluxer"));
  }
  return redirect(safeReturnPath(saved.next));
};
