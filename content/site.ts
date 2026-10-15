export const site = {
  name: "Fluxer Español",
  description:
    "La comunidad hispanohablante de Fluxer: guías en español, bots, herramientas y comunidades para explorar.",
  inviteUrl: "https://fluxer.gg/spanish",
  inviteLabel: "fluxer.gg/spanish",
  socials: {
    x: "https://x.com/FluxerEspanol",
    github: "https://github.com/fluxer-espanol",
  },
} as const;

export const mainNav = [
  { href: "/guias", label: "Guías" },
  { href: "/bots", label: "Bots" },
  { href: "/ecosistema", label: "Ecosistema" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/novedades", label: "Novedades" },
] as const;
