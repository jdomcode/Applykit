import type { Locale } from "@/lib/i18n/config";

export const dictionaries = {
  en: {
    nav: {
      tools: "Tools",
      signIn: "Sign in",
      signOut: "Sign out",
      dashboard: "Dashboard",
      documents: "Documents"
    },
    footer: {
      tagline: "Professional job application documents in minutes.",
      phase: "Production readiness phase",
      privacy: "Privacy",
      terms: "Terms",
      about: "About",
      contact: "Contact"
    },
    home: {
      eyebrow: "ApplyKit",
      title: "Create job application emails, cover letters, and career texts in minutes.",
      description:
        "ApplyKit helps job seekers prepare professional documents using simple forms. No chatbot flow, no unnecessary data, and no external AI in the MVP.",
      primaryCta: "View tools",
      secondaryCta: "See how it works",
      secondaryText: "Bilingual MVP: English and Spanish routes are ready.",
      featureOne: "Simple forms",
      featureTwo: "Professional templates",
      featureThree: "Ready to copy",
      processTitle: "How the MVP will work",
      processDescription:
        "Choose a tool, complete a short form, review the generated result, edit it, and copy it. Saved documents are now available for signed-in users.",
      toolsPreviewTitle: "Initial job application tools",
      toolsPreviewDescription: "These are the first eight MVP tools. Public pages now include SEO metadata, intro content, FAQs, and internal links."
    },
    tools: {
      title: "Career tools",
      description:
        "Choose a tool to prepare a specific job application document or professional message. These public pages now read tools from Supabase when environment variables are configured.",
      emptyTitle: "Tools structure is ready",
      emptyDescription:
        "The public tools page exists. The detailed product interface will be added in the next phase."
    }
  },
  es: {
    nav: {
      tools: "Herramientas",
      signIn: "Iniciar sesión",
      signOut: "Cerrar sesión",
      dashboard: "Panel",
      documents: "Documentos"
    },
    footer: {
      tagline: "Documentos profesionales para aplicar a trabajos en minutos.",
      phase: "Fase de preparación para producción",
      privacy: "Privacidad",
      terms: "Términos",
      about: "Sobre nosotros",
      contact: "Contacto"
    },
    home: {
      eyebrow: "ApplyKit",
      title: "Crea correos laborales, cartas de presentación y textos profesionales en minutos.",
      description:
        "ApplyKit ayuda a personas que aplican a trabajos a preparar documentos profesionales usando formularios simples. Sin flujo tipo chatbot, sin datos innecesarios y sin IA externa en el MVP.",
      primaryCta: "Ver herramientas",
      secondaryCta: "Ver cómo funciona",
      secondaryText: "MVP bilingüe: las rutas en inglés y español están listas.",
      featureOne: "Formularios simples",
      featureTwo: "Plantillas profesionales",
      featureThree: "Listo para copiar",
      processTitle: "Cómo funcionará el MVP",
      processDescription:
        "Elige una herramienta, completa un formulario corto, revisa el resultado generado, edítalo y cópialo. Los documentos guardados ya están disponibles para usuarios con cuenta.",
      toolsPreviewTitle: "Herramientas iniciales para aplicar a trabajos",
      toolsPreviewDescription: "Estas son las primeras ocho herramientas del MVP. Las páginas públicas ahora incluyen metadata SEO, contenido introductorio, FAQs y enlaces internos."
    },
    tools: {
      title: "Herramientas laborales",
      description:
        "Elige una herramienta para preparar un documento laboral o mensaje profesional específico. Estas páginas públicas leen herramientas desde Supabase cuando las variables de entorno están configuradas.",
      emptyTitle: "La estructura de herramientas está lista",
      emptyDescription:
        "La página pública de herramientas existe. La interfaz visual del producto se agregará en la próxima fase."
    }
  }
} satisfies Record<Locale, Record<string, unknown>>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
