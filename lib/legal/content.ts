import type { Locale } from "@/lib/i18n/config";

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
      description: "How ApplyKit handles account data, generated documents, product analytics, cookies, and advertising partners.",
      lastUpdated: "July 2026",
      sections: [
        {
          heading: "What ApplyKit collects",
          body: [
            "ApplyKit collects the minimum information needed to provide the service: account email through Supabase Auth, optional profile name, preferred language, generated documents saved by signed-in users, and basic usage events such as tool views, generated documents, copied results, and saved documents.",
            "Anonymous users can generate and copy documents, but ApplyKit does not save their generated documents."
          ]
        },
        {
          heading: "What ApplyKit does not collect",
          body: [
            "ApplyKit does not ask for government ID numbers, home addresses, phone numbers, full resumes, medical information, financial account numbers, or unnecessary sensitive information in the MVP.",
            "Usage analytics do not store generated document text, saved document content, or form output."
          ]
        },
        {
          heading: "Saved documents",
          body: [
            "When a signed-in user saves a generated document, the document is stored in that user's private history. Row Level Security is used so each user can access only their own saved documents.",
            "Users can delete saved documents from their account. Deleted documents are removed from the user's visible history."
          ]
        },
        {
          heading: "Cookies and advertising",
          body: [
            "ApplyKit may display ads through Google AdSense or similar advertising partners on public pages. Third-party vendors, including Google, may use cookies or similar technologies to serve ads based on a user's prior visits to ApplyKit or other websites.",
            "Google's use of advertising cookies enables Google and its partners to serve ads based on visits to ApplyKit and other sites on the Internet. Users can manage personalized advertising preferences through Google's ad settings and browser cookie controls.",
            "ApplyKit does not sell saved documents, generated text, account data, or private user content to advertisers."
          ]
        },
        {
          heading: "Consent and regional requirements",
          body: [
            "Where required by law, ApplyKit may request consent for cookies, local storage, analytics, or advertising technologies before using them.",
            "Users in regions with specific privacy or consent requirements may have additional choices related to advertising personalization and cookies."
          ]
        },
        {
          heading: "Service providers",
          body: [
            "ApplyKit uses Supabase for authentication and database storage, Vercel for hosting and deployment, and may use Google AdSense for ads on public pages.",
            "These providers process data according to their own terms and privacy practices. ApplyKit only uses them to operate, secure, host, analyze, and monetize the product."
          ]
        },
        {
          heading: "Contact",
          body: [
            "For privacy, account, or data requests, contact ApplyKit at contact@applykit.online.",
            "Do not send unnecessary sensitive information when contacting support."
          ]
        }
      ]
    },
    es: {
      title: "Política de privacidad",
      description: "Cómo ApplyKit maneja datos de cuenta, documentos generados, analítica, cookies y socios publicitarios.",
      lastUpdated: "Julio 2026",
      sections: [
        {
          heading: "Qué recopila ApplyKit",
          body: [
            "ApplyKit recopila la información mínima necesaria para ofrecer el servicio: correo de cuenta mediante Supabase Auth, nombre de perfil opcional, idioma preferido, documentos generados guardados por usuarios con sesión iniciada y eventos básicos de uso como vistas de herramientas, documentos generados, copias y guardados.",
            "Los usuarios anónimos pueden generar y copiar documentos, pero ApplyKit no guarda sus documentos generados."
          ]
        },
        {
          heading: "Qué no recopila ApplyKit",
          body: [
            "ApplyKit no solicita números de identidad, dirección, teléfono, CV completo, información médica, números de cuentas financieras ni información sensible innecesaria en el MVP.",
            "La analítica de uso no guarda el texto de documentos generados, contenido de documentos guardados ni resultados de formularios."
          ]
        },
        {
          heading: "Documentos guardados",
          body: [
            "Cuando un usuario con sesión iniciada guarda un documento generado, el documento se almacena en su historial privado. Se usa Row Level Security para que cada usuario solo pueda acceder a sus propios documentos guardados.",
            "Los usuarios pueden eliminar documentos guardados desde su cuenta. Los documentos eliminados dejan de aparecer en el historial visible del usuario."
          ]
        },
        {
          heading: "Cookies y publicidad",
          body: [
            "ApplyKit puede mostrar anuncios mediante Google AdSense u otros socios publicitarios similares en páginas públicas. Proveedores externos, incluido Google, pueden usar cookies o tecnologías similares para mostrar anuncios basados en visitas previas del usuario a ApplyKit o a otros sitios web.",
            "El uso de cookies publicitarias por parte de Google permite que Google y sus socios muestren anuncios basados en visitas a ApplyKit y a otros sitios en Internet. Los usuarios pueden gestionar preferencias de publicidad personalizada desde la configuración de anuncios de Google y los controles de cookies del navegador.",
            "ApplyKit no vende documentos guardados, textos generados, datos de cuenta ni contenido privado de usuarios a anunciantes."
          ]
        },
        {
          heading: "Consentimiento y requisitos regionales",
          body: [
            "Cuando la ley lo requiera, ApplyKit puede solicitar consentimiento para cookies, almacenamiento local, analítica o tecnologías publicitarias antes de usarlas.",
            "Usuarios en regiones con requisitos específicos de privacidad o consentimiento pueden tener opciones adicionales relacionadas con personalización de anuncios y cookies."
          ]
        },
        {
          heading: "Proveedores de servicio",
          body: [
            "ApplyKit usa Supabase para autenticación y base de datos, Vercel para hosting y despliegue, y puede usar Google AdSense para anuncios en páginas públicas.",
            "Estos proveedores procesan datos según sus propios términos y prácticas de privacidad. ApplyKit los usa únicamente para operar, proteger, alojar, analizar y monetizar el producto."
          ]
        },
        {
          heading: "Contacto",
          body: [
            "Para solicitudes de privacidad, cuenta o datos, contacta a ApplyKit en contact@applykit.online.",
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
            "The MVP uses templates and does not use external AI for generation."
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
          heading: "Do not provide unnecessary sensitive data",
          body: [
            "Users should not enter government ID numbers, home addresses, medical information, financial account numbers, or other unnecessary sensitive data into the tools."
          ]
        },
        {
          heading: "Accounts and saved documents",
          body: [
            "Signed-in users can save documents and manage their history. Users should delete any saved content they no longer want to keep.",
            "Anonymous users can generate and copy documents but cannot save history."
          ]
        },
        {
          heading: "Advertising",
          body: [
            "ApplyKit may display advertising on public pages. Ads should not be confused with product actions such as Generate, Copy, Save, Login, or Download.",
            "Users should not click ads for the purpose of supporting the site; ads should only be clicked when they are genuinely relevant."
          ]
        },
        {
          heading: "Contact",
          body: [
            "For support or questions about these terms, contact ApplyKit at contact@applykit.online."
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
            "ApplyKit ofrece herramientas simples para crear documentos de aplicación laboral y mensajes profesionales a partir de información proporcionada por el usuario.",
            "El MVP usa plantillas y no utiliza IA externa para la generación."
          ]
        },
        {
          heading: "Responsabilidad del usuario",
          body: [
            "El usuario es responsable de revisar, editar y confirmar que cualquier texto generado sea correcto antes de enviarlo a empleadores, reclutadores o terceros.",
            "ApplyKit no garantiza contratación, entrevistas, aumentos salariales, ofertas laborales ni aceptación de ofertas."
          ]
        },
        {
          heading: "No es asesoría profesional",
          body: [
            "ApplyKit ofrece asistencia general de redacción para comunicación laboral. No ofrece asesoría legal, financiera, migratoria, laboral ni garantías profesionales.",
            "Los usuarios deben adaptar el contenido generado a su propia experiencia y situación antes de usarlo."
          ]
        },
        {
          heading: "No proporciones datos sensibles innecesarios",
          body: [
            "Los usuarios no deben ingresar números de identidad, direcciones, información médica, números de cuentas financieras u otros datos sensibles innecesarios en las herramientas."
          ]
        },
        {
          heading: "Cuentas y documentos guardados",
          body: [
            "Los usuarios con sesión iniciada pueden guardar documentos y gestionar su historial. El usuario debe eliminar cualquier contenido guardado que ya no quiera conservar.",
            "Los usuarios anónimos pueden generar y copiar documentos, pero no pueden guardar historial."
          ]
        },
        {
          heading: "Publicidad",
          body: [
            "ApplyKit puede mostrar publicidad en páginas públicas. Los anuncios no deben confundirse con acciones del producto como Generar, Copiar, Guardar, Iniciar sesión o Descargar.",
            "Los usuarios no deben hacer clic en anuncios con el propósito de apoyar el sitio; los anuncios solo deben abrirse cuando sean realmente relevantes."
          ]
        },
        {
          heading: "Contacto",
          body: [
            "Para soporte o preguntas sobre estos términos, contacta a ApplyKit en contact@applykit.online."
          ]
        }
      ]
    }
  }
};

export function getLegalContent(kind: LegalPageKind, locale: Locale) {
  return legalContent[kind][locale];
}
