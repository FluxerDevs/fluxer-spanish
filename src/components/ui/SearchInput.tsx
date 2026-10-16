import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";

export function SearchInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block w-full sm:max-w-sm">
      <span className="sr-only">{label}</span>
      <MagnifyingGlassIcon
        size={20}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-fg-muted"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-full border border-line bg-surface pr-4 pl-11 text-base text-fg placeholder:text-fg-muted/80 focus:border-primary"
      />
    </label>
  );
}
