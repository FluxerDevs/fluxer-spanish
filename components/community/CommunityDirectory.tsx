"use client";

import { useState } from "react";
import { CommunityCard } from "@/components/community/CommunityCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChip } from "@/components/ui/FilterChip";
import { SearchInput } from "@/components/ui/SearchInput";
import { communityTopicLabels } from "@/content/community";
import { filterCommunities } from "@/lib/filters";
import type { Community, CommunityTopic } from "@/lib/types";

const topics = Object.keys(communityTopicLabels) as CommunityTopic[];

export function CommunityDirectory({ communities }: { communities: Community[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<CommunityTopic | null>(null);
  const results = filterCommunities(communities, { query, topic });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <SearchInput
          label="Buscar comunidades"
          placeholder="Busca por nombre, tema o país…"
          value={query}
          onChange={setQuery}
        />
        <div role="group" aria-label="Filtrar por tema" className="flex flex-wrap gap-2">
          <FilterChip pressed={topic === null} onClick={() => setTopic(null)}>
            Todas
          </FilterChip>
          {topics.map((option) => (
            <FilterChip
              key={option}
              pressed={topic === option}
              onClick={() => setTopic(topic === option ? null : option)}
            >
              {communityTopicLabels[option]}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {results.length === 1 ? "1 comunidad encontrada" : `${results.length} comunidades encontradas`}
      </p>

      <div className="mt-6">
        {results.length === 0 ? (
          <EmptyState
            title="Ninguna comunidad coincide"
            description="Prueba con otro tema o, mejor aún, ¡añade la tuya!"
            action={
              <Button
                variant="secondary"
                onClick={() => {
                  setQuery("");
                  setTopic(null);
                }}
              >
                Quitar filtros
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
