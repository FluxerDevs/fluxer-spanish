"use client";

import { useState } from "react";
import { GuideCard } from "@/components/guides/GuideCard";
import { FilterChip } from "@/components/ui/FilterChip";
import { guideLevelLabels } from "@/content/guides";
import type { Guide, GuideLevel } from "@/lib/types";

const levels = Object.keys(guideLevelLabels) as GuideLevel[];

export function GuideLibrary({ guides }: { guides: Guide[] }) {
  const [level, setLevel] = useState<GuideLevel | null>(null);
  const visible = level ? guides.filter((guide) => guide.level === level) : guides;

  return (
    <div>
      <div role="group" aria-label="Filtrar por nivel" className="mb-6 flex flex-wrap gap-2">
        <FilterChip pressed={level === null} onClick={() => setLevel(null)}>
          Todas
        </FilterChip>
        {levels.map((option) => (
          <FilterChip key={option} pressed={level === option} onClick={() => setLevel(option)}>
            {guideLevelLabels[option]}
          </FilterChip>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} guías
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </div>
  );
}
