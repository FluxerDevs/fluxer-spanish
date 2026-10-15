import { LightbulbIcon } from "@phosphor-icons/react/ssr";
import type { GuideBlock } from "@/lib/types";

export function GuideBody({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="space-y-5 text-[17px]">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "heading":
            return (
              <h2 key={index} className="pt-4 text-2xl font-extrabold">
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={index} className="list-disc space-y-2 pl-6 marker:text-primary">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={index} className="space-y-3">
                {block.items.map((item, step) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft font-heading text-sm font-extrabold text-on-primary-soft"
                    >
                      {step + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "tip":
            return (
              <aside
                key={index}
                className="flex gap-3 rounded-2xl border border-line bg-surface-muted p-5"
              >
                <LightbulbIcon size={22} aria-hidden className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="font-bold">{block.title}</p>
                  <p className="mt-1 text-fg-muted">{block.text}</p>
                </div>
              </aside>
            );
        }
      })}
    </div>
  );
}
