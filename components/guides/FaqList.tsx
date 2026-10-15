import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import type { FaqItem } from "@/lib/types";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-14 items-center justify-between gap-4 px-5 py-4 font-heading text-[17px] font-bold hover:text-primary">
            {item.question}
            <CaretDownIcon
              size={20}
              aria-hidden
              className="shrink-0 text-fg-muted transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="max-w-3xl px-5 pb-5 text-fg-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
