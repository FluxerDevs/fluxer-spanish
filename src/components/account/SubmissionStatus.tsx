import { Badge } from "@/components/ui/Badge";
import type { SubmissionKind } from "@/lib/server/submissions";
import type { SubmissionStatus } from "@/lib/server/schema";

export const submissionKindLabels: Record<SubmissionKind, string> = {
  community: "Comunidad",
  bot: "Bot",
  tool: "Herramienta",
};

const statusLabels: Record<SubmissionStatus, string> = {
  pending: "Pendiente",
  approved: "Publicada",
  rejected: "No aceptada",
};

const statusTones = { pending: "warning", approved: "success", rejected: "neutral" } as const;

export function SubmissionStatusBadge({ status }: { status: SubmissionStatus }) {
  return <Badge tone={statusTones[status]}>{statusLabels[status]}</Badge>;
}

const dateFormatter = new Intl.DateTimeFormat("es", { day: "numeric", month: "short", year: "numeric" });

export const formatSubmittedAt = (date: Date) => dateFormatter.format(date);
