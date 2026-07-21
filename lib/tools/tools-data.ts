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
        sampleOutput: "Complete the form to create your cover letter."
      },
      es: {
        title: "Generador de carta de presentación",
        shortDescription: "Crea una carta clara para una posición específica.",
        description: "Prepara una carta de presentación profesional usando el puesto, empresa, habilidades, nivel de experiencia, tono y longitud deseada.",
        seoTitle: "Generador gratis de carta de presentación | ApplyKit",
        seoDescription: "Crea una carta de presentación profesional en español o inglés usando un formulario simple.",
        formTitle: "Detalles de la carta",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu carta de presentación."
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
        sampleOutput: "Complete the form to create your job application email."
      },
      es: {
        title: "Generador de correo para enviar CV",
        shortDescription: "Escribe el correo que acompaña tu CV.",
        description: "Crea un correo breve y profesional para enviar tu CV a una empresa, reclutador o encargado de contratación.",
        seoTitle: "Generador de correo para enviar CV | ApplyKit",
        seoDescription: "Genera un correo profesional para enviar tu CV en español o inglés.",
        formTitle: "Detalles del correo",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu correo de postulación."
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
        sampleOutput: "Complete the form to create your follow-up email."
      },
      es: {
        title: "Generador de correo de seguimiento",
        shortDescription: "Da seguimiento después de una entrevista sin sonar insistente.",
        description: "Crea un correo profesional de seguimiento después de una entrevista usando el puesto, empresa, fecha y tono.",
        seoTitle: "Generador de correo de seguimiento de entrevista | ApplyKit",
        seoDescription: "Escribe un correo amable de seguimiento después de una entrevista laboral en español o inglés.",
        formTitle: "Detalles del seguimiento",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu correo de seguimiento."
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
        sampleOutput: "Complete the form to create your recruiter message."
      },
      es: {
        title: "Generador de mensaje para reclutador",
        shortDescription: "Crea un mensaje breve para LinkedIn o email.",
        description: "Escribe un mensaje profesional y directo para contactar a un reclutador sobre una vacante u oportunidad.",
        seoTitle: "Generador de mensaje para reclutador | ApplyKit",
        seoDescription: "Crea un mensaje profesional para contactar reclutadores por LinkedIn o correo.",
        formTitle: "Detalles del mensaje",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu mensaje al reclutador."
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
        sampleOutput: "Complete the form to create your resignation letter."
      },
      es: {
        title: "Generador de carta de renuncia",
        shortDescription: "Escribe una carta de renuncia profesional.",
        description: "Prepara una carta de renuncia respetuosa usando tu puesto, empresa, último día laboral y razón opcional.",
        seoTitle: "Generador de carta de renuncia | ApplyKit",
        seoDescription: "Genera una carta de renuncia profesional en español o inglés.",
        formTitle: "Detalles de la renuncia",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu carta de renuncia."
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
        sampleOutput: "Complete the form to create your salary negotiation email."
      },
      es: {
        title: "Generador de email para negociar salario",
        shortDescription: "Solicita una mejor compensación de forma profesional.",
        description: "Crea un email claro para negociar salario usando el puesto, oferta, rango deseado y argumentos.",
        seoTitle: "Generador de email para negociar salario | ApplyKit",
        seoDescription: "Genera un email profesional para negociar salario en español o inglés.",
        formTitle: "Detalles de negociación",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu email de negociación salarial."
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
        sampleOutput: "Complete the form to create your LinkedIn bio."
      },
      es: {
        title: "Generador de bio para LinkedIn",
        shortDescription: "Crea una sección Acerca de más fuerte para LinkedIn.",
        description: "Redacta una bio profesional para LinkedIn usando tu rol, experiencia, habilidades, industria y objetivo laboral.",
        seoTitle: "Generador de bio para LinkedIn | ApplyKit",
        seoDescription: "Genera una bio profesional para LinkedIn en español o inglés.",
        formTitle: "Detalles de la bio",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu bio de LinkedIn."
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
        sampleOutput: "Complete the form to create your professional bio."
      },
      es: {
        title: "Generador de bio profesional",
        shortDescription: "Escribe una bio breve para CV, portafolios o webs.",
        description: "Genera una bio profesional concisa para usar en un portafolio, CV, perfil de empresa o sitio personal.",
        seoTitle: "Generador de bio profesional | ApplyKit",
        seoDescription: "Crea una bio profesional para CV, portafolios y sitios web en español o inglés.",
        formTitle: "Detalles de la bio profesional",
        resultTitle: "Tu resultado",
        sampleOutput: "Completa el formulario para crear tu bio profesional."
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
