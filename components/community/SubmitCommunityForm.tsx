"use client";

import { useRef, useState } from "react";
import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/Button";
import { communityTopicLabels } from "@/content/community";
import { cx } from "@/lib/format";
import type { CommunityTopic } from "@/lib/types";

const DESCRIPTION_MAX = 200;
const topics = Object.keys(communityTopicLabels) as CommunityTopic[];

type FieldName = "name" | "invite" | "description" | "owner" | "consent";
type Values = Record<Exclude<FieldName, "consent">, string> & { consent: boolean };
type Errors = Partial<Record<FieldName, string>>;

const fieldLabels: Record<FieldName, string> = {
  name: "Nombre de la comunidad",
  invite: "Enlace de invitación",
  description: "Descripción",
  owner: "Tu usuario de Fluxer",
  consent: "Confirmación",
};

function validate(field: FieldName, values: Values): string | undefined {
  switch (field) {
    case "name":
      return values.name.trim().length < 3 ? "Escribe al menos 3 caracteres." : undefined;
    case "invite":
      return /^https:\/\/fluxer\.gg\/\S+$/.test(values.invite.trim())
        ? undefined
        : "Usa un enlace que empiece por https://fluxer.gg/, por ejemplo https://fluxer.gg/micomunidad.";
    case "description":
      if (values.description.trim().length < 20) return "Cuéntanos un poco más (mínimo 20 caracteres).";
      return values.description.length > DESCRIPTION_MAX
        ? `Acorta la descripción a ${DESCRIPTION_MAX} caracteres.`
        : undefined;
    case "owner":
      return values.owner.trim() ? undefined : "Necesitamos tu usuario para contactarte.";
    case "consent":
      return values.consent ? undefined : "Marca la casilla para confirmar.";
  }
}

const inputClasses =
  "mt-1.5 block min-h-12 w-full rounded-xl border bg-surface px-4 text-base text-fg placeholder:text-fg-muted/80";

export function SubmitCommunityForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    invite: "",
    description: "",
    owner: "",
    consent: false,
  });
  const [selectedTopics, setSelectedTopics] = useState<CommunityTopic[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  function setValue<K extends keyof Values>(field: K, value: Values[K]) {
    const next = { ...values, [field]: value };
    setValues(next);
    // Once a field shows an error, re-check it as the user fixes it.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: validate(field, next) }));
  }

  function onBlur(field: FieldName) {
    setErrors((current) => ({ ...current, [field]: validate(field, values) }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    for (const field of Object.keys(fieldLabels) as FieldName[]) {
      const error = validate(field, values);
      if (error) nextErrors[field] = error;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("sending");
    // Mockup only: simulate the request.
    setTimeout(() => setStatus("sent"), 900);
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-surface p-8 text-center">
        <CheckCircleIcon size={48} weight="fill" aria-hidden className="mx-auto text-success" />
        <h2 className="mt-4 text-2xl font-extrabold">¡Gracias! Hemos recibido tu comunidad</h2>
        <p className="mx-auto mt-2 max-w-md text-fg-muted">
          El equipo la revisará en los próximos días y te avisaremos por Fluxer. (Esto es una demo:
          no se ha enviado nada.)
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setValues({ name: "", invite: "", description: "", owner: "", consent: false });
            setSelectedTopics([]);
            setStatus("idle");
          }}
        >
          Enviar otra comunidad
        </Button>
      </div>
    );
  }

  const errorEntries = (Object.entries(errors) as [FieldName, string | undefined][]).filter(
    (entry): entry is [FieldName, string] => Boolean(entry[1]),
  );

  const field = (name: Exclude<FieldName, "consent">) => ({
    id: name,
    name,
    value: values[name],
    onBlur: () => onBlur(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": [`${name}-help`, errors[name] && `${name}-error`].filter(Boolean).join(" "),
    className: cx(inputClasses, errors[name] ? "border-danger" : "border-line-strong"),
  });

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-line bg-surface p-5 sm:p-8">
      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl bg-danger-soft p-4 text-danger"
        >
          <p className="flex items-center gap-2 font-bold">
            <WarningCircleIcon size={20} weight="bold" aria-hidden />
            Revisa {errorEntries.length === 1 ? "este campo" : `estos ${errorEntries.length} campos`}:
          </p>
          <ul className="mt-2 list-disc pl-7">
            {errorEntries.map(([name]) => (
              <li key={name}>
                <a href={`#${name}`} className="underline underline-offset-2">
                  {fieldLabels[name]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="name" className="font-bold">
          Nombre de la comunidad <span aria-hidden className="text-primary">*</span>
        </label>
        <input type="text" autoComplete="off" required {...field("name")} onChange={(e) => setValue("name", e.target.value)} />
        <p id="name-help" className="mt-1 text-sm text-fg-muted">Tal como aparece en Fluxer.</p>
        <FieldError name="name" error={errors.name} />
      </div>

      <div>
        <label htmlFor="invite" className="font-bold">
          Enlace de invitación <span aria-hidden className="text-primary">*</span>
        </label>
        <input
          type="url"
          inputMode="url"
          placeholder="https://fluxer.gg/micomunidad"
          required
          {...field("invite")}
          onChange={(e) => setValue("invite", e.target.value)}
        />
        <p id="invite-help" className="mt-1 text-sm text-fg-muted">
          Usa un enlace que no caduque para que siempre funcione.
        </p>
        <FieldError name="invite" error={errors.invite} />
      </div>

      <div>
        <label htmlFor="description" className="font-bold">
          Descripción <span aria-hidden className="text-primary">*</span>
        </label>
        <textarea
          rows={3}
          required
          {...field("description")}
          className={cx(field("description").className, "py-3")}
          onChange={(e) => setValue("description", e.target.value)}
        />
        <p id="description-help" className="mt-1 flex justify-between gap-4 text-sm text-fg-muted">
          <span>¿De qué va tu comunidad? Una o dos frases.</span>
          <span className={cx(values.description.length > DESCRIPTION_MAX && "font-bold text-danger")}>
            {values.description.length}/{DESCRIPTION_MAX}
          </span>
        </p>
        <FieldError name="description" error={errors.description} />
      </div>

      <fieldset>
        <legend className="font-bold">Temas</legend>
        <p className="text-sm text-fg-muted">Elige los que encajen (opcional).</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((topic) => {
            const checked = selectedTopics.includes(topic);
            return (
              <label
                key={topic}
                className={cx(
                  "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary",
                  checked ? "border-primary bg-primary-soft text-on-primary-soft" : "border-line bg-surface hover:border-primary",
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() =>
                    setSelectedTopics((current) =>
                      checked ? current.filter((item) => item !== topic) : [...current, topic],
                    )
                  }
                />
                {communityTopicLabels[topic]}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="owner" className="font-bold">
          Tu usuario de Fluxer <span aria-hidden className="text-primary">*</span>
        </label>
        <input type="text" autoComplete="username" placeholder="@usuario" required {...field("owner")} onChange={(e) => setValue("owner", e.target.value)} />
        <p id="owner-help" className="mt-1 text-sm text-fg-muted">
          Solo lo usamos para avisarte. Con «Entrar con Fluxer» se rellenará solo.
        </p>
        <FieldError name="owner" error={errors.owner} />
      </div>

      <div>
        <label className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => setValue("consent", e.target.checked)}
            onBlur={() => onBlur("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-5 shrink-0 accent-primary"
          />
          <span>
            Soy admin de esta comunidad y acepto que se muestre en el directorio.{" "}
            <span aria-hidden className="text-primary">*</span>
          </span>
        </label>
        <FieldError name="consent" error={errors.consent} />
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-muted">
          <span aria-hidden className="text-primary">*</span> Campos obligatorios
        </p>
        <Button type="submit" size="lg" disabled={status === "sending"} aria-busy={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar para revisión"}
        </Button>
      </div>
    </form>
  );
}

function FieldError({ name, error }: { name: FieldName; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-danger">
      <WarningCircleIcon size={16} weight="bold" aria-hidden className="mt-0.5 shrink-0" />
      {error}
    </p>
  );
}
