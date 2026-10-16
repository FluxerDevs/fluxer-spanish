import { XIcon } from "@phosphor-icons/react/ssr";
import { dismissAnnouncement } from "@/lib/client-store";

export function DismissAnnouncement({ id }: { id: string }) {
  return (
    <button
      type="button"
      aria-label="Ocultar aviso"
      onClick={() => dismissAnnouncement(id)}
      className="-mr-2 inline-flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/15"
    >
      <XIcon size={18} aria-hidden />
    </button>
  );
}
