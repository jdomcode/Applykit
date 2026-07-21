import type { Locale } from "@/lib/i18n/config";
import type { ToolDefinition } from "@/lib/tools/tools-data";

export type LocalTemplate = Readonly<{
  id: string;
  toolSlug: string;
  locale: Locale;
  tone: "Local";
  templateBody: string;
  inputSchema: {
    fields: Array<{ name: string; required: boolean }>;
  };
  source: "local-code";
}>;

type LocalTemplateBodyMap = Record<ToolDefinition["slug"], Record<Locale, string>>;

const templateBodies: LocalTemplateBodyMap = {
  "cover-letter-generator": {
    en: `Dear Hiring Manager,

I am writing to express my interest in the {{job_title}} position at {{company_name}}. With my background in {{main_skills}} and {{experience_level}} experience, I believe I can contribute effectively to your team.

I am particularly interested in this opportunity because it aligns with my professional goals and allows me to apply my skills in a meaningful way.

Thank you for considering my application. I would welcome the opportunity to discuss how my experience can support your team.

Sincerely,
{{full_name}}`,
    es: `Estimado equipo de reclutamiento:

Me dirijo a ustedes para expresar mi interés en la posición de {{job_title}} en {{company_name}}. Cuento con experiencia de nivel {{experience_level}} y conocimientos en {{main_skills}}, por lo que considero que puedo aportar valor al equipo.

Esta oportunidad me interesa porque se alinea con mis objetivos profesionales y me permitiría aplicar mis habilidades de manera efectiva.

Gracias por considerar mi postulación. Quedo pendiente de la posibilidad de conversar sobre cómo mi experiencia puede contribuir a la empresa.

Atentamente,
{{full_name}}`
  },
  "job-application-email-generator": {
    en: `Dear Hiring Team,

I hope you are doing well. I am writing to apply for the {{job_title}} position at {{company_name}}. Please find my resume attached for your review.

{{attachment_note}}

Thank you for your time and consideration. I would welcome the opportunity to discuss my application further.

Best regards,
{{full_name}}`,
    es: `Estimado equipo de reclutamiento:

Espero que se encuentren bien. Me dirijo a ustedes para postularme a la posición de {{job_title}} en {{company_name}}. Adjunto mi CV para su revisión.

{{attachment_note}}

Gracias por su tiempo y consideración. Quedo pendiente de la posibilidad de conversar sobre mi postulación.

Atentamente,
{{full_name}}`
  },
  "follow-up-email-generator": {
    en: `Dear {{interviewer_name}},

Thank you again for taking the time to speak with me about the {{job_title}} position at {{company_name}} on {{interview_date}}. I appreciated the opportunity to learn more about the role and the team.

I remain interested in the opportunity and would be glad to provide any additional information if needed.

Best regards,
{{full_name}}`,
    es: `Hola {{interviewer_name}}:

Gracias nuevamente por tomarse el tiempo de conversar conmigo sobre la posición de {{job_title}} en {{company_name}} el día {{interview_date}}. Aprecié la oportunidad de conocer más sobre el puesto y el equipo.

Mantengo mi interés en la oportunidad y quedo disponible para proporcionar cualquier información adicional si es necesario.

Atentamente,
{{full_name}}`
  },
  "recruiter-message-generator": {
    en: `Hello, I’m {{full_name}}. I have {{years_experience}} of experience working with {{main_skills}}. I’m reaching out through {{platform}} to explore opportunities related to {{target_role}}. I’d be glad to share more about my experience. Thank you for your time.`,
    es: `Hola, soy {{full_name}}. Tengo {{years_experience}} de experiencia trabajando con {{main_skills}}. Te escribo por {{platform}} para explorar oportunidades relacionadas con {{target_role}}. Me gustaría compartir más sobre mi experiencia. Gracias por tu tiempo.`
  },
  "resignation-letter-generator": {
    en: `Dear Manager,

Please accept this letter as formal notice of my resignation from my position as {{job_title}} at {{company_name}}. My last working day will be {{last_working_day}}.

{{reason_optional}}

Thank you for the opportunity to be part of the team. I appreciate the experience and support received during my time with the company.

Sincerely,
{{full_name}}`,
    es: `A quien corresponda:

Por medio de la presente, presento formalmente mi renuncia a mi posición de {{job_title}} en {{company_name}}. Mi último día laboral será {{last_working_day}}.

{{reason_optional}}

Agradezco la oportunidad de haber formado parte del equipo, así como la experiencia y el apoyo recibidos durante mi tiempo en la empresa.

Atentamente,
{{full_name}}`
  },
  "salary-negotiation-email-generator": {
    en: `Dear Hiring Team,

Thank you for offering me the {{job_title}} position at {{company_name}}. I appreciate the opportunity and remain very interested in joining the team.

Before moving forward, I would like to discuss a compensation range of {{target_range}} based on the responsibilities of the role, my experience, and the following context: {{reason}}.

Thank you for your consideration. I look forward to your feedback.

Best regards,
{{full_name}}`,
    es: `Estimado equipo de reclutamiento:

Gracias por ofrecerme la posición de {{job_title}} en {{company_name}}. Aprecio mucho la oportunidad y mantengo mi interés en formar parte del equipo.

Antes de avanzar, me gustaría conversar sobre un rango salarial de {{target_range}}, tomando en cuenta las responsabilidades del puesto, mi experiencia y este contexto: {{reason}}.

Gracias por su consideración. Quedo pendiente de sus comentarios.

Atentamente,
{{full_name}}`
  },
  "linkedin-bio-generator": {
    en: `I am {{full_name}}, a professional focused on {{current_role}} with experience in {{main_skills}}. My work is centered on delivering practical results, improving processes, and contributing to teams with a clear and professional approach.`,
    es: `Soy {{full_name}}, profesional con enfoque en {{current_role}} y experiencia en {{main_skills}}. Mi trabajo se centra en aportar resultados prácticos, mejorar procesos y contribuir a equipos con un enfoque claro y profesional.`
  },
  "professional-bio-generator": {
    en: `{{full_name}} is a {{current_role}} with {{years_experience}} of experience and skills in {{main_skills}}. This profile reflects a practical, organized, and quality-focused approach to professional work, with an emphasis on clear communication, process improvement, and reliable results.`,
    es: `{{full_name}} es {{current_role}} con {{years_experience}} de experiencia y habilidades en {{main_skills}}. Su perfil refleja una forma de trabajo práctica, organizada y orientada a la calidad, con enfoque en comunicación clara, mejora de procesos y resultados confiables.`
  }
};

export function getLocalTemplateBody(toolSlug: string, locale: Locale) {
  return templateBodies[toolSlug]?.[locale] ?? null;
}

export function getLocalTemplate(tool: ToolDefinition, locale: Locale): LocalTemplate | null {
  const templateBody = getLocalTemplateBody(tool.slug, locale);

  if (!templateBody) {
    return null;
  }

  return {
    id: `local:${tool.slug}:${locale}`,
    toolSlug: tool.slug,
    locale,
    tone: "Local",
    templateBody,
    inputSchema: {
      fields: tool.fields.map((field) => ({ name: field.name, required: Boolean(field.required) }))
    },
    source: "local-code"
  };
}

export function getAllLocalTemplates() {
  return Object.entries(templateBodies).flatMap(([toolSlug, byLocale]) =>
    Object.entries(byLocale).map(([locale, templateBody]) => ({
      toolSlug,
      locale: locale as Locale,
      templateBody
    }))
  );
}
