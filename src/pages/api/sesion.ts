import type { APIRoute } from "astro";
import { getUser, isStaff } from "@/lib/server/auth";
import type { SessionState } from "@/lib/types";

export const prerender = false;

/** Who is logged in, for islands on prerendered pages. */
export const GET: APIRoute = async (context) => {
  const user = await getUser(context);
  const body: SessionState = { user, isStaff: user ? isStaff(user.id) : false };
  return Response.json(body, { headers: { "Cache-Control": "private, no-store" } });
};
