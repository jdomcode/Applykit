import type { FormEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { ToolDefinition, ToolField } from "@/lib/tools/tools-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ToolFormProps = Readonly<{
  tool: ToolDefinition;
  locale: Locale;
  isGenerating: boolean;
  onGenerate: (inputData: Record<string, string>) => void;
  onClear: () => void;
}>;

function FieldControl({ field, locale }: Readonly<{ field: ToolField; locale: Locale }>) {
  const copy = field.translations[locale];
  const id = `field-${field.name}`;

  if (field.type === "textarea") {
    return <Textarea id={id} name={field.name} placeholder={copy.placeholder} required={field.required} />;
  }

  if (field.type === "select") {
    return (
      <Select id={id} name={field.name} defaultValue="" required={field.required}>
        <option value="" disabled>
          {locale === "es" ? "Selecciona una opción" : "Select an option"}
        </option>
        {(field.options?.[locale] ?? []).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    );
  }

  return <Input id={id} name={field.name} type={field.type} placeholder={copy.placeholder} required={field.required} />;
}

export function ToolForm({ tool, locale, isGenerating, onGenerate, onClear }: ToolFormProps) {
  const copy = tool.translations[locale];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const inputData: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      inputData[key] = typeof value === "string" ? value : "";
    }

    onGenerate(inputData);
  }

  function handleReset() {
    onClear();
  }

  return (
    <section className="brand-panel min-w-0 rounded-[2rem] p-5 sm:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-accent-strong)]">{locale === "es" ? "Formulario" : "Form"}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{copy.formTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {locale === "es" ? "Completa los campos para crear tu documento." : "Complete the fields below to create your document."}
        </p>
      </div>

      <form className="mt-7 grid gap-5" onSubmit={handleSubmit} onReset={handleReset}>
        {tool.fields.map((field) => {
          const copy = field.translations[locale];

          return (
            <div key={field.name} className="grid gap-2">
              <label htmlFor={`field-${field.name}`} className="text-sm font-medium text-slate-800">
                {copy.label}
                {field.required ? <span className="text-slate-500"> *</span> : null}
              </label>
              <FieldControl field={field} locale={locale} />
              {copy.helper ? <p className="text-xs leading-5 text-slate-500">{copy.helper}</p> : null}
            </div>
          );
        })}

        <div className="flex flex-col gap-3 border-t border-[color:var(--border)] pt-5 sm:flex-row sm:items-center">
          <Button type="submit" className="w-full sm:w-auto" disabled={isGenerating}>
            {isGenerating ? (locale === "es" ? "Generando..." : "Generating...") : locale === "es" ? "Generar documento" : "Generate document"}
          </Button>
          <Button type="reset" variant="ghost" className="w-full sm:w-auto" disabled={isGenerating}>
            {locale === "es" ? "Limpiar" : "Clear"}
          </Button>
        </div>
      </form>
    </section>
  );
}
