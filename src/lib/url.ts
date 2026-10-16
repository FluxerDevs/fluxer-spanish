const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prefixes an internal path with the deploy base (e.g. GitHub Pages "/<repo>") and adds a trailing slash. */
export function href(path: string) {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const [pathname, suffix = ""] = path.split(/(?=[?#])/);
  const withSlash = pathname.endsWith("/") || /\.\w+$/.test(pathname) ? pathname : `${pathname}/`;
  return `${base}${withSlash}${suffix}`;
}

/** Strips the deploy base so a pathname can be compared with internal paths like "/bots". */
export function stripBase(pathname: string) {
  const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return path.replace(/\/$/, "") || "/";
}
