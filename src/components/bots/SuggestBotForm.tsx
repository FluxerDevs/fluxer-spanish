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
import { botCategoryLabels, botLanguageLabels } from "@/data/bots";
import { cx } from "@/lib/format";
import { botRules, DESCRIPTION_MAX, type BotValues } from "@/lib/submission-rules";
import type { BotCategory, BotLanguage } from "@/lib/types";

const categories = Object.keys(botCategoryLabels) as BotCategory[];
const languages = Object.keys(botLanguageLabels) as BotLanguage[];

const fieldLabels: Record<keyof BotValues, string> = {
  name: "Nombre del bot",
  invite: "Enlace de invitación",
  description: "Descripción",
  categories: "Categorías",
  language: "Idioma de los comandos",
  website: "Web",
};

const initial: BotValues = { name: "", invite: "", description: "", categories: [], language: "", website: "" };

export function SuggestBotForm() {
  return (
    <LoginRequired action="sugerir un bot">
      <BotForm />
    </LoginRequired>
  );
}

function BotForm() {
  const form = useSubmissionForm({ initial, rules: botRules, submit: actions.suggestBot });
  const { values, errors, field, setValue } = form;

  if (form.status === "sent") {
    return <SentNotice title="¡Gracias! Hemos recibido tu sugerencia" againLabel="Sugerir otro bot" onAgain={form.reset} />;
  }

  return (
    <form noValidate onSubmit={form.onSubmit} className="space-y-6 rounded-2xl border border-line bg-surface p-5 sm:p-8">
      <ErrorSummary summaryRef={form.summaryRef} errors={errors} formError={form.formError} labels={fieldLabels} />

      <div>
        <label htmlFor="name" className="font-bold">
          Nombre del bot <span aria-hidden className="text-primary">*</span>
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
          placeholder="https://web.fluxer.app/oauth2/authorize?client_id=…&scope=bot"
          required
          {...field("invite")}
          onChange={(e) => setValue("invite", e.target.value)}
        />
        <p id="invite-help" className="mt-1 text-sm text-fg-muted">
          El enlace con el que se añade el bot a un servidor. Suele estar en la web del bot o en su
          perfil.
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
          <span>¿Para qué sirve? Una o dos frases.</span>
          <span className={cx(values.description.length > DESCRIPTION_MAX && "font-bold text-danger")}>
            {values.description.length}/{DESCRIPTION_MAX}
          </span>
        </p>
        <FieldError name="description" error={errors.description} />
      </div>

      <fieldset id="categories" tabIndex={-1} aria-describedby={errors.categories ? "categories-error" : undefined}>
        <legend className="font-bold">
          Categorías <span aria-hidden className="text-primary">*</span>
        </legend>
        <ChipGroup
          options={categories}
          labels={botCategoryLabels}
          selected={values.categories}
          onChange={(next) => setValue("categories", next)}
        />
        <FieldError name="categories" error={errors.categories} />
      </fieldset>

      <div>
        <label htmlFor="language" className="font-bold">
          Idioma de los comandos <span aria-hidden className="text-primary">*</span>
        </label>
        <select
          {...field("language")}
          className={cx(field("language").className, "appearance-auto")}
          onChange={(e) => setValue("language", e.target.value as BotLanguage | "")}
        >
          <option value="">Elige una opción</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {botLanguageLabels[language]}
            </option>
          ))}
        </select>
        <p id="language-help" className="mt-1 text-sm text-fg-muted">
          Los bots en inglés también tienen sitio: los marcamos como tal.
        </p>
        <FieldError name="language" error={errors.language} />
      </div>

      <div>
        <label htmlFor="website" className="font-bold">
          Web
        </label>
        <input
          type="url"
          inputMode="url"
          placeholder="https://"
          {...field("website")}
          onChange={(e) => setValue("website", e.target.value)}
        />
        <p id="website-help" className="mt-1 text-sm text-fg-muted">Opcional: su web o documentación.</p>
        <FieldError name="website" error={errors.website} />
      </div>

      <FormFooter status={form.status} />
    </form>
  );
}
