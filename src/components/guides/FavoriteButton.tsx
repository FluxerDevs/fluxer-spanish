import { useEffect, useState } from "react";
import { actions } from "astro:actions";
import { BookmarkSimpleIcon } from "@phosphor-icons/react/ssr";
import { loginUrl, useSession } from "@/lib/client-store";
import { cx } from "@/lib/format";
import { href } from "@/lib/url";

const classes =
  "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition-colors duration-200";

/** "Guardar" on a guide page. Logged-out visitors get a link to log in and come back. */
export function FavoriteButton({ guideId }: { guideId: string }) {
  const session = useSession();
  const [saved, setSaved] = useState<boolean>();
  const [busy, setBusy] = useState(false);
  const loggedIn = Boolean(session?.user);

  useEffect(() => {
    if (!loggedIn) return;
    actions.listFavorites().then(({ data }) => setSaved(data?.includes(guideId) ?? false));
  }, [loggedIn, guideId]);

  if (session && !session.user) {
    return (
      <a
        href={href("/cuenta/entrar")}
        onClick={(event) => {
          event.currentTarget.href = loginUrl();
        }}
        className={cx(classes, "border-line text-fg-muted hover:border-primary hover:text-primary")}
      >
        <BookmarkSimpleIcon size={16} aria-hidden />
        Entra para guardar
      </a>
    );
  }

  async function toggle() {
    const next = !saved;
    setBusy(true);
    setSaved(next);
    const { error } = await actions.setFavorite({ guideId, saved: next });
    if (error) setSaved(!next);
    setBusy(false);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={saved === undefined || busy}
      aria-pressed={saved ?? false}
      className={cx(
        classes,
        "disabled:cursor-wait",
        saved ? "border-primary bg-primary-soft text-on-primary-soft" : "border-line text-fg-muted hover:border-primary hover:text-primary",
      )}
    >
      <BookmarkSimpleIcon size={16} weight={saved ? "fill" : "regular"} aria-hidden />
      {saved ? "Guardada" : "Guardar"}
    </button>
  );
}
