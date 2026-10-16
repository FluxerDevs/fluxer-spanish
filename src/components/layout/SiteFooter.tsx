import { GithubLogoIcon, HeartIcon, XLogoIcon } from "@phosphor-icons/react/ssr";
import { LogoMark } from "@/components/layout/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { mainNav, site } from "@/data/site";
import { team } from "@/data/team";
import { href } from "@/lib/url";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface-muted/60">
      <section aria-labelledby="equipo" className="border-b border-line">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <h2 id="equipo" className="text-xl font-extrabold">
            Equipo de Fluxer Español
          </h2>
          <p className="mt-1 text-fg-muted">Las personas que mantienen viva esta comunidad.</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3"
              >
                <Avatar name={member.name} hue={member.hue} />
                <div className="min-w-0">
                  <p className="font-bold break-words">{member.name}</p>
                  <p className="text-sm text-fg-muted">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-heading text-lg font-extrabold">
            <LogoMark />
            Fluxer Español
          </div>
          <p className="mt-4 max-w-sm text-[15px] text-fg-muted">
            <strong className="font-semibold text-fg">Comunidad no oficial.</strong> Fluxer Español
            está hecho por voluntarios y no tiene relación oficial con Fluxer ni con su equipo.
          </p>
        </div>

        <nav aria-label="Secciones">
          <h3 className="font-heading font-bold">Explora</h3>
          <ul className="mt-3 space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <a href={href(item.href)} className="inline-flex min-h-9 items-center text-fg-muted hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-heading font-bold">Participa</h3>
          <ul className="mt-3 space-y-1">
            <li>
              <a href={site.socials.x} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 text-fg-muted hover:text-primary">
                <XLogoIcon size={18} aria-hidden />
                Síguenos en X
              </a>
            </li>
            <li>
              <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 text-fg-muted hover:text-primary">
                <GithubLogoIcon size={18} aria-hidden />
                Contribuye en GitHub
              </a>
            </li>
            <li>
              <a href={site.inviteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 text-fg-muted hover:text-primary">
                <LogoMark size={18} />
                {site.inviteLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-1.5 px-4 py-5 text-sm text-fg-muted sm:px-6">
          Hecho con
          <HeartIcon size={16} weight="fill" aria-label="cariño" className="text-primary" />
          por la comunidad, para la comunidad.
        </p>
      </div>
    </footer>
  );
}
