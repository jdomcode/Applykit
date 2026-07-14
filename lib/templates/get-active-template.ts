import type { Locale } from "@/lib/i18n/config";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/lib/supabase/database.types";
import { getToolBySlug, type ToolDefinition } from "@/lib/tools/tools-data";

export type ActiveTemplate = Readonly<{
  id: string | null;
  toolId: string | null;
  templateBody: string;
  tone: string;
  inputSchema: Json | null;
  source: "supabase" | "local-fallback";
}>;

type TemplateVersionRow = {
  id: string;
  tool_id: string;
  tone: string;
  template_body: string;
  input_schema: Json;
};

type ToolRow = {
  id: string;
  slug: string;
  status: string;
};

const localTemplates: Record<string, Record<Locale, string>> = {
  "cover-letter-generator": {
    en: "Dear Hiring Manager,\n\nI am writing to express my interest in the {{job_title}} position at {{company_name}}. With my background in {{main_skills}} and my {{experience_level}} level of experience, I believe I can contribute effectively to your team.\n\nI am particularly interested in this opportunity because it aligns with my professional goals and allows me to apply my skills in a meaningful way.\n\nThank you for considering my application. I would welcome the opportunity to discuss how my experience can support your team.\n\nSincerely,\n{{full_name}}",
    es: "Estimado equipo de reclutamiento:\n\nMe dirijo a ustedes para expresar mi interés en la posición de {{job_title}} en {{company_name}}. Cuento con experiencia de nivel {{experience_level}} y conocimientos en {{main_skills}}, por lo que considero que puedo aportar valor al equipo.\n\nEsta oportunidad me interesa porque se alinea con mis objetivos profesionales y me permitiría aplicar mis habilidades de manera efectiva.\n\nGracias por considerar mi postulación. Quedo atento a la posibilidad de conversar sobre cómo mi experiencia puede contribuir a la empresa.\n\nAtentamente,\n{{full_name}}"
  },
  "job-application-email-generator": {
    en: "Dear Hiring Team,\n\nI hope you are doing well. I am writing to apply for the {{job_title}} position at {{company_name}}. Please find my resume attached for your review.\n\n{{attachment_note}}\n\nThank you for your time and consideration. I would welcome the opportunity to discuss my application further.\n\nBest regards,\n{{full_name}}",
    es: "Estimado equipo de reclutamiento:\n\nEspero que se encuentren bien. Me dirijo a ustedes para postularme a la posición de {{job_title}} en {{company_name}}. Adjunto mi CV para su revisión.\n\n{{attachment_note}}\n\nGracias por su tiempo y consideración. Quedo atento a la posibilidad de conversar sobre mi postulación.\n\nAtentamente,\n{{full_name}}"
  },
  "follow-up-email-generator": {
    en: "Dear {{interviewer_name}},\n\nThank you again for taking the time to speak with me about the {{job_title}} position at {{company_name}} on {{interview_date}}. I appreciated the opportunity to learn more about the role and the team.\n\nI remain interested in the opportunity and would be glad to provide any additional information if needed.\n\nBest regards,\n{{full_name}}",
    es: "Estimado/a {{interviewer_name}}:\n\nGracias nuevamente por tomarse el tiempo de conversar conmigo sobre la posición de {{job_title}} en {{company_name}} el día {{interview_date}}. Aprecié la oportunidad de conocer más sobre el puesto y el equipo.\n\nSigo interesado/a en la oportunidad y quedo disponible para proporcionar cualquier información adicional si es necesario.\n\nAtentamente,\n{{full_name}}"
  },
  "recruiter-message-generator": {
    en: "Hello,\n\nMy name is {{full_name}}. I am reaching out through {{platform}} regarding opportunities related to {{target_role}}. I have {{years_experience}} of experience and skills in {{main_skills}}.\n\nI would appreciate the opportunity to connect and learn whether there are relevant openings where my profile could be a strong fit.\n\nBest regards,\n{{full_name}}",
    es: "Hola,\n\nMi nombre es {{full_name}}. Le escribo por {{platform}} sobre oportunidades relacionadas con {{target_role}}. Cuento con {{years_experience}} de experiencia y habilidades en {{main_skills}}.\n\nMe gustaría conectar y conocer si existen vacantes donde mi perfil pueda encajar de forma sólida.\n\nSaludos,\n{{full_name}}"
  },
  "resignation-letter-generator": {
    en: "Dear Manager,\n\nPlease accept this letter as formal notice of my resignation from my position as {{job_title}} at {{company_name}}. My last working day will be {{last_working_day}}.\n\n{{reason_optional}}\n\nThank you for the opportunity to be part of the team. I appreciate the experience and support received during my time with the company.\n\nSincerely,\n{{full_name}}",
    es: "Estimado/a supervisor/a:\n\nPor medio de la presente, presento formalmente mi renuncia a mi posición de {{job_title}} en {{company_name}}. Mi último día laboral será {{last_working_day}}.\n\n{{reason_optional}}\n\nAgradezco la oportunidad de haber formado parte del equipo, así como la experiencia y el apoyo recibidos durante mi tiempo en la empresa.\n\nAtentamente,\n{{full_name}}"
  },
  "salary-negotiation-email-generator": {
    en: "Dear Hiring Team,\n\nThank you for offering me the {{job_title}} position at {{company_name}}. I appreciate the opportunity and remain very interested in joining the team.\n\nBefore moving forward, I would like to discuss the compensation package to better align it with the responsibilities of the role, my experience, and my target range of {{target_range}}.\n\nThank you for your consideration. I look forward to your feedback.\n\nBest regards,\n{{full_name}}",
    es: "Estimado equipo de reclutamiento:\n\nGracias por ofrecerme la posición de {{job_title}} en {{company_name}}. Aprecio mucho la oportunidad y mantengo mi interés en formar parte del equipo.\n\nAntes de avanzar, me gustaría conversar sobre el paquete de compensación para alinearlo mejor con las responsabilidades del puesto, mi experiencia y mi rango deseado de {{target_range}}.\n\nGracias por su consideración. Quedo atento/a a sus comentarios.\n\nAtentamente,\n{{full_name}}"
  },
  "linkedin-bio-generator": {
    en: "I am {{full_name}}, a professional focused on {{current_role}} with experience in {{main_skills}}. My work is centered on delivering practical results, improving processes, and contributing to teams with a clear and professional approach.",
    es: "Soy {{full_name}}, profesional enfocado/a en {{current_role}} con experiencia en {{main_skills}}. Mi trabajo se centra en aportar resultados prácticos, mejorar procesos y contribuir a equipos con un enfoque claro y profesional."
  },
  "professional-bio-generator": {
    en: "{{full_name}} is a {{current_role}} with {{years_experience}} of experience and skills in {{main_skills}}. This profile reflects a practical, organized, and quality-focused approach to professional work, with an emphasis on clear communication, process improvement, and reliable results.",
    es: "{{full_name}} es {{current_role}} con {{years_experience}} de experiencia y habilidades en {{main_skills}}. Su perfil refleja una forma de trabajo práctica, organizada y orientada a la calidad, con enfoque en comunicación clara, mejora de procesos y resultados confiables."
  }
};

function normalizeTone(value: string | undefined) {
  return value?.trim().toLowerCase();
}

function pickTemplateByTone(templates: TemplateVersionRow[], requestedTone?: string) {
  const requested = normalizeTone(requestedTone);

  if (requested) {
    const directMatch = templates.find((template) => normalizeTone(template.tone) === requested);

    if (directMatch) {
      return directMatch;
    }
  }

  return templates[0];
}

export function getLocalTemplate(tool: ToolDefinition, locale: Locale): ActiveTemplate | null {
  const templateBody = localTemplates[tool.slug]?.[locale];

  if (!templateBody) {
    return null;
  }

  return {
    id: null,
    toolId: null,
    templateBody,
    tone: "Local",
    inputSchema: null,
    source: "local-fallback"
  };
}

export async function getActiveTemplateByToolSlug(slug: string, locale: Locale, requestedTone?: string) {
  const localTool = getToolBySlug(slug);

  if (!localTool) {
    return { tool: null, template: null };
  }

  if (!isSupabaseConfigured()) {
    return { tool: localTool, template: getLocalTemplate(localTool, locale) };
  }

  try {
    const supabase = await createClient();

    const { data: toolData, error: toolError } = await supabase
      .from("tools")
      .select("id, slug, status")
      .eq("slug", slug)
      .eq("status", "active")
      .maybeSingle();

    if (toolError || !toolData) {
      return { tool: localTool, template: getLocalTemplate(localTool, locale) };
    }

    const toolRow = toolData as ToolRow;
    const { data: templatesData, error: templatesError } = await supabase
      .from("template_versions")
      .select("id, tool_id, tone, template_body, input_schema")
      .eq("tool_id", toolRow.id)
      .eq("locale", locale)
      .eq("is_active", true)
      .order("version", { ascending: false });

    if (templatesError || !templatesData || templatesData.length === 0) {
      return { tool: localTool, template: getLocalTemplate(localTool, locale) };
    }

    const selectedTemplate = pickTemplateByTone(templatesData as TemplateVersionRow[], requestedTone);

    return {
      tool: localTool,
      template: {
        id: selectedTemplate.id,
        toolId: selectedTemplate.tool_id,
        templateBody: selectedTemplate.template_body,
        tone: selectedTemplate.tone,
        inputSchema: selectedTemplate.input_schema,
        source: "supabase" as const
      }
    };
  } catch {
    return { tool: localTool, template: getLocalTemplate(localTool, locale) };
  }
}
