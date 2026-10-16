import type { Tool, ToolGroup } from "@/lib/types";

export const toolGroupLabels: Record<ToolGroup, { title: string; description: string }> = {
  tools: {
    title: "Herramientas",
    description: "Servicios que te facilitan la vida dentro y fuera de Fluxer.",
  },
  feedback: {
    title: "Feedback y soporte",
    description: "Dónde reportar errores, proponer ideas y pedir ayuda.",
  },
  misc: {
    title: "Misceláneos",
    description: "Proyectos de la comunidad que vale la pena conocer.",
  },
};

export const tools: Tool[] = [
  {
    id: "fluxer-host",
    name: "Fluxer.host",
    url: "https://fluxer.host",
    group: "tools",
    tagline: "Recursos y servicios para la comunidad de Fluxer",
    purpose:
      "Reúne enlaces y servicios útiles del ecosistema en un solo sitio. Ideal si buscas algo y no sabes por dónde empezar.",
    official: false,
  },
  {
    id: "fluxername",
    name: "Fluxername",
    url: "https://fluxername.com",
    group: "tools",
    tagline: "Comprueba nombres de usuario disponibles",
    purpose:
      "¿Quieres un nombre corto o especial? Consulta si está libre antes de cambiarlo en tu perfil.",
    official: false,
  },
  {
    id: "fluxer-docs",
    name: "Documentación de desarrolladores",
    url: "https://docs.fluxer.app",
    group: "tools",
    tagline: "API, bots y OAuth2 (en inglés)",
    purpose:
      "Si quieres crear tu propio bot o integración, aquí está toda la referencia técnica oficial.",
    official: true,
  },
  {
    id: "feedback",
    name: "Feedback de Fluxer",
    url: "https://fluxer.app/feedback",
    group: "feedback",
    tagline: "Propón ideas y vota las de otros",
    purpose:
      "El equipo de Fluxer lee estas propuestas. Puedes escribir en español; si quieres, te ayudamos a traducirla.",
    official: true,
  },
  {
    id: "bug-reports",
    name: "Reporte de errores",
    url: "https://github.com/fluxerapp/fluxer/issues",
    group: "feedback",
    tagline: "Avisa de fallos en GitHub",
    purpose:
      "Si algo no funciona como debería, revisa si ya está reportado y, si no, abre un issue con pasos para reproducirlo.",
    official: true,
  },
  {
    id: "status",
    name: "Estado del servicio",
    url: "https://status.fluxer.app",
    group: "feedback",
    tagline: "¿Se ha caído o es cosa mía?",
    purpose: "Consulta si hay incidencias activas antes de reinstalar nada.",
    official: true,
  },
  {
    id: "fluxerlist",
    name: "FluxerList",
    url: "https://fluxerlist.com",
    group: "misc",
    tagline: "Directorio de servidores, bots y temas",
    purpose: "Explora servidores y bots de todo el mundo, no solo en español.",
    official: false,
  },
  {
    id: "theme-editor",
    name: "Editor de temas",
    url: "#",
    group: "misc",
    tagline: "Personaliza los colores de tu cliente",
    purpose: "Crea y comparte temas con CSS sin tener que saber programar.",
    official: false,
  },
];
