export type TemplateInputData = Record<string, string>;

export type RenderTemplateOptions = Readonly<{
  locale: "en" | "es";
}>;

const PLACEHOLDER_PATTERN = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;
const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
} as const;

function cleanValue(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return decodeEscapedNewlines(value).replace(/\r\n/g, "\n").trim();
}

function decodeEscapedNewlines(value: string) {
  return value
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
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

function normalizeExperienceLevel(value: string | undefined, locale: "en" | "es") {
  const cleaned = cleanValue(value);

  if (!cleaned) {
    return "";
  }

  const englishMap: Record<string, string> = {
    "entry level": "entry-level",
    "mid level": "mid-level",
    senior: "senior",
    manager: "manager-level"
  };

  const spanishMap: Record<string, string> = {
    "entry level": "inicial",
    "mid level": "intermedio",
    manager: "gerencial",
    inicial: "inicial",
    intermedio: "intermedio",
    senior: "senior",
    gerencial: "gerencial"
  };

  const key = cleaned.toLowerCase();
  return locale === "es" ? spanishMap[key] ?? cleaned : englishMap[key] ?? cleaned;
}

function formatDate(value: string | undefined, locale: "en" | "es") {
  const cleaned = cleanValue(value);

  if (!cleaned) {
    return "";
  }

  const match = cleaned.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return cleaned;
  }

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);

  if (monthIndex < 0 || monthIndex > 11 || day < 1 || day > 31) {
    return cleaned;
  }

  return locale === "es" ? `${day} de ${MONTHS.es[monthIndex]} de ${year}` : `${MONTHS.en[monthIndex]} ${day}, ${year}`;
}

function removeEmptyOptionalLines(text: string) {
  return text
    .replace(/^\s*\[optional\].*$/gim, "")
    .replace(/^\s*\(optional\).*$/gim, "")
    .replace(/^\s*Opcional:.*$/gim, "");
}

function removeBrokenOutput(text: string) {
  return text
    .replace(/undefined|null|\[object Object\]/g, "")
    .replace(/{{\s*[a-zA-Z0-9_]+\s*}}/g, "")
    .replace(/\bn\/n\/n\b/g, "")
    .replace(/\s+([.,;:!?])/g, "$1")
    .replace(/([¿¡])\s+/g, "$1");
}

function normalizeGeneratedText(text: string, locale: "en" | "es") {
  let normalized = removeBrokenOutput(removeEmptyOptionalLines(decodeEscapedNewlines(text)))
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  if (locale === "en") {
    normalized = normalized
      .replace(/^Dear\s*,/gm, "Hello,")
      .replace(/^Dear\s+Manager\s*,/gm, "Dear Manager,")
      .replace(/\bmy\s+([A-Za-z-]+)\s+level\s+level\s+of\s+experience\b/gi, "my $1-level experience")
      .replace(/\blevel\s+level\b/gi, "level")
      .replace(/\s+of experience\b/g, " of experience")
      .replace(/\s+\./g, ".")
      .replace(/\s+,/g, ",");
  }

  if (locale === "es") {
    normalized = normalized
      .replace(/^Estimado\/a\s*:/gm, "Hola:")
      .replace(/^Estimado\/a\s*,/gm, "Hola,")
      .replace(/^Estimado\/a\s+supervisor\/a:/gm, "A quien corresponda:")
      .replace(/^Estimado\/a\s+{{?\w+}?}:?/gm, "Hola:")
      .replace(/^Estimado equipo de reclutamiento:\s*$/gm, "Estimado equipo de reclutamiento:")
      .replace(/interesado\/a en la oportunidad/g, "mantengo mi interés en la oportunidad")
      .replace(/Sigo interesado\/a en la oportunidad y quedo disponible/g, "Mantengo mi interés en la oportunidad y quedo disponible")
      .replace(/Quedo atento\/a a sus comentarios/g, "Quedo pendiente de sus comentarios")
      .replace(/profesional enfocado\/a en/g, "profesional con enfoque en")
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

  if (!normalized.target_role) {
    normalized.target_role = locale === "es" ? "mi perfil" : "my background";
  }

  if (!normalized.current_role && normalized.target_role && !["my background", "mi perfil"].includes(normalized.target_role)) {
    normalized.current_role = normalized.target_role;
  }

  if (normalized.years_experience) {
    normalized.years_experience = normalizeExperience(normalized.years_experience, locale);
  }

  if (normalized.experience_level) {
    normalized.experience_level = normalizeExperienceLevel(normalized.experience_level, locale);
  }

  if (normalized.interview_date) {
    normalized.interview_date = formatDate(normalized.interview_date, locale);
  }

  if (normalized.last_working_day) {
    normalized.last_working_day = formatDate(normalized.last_working_day, locale);
  }

  return normalized;
}

export function renderTemplate(templateBody: string, inputData: TemplateInputData, options: RenderTemplateOptions) {
  const normalizedInput = normalizeInputAliases(inputData, options.locale);
  const cleanTemplate = decodeEscapedNewlines(templateBody);

  const rendered = cleanTemplate.replace(PLACEHOLDER_PATTERN, (_match, key: string) => {
    return cleanValue(normalizedInput[key]);
  });

  return normalizeGeneratedText(rendered, options.locale);
}
