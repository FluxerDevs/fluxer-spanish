import type { Metadata, Viewport } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/content/site";
import { updates } from "@/content/updates";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name} · La comunidad hispana de Fluxer`, template: `%s · ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#16131b" },
  ],
};

const latestUpdate = updates[0];

// Runs before first paint: applies the saved/system theme and hides an already dismissed announcement.
const prePaintScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.dataset.theme=t;if(localStorage.getItem("announcement-dismissed")===${JSON.stringify(latestUpdate.slug)})d.dataset.hideAnnouncement=""}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${nunito.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaintScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only z-50 rounded-full bg-primary px-4 py-2 font-semibold text-on-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        <AnnouncementBar update={latestUpdate} />
        <SiteHeader />
        <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
