import { href } from "@/lib/url";

export function Logo() {
  return (
    <a
      href={href("/")}
      className="inline-flex min-h-11 items-center gap-2.5 font-heading text-lg font-extrabold whitespace-nowrap text-fg no-underline"
    >
      <LogoMark />
      <span>
        Fluxer <span className="text-primary">Español</span>
      </span>
    </a>
  );
}

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="shrink-0">
      <rect width="32" height="32" rx="10" className="fill-primary" />
      {/* Speech bubble with a small "ñ" tilde: chat + Spanish. */}
      <path
        d="M9 12.5a3.5 3.5 0 0 1 3.5-3.5h7a3.5 3.5 0 0 1 3.5 3.5v5a3.5 3.5 0 0 1-3.5 3.5H15l-3.6 2.7a.6.6 0 0 1-.96-.48V21A3.5 3.5 0 0 1 9 17.5z"
        className="fill-on-primary"
      />
      <path
        d="M12.5 15.4c.7-.9 1.5-.9 2.2-.3.7.6 1.5.6 2.2-.3"
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="stroke-primary"
      />
    </svg>
  );
}
