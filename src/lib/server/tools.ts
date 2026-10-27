import { desc, eq, ne } from "drizzle-orm";
import { tools as curatedTools } from "@/data/tools";
import { toolRules, validateAll, type ToolValues } from "@/lib/submission-rules";
import type { SessionUser, Tool, ToolGroup } from "@/lib/types";
import { db } from "./db";
import { notifyStaff } from "./notify";
import { toolSubmissions } from "./schema";
import { fail, hasTooManyPending, tooManyPendingMessage, type SubmitResult } from "./submissions";

function toTool(row: typeof toolSubmissions.$inferSelect): Tool {
  return {
    id: `sugerida-${row.id}`,
    name: row.name,
    url: row.url,
    group: row.group,
    tagline: row.tagline,
    purpose: row.purpose,
    official: false,
  };
}

/** Approved suggestions, newest first, followed by the curated list in src/data. */
export async function listTools(): Promise<Tool[]> {
  const rows = await db()
    .select()
    .from(toolSubmissions)
    .where(eq(toolSubmissions.status, "approved"))
    .orderBy(desc(toolSubmissions.reviewedAt));
  return [...rows.map(toTool), ...curatedTools];
}

/** Compares links without the protocol, "www." or a trailing slash. */
const normalizeUrl = (url: string) =>
  url
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");

export async function submitTool(user: SessionUser, values: ToolValues): Promise<SubmitResult<ToolValues>> {
  const errors = validateAll(toolRules, values);
  if (Object.keys(errors).length > 0) return fail(errors);
  if (await hasTooManyPending(user.id)) return fail({ name: tooManyPendingMessage });

  const url = normalizeUrl(values.url);
  if (curatedTools.some((tool) => normalizeUrl(tool.url) === url)) {
    return fail({ url: "Esta herramienta ya está en el ecosistema." });
  }
  const others = await db()
    .select({ url: toolSubmissions.url, status: toolSubmissions.status })
    .from(toolSubmissions)
    .where(ne(toolSubmissions.status, "rejected"));
  const existing = others.find((row) => normalizeUrl(row.url) === url);
  if (existing) {
    return fail({
      url:
        existing.status === "approved"
          ? "Esta herramienta ya está en el ecosistema."
          : "Alguien ya sugirió esta herramienta y está pendiente de revisión.",
    });
  }

  const [row] = await db()
    .insert(toolSubmissions)
    .values({
      submitterId: user.id,
      name: values.name.trim(),
      url: values.url.trim(),
      group: values.group as ToolGroup,
      tagline: values.tagline.trim(),
      purpose: values.purpose.trim(),
    })
    .returning({ id: toolSubmissions.id });
  void notifyStaff("tool", values.name.trim(), user.handle);
  return { ok: true, id: row.id };
}
