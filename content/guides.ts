import type { Guide, GuideLevel } from "@/lib/types";

export const guideLevelLabels: Record<GuideLevel, string> = {
  beginner: "Principiantes",
  admin: "Admins de servidores",
};

export const guides: Guide[] = [
  {
    slug: "primeros-pasos",
    level: "beginner",
    title: "Primeros pasos en Fluxer",
    summary: "Crea tu cuenta, entiende la interfaz y únete a tu primer servidor.",
    readMinutes: 4,
    body: [
      {
        type: "paragraph",
        text: "Fluxer es una plataforma de chat libre y de código abierto para comunidades. Si vienes de otras apps de chat, te vas a sentir en casa enseguida.",
      },
      { type: "heading", text: "Crea tu cuenta" },
      {
        type: "steps",
        items: [
          "Entra en fluxer.app y pulsa «Registrarse».",
          "Elige tu nombre de usuario (puedes cambiarlo después).",
          "Confirma tu correo electrónico.",
        ],
      },
      {
        type: "tip",
        title: "Consejo",
        text: "Activa la verificación en dos pasos desde Ajustes → Seguridad. Tarda un minuto y protege tu cuenta.",
      },
      { type: "heading", text: "Conoce la interfaz" },
      {
        type: "list",
        items: [
          "A la izquierda, la lista de servidores.",
          "En el centro, los canales del servidor que tengas abierto.",
          "A la derecha, los miembros conectados.",
        ],
      },
      { type: "heading", text: "Únete a la comunidad" },
      {
        type: "paragraph",
        text: "Abre fluxer.gg/spanish y acepta la invitación. Pásate por el canal de presentaciones y saluda: aquí nadie muerde.",
      },
    ],
  },
  {
    slug: "personaliza-tu-perfil",
    level: "beginner",
    title: "Personaliza tu perfil",
    summary: "Avatar, banner, pronombres y estado: haz que tu perfil se sienta tuyo.",
    readMinutes: 3,
    body: [
      {
        type: "paragraph",
        text: "Tu perfil es lo primero que ven los demás. Dedica un par de minutos a dejarlo a tu gusto.",
      },
      {
        type: "steps",
        items: [
          "Ve a Ajustes → Perfil.",
          "Sube un avatar y, si quieres, un banner.",
          "Añade tus pronombres y una breve descripción.",
          "Guarda los cambios.",
        ],
      },
      {
        type: "tip",
        title: "¿Sabías que…?",
        text: "Puedes tener un apodo distinto en cada servidor sin cambiar tu nombre global.",
      },
    ],
  },
  {
    slug: "privacidad-y-notificaciones",
    level: "beginner",
    title: "Privacidad y notificaciones",
    summary: "Decide quién te escribe y qué avisos recibes, sin volverte loco.",
    readMinutes: 5,
    body: [
      {
        type: "paragraph",
        text: "Fluxer te da bastante control sobre tu privacidad. Estos son los ajustes que recomendamos revisar primero.",
      },
      {
        type: "list",
        items: [
          "Mensajes directos: limítalos a amigos o a miembros de servidores en común.",
          "Notificaciones: usa «Solo menciones» en servidores grandes.",
          "Silencia canales concretos en lugar de servidores enteros.",
        ],
      },
    ],
  },
  {
    slug: "crea-tu-servidor",
    level: "admin",
    title: "Crea y organiza tu servidor",
    summary: "Estructura de canales, categorías y una bienvenida que invite a quedarse.",
    readMinutes: 7,
    body: [
      {
        type: "paragraph",
        text: "Un servidor ordenado se nota desde el primer minuto. Empieza pequeño y crece según lo pida tu comunidad.",
      },
      { type: "heading", text: "Estructura básica" },
      {
        type: "steps",
        items: [
          "Crea una categoría «Bienvenida» con los canales #normas y #presentaciones.",
          "Añade una categoría «General» para charla y temas variados.",
          "Deja los canales de voz al final, agrupados.",
        ],
      },
      {
        type: "tip",
        title: "Atajo",
        text: "En Rincón de la Comunidad tienes plantillas en español listas para usar.",
      },
    ],
  },
  {
    slug: "roles-y-permisos",
    level: "admin",
    title: "Roles y permisos sin dolores de cabeza",
    summary: "Cómo pensar los roles, sincronizar permisos por categoría y evitar sustos.",
    readMinutes: 8,
    body: [
      {
        type: "paragraph",
        text: "Los permisos se heredan: servidor → categoría → canal. Entender este orden te ahorra la mayoría de problemas.",
      },
      {
        type: "list",
        items: [
          "Da a @everyone solo lo imprescindible.",
          "Crea roles por función (Moderación, Eventos), no por persona.",
          "Usa permisos por categoría y sincroniza los canales.",
        ],
      },
      {
        type: "tip",
        title: "Importante",
        text: "Nunca des «Administrador» a un bot si no es estrictamente necesario.",
      },
    ],
  },
  {
    slug: "moderacion-con-bots",
    level: "admin",
    title: "Moderación con bots",
    summary: "Automatiza filtros, avisos y registros con bots que hablan español.",
    readMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "Un buen bot de moderación trabaja mientras duermes. Revisa el Directorio de Bots para encontrar uno con soporte en español.",
      },
      {
        type: "steps",
        items: [
          "Invita al bot con el mínimo de permisos que necesite.",
          "Configura un canal privado de registros.",
          "Activa filtros de spam y enlaces sospechosos.",
          "Prueba con una cuenta secundaria antes de anunciarlo.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
