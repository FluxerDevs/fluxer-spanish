import type { APIRoute } from "astro";
import { revokeToken } from "@/lib/server/fluxer";
import { href } from "@/lib/url";

export const prerender = false;

/** "Cerrar sesión". POST only, so a link or image elsewhere can't log people out. */
export const POST: APIRoute = async ({ session, redirect }) => {
  const tokens = await session?.get("tokens");
  if (tokens) {
    // Logging out locally matters more than telling Fluxer, so don't fail on this.
    await revokeToken(tokens.refreshToken).catch((error) => console.error("Token revoke failed", error));
  }
  session?.destroy();
  return redirect(href("/"));
};
