import type { Locale } from "@/lib/i18n/config";

export function getHomePath(locale: Locale) {
  return `/${locale}`;
}

export function getToolsPath(locale: Locale) {
  return locale === "es" ? "/es/herramientas" : "/en/tools";
}

export function getPrivacyPath(locale: Locale) {
  return locale === "es" ? "/es/privacidad" : "/en/privacy";
}

export function getTermsPath(locale: Locale) {
  return locale === "es" ? "/es/terminos" : "/en/terms";
}

export function getAboutPath(locale: Locale) {
  return locale === "es" ? "/es/sobre-nosotros" : "/en/about";
}

export function getContactPath(locale: Locale) {
  return locale === "es" ? "/es/contacto" : "/en/contact";
}
