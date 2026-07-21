"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";

export function HtmlLangSync({ locale }: Readonly<{ locale: Locale }>) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
