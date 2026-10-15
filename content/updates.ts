import type { Update } from "@/lib/types";

// Newest first. The first entry feeds the site-wide announcement bar.
export const updates: Update[] = [
  {
    slug: "build-2026-10",
    kind: "build",
    title: "Build 2026.10: hilos más rápidos y nuevo selector de emojis",
    summary:
      "Los hilos cargan al instante, el selector de emojis se renueva y llegan varias correcciones en llamadas de voz.",
    date: "2026-10-12",
    author: "Elías",
    version: "2026.10",
    originalUrl: "https://fluxer.app/changelog",
    translatedBy: "Equipo de Fluxer Español",
    sections: [
      {
        title: "Nuevo",
        items: [
          "Selector de emojis rediseñado con búsqueda por nombre y categorías recientes.",
          "Ahora puedes fijar hasta 3 hilos en la parte superior de un canal.",
        ],
      },
      {
        title: "Mejoras",
        items: [
          "Los hilos largos cargan hasta 3 veces más rápido.",
          "Las notificaciones agrupan mejor las menciones de un mismo canal.",
        ],
      },
      {
        title: "Correcciones",
        items: [
          "Se corrigió un eco en llamadas de voz con ciertos micrófonos USB.",
          "Las imágenes en modo oscuro ya no se ven con un borde blanco.",
        ],
      },
    ],
  },
  {
    slug: "perfiles-personalizables",
    kind: "feature",
    title: "Perfiles más personales: banners, pronombres y estado",
    summary:
      "Hampus presenta la nueva personalización de perfiles: banner, pronombres y un estado con emoji.",
    date: "2026-09-28",
    author: "Hampus",
    originalUrl: "https://fluxer.app/blog",
    translatedBy: "Equipo de Fluxer Español",
    sections: [
      {
        title: "Nuevo",
        items: [
          "Sube un banner a tu perfil (imagen o color sólido).",
          "Campo de pronombres visible en tu tarjeta de usuario.",
          "Estado personalizado con emoji y fecha de caducidad.",
        ],
      },
      {
        title: "Mejoras",
        items: ["La tarjeta de usuario muestra los servidores en común."],
      },
    ],
  },
  {
    slug: "build-2026-09",
    kind: "build",
    title: "Build 2026.09: permisos por categoría",
    summary:
      "Gestiona permisos para toda una categoría de canales de una vez y revisa los cambios en el registro de auditoría.",
    date: "2026-09-10",
    author: "Elías",
    version: "2026.09",
    originalUrl: "https://fluxer.app/changelog",
    translatedBy: "Equipo de Fluxer Español",
    sections: [
      {
        title: "Nuevo",
        items: ["Permisos sincronizados por categoría de canales."],
      },
      {
        title: "Mejoras",
        items: [
          "El registro de auditoría muestra quién cambió cada permiso.",
          "Mejor rendimiento en servidores con más de 10 000 miembros.",
        ],
      },
      {
        title: "Correcciones",
        items: ["Los roles ya no se desordenan al arrastrarlos rápido."],
      },
    ],
  },
];

export function getUpdate(slug: string) {
  return updates.find((update) => update.slug === slug);
}
