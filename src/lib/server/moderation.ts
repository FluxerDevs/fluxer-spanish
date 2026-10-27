import { and, desc, eq, isNotNull } from "drizzle-orm";
import { db } from "./db";
import { botSubmissions, communitySubmissions, toolSubmissions, users } from "./schema";
import { submissionTables, type SubmissionKind } from "./submissions";

/** Pending submissions of each kind, oldest first so nothing waits forever, with the submitter. */
export async function listPending() {
  const submitter = { username: users.username, globalName: users.globalName };
  const pending = <T extends typeof communitySubmissions | typeof botSubmissions | typeof toolSubmissions>(table: T) =>
    db()
      .select({ row: table, submitter })
      .from(table)
      .innerJoin(users, eq(users.id, table.submitterId))
      .where(eq(table.status, "pending"))
      .orderBy(table.createdAt);

  const [communities, bots, tools] = await Promise.all([
    pending(communitySubmissions),
    pending(botSubmissions),
    pending(toolSubmissions),
  ]);
  return { community: communities, bot: bots, tool: tools };
}

export interface ReviewedItem {
  kind: SubmissionKind;
  id: number;
  name: string;
  status: "approved" | "rejected";
  reviewNote: string | null;
  reviewedAt: Date;
  reviewer: string;
}

/** The latest decisions across all kinds, so staff can see what others already handled. */
export async function listRecentDecisions(limit = 15): Promise<ReviewedItem[]> {
  const all = await Promise.all(
    (Object.entries(submissionTables) as [SubmissionKind, (typeof submissionTables)[SubmissionKind]][]).map(
      async ([kind, table]) => {
        const rows = await db()
          .select({
            id: table.id,
            name: table.name,
            status: table.status,
            reviewNote: table.reviewNote,
            reviewedAt: table.reviewedAt,
            reviewer: users.username,
          })
          .from(table)
          .innerJoin(users, eq(users.id, table.reviewedBy))
          .where(isNotNull(table.reviewedAt))
          .orderBy(desc(table.reviewedAt))
          .limit(limit);
        return rows.map((row) => ({ ...row, kind }) as ReviewedItem);
      },
    ),
  );
  return all
    .flat()
    .sort((a, b) => b.reviewedAt.getTime() - a.reviewedAt.getTime())
    .slice(0, limit);
}

/** Approves or rejects a pending submission. Returns false if it was already reviewed. */
export async function reviewSubmission({
  kind,
  id,
  decision,
  note,
  reviewerId,
}: {
  kind: SubmissionKind;
  id: number;
  decision: "approve" | "reject";
  note: string | null;
  reviewerId: string;
}) {
  const table = submissionTables[kind];
  const updated = await db()
    .update(table)
    .set({
      status: decision === "approve" ? "approved" : "rejected",
      reviewNote: note,
      reviewedBy: reviewerId,
      reviewedAt: new Date(),
    })
    .where(and(eq(table.id, id), eq(table.status, "pending")))
    .returning({ id: table.id });
  return updated.length > 0;
}
