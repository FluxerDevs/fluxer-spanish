import type {
  Community,
  CommunityTopic,
  Creator,
  ServerTemplate,
} from "@/lib/types";

export const communityTopicLabels: Record<CommunityTopic, string> = {
  gaming: "Videojuegos",
  tech: "Tecnología",
  art: "Arte",
  anime: "Anime",
  music: "Música",
  social: "Charla",
  learning: "Aprendizaje",
};

export const templates: ServerTemplate[] = [
  {
    id: "comunidad-general",
    name: "Comunidad general",
    description: "Lo básico para empezar con buen pie: bienvenida, charla y voz.",
    idealFor: "Grupos de amigos y comunidades pequeñas",
    categories: [
      { name: "Bienvenida", channels: ["normas", "presentaciones", "anuncios"] },
      { name: "General", channels: ["charla", "memes", "fotos"] },
      { name: "Voz", channels: ["Sala 1", "Sala 2"], voice: true },
    ],
    roles: ["Admin", "Moderación", "Miembro"],
  },
  {
    id: "gaming",
    name: "Servidor gamer",
    description: "Canales por juego, búsqueda de partida y salas de voz por equipo.",
    idealFor: "Clanes, equipos y comunidades de juegos",
    categories: [
      { name: "Info", channels: ["normas", "anuncios", "roles"] },
      { name: "Juegos", channels: ["buscar-partida", "clips", "torneos"] },
      { name: "Voz", channels: ["Equipo A", "Equipo B", "AFK"], voice: true },
    ],
    roles: ["Admin", "Moderación", "Capitán", "Jugador"],
  },
  {
    id: "estudio",
    name: "Grupo de estudio",
    description: "Recursos, dudas por asignatura y salas para estudiar en silencio.",
    idealFor: "Clases, cursos y grupos de aprendizaje",
    categories: [
      { name: "Info", channels: ["normas", "calendario"] },
      { name: "Estudio", channels: ["dudas", "recursos", "apuntes"] },
      { name: "Voz", channels: ["Pomodoro", "Silencio"], voice: true },
    ],
    roles: ["Profe", "Mentor", "Estudiante"],
  },
];

export const communities: Community[] = [
  {
    id: "rincon-gamer",
    name: "Rincón Gamer",
    description: "Partidas casuales, torneos mensuales y mucha charla entre jugadores.",
    topics: ["gaming", "social"],
    members: 2340,
    country: "México",
    inviteUrl: "#",
    hue: 270,
  },
  {
    id: "codigo-abierto-es",
    name: "Código Abierto ES",
    description: "Programación, software libre y ayuda para tus proyectos.",
    topics: ["tech", "learning"],
    members: 1185,
    country: "España",
    inviteUrl: "#",
    hue: 160,
  },
  {
    id: "lapiz-y-pixel",
    name: "Lápiz y Píxel",
    description: "Comunidad de artistas: retos semanales, críticas amables y comisiones.",
    topics: ["art"],
    members: 860,
    country: "Argentina",
    inviteUrl: "#",
    hue: 20,
  },
  {
    id: "otaku-latam",
    name: "Otaku LATAM",
    description: "Anime de temporada, manga y noches de watch party.",
    topics: ["anime", "social"],
    members: 3120,
    country: "Chile",
    inviteUrl: "#",
    hue: 330,
  },
  {
    id: "ritmo-y-cafe",
    name: "Ritmo y Café",
    description: "Recomendaciones musicales, sesiones en vivo y productores emergentes.",
    topics: ["music", "social"],
    members: 540,
    country: "Colombia",
    inviteUrl: "#",
    hue: 40,
  },
  {
    id: "aprende-ingles",
    name: "Aprende Inglés Juntos",
    description: "Intercambio de idiomas y clases de conversación cada semana.",
    topics: ["learning", "social"],
    members: 1490,
    country: "Perú",
    inviteUrl: "#",
    hue: 210,
  },
];

export const creators: Creator[] = [
  {
    id: "lunadev",
    name: "Luna",
    handle: "@lunadev",
    description: "Streams de programación y tutoriales de bots para Fluxer.",
    country: "España",
    links: [
      { label: "Twitch", url: "#" },
      { label: "GitHub", url: "#" },
    ],
    hue: 290,
  },
  {
    id: "elcharro",
    name: "El Charro Gamer",
    handle: "@elcharro",
    description: "Gameplays, noticias de juegos y comunidad muy activa.",
    country: "México",
    links: [
      { label: "YouTube", url: "#" },
      { label: "X", url: "#" },
    ],
    hue: 25,
  },
  {
    id: "dibujaconmica",
    name: "Mica Dibuja",
    handle: "@dibujaconmica",
    description: "Ilustración digital, directos de dibujo y retos para la comunidad.",
    country: "Argentina",
    links: [{ label: "Instagram", url: "#" }],
    hue: 340,
  },
  {
    id: "profe-tech",
    name: "Profe Tech",
    handle: "@profetech",
    description: "Explica tecnología en sencillo. Guías de privacidad y seguridad.",
    country: "Colombia",
    links: [
      { label: "YouTube", url: "#" },
      { label: "TikTok", url: "#" },
    ],
    hue: 180,
  },
];
