import { useRef, useState } from "react";
import { isActionError, isInputError } from "astro:actions";
import { CheckCircleIcon, SignInIcon, WarningCircleIcon } from "@phosphor-icons/react/ssr";
import { Button, buttonClasses } from "@/components/ui/Button";
import { loginUrl, useSession } from "@/lib/client-store";
import { cx } from "@/lib/format";
import { validateAll, type FieldErrors, type Rules } from "@/lib/submission-rules";
import { href } from "@/lib/url";

// Shared pieces for the community, bot and tool submission forms.

export const inputClasses =
  "mt-1.5 block min-h-12 w-full rounded-xl border bg-surface px-4 text-base text-fg placeholder:text-fg-muted/80";

type Status = "idle" | "sending" | "sent";
type SubmitResponse<V> = { ok: true } | { ok: false; errors: FieldErrors<V> };
type ActionResult<V> = { data?: SubmitResponse<V>; error?: unknown };

/**
 * Form state with the same validation as the server: fields are checked on blur, re-checked
 * as the user fixes them, and all at once on submit. Server field errors land on the same fields.
 */
export function useSubmissionForm<V extends object>({
  initial,
  rules,
  submit,
}: {
  initial: V;
  rules: Rules<V>;
  submit: (values: V) => Promise<ActionResult<V>>;
}) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors<V>>({});
  const [formError, setFormError] = useState<string>();
  const [status, setStatus] = useState<Status>("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  const focusSummary = () => requestAnimationFrame(() => summaryRef.current?.focus());

  function setValue<K extends keyof V>(field: K, value: V[K]) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field]) setErrors((current) => ({ ...current, [field]: rules[field]?.(next) }));
  }

  function onBlur(field: keyof V) {
    setErrors((current) => ({ ...current, [field]: rules[field]?.(values) }));
  }

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(undefined);
    const nextErrors = validateAll(rules, values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return focusSummary();

    setStatus("sending");
    const { data, error } = await submit(values);
    if (data?.ok) return setStatus("sent");
    setStatus("idle");
    if (data) setErrors(data.errors);
    else if (isInputError(error)) setFormError("Algún campo no tiene el formato esperado. Revísalos y vuelve a intentarlo.");
    else setFormError(isActionError(error) ? error.message : "No se ha podido enviar. Vuelve a intentarlo.");
    focusSummary();
  }

  function reset() {
    setValues(initial);
    setErrors({});
    setStatus("idle");
  }

  /** Props for a text input or textarea bound to `name`. */
  const field = (name: keyof V & string) => ({
    id: name,
    name,
    value: String(values[name] ?? ""),
    onBlur: () => onBlur(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": [`${name}-help`, errors[name] && `${name}-error`].filter(Boolean).join(" "),
    className: cx(inputClasses, errors[name] ? "border-danger" : "border-line-strong"),
  });

  return { values, errors, formError, status, summaryRef, setValue, onBlur, onSubmit, reset, field };
}

/** Shows a login prompt in place of the form once we know nobody is logged in. */
export function LoginRequired({ action, children }: { action: string; children: React.ReactNode }) {
  const session = useSession();
  if (session && !session.user) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center">
        <SignInIcon size={44} aria-hidden className="mx-auto text-primary" />
        <h2 className="mt-4 text-2xl font-extrabold">Entra con Fluxer para {action}</h2>
        <p className="mx-auto mt-2 max-w-md text-fg-muted">
          Así sabemos quién lo envía y puedes seguir su estado desde tu cuenta.
        </p>
        <a
          href={href("/cuenta/entrar")}
          onClick={(event) => {
            event.currentTarget.href = loginUrl();
          }}
          className={buttonClasses("primary", "lg", "mt-6")}
        >
          Entrar con Fluxer
        </a>
      </div>
    );
  }
  return children;
}

export function ErrorSummary<V>({
  summaryRef,
  errors,
  formError,
  labels,
}: {
  summaryRef: React.RefObject<HTMLDivElement | null>;
  errors: FieldErrors<V>;
  formError?: string;
  labels: Record<keyof V, string>;
}) {
  const fields = (Object.keys(errors) as (keyof V & string)[]).filter((name) => errors[name]);
  if (!formError && fields.length === 0) return null;
  return (
    <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl bg-danger-soft p-4 text-danger">
      {formError ? (
        <p className="flex items-center gap-2 font-bold">
          <WarningCircleIcon size={20} weight="bold" aria-hidden />
          {formError}
        </p>
      ) : (
        <>
          <p className="flex items-center gap-2 font-bold">
            <WarningCircleIcon size={20} weight="bold" aria-hidden />
            Revisa {fields.length === 1 ? "este campo" : `estos ${fields.length} campos`}:
          </p>
          <ul className="mt-2 list-disc pl-7">
            {fields.map((name) => (
              <li key={name}>
                <a href={`#${name}`} className="underline underline-offset-2">
                  {labels[name]}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function FieldError({ name, error }: { name: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-danger">
      <WarningCircleIcon size={16} weight="bold" aria-hidden className="mt-0.5 shrink-0" />
      {error}
    </p>
  );
}

export function FormFooter({ status }: { status: Status }) {
  return (
    <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-fg-muted">
        <span aria-hidden className="text-primary">*</span> Campos obligatorios
      </p>
      <Button type="submit" size="lg" disabled={status === "sending"} aria-busy={status === "sending"}>
        {status === "sending" ? "Enviando…" : "Enviar para revisión"}
      </Button>
    </div>
  );
}

export function SentNotice({ title, againLabel, onAgain }: { title: string; againLabel: string; onAgain: () => void }) {
  return (
    <div role="status" className="rounded-2xl border border-line bg-surface p-8 text-center">
      <CheckCircleIcon size={48} weight="fill" aria-hidden className="mx-auto text-success" />
      <h2 className="mt-4 text-2xl font-extrabold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-fg-muted">
        El equipo lo revisará en los próximos días. Puedes ver cómo va en{" "}
        <a href={href("/cuenta")} className="font-semibold text-primary underline underline-offset-2">
          Mi cuenta
        </a>
        .
      </p>
      <Button variant="secondary" className="mt-6" onClick={onAgain}>
        {againLabel}
      </Button>
    </div>
  );
}

/** Pill-shaped checkboxes for picking several options (topics, categories). */
export function ChipGroup<T extends string>({
  options,
  labels,
  selected,
  onChange,
}: {
  options: T[];
  labels: Record<T, string>;
  selected: T[];
  onChange: (next: T[]) => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((option) => {
        const checked = selected.includes(option);
        return (
          <label
            key={option}
            className={cx(
              "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary",
              checked ? "border-primary bg-primary-soft text-on-primary-soft" : "border-line bg-surface hover:border-primary",
            )}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={checked}
              onChange={() => onChange(checked ? selected.filter((item) => item !== option) : [...selected, option])}
            />
            {labels[option]}
          </label>
        );
      })}
    </div>
  );
}
