import type { Bot, BotCategory, BotLanguage } from "@/lib/types";

export const botCategoryLabels: Record<BotCategory, string> = {
  moderation: "Moderación",
  music: "Música",
  utility: "Utilidad",
  fun: "Diversión",
  levels: "Niveles",
  economy: "Economía",
};

export const botLanguageLabels: Record<BotLanguage, string> = {
  es: "Español",
  partial: "Español parcial",
  en: "Solo inglés",
};

export const bots: Bot[] = [
  {
    id: "kurena",
    name: "Kurena",
    description:
      "Moderación completa en español: filtros de spam, avisos, registros y sanciones temporales.",
    categories: ["moderation", "utility"],
    language: "es",
    inviteUrl: "#",
    website: "#",
    hue: 280,
  },
  {
    id: "pluuty",
    name: "Pluuty",
    description:
      "Sistema de niveles y economía con tienda de roles. Todos los comandos traducidos.",
    categories: ["levels", "economy", "fun"],
    language: "es",
    inviteUrl: "#",
    hue: 330,
  },
  {
    id: "melodia",
    name: "Melodía",
    description: "Música en canales de voz con colas compartidas y letras de canciones.",
    categories: ["music"],
    language: "es",
    inviteUrl: "#",
    hue: 200,
  },
  {
    id: "bienvenidas",
    name: "Bienvenidas",
    description: "Mensajes de bienvenida con imagen personalizada y roles automáticos.",
    categories: ["utility"],
    language: "es",
    inviteUrl: "#",
    hue: 150,
  },
  {
    id: "trivia-latam",
    name: "Trivia LATAM",
    description: "Preguntas de cultura general hispana para animar tu servidor.",
    categories: ["fun"],
    language: "partial",
    inviteUrl: "#",
    hue: 30,
  },
  {
    id: "modmail-plus",
    name: "Modmail+",
    description:
      "Los miembros escriben al bot y tu equipo responde desde un canal privado. Respuestas configurables en español.",
    categories: ["moderation", "utility"],
    language: "partial",
    inviteUrl: "#",
    hue: 250,
  },
  {
    id: "statsy",
    name: "Statsy",
    description: "Estadísticas de actividad del servidor con gráficas semanales.",
    categories: ["utility"],
    language: "en",
    inviteUrl: "#",
    hue: 190,
  },
  {
    id: "rolekeeper",
    name: "RoleKeeper",
    description: "Roles por reacción y botones, con límites y requisitos por rol.",
    categories: ["utility", "moderation"],
    language: "en",
    inviteUrl: "#",
    hue: 100,
  },
  {
    id: "lofi-radio",
    name: "Lofi Radio",
    description: "Radio lofi 24/7 en un canal de voz, sin configuración.",
    categories: ["music"],
    language: "en",
    inviteUrl: "#",
    hue: 15,
  },
];
