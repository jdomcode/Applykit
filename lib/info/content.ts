import type { Locale } from "@/lib/i18n/config";

export type InfoPageKind = "about" | "contact";

export type InfoAction = {
  label: string;
  href: string;
};

export type InfoSection = {
  heading: string;
  body: string[];
};

export type InfoPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  sections: InfoSection[];
  primaryAction?: InfoAction;
  secondaryAction?: InfoAction;
};

export const infoContent: Record<InfoPageKind, Record<Locale, InfoPageContent>> = {
  about: {
    en: {
      eyebrow: "About ApplyKit",
      title: "Simple tools for job application documents.",
      description:
        "ApplyKit helps job seekers prepare clear, professional job application emails, cover letters, recruiter messages, follow-up emails, resignation letters, bios, and career texts in minutes.",
      sections: [
        {
          heading: "What ApplyKit does",
          body: [
            "ApplyKit turns short form inputs into editable professional texts. ApplyKit is intentionally simple: choose a tool, complete a form, generate a result, edit it, and copy it.",
            "The first version focuses on practical communication tasks used during a job search, not on a general chatbot experience."
          ]
        },
        {
          heading: "Why it exists",
          body: [
            "Many people know what they want to say when applying for a job, but they are not sure how to write it professionally. ApplyKit gives them a structured starting point that they can review and adapt before sending.",
            "The product is bilingual from the start so users can work in English or Spanish depending on the job market they are targeting."
          ]
        },
        {
          heading: "Current scope",
          body: [
            "ApplyKit currently uses dynamic templates instead of external AI. This keeps the product fast, predictable, and low-cost while the core idea is validated.",
            "ApplyKit includes public tools, local generation, editable results, SEO pages, and a deployment flow prepared for static hosting."
          ]
        }
      ],
      primaryAction: {
        label: "Explore tools",
        href: "/en/tools"
      },
      secondaryAction: {
        label: "Contact",
        href: "/en/contact"
      }
    },
    es: {
      eyebrow: "Sobre ApplyKit",
      title: "Herramientas simples para documentos de aplicación laboral.",
      description:
        "ApplyKit ayuda a personas que buscan empleo a preparar correos laborales, cartas de presentación, mensajes para reclutadores, seguimientos, renuncias, bios y textos profesionales en minutos.",
      sections: [
        {
          heading: "Qué hace ApplyKit",
          body: [
            "ApplyKit convierte formularios cortos en textos profesionales editables. ApplyKit es intencionalmente simple: eliges una herramienta, completas un formulario, generas un resultado, lo editas y lo copias.",
            "La primera versión se enfoca en tareas concretas de comunicación laboral, no en una experiencia genérica tipo chatbot."
          ]
        },
        {
          heading: "Por qué existe",
          body: [
            "Muchas personas saben qué quieren decir al aplicar a un trabajo, pero no están seguras de cómo escribirlo de forma profesional. ApplyKit les da un punto de partida estructurado que pueden revisar y adaptar antes de enviarlo.",
            "El producto es bilingüe desde el inicio para que los usuarios puedan trabajar en inglés o español según el mercado laboral al que estén aplicando."
          ]
        },
        {
          heading: "Alcance actual",
          body: [
            "ApplyKit actualmente usa plantillas dinámicas en lugar de IA externa. Esto mantiene el producto rápido, predecible y de bajo costo mientras se valida la idea principal.",
            "ApplyKit incluye herramientas públicas, generación local, resultados editables, páginas SEO y un flujo preparado para hosting estático."
          ]
        }
      ],
      primaryAction: {
        label: "Ver herramientas",
        href: "/es/herramientas"
      },
      secondaryAction: {
        label: "Contacto",
        href: "/es/contacto"
      }
    }
  },
  contact: {
    en: {
      eyebrow: "Contact",
      title: "Contact ApplyKit.",
      description:
        "Use this page for product questions, support requests, content corrections, privacy requests, or feedback about the job application tools.",
      sections: [
        {
          heading: "Support email",
          body: [
            "Contact: dovarynlabs@gmail.com",
            "For privacy, product, or content requests, describe the issue clearly. Do not send government ID numbers, financial information, medical information, or other unnecessary sensitive data."
          ]
        },
        {
          heading: "Feedback",
          body: [
            "If a generated text sounds unclear, too generic, too long, or not professional enough, report the tool name, language, and what you expected to receive.",
            "Feedback helps improve templates while keeping ApplyKit simple and predictable."
          ]
        },
        {
          heading: "Business and advertising",
          body: [
            "For business, partnership, or advertising-related inquiries, use the same contact email and include a clear subject line.",
            "ApplyKit does not sell user conversations, generated content to advertisers."
          ]
        }
      ],
      primaryAction: {
        label: "Email ApplyKit",
        href: "mailto:dovarynlabs@gmail.com"
      },
      secondaryAction: {
        label: "Privacy Policy",
        href: "/en/privacy"
      }
    },
    es: {
      eyebrow: "Contacto",
      title: "Contacta a ApplyKit.",
      description:
        "Usa esta página para preguntas sobre el producto, soporte, correcciones de contenido, solicitudes de privacidad o comentarios sobre las herramientas laborales.",
      sections: [
        {
          heading: "Correo de soporte",
          body: [
            "Contacto: dovarynlabs@gmail.com",
            "Para solicitudes de privacidad, producto o contenido, describe el caso con claridad. No envíes números de identidad, información financiera, información médica u otros datos sensibles innecesarios."
          ]
        },
        {
          heading: "Comentarios",
          body: [
            "Si un texto generado suena poco claro, demasiado genérico, muy largo o poco profesional, indica el nombre de la herramienta, el idioma y qué esperabas recibir.",
            "Los comentarios ayudan a mejorar las plantillas mientras ApplyKit se mantiene simple y predecible."
          ]
        },
        {
          heading: "Negocios y publicidad",
          body: [
            "Para consultas comerciales, alianzas o temas relacionados con publicidad, usa el mismo correo de contacto e incluye un asunto claro.",
            "ApplyKit no vende conversaciones, contenido generado de usuarios a anunciantes."
          ]
        }
      ],
      primaryAction: {
        label: "Enviar correo",
        href: "mailto:dovarynlabs@gmail.com"
      },
      secondaryAction: {
        label: "Política de privacidad",
        href: "/es/privacidad"
      }
    }
  }
};

export function getInfoContent(kind: InfoPageKind, locale: Locale) {
  return infoContent[kind][locale];
}
