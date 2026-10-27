import { actions } from "astro:actions";
import {
  ErrorSummary,
  FieldError,
  FormFooter,
  LoginRequired,
  SentNotice,
  useSubmissionForm,
} from "@/components/forms/SubmissionForm";
import { toolGroupLabels } from "@/data/tools";
import { cx } from "@/lib/format";
import { DESCRIPTION_MAX, toolRules, type ToolValues } from "@/lib/submission-rules";
import type { ToolGroup } from "@/lib/types";

const groups = Object.keys(toolGroupLabels) as ToolGroup[];

const fieldLabels: Record<keyof ToolValues, string> = {
  name: "Nombre",
  url: "Enlace",
  group: "Sección",
  tagline: "Resumen",
  purpose: "Para qué sirve",
};

const initial: ToolValues = { name: "", url: "", group: "", tagline: "", purpose: "" };

export function SuggestToolForm() {
  return (
    <LoginRequired action="sugerir una herramienta">
      <ToolForm />
    </LoginRequired>
  );
}

function ToolForm() {
  const form = useSubmissionForm({ initial, rules: toolRules, submit: actions.suggestTool });
  const { values, errors, field, setValue } = form;

  if (form.status === "sent") {
    return (
      <SentNotice title="¡Gracias! Hemos recibido tu sugerencia" againLabel="Sugerir otra herramienta" onAgain={form.reset} />
    );
  }

  return (
    <form noValidate onSubmit={form.onSubmit} className="space-y-6 rounded-2xl border border-line bg-surface p-5 sm:p-8">
      <ErrorSummary summaryRef={form.summaryRef} errors={errors} formError={form.formError} labels={fieldLabels} />

      <div>
        <label htmlFor="name" className="font-bold">
          Nombre <span aria-hidden className="text-primary">*</span>
        </label>
        <input type="text" autoComplete="off" required {...field("name")} onChange={(e) => setValue("name", e.target.value)} />
        <p id="name-help" className="mt-1 text-sm text-fg-muted">La web, el servicio o el proyecto.</p>
        <FieldError name="name" error={errors.name} />
      </div>

      <div>
        <label htmlFor="url" className="font-bold">
          Enlace <span aria-hidden className="text-primary">*</span>
        </label>
        <input
          type="url"
          inputMode="url"
          placeholder="https://"
          required
          {...field("url")}
          onChange={(e) => setValue("url", e.target.value)}
        />
        <p id="url-help" className="mt-1 text-sm text-fg-muted">Su página principal.</p>
        <FieldError name="url" error={errors.url} />
      </div>

      <div>
        <label htmlFor="group" className="font-bold">
          Sección <span aria-hidden className="text-primary">*</span>
        </label>
        <select
          {...field("group")}
          className={cx(field("group").className, "appearance-auto")}
          onChange={(e) => setValue("group", e.target.value as ToolGroup | "")}
        >
          <option value="">Elige una opción</option>
          {groups.map((group) => (
            <option key={group} value={group}>
              {toolGroupLabels[group].title}
            </option>
          ))}
        </select>
        <p id="group-help" className="mt-1 text-sm text-fg-muted">
          {values.group ? toolGroupLabels[values.group].description : "Dónde la pondrías en la página de ecosistema."}
        </p>
        <FieldError name="group" error={errors.group} />
      </div>

      <div>
        <label htmlFor="tagline" className="font-bold">
          Resumen <span aria-hidden className="text-primary">*</span>
        </label>
        <input type="text" autoComplete="off" required {...field("tagline")} onChange={(e) => setValue("tagline", e.target.value)} />
        <p id="tagline-help" className="mt-1 text-sm text-fg-muted">
          Unas pocas palabras, por ejemplo «Alojamiento para bots».
        </p>
        <FieldError name="tagline" error={errors.tagline} />
      </div>

      <div>
        <label htmlFor="purpose" className="font-bold">
          Para qué sirve <span aria-hidden className="text-primary">*</span>
        </label>
        <textarea
          rows={3}
          required
          {...field("purpose")}
          className={cx(field("purpose").className, "py-3")}
          onChange={(e) => setValue("purpose", e.target.value)}
        />
        <p id="purpose-help" className="mt-1 flex justify-between gap-4 text-sm text-fg-muted">
          <span>Explícalo para alguien que acaba de llegar a Fluxer.</span>
          <span className={cx(values.purpose.length > DESCRIPTION_MAX && "font-bold text-danger")}>
            {values.purpose.length}/{DESCRIPTION_MAX}
          </span>
        </p>
        <FieldError name="purpose" error={errors.purpose} />
      </div>

      <FormFooter status={form.status} />
    </form>
  );
}
