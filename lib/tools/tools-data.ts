import type { Locale } from "@/lib/i18n/config";

export type ToolFieldType = "text" | "textarea" | "select" | "date";

export type ToolFaqItem = {
  question: string;
  answer: string;
};

export type ToolField = {
  name: string;
  type: ToolFieldType;
  required?: boolean;
  translations: Record<Locale, {
    label: string;
    placeholder?: string;
    helper?: string;
  }>;
  options?: Record<Locale, string[]>;
};

export type ToolDefinition = {
  slug: string;
  icon: string;
  category: "application" | "communication" | "career-profile";
  translations: Record<Locale, {
    title: string;
    shortDescription: string;
    description: string;
    seoTitle: string;
    seoDescription: string;
    formTitle: string;
    resultTitle: string;
    sampleOutput: string;
    introContent?: string;
    faq?: ToolFaqItem[];
  }>;
  fields: ToolField[];
};

const commonToneField: ToolField = {
  name: "tone",
  type: "select",
  required: true,
  translations: {
    en: {
      label: "Tone",
      helper: "Choose how the result should sound."
    },
    es: {
      label: "Tono",
      helper: "Elige cómo debe sonar el resultado."
    }
  },
  options: {
    en: ["Formal", "Friendly", "Direct", "Confident", "Short", "Detailed"],
    es: ["Formal", "Amable", "Directo", "Seguro", "Corto", "Detallado"]
  }
};

const commonLanguageField: ToolField = {
  name: "language",
  type: "select",
  required: true,
  translations: {
    en: {
      label: "Language"
    },
    es: {
      label: "Idioma"
    }
  },
  options: {
    en: ["English", "Spanish"],
    es: ["Inglés", "Español"]
  }
};

const fullNameField: ToolField = {
  name: "full_name",
  type: "text",
  required: true,
  translations: {
    en: {
      label: "Full name",
      placeholder: "Example: Ana Rivera"
    },
    es: {
      label: "Nombre completo",
      placeholder: "Ejemplo: Ana Rivera"
    }
  }
};

const jobTitleField: ToolField = {
  name: "job_title",
  type: "text",
  required: true,
  translations: {
    en: {
      label: "Job title",
      placeholder: "Example: QA Analyst"
    },
    es: {
      label: "Puesto",
      placeholder: "Ejemplo: Analista QA"
    }
  }
};

const companyNameField: ToolField = {
  name: "company_name",
  type: "text",
  required: true,
  translations: {
    en: {
      label: "Company name",
      placeholder: "Example: Acme Corp"
    },
    es: {
      label: "Empresa",
      placeholder: "Ejemplo: Acme Corp"
    }
  }
};

const mainSkillsField: ToolField = {
  name: "main_skills",
  type: "textarea",
  required: true,
  translations: {
    en: {
      label: "Main skills",
      placeholder: "Example: SQL, testing, documentation, API validation",
      helper: "Add the skills most relevant to this opportunity."
    },
    es: {
      label: "Habilidades principales",
      placeholder: "Ejemplo: SQL, pruebas, documentación, validación de APIs",
      helper: "Añade las habilidades más relevantes para esta oportunidad."
    }
  }
};

export const tools: ToolDefinition[] = [
  {
    slug: "cover-letter-generator",
    icon: "CL",
    category: "application",
    translations: {
      en: {
        title: "Cover Letter Generator",
        shortDescription: "Create a clear cover letter for a specific role.",
        description: "Prepare a professional cover letter using your target role, company, skills, experience level, tone, and preferred length.",
        seoTitle: "Free Cover Letter Generator | ApplyKit",
        seoDescription: "Create a professional cover letter in English or Spanish using a simple form.",
        formTitle: "Cover letter details",
        resultTitle: "Your result",
        sampleOutput: "Complete the form to create your cover letter.",
        introContent: "Use this tool when you need a focused cover letter for a specific job. It combines your role target, company, skills, experience level, tone, and preferred length into an editable draft you can review before sending.",
        faq: [{ question: "Can I use this cover letter for any job?", answer: "Yes, but you should adapt the generated text to the specific job description before sending it." }, { question: "Does ApplyKit save my cover letter?", answer: "No. The static version generates the text locally in your browser and does not store your document." }]
      },
      es: {
        title: "Generador de carta de presentación",
        shortDescription: "Crea una carta clara para una posición específica.",
        description: "Prepara una carta de presentación profesional usando el puesto, empresa, habilidades, nivel de experiencia, tono y longitud deseada.",
        seoTitle: "Generador gratis de carta de presentación | ApplyKit",
        seoDescription: "Crea una carta de presentación profesional en español o inglés usando un formulario simple.",
        formTitle: "Detalles de la carta",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu carta de presentación.",
        introContent: "Usa esta herramienta cuando necesites una carta de presentación enfocada en una vacante específica. Combina el puesto, la empresa, tus habilidades, nivel de experiencia, tono y longitud deseada en un borrador editable que puedes revisar antes de enviarlo.",
        faq: [{ question: "¿Puedo usar esta carta para cualquier empleo?", answer: "Sí, pero conviene adaptar el texto generado a la descripción específica de la vacante antes de enviarlo." }, { question: "¿ApplyKit guarda mi carta de presentación?", answer: "No. La versión estática genera el texto localmente en tu navegador y no almacena el documento." }]
      }
    },
    fields: [
      fullNameField,
      jobTitleField,
      companyNameField,
      {
        name: "experience_level",
        type: "select",
        required: true,
        translations: {
          en: { label: "Experience level" },
          es: { label: "Nivel de experiencia" }
        },
        options: {
          en: ["Entry level", "Mid level", "Senior", "Manager"],
          es: ["Inicial", "Intermedio", "Senior", "Gerencial"]
        }
      },
      mainSkillsField,
      commonToneField,
      commonLanguageField,
      {
        name: "length",
        type: "select",
        required: true,
        translations: {
          en: { label: "Length" },
          es: { label: "Longitud" }
        },
        options: {
          en: ["Short", "Standard", "Detailed"],
          es: ["Corta", "Estándar", "Detallada"]
        }
      }
    ]
  },
  {
    slug: "job-application-email-generator",
    icon: "EA",
    category: "application",
    translations: {
      en: {
        title: "Job Application Email Generator",
        shortDescription: "Write the email that goes with your resume.",
        description: "Create a concise email for sending your resume or CV to a company, recruiter, or hiring manager.",
        seoTitle: "Job Application Email Generator | ApplyKit",
        seoDescription: "Generate a professional email to send your resume or CV in English or Spanish.",
        formTitle: "Application email details",
        resultTitle: "Your result",
        sampleOutput: "Complete the form to create your job application email.",
        introContent: "Use this generator to prepare a short email for sending your resume or CV. The result is designed to be clear, professional, and easy to adjust for recruiters or hiring teams.",
        faq: [{ question: "Can I mention an attachment?", answer: "Yes. Use the attachment note field when you want to mention that your resume, CV, or portfolio is attached." }, { question: "Is this a replacement for reviewing my email?", answer: "No. Review and edit the generated text before sending it to an employer or recruiter." }]
      },
      es: {
        title: "Generador de correo para enviar CV",
        shortDescription: "Escribe el correo que acompaña tu CV.",
        description: "Crea un correo breve y profesional para enviar tu CV a una empresa, reclutador o encargado de contratación.",
        seoTitle: "Generador de correo para enviar CV | ApplyKit",
        seoDescription: "Genera un correo profesional para enviar tu CV en español o inglés.",
        formTitle: "Detalles del correo",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu correo de postulación.",
        introContent: "Usa este generador para preparar un correo breve al enviar tu CV. El resultado está diseñado para ser claro, profesional y fácil de ajustar para reclutadores o equipos de contratación.",
        faq: [{ question: "¿Puedo mencionar un adjunto?", answer: "Sí. Usa el campo de nota del adjunto si quieres indicar que tu CV, portafolio u otro documento está incluido." }, { question: "¿Esto reemplaza revisar el correo antes de enviarlo?", answer: "No. Revisa y edita el texto generado antes de enviarlo a una empresa o reclutador." }]
      }
    },
    fields: [
      fullNameField,
      jobTitleField,
      companyNameField,
      {
        name: "attachment_note",
        type: "text",
        translations: {
          en: { label: "Attachment note", placeholder: "Example: Resume attached as PDF" },
          es: { label: "Nota del adjunto", placeholder: "Ejemplo: CV adjunto en PDF" }
        }
      },
      commonToneField,
      commonLanguageField
    ]
  },
  {
    slug: "follow-up-email-generator",
    icon: "FU",
    category: "communication",
    translations: {
      en: {
        title: "Follow-Up Email Generator",
        shortDescription: "Follow up after an interview without sounding pushy.",
        description: "Create a professional follow-up email after an interview using the role, company, interview date, and tone.",
        seoTitle: "Interview Follow-Up Email Generator | ApplyKit",
        seoDescription: "Write a polite follow-up email after a job interview in English or Spanish.",
        formTitle: "Follow-up details",
        resultTitle: "Your result",
        sampleOutput: "Complete the form to create your follow-up email.",
        introContent: "Use this tool after an interview when you want to follow up politely without sounding pushy. It creates an editable message using the role, company, interview date, and tone you select.",
        faq: [{ question: "When should I send a follow-up email?", answer: "Many candidates send a brief follow-up after an interview or after the timeline shared by the hiring team has passed." }, { question: "Can I leave the interviewer name empty?", answer: "Yes. If you do not know the interviewer name, the template still produces a general professional message." }]
      },
      es: {
        title: "Generador de correo de seguimiento",
        shortDescription: "Da seguimiento después de una entrevista sin sonar insistente.",
        description: "Crea un correo profesional de seguimiento después de una entrevista usando el puesto, empresa, fecha y tono.",
        seoTitle: "Generador de correo de seguimiento de entrevista | ApplyKit",
        seoDescription: "Escribe un correo amable de seguimiento después de una entrevista laboral en español o inglés.",
        formTitle: "Detalles del seguimiento",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu correo de seguimiento.",
        introContent: "Usa esta herramienta después de una entrevista cuando quieras dar seguimiento de forma profesional sin sonar insistente. Crea un mensaje editable usando el puesto, la empresa, la fecha y el tono que selecciones.",
        faq: [{ question: "¿Cuándo conviene enviar un correo de seguimiento?", answer: "Muchos candidatos envían un seguimiento breve después de la entrevista o cuando ya pasó el plazo indicado por el equipo de contratación." }, { question: "¿Puedo dejar vacío el nombre del entrevistador?", answer: "Sí. Si no sabes el nombre, la plantilla genera un mensaje profesional general." }]
      }
    },
    fields: [
      fullNameField,
      { name: "interviewer_name", type: "text", translations: { en: { label: "Interviewer name", placeholder: "Optional" }, es: { label: "Nombre del entrevistador", placeholder: "Opcional" } } },
      jobTitleField,
      companyNameField,
      { name: "interview_date", type: "date", translations: { en: { label: "Interview date" }, es: { label: "Fecha de entrevista" } } },
      commonToneField,
      commonLanguageField
    ]
  },
  {
    slug: "recruiter-message-generator",
    icon: "RM",
    category: "communication",
    translations: {
      en: {
        title: "Recruiter Message Generator",
        shortDescription: "Create a short message for LinkedIn or email.",
        description: "Write a direct professional message to contact a recruiter about a role or opportunity.",
        seoTitle: "Recruiter Message Generator | ApplyKit",
        seoDescription: "Create a professional recruiter message for LinkedIn or email.",
        formTitle: "Recruiter message details",
        resultTitle: "Your result",
        sampleOutput: "Complete the form to create your recruiter message.",
        introContent: "Use this tool to write a concise message for a recruiter on LinkedIn, email, Indeed, or another platform. The result uses your experience, skills, target role, and channel.",
        faq: [{ question: "Can I use this on LinkedIn?", answer: "Yes. Select LinkedIn as the platform and adapt the result to the conversation before sending it." }, { question: "Does the message invent experience?", answer: "No. It only uses the experience, skills, role, and platform details you provide." }]
      },
      es: {
        title: "Generador de mensaje para reclutador",
        shortDescription: "Crea un mensaje breve para LinkedIn o email.",
        description: "Escribe un mensaje profesional y directo para contactar a un reclutador sobre una vacante u oportunidad.",
        seoTitle: "Generador de mensaje para reclutador | ApplyKit",
        seoDescription: "Crea un mensaje profesional para contactar reclutadores por LinkedIn o correo.",
        formTitle: "Detalles del mensaje",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu mensaje al reclutador.",
        introContent: "Usa esta herramienta para redactar un mensaje breve para un reclutador en LinkedIn, correo, Indeed u otra plataforma. El resultado usa tu experiencia, habilidades, rol objetivo y canal.",
        faq: [{ question: "¿Puedo usarlo en LinkedIn?", answer: "Sí. Selecciona LinkedIn como plataforma y ajusta el resultado al contexto de la conversación antes de enviarlo." }, { question: "¿El mensaje inventa experiencia?", answer: "No. Solo usa la experiencia, habilidades, rol y plataforma que tú indicas." }]
      }
    },
    fields: [
      fullNameField,
      { name: "target_role", type: "text", translations: { en: { label: "Target role", placeholder: "Example: QA Analyst" }, es: { label: "Rol objetivo", placeholder: "Ejemplo: Analista QA" } } },
      { name: "years_experience", type: "text", required: true, translations: { en: { label: "Years of experience", placeholder: "Example: 2 years" }, es: { label: "Años de experiencia", placeholder: "Ejemplo: 2 años" } } },
      mainSkillsField,
      { name: "platform", type: "select", required: true, translations: { en: { label: "Platform" }, es: { label: "Plataforma" } }, options: { en: ["LinkedIn", "Email", "Indeed", "Other"], es: ["LinkedIn", "Correo", "Indeed", "Otra"] } },
      commonToneField,
      commonLanguageField
    ]
  },
  {
    slug: "resignation-letter-generator",
    icon: "RL",
    category: "communication",
    translations: {
      en: {
        title: "Resignation Letter Generator",
        shortDescription: "Write a professional resignation letter.",
        description: "Prepare a respectful resignation letter with your role, company, last working day, and optional reason.",
        seoTitle: "Resignation Letter Generator | ApplyKit",
        seoDescription: "Generate a professional resignation letter in English or Spanish.",
        formTitle: "Resignation details",
        resultTitle: "Your result",
        sampleOutput: "Complete the form to create your resignation letter.",
        introContent: "Use this tool to prepare a respectful resignation letter with your role, company, last working day, and an optional reason. The result is editable so you can keep the tone appropriate for your situation.",
        faq: [{ question: "Do I need to include a reason?", answer: "No. The reason field is optional, and the letter still works without it." }, { question: "Is this legal advice?", answer: "No. ApplyKit provides general writing support. Review your employment agreement or local requirements if needed." }]
      },
      es: {
        title: "Generador de carta de renuncia",
        shortDescription: "Escribe una carta de renuncia profesional.",
        description: "Prepara una carta de renuncia respetuosa usando tu puesto, empresa, último día laboral y razón opcional.",
        seoTitle: "Generador de carta de renuncia | ApplyKit",
        seoDescription: "Genera una carta de renuncia profesional en español o inglés.",
        formTitle: "Detalles de la renuncia",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu carta de renuncia.",
        introContent: "Usa esta herramienta para preparar una carta de renuncia respetuosa con tu puesto, empresa, último día laboral y una razón opcional. El resultado es editable para que ajustes el tono según tu situación.",
        faq: [{ question: "¿Tengo que incluir una razón?", answer: "No. El campo de razón es opcional y la carta funciona aunque lo dejes vacío." }, { question: "¿Esto es asesoría legal?", answer: "No. ApplyKit ofrece apoyo general de redacción. Revisa tu contrato o requisitos locales si lo necesitas." }]
      }
    },
    fields: [
      fullNameField,
      jobTitleField,
      companyNameField,
      { name: "last_working_day", type: "date", required: true, translations: { en: { label: "Last working day" }, es: { label: "Último día laboral" } } },
      { name: "reason_optional", type: "textarea", translations: { en: { label: "Reason", placeholder: "Optional" }, es: { label: "Razón", placeholder: "Opcional" } } },
      commonToneField,
      commonLanguageField
    ]
  },
  {
    slug: "salary-negotiation-email-generator",
    icon: "SN",
    category: "communication",
    translations: {
      en: {
        title: "Salary Negotiation Email Generator",
        shortDescription: "Ask for better compensation professionally.",
        description: "Create a clear salary negotiation email based on the role, offer, target range, and your reasoning.",
        seoTitle: "Salary Negotiation Email Generator | ApplyKit",
        seoDescription: "Generate a professional salary negotiation email in English or Spanish.",
        formTitle: "Negotiation details",
        resultTitle: "Your result",
        sampleOutput: "Complete the form to create your salary negotiation email.",
        introContent: "Use this tool to draft a professional salary negotiation email. It includes the role, company, current offer when provided, your target range, and your reasoning.",
        faq: [{ question: "Does this guarantee a higher salary?", answer: "No. The tool only helps you write a professional message. Salary decisions depend on the employer and context." }, { question: "Should I include a target range?", answer: "Yes. The target range helps make the request clear and specific." }]
      },
      es: {
        title: "Generador de email para negociar salario",
        shortDescription: "Solicita una mejor compensación de forma profesional.",
        description: "Crea un email claro para negociar salario usando el puesto, oferta, rango deseado y argumentos.",
        seoTitle: "Generador de email para negociar salario | ApplyKit",
        seoDescription: "Genera un email profesional para negociar salario en español o inglés.",
        formTitle: "Detalles de negociación",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu email de negociación salarial.",
        introContent: "Usa esta herramienta para redactar un email profesional de negociación salarial. Incluye el puesto, empresa, oferta actual si la indicas, rango deseado y argumento.",
        faq: [{ question: "¿Esto garantiza un salario más alto?", answer: "No. La herramienta solo ayuda a redactar un mensaje profesional. La decisión depende de la empresa y del contexto." }, { question: "¿Debo incluir un rango deseado?", answer: "Sí. El rango deseado ayuda a que la solicitud sea clara y específica." }]
      }
    },
    fields: [
      fullNameField,
      jobTitleField,
      companyNameField,
      { name: "current_offer", type: "text", translations: { en: { label: "Current offer", placeholder: "Optional" }, es: { label: "Oferta actual", placeholder: "Opcional" } } },
      { name: "target_range", type: "text", required: true, translations: { en: { label: "Target range", placeholder: "Example: USD 65,000 - 70,000" }, es: { label: "Rango deseado", placeholder: "Ejemplo: RD$70,000 - RD$80,000" } } },
      { name: "reason", type: "textarea", required: true, translations: { en: { label: "Reason", placeholder: "Example: market range, responsibilities, experience" }, es: { label: "Argumento", placeholder: "Ejemplo: mercado, responsabilidades, experiencia" } } },
      commonToneField,
      commonLanguageField
    ]
  },
  {
    slug: "linkedin-bio-generator",
    icon: "LB",
    category: "career-profile",
    translations: {
      en: {
        title: "LinkedIn Bio Generator",
        shortDescription: "Create a stronger LinkedIn About section.",
        description: "Draft a professional LinkedIn bio using your role, experience, skills, industry, and career goal.",
        seoTitle: "LinkedIn Bio Generator | ApplyKit",
        seoDescription: "Generate a professional LinkedIn bio in English or Spanish.",
        formTitle: "LinkedIn bio details",
        resultTitle: "Your result",
        sampleOutput: "Complete the form to create your LinkedIn bio.",
        introContent: "Use this generator to create a clearer LinkedIn About section. It combines your role, industry, skills, and career goal into a professional summary you can adapt to your profile.",
        faq: [{ question: "Can I paste this directly into LinkedIn?", answer: "Yes, but review it first so it matches your real experience and voice." }, { question: "Does ApplyKit optimize my LinkedIn profile automatically?", answer: "No. It generates editable text; you still decide what to publish." }]
      },
      es: {
        title: "Generador de bio para LinkedIn",
        shortDescription: "Crea una sección Acerca de más fuerte para LinkedIn.",
        description: "Redacta una bio profesional para LinkedIn usando tu rol, experiencia, habilidades, industria y objetivo laboral.",
        seoTitle: "Generador de bio para LinkedIn | ApplyKit",
        seoDescription: "Genera una bio profesional para LinkedIn en español o inglés.",
        formTitle: "Detalles de la bio",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu bio de LinkedIn.",
        introContent: "Usa este generador para crear una sección Acerca de más clara para LinkedIn. Combina tu rol, industria, habilidades y objetivo profesional en un resumen que puedes adaptar a tu perfil.",
        faq: [{ question: "¿Puedo pegarlo directamente en LinkedIn?", answer: "Sí, pero revísalo primero para que coincida con tu experiencia real y tu forma de comunicarte." }, { question: "¿ApplyKit optimiza mi perfil de LinkedIn automáticamente?", answer: "No. Genera texto editable; tú decides qué publicar." }]
      }
    },
    fields: [
      fullNameField,
      { name: "current_role", type: "text", required: true, translations: { en: { label: "Current role", placeholder: "Example: QA Analyst" }, es: { label: "Rol actual", placeholder: "Ejemplo: Analista QA" } } },
      { name: "industry", type: "text", translations: { en: { label: "Industry", placeholder: "Example: Technology" }, es: { label: "Industria", placeholder: "Ejemplo: Tecnología" } } },
      mainSkillsField,
      { name: "career_goal", type: "textarea", translations: { en: { label: "Career goal", placeholder: "Example: grow into product or QA leadership" }, es: { label: "Objetivo profesional", placeholder: "Ejemplo: crecer hacia liderazgo QA o producto" } } },
      commonToneField,
      commonLanguageField
    ]
  },
  {
    slug: "professional-bio-generator",
    icon: "PB",
    category: "career-profile",
    translations: {
      en: {
        title: "Professional Bio Generator",
        shortDescription: "Write a short bio for resumes, portfolios, or websites.",
        description: "Generate a concise professional bio that can be used in a portfolio, resume, company profile, or personal website.",
        seoTitle: "Professional Bio Generator | ApplyKit",
        seoDescription: "Create a professional bio for resumes, portfolios, and websites in English or Spanish.",
        formTitle: "Professional bio details",
        resultTitle: "Your result",
        sampleOutput: "Complete the form to create your professional bio.",
        introContent: "Use this tool to write a short professional bio for a resume, portfolio, company profile, or personal website. It focuses on your role, experience, skills, and work style.",
        faq: [{ question: "Where can I use this bio?", answer: "You can adapt it for resumes, portfolios, websites, proposals, or professional profiles." }, { question: "Can I edit the result?", answer: "Yes. The generated bio appears in an editable field before you copy it." }]
      },
      es: {
        title: "Generador de bio profesional",
        shortDescription: "Escribe una bio breve para CV, portafolios o webs.",
        description: "Genera una bio profesional concisa para usar en un portafolio, CV, perfil de empresa o sitio personal.",
        seoTitle: "Generador de bio profesional | ApplyKit",
        seoDescription: "Crea una bio profesional para CV, portafolios y sitios web en español o inglés.",
        formTitle: "Detalles de la bio profesional",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu bio profesional.",
        introContent: "Usa esta herramienta para escribir una bio profesional breve para CV, portafolios, perfiles de empresa o sitios personales. Se enfoca en tu rol, experiencia, habilidades y forma de trabajo.",
        faq: [{ question: "¿Dónde puedo usar esta bio?", answer: "Puedes adaptarla para CV, portafolios, sitios web, propuestas o perfiles profesionales." }, { question: "¿Puedo editar el resultado?", answer: "Sí. La bio generada aparece en un campo editable antes de copiarla." }]
      }
    },
    fields: [
      fullNameField,
      { name: "current_role", type: "text", required: true, translations: { en: { label: "Current role", placeholder: "Example: Systems Analyst" }, es: { label: "Rol actual", placeholder: "Ejemplo: Analista de Sistemas" } } },
      { name: "years_experience", type: "text", required: true, translations: { en: { label: "Years of experience", placeholder: "Example: 3 years" }, es: { label: "Años de experiencia", placeholder: "Ejemplo: 3 años" } } },
      mainSkillsField,
      commonToneField,
      commonLanguageField
    ]
  }
];

export function getAllTools() {
  return tools;
}

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolPath(locale: Locale, slug: string) {
  return locale === "es" ? `/es/herramientas/${slug}` : `/en/tools/${slug}`;
}
