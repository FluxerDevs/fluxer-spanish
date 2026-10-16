import { useSyncExternalStore } from "react";
import { WarningCircleIcon } from "@phosphor-icons/react/ssr";
import { BotCard } from "@/components/bots/BotCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChip } from "@/components/ui/FilterChip";
import { SearchInput } from "@/components/ui/SearchInput";
import { botCategoryLabels, botLanguageLabels } from "@/data/bots";
import { filterBots, isOneOf, type BotFilters } from "@/lib/filters";
import type { Bot, BotCategory, BotLanguage } from "@/lib/types";

const categories = Object.keys(botCategoryLabels) as BotCategory[];
const languages = Object.keys(botLanguageLabels) as BotLanguage[];

// Filters live in the URL (?categoria=&idioma=&q=) so they can be shared and survive back/forward.
const URL_CHANGE_EVENT = "fluxer-es:url-change";

function subscribeToUrl(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(URL_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(URL_CHANGE_EVENT, callback);
  };
}

function useSearchParams() {
  // The static HTML has no query string, so the server snapshot is the unfiltered list.
  const search = useSyncExternalStore(subscribeToUrl, () => window.location.search, () => "");
  return new URLSearchParams(search);
}

function replaceParams(params: URLSearchParams) {
  const qs = params.toString();
  history.replaceState(history.state, "", qs ? `?${qs}` : window.location.pathname);
  window.dispatchEvent(new Event(URL_CHANGE_EVENT));
}

export function BotDirectory({ bots }: { bots: Bot[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("categoria");
  const languageParam = searchParams.get("idioma");
  const category = isOneOf(categoryParam, categories) ? categoryParam : null;
  const language = isOneOf(languageParam, languages) ? languageParam : null;
  const query = searchParams.get("q") ?? "";

  function updateParams(changes: Record<string, string | null>) {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    replaceParams(params);
  }

  return (
    <BotDirectoryView
      bots={bots}
      filters={{ query, category, language }}
      onQueryChange={(value) => updateParams({ q: value || null })}
      onCategoryChange={(value) => updateParams({ categoria: value })}
      onLanguageChange={(value) => updateParams({ idioma: value })}
      onReset={() => replaceParams(new URLSearchParams())}
    />
  );
}

interface BotDirectoryViewProps {
  bots: Bot[];
  filters: BotFilters;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: BotCategory | null) => void;
  onLanguageChange: (value: BotLanguage | null) => void;
  onReset: () => void;
}

function BotDirectoryView({
  bots,
  filters,
  onQueryChange,
  onCategoryChange,
  onLanguageChange,
  onReset,
}: BotDirectoryViewProps) {
  const { query, category, language } = filters;
  const results = filterBots(bots, { query, category, language });
  const spanish = results.filter((bot) => bot.language !== "en");
  const englishOnly = results.filter((bot) => bot.language === "en");

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5">
        <SearchInput
          label="Buscar bots"
          placeholder="Busca por nombre o función…"
          value={query}
          onChange={onQueryChange}
        />
        <div>
          <p id="bot-category-label" className="mb-2 text-sm font-bold">
            Categoría
          </p>
          <div role="group" aria-labelledby="bot-category-label" className="flex flex-wrap gap-2">
            <FilterChip pressed={category === null} onClick={() => onCategoryChange(null)}>
              Todas
            </FilterChip>
            {categories.map((option) => (
              <FilterChip
                key={option}
                pressed={category === option}
                onClick={() => onCategoryChange(category === option ? null : option)}
              >
                {botCategoryLabels[option]}
              </FilterChip>
            ))}
          </div>
        </div>
        <div>
          <p id="bot-language-label" className="mb-2 text-sm font-bold">
            Idioma
          </p>
          <div role="group" aria-labelledby="bot-language-label" className="flex flex-wrap gap-2">
            <FilterChip pressed={language === null} onClick={() => onLanguageChange(null)}>
              Cualquiera
            </FilterChip>
            {languages.map((option) => (
              <FilterChip
                key={option}
                pressed={language === option}
                onClick={() => onLanguageChange(language === option ? null : option)}
              >
                {botLanguageLabels[option]}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {results.length === 1 ? "1 bot encontrado" : `${results.length} bots encontrados`}
      </p>

      {results.length === 0 && (
        <div className="mt-10">
          <EmptyState
            title="No encontramos bots con esos filtros"
            description="Prueba con otra categoría o borra la búsqueda."
            action={
              <Button variant="secondary" onClick={onReset}>
                Quitar filtros
              </Button>
            }
          />
        </div>
      )}

      {spanish.length > 0 && (
        <section aria-labelledby="bots-es" className="mt-12">
          <h2 id="bots-es" className="text-2xl font-extrabold">
            Con soporte en español
          </h2>
          <p className="mt-1 text-fg-muted">Comandos y respuestas en español, total o parcialmente.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spanish.map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
        </section>
      )}

      {englishOnly.length > 0 && (
        <section aria-labelledby="bots-en" className="mt-14">
          <h2 id="bots-en" className="text-2xl font-extrabold">
            Bots útiles que no están en español
          </h2>
          <p className="mt-3 flex max-w-3xl gap-2.5 rounded-2xl bg-warning-soft p-4 text-[15px] text-warning">
            <WarningCircleIcon size={20} weight="bold" aria-hidden className="mt-0.5 shrink-0" />
            <span>
              <strong>Atención:</strong> estos bots <strong>NO</strong> están en español. Los
              recomendamos porque funcionan muy bien, pero sus comandos y mensajes son en inglés.
            </span>
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {englishOnly.map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
