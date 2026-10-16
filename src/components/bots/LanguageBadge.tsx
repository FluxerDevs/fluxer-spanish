import { CheckCircleIcon, TranslateIcon, WarningCircleIcon } from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/Badge";
import { botLanguageLabels } from "@/data/bots";
import type { BotLanguage } from "@/lib/types";

const languageTone = { es: "success", partial: "primary", en: "warning" } as const;
const languageIcon = { es: CheckCircleIcon, partial: TranslateIcon, en: WarningCircleIcon };

export function LanguageBadge({ language }: { language: BotLanguage }) {
  const Icon = languageIcon[language];
  return (
    <Badge tone={languageTone[language]}>
      <Icon size={15} weight="bold" aria-hidden />
      {botLanguageLabels[language]}
    </Badge>
  );
}
