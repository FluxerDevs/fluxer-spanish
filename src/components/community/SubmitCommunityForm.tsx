import { actions } from "astro:actions";
import {
  ChipGroup,
  ErrorSummary,
  FieldError,
  FormFooter,
  LoginRequired,
  SentNotice,
  useSubmissionForm,
} from "@/components/forms/SubmissionForm";
import { communityTopicLabels } from "@/data/community";
import { cx } from "@/lib/format";
import { communityRules, DESCRIPTION_MAX, type CommunityValues } from "@/lib/submission-rules";
import type { CommunityTopic } from "@/lib/types";

const topics = Object.keys(communityTopicLabels) as CommunityTopic[];

const fieldLabels: Record<keyof CommunityValues, string> = {
  name: "Nombre de la comunidad",
  invite: "Enlace de invitación",
  description: "Descripción",
  topics: "Temas",
  consent: "Confirmación",
};

const initial: CommunityValues = { name: "", invite: "", description: "", topics: [], consent: false };

export function SubmitCommunityForm() {
  return (
    <LoginRequired action="añadir tu servidor">
      <CommunityForm />
    </LoginRequired>
  );
}

function CommunityForm() {
  const form = useSubmissionForm({ initial, rules: communityRules, submit: actions.submitCommunity });
  const { values, errors, field, setValue } = form;

  if (form.status === "sent") {
    return (
      <SentNotice title="¡Gracias! Hemos recibido tu comunidad" againLabel="Enviar otra comunidad" onAgain={form.reset} />
    );
  }

  return (
    <form noValidate onSubmit={form.onSubmit} className="space-y-6 rounded-2xl border border-line bg-surface p-5 sm:p-8">
      <ErrorSummary summaryRef={form.summaryRef} errors={errors} formError={form.formError} labels={fieldLabels} />

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
          Tiene que ser un enlace que no caduque. Comprobamos con Fluxer que eres dueño del servidor o
          tienes el permiso Gestionar servidor.
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
        <ChipGroup
          options={topics}
          labels={communityTopicLabels}
          selected={values.topics}
          onChange={(next) => setValue("topics", next)}
        />
      </fieldset>

      <div>
        <label className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => setValue("consent", e.target.checked)}
            onBlur={() => form.onBlur("consent")}
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

      <FormFooter status={form.status} />
    </form>
  );
}
