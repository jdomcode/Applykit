export type TemplateInputData = Record<string, string>;

export type RenderTemplateOptions = Readonly<{
  locale: "en" | "es";
}>;

const PLACEHOLDER_PATTERN = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;

function cleanValue(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\r\n/g, "\n").trim();
}

function normalizeExperience(value: string | undefined, locale: "en" | "es") {
  const cleaned = cleanValue(value);

  if (!cleaned) {
    return "";
  }

  if (/^\d+(?:[.,]\d+)?$/.test(cleaned)) {
    return locale === "es" ? `${cleaned} años` : `${cleaned} years`;
  }

  return cleaned;
}

function removeEmptyOptionalLines(text: string) {
  return text
    .replace(/^\s*\[optional\].*$/gim, "")
    .replace(/^\s*\(optional\).*$/gim, "")
    .replace(/^\s*Opcional:.*$/gim, "");
}

function normalizeGeneratedText(text: string, locale: "en" | "es") {
  let normalized = removeEmptyOptionalLines(text)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (locale === "en") {
    normalized = normalized
      .replace(/^Dear\s*,/gm, "Hello,")
      .replace(/^Dear\s+Manager\s*,/gm, "Dear Manager,")
      .replace(/\s+of experience\b/g, " of experience")
      .replace(/\s+\./g, ".")
      .replace(/\s+,/g, ",");
  }

  if (locale === "es") {
    normalized = normalized
      .replace(/^Estimado\/a\s*:/gm, "Hola:")
      .replace(/^Estimado\/a\s*,/gm, "Hola,")
      .replace(/^Estimado equipo de reclutamiento:\s*$/gm, "Estimado equipo de reclutamiento:")
      .replace(/\s+\./g, ".")
      .replace(/\s+,/g, ",");
  }

  return normalized;
}

export function normalizeInputAliases(inputData: TemplateInputData, locale: "en" | "es"): TemplateInputData {
  const normalized: TemplateInputData = { ...inputData };

  if (!normalized.desired_range && normalized.target_range) {
    normalized.desired_range = normalized.target_range;
  }

  if (!normalized.target_range && normalized.desired_range) {
    normalized.target_range = normalized.desired_range;
  }

  if (!normalized.target_role && normalized.current_role) {
    normalized.target_role = normalized.current_role;
  }

  if (!normalized.current_role && normalized.target_role) {
    normalized.current_role = normalized.target_role;
  }

  if (normalized.years_experience) {
    normalized.years_experience = normalizeExperience(normalized.years_experience, locale);
  }

  return normalized;
}

export function renderTemplate(templateBody: string, inputData: TemplateInputData, options: RenderTemplateOptions) {
  const normalizedInput = normalizeInputAliases(inputData, options.locale);

  const rendered = templateBody.replace(PLACEHOLDER_PATTERN, (_match, key: string) => {
    return cleanValue(normalizedInput[key]);
  });

  return normalizeGeneratedText(rendered, options.locale);
}
