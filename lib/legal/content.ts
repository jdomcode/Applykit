import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site/config";

export type LegalPageKind = "privacy" | "terms";

export type LegalSection = {
  heading: string;
  body: string[];
};

export type LegalPageContent = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export const legalContent: Record<LegalPageKind, Record<Locale, LegalPageContent>> = {
  privacy: {
    en: {
      title: "Privacy Policy",
      description: "How ApplyKit handles local document generation, cookies, advertising partners, and privacy choices.",
      lastUpdated: "July 2026",
      sections: [
        {
          heading: "No account required",
          body: [
            "ApplyKit can be used without creating an account, signing in, or saving a profile.",
            "The tools generate text from the information you enter into the form. The current static version does not provide accounts, private user areas, saved history, or user profiles."
          ]
        },
        {
          heading: "Local document generation",
          body: [
            "Generated documents are created locally in your browser from built-in templates.",
            "ApplyKit does not store generated text, form input, document history, or private job application content in a document database."
          ]
        },
        {
          heading: "What ApplyKit does not collect",
          body: [
            "ApplyKit does not ask for government ID numbers, home addresses, phone numbers, full resumes, medical information, financial account numbers, or unnecessary sensitive information.",
            "Do not enter sensitive personal data that is not needed to create the document."
          ]
        },
        {
          heading: "Cookies and advertising",
          body: [
            "ApplyKit may display ads through Google AdSense or similar advertising partners on public pages. Third-party vendors, including Google, may use cookies or similar technologies to serve ads based on a user's prior visits to ApplyKit or other websites.",
            "Google's use of advertising cookies enables Google and its partners to serve ads based on visits to ApplyKit and other sites on the Internet. Users can manage personalized advertising preferences through Google's ad settings and browser cookie controls.",
            "ApplyKit does not sell generated text, form input, account data, or private user content to advertisers."
          ]
        },
        {
          heading: "Consent and regional requirements",
          body: [
            "Where required by law, ApplyKit may request consent for cookies, analytics, or advertising technologies before using them.",
            "Users in regions with specific privacy or consent requirements may have additional choices related to advertising personalization and cookies."
          ]
        },
        {
          heading: "Service providers",
          body: [
            "ApplyKit is hosted as a public web application and may use Google AdSense for advertising on public pages.",
            "Service providers process data according to their own terms and privacy practices. ApplyKit uses them only to host, secure, analyze, and monetize the product."
          ]
        },
        {
          heading: "Contact",
          body: [
            `For privacy or product questions, contact ApplyKit at ${siteConfig.contactEmail}.`,
            "Do not send unnecessary sensitive information when contacting support."
          ]
        }
      ]
    },
    es: {
      title: "Política de privacidad",
      description: "Cómo ApplyKit maneja la generación local de documentos, cookies, socios publicitarios y opciones de privacidad.",
      lastUpdated: "Julio 2026",
      sections: [
        {
          heading: "No se requiere cuenta",
          body: [
            "ApplyKit puede usarse sin crear una cuenta, iniciar sesión ni guardar un perfil.",
            "Las herramientas generan texto a partir de la información que introduces en el formulario. La versión estática actual no ofrece cuentas, panel, historial guardado ni perfiles de usuario."
          ]
        },
        {
          heading: "Generación local de documentos",
          body: [
            "Los documentos se generan localmente en tu navegador usando plantillas internas.",
            "ApplyKit no almacena textos generados, datos de formularios, historial de documentos ni contenido privado de postulaciones en una base de datos de documentos."
          ]
        },
        {
          heading: "Qué no recopila ApplyKit",
          body: [
            "ApplyKit no solicita números de identidad, dirección, teléfono, CV completo, información médica, números de cuentas financieras ni información sensible innecesaria.",
            "No introduzcas datos personales sensibles que no sean necesarios para crear el documento."
          ]
        },
        {
          heading: "Cookies y publicidad",
          body: [
            "ApplyKit puede mostrar anuncios mediante Google AdSense u otros socios publicitarios similares en páginas públicas. Proveedores externos, incluido Google, pueden usar cookies o tecnologías similares para mostrar anuncios basados en visitas previas del usuario a ApplyKit o a otros sitios web.",
            "El uso de cookies publicitarias por parte de Google permite que Google y sus socios muestren anuncios basados en visitas a ApplyKit y a otros sitios en Internet. Los usuarios pueden gestionar preferencias de publicidad personalizada desde la configuración de anuncios de Google y los controles de cookies del navegador.",
            "ApplyKit no vende textos generados, datos de formularios, datos de cuenta ni contenido privado de usuarios a anunciantes."
          ]
        },
        {
          heading: "Consentimiento y requisitos regionales",
          body: [
            "Cuando la ley lo requiera, ApplyKit puede solicitar consentimiento para cookies, analítica o tecnologías publicitarias antes de usarlas.",
            "Usuarios en regiones con requisitos específicos de privacidad o consentimiento pueden tener opciones adicionales relacionadas con personalización de anuncios y cookies."
          ]
        },
        {
          heading: "Proveedores de servicio",
          body: [
            "ApplyKit se aloja como una aplicación web pública y puede usar Google AdSense para publicidad en páginas públicas.",
            "Los proveedores procesan datos según sus propios términos y prácticas de privacidad. ApplyKit los usa únicamente para alojar, proteger, analizar y monetizar el producto."
          ]
        },
        {
          heading: "Contacto",
          body: [
            `Para preguntas de privacidad o producto, contacta a ApplyKit en ${siteConfig.contactEmail}.`,
            "No envíes información sensible innecesaria al contactar soporte."
          ]
        }
      ]
    }
  },
  terms: {
    en: {
      title: "Terms of Use",
      description: "Basic terms for using ApplyKit's job application document tools.",
      lastUpdated: "July 2026",
      sections: [
        {
          heading: "Purpose of the service",
          body: [
            "ApplyKit provides simple tools for creating job application documents and professional messages from user-provided information.",
            "ApplyKit uses built-in templates and does not use external AI for generation."
          ]
        },
        {
          heading: "User responsibility",
          body: [
            "Users are responsible for reviewing, editing, and confirming that any generated text is accurate before sending it to employers, recruiters, or third parties.",
            "ApplyKit does not guarantee employment outcomes, interview invitations, salary increases, job offers, or offer acceptance."
          ]
        },
        {
          heading: "No professional advice",
          body: [
            "ApplyKit provides general writing assistance for job application communication. It does not provide legal, financial, immigration, employment, or career guarantees.",
            "Users should adapt generated content to their own experience and situation before using it."
          ]
        },
        {
          heading: "No accounts or saved documents",
          body: [
            "The static version of ApplyKit does not provide accounts, saved document history, private user areas, or user profiles.",
            "Users should copy any generated text they want to keep before leaving the page."
          ]
        },
        {
          heading: "Advertising",
          body: [
            "ApplyKit may display advertising on public pages. Ads should not be interpreted as endorsements of any employer, service, product, or third-party website.",
            "Legal pages are intended to remain free of advertising placements."
          ]
        },
        {
          heading: "Contact",
          body: [
            `For questions about these terms, contact ApplyKit at ${siteConfig.contactEmail}.`
          ]
        }
      ]
    },
    es: {
      title: "Términos de uso",
      description: "Términos básicos para usar las herramientas de documentos laborales de ApplyKit.",
      lastUpdated: "Julio 2026",
      sections: [
        {
          heading: "Propósito del servicio",
          body: [
            "ApplyKit ofrece herramientas simples para crear documentos de postulación y mensajes profesionales a partir de información proporcionada por el usuario.",
            "ApplyKit usa plantillas internas y no utiliza IA externa para la generación."
          ]
        },
        {
          heading: "Responsabilidad del usuario",
          body: [
            "Los usuarios son responsables de revisar, editar y confirmar que cualquier texto generado sea correcto antes de enviarlo a empleadores, reclutadores o terceros.",
            "ApplyKit no garantiza resultados laborales, entrevistas, aumentos salariales, ofertas de empleo ni aceptación de ofertas."
          ]
        },
        {
          heading: "No es asesoría profesional",
          body: [
            "ApplyKit ofrece asistencia general de redacción para comunicación laboral. No ofrece asesoría legal, financiera, migratoria, laboral ni garantías de carrera.",
            "Los usuarios deben adaptar el contenido generado a su propia experiencia y situación antes de usarlo."
          ]
        },
        {
          heading: "Sin cuentas ni documentos guardados",
          body: [
            "La versión estática de ApplyKit no ofrece cuentas, historial de documentos guardados, áreas privadas ni perfiles de usuario.",
            "Los usuarios deben copiar cualquier texto generado que deseen conservar antes de salir de la página."
          ]
        },
        {
          heading: "Publicidad",
          body: [
            "ApplyKit puede mostrar publicidad en páginas públicas. Los anuncios no deben interpretarse como respaldo a empleadores, servicios, productos o sitios externos.",
            "Las páginas legales deben mantenerse sin ubicaciones publicitarias."
          ]
        },
        {
          heading: "Contacto",
          body: [
            `Para preguntas sobre estos términos, contacta a ApplyKit en ${siteConfig.contactEmail}.`
          ]
        }
      ]
    }
  }
};

export function getLegalContent(kind: LegalPageKind, locale: Locale) {
  return legalContent[kind][locale];
}
