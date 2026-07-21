import type { Locale } from "@/lib/i18n/config";

export const dictionaries = {
  en: {
    nav: {
      tools: "Tools",
    },
    footer: {
      tagline: "Professional job application documents in minutes.",
      phase: "Professional tools for your job search.",
      privacy: "Privacy",
      terms: "Terms",
      about: "About",
      contact: "Contact"
    },
    home: {
      eyebrow: "ApplyKit",
      title: "Create job application emails, cover letters, and career texts in minutes.",
      description:
        "ApplyKit helps job seekers prepare professional documents using simple forms. No chatbot flow, no unnecessary data, and no extra steps.",
      primaryCta: "View tools",
      secondaryCta: "See how it works",
      secondaryText: "Bilingual tools are available in English and Spanish.",
      featureOne: "Simple forms",
      featureTwo: "Professional templates",
      featureThree: "Ready to copy",
      processTitle: "How ApplyKit works",
      processDescription:
        "Choose a tool, complete a short form, review the generated result, edit it, and copy it. You can edit and copy the result without creating an account.",
      toolsPreviewTitle: "Job application tools",
      toolsPreviewDescription: "Explore eight tools for creating professional job application documents and messages."
    },
    tools: {
      title: "Career tools",
      description:
        "Choose a tool to prepare a specific job application document or professional message.",
      emptyTitle: "Choose a tool to begin",
      emptyDescription:
        "Tools will appear here when they are available."
    }
  },
  es: {
    nav: {
      tools: "Herramientas",
    },
    footer: {
      tagline: "Documentos profesionales para aplicar a trabajos en minutos.",
      phase: "Herramientas profesionales para tu búsqueda de empleo.",
      privacy: "Privacidad",
      terms: "Términos",
      about: "Sobre nosotros",
      contact: "Contacto"
    },
    home: {
      eyebrow: "ApplyKit",
      title: "Crea correos laborales, cartas de presentación y textos profesionales en minutos.",
      description:
        "ApplyKit ayuda a personas que aplican a trabajos a preparar documentos profesionales usando formularios simples. Sin flujo tipo chatbot, sin datos innecesarios y sin pasos extra.",
      primaryCta: "Ver herramientas",
      secondaryCta: "Ver cómo funciona",
      secondaryText: "Herramientas bilingües disponibles en inglés y español.",
      featureOne: "Formularios simples",
      featureTwo: "Plantillas profesionales",
      featureThree: "Listo para copiar",
      processTitle: "Cómo funciona ApplyKit",
      processDescription:
        "Elige una herramienta, completa un formulario corto, revisa el resultado generado, edítalo y cópialo. No necesitas cuenta y ApplyKit no guarda tu texto.",
      toolsPreviewTitle: "Herramientas para tu búsqueda laboral",
      toolsPreviewDescription: "Explora ocho herramientas para crear documentos y mensajes profesionales para tu búsqueda laboral."
    },
    tools: {
      title: "Herramientas laborales",
      description:
        "Elige una herramienta para preparar un documento laboral o mensaje profesional específico.",
      emptyTitle: "Elige una herramienta para empezar",
      emptyDescription:
        "Las herramientas aparecerán aquí cuando estén disponibles."
    }
  }
} satisfies Record<Locale, Record<string, unknown>>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
