import { getAllTools } from "../lib/tools/tools-data";
import { getLocalTemplate, getAllLocalTemplates } from "../lib/tools/templates";
import { renderTemplate } from "../lib/templates/render-template";
import type { Locale } from "../lib/i18n/config";

type Case = Readonly<{
  slug: string;
  input: Record<string, string>;
  mustInclude: Record<Locale, string[]>;
}>;

const baseInput = {
  full_name: "Juan Dominguez",
  job_title: "QA Analyst",
  company_name: "ApplyKit Test Company",
  current_role: "QA",
  target_role: "QA Analyst",
  years_experience: "5",
  main_skills: "SQL, SSRS, JavaScript, Power BI",
  interview_date: "2026-07-15",
  interviewer_name: "Maria Perez",
  platform: "LinkedIn",
  target_range: "USD 70,000 - USD 80,000",
  reason: "market range, responsibilities, and experience",
  last_working_day: "2026-08-15",
  reason_optional: "Personal growth",
  attachment_note: "Resume attached as PDF",
  experience_level: "Mid level",
  tone: "Formal",
  language: "English",
  length: "Standard"
};

const cases: Case[] = [
  {
    slug: "cover-letter-generator",
    input: baseInput,
    mustInclude: {
      en: ["Juan Dominguez", "QA Analyst", "ApplyKit Test Company", "mid-level"],
      es: ["Juan Dominguez", "QA Analyst", "ApplyKit Test Company", "intermedio"]
    }
  },
  {
    slug: "job-application-email-generator",
    input: baseInput,
    mustInclude: {
      en: ["Resume attached as PDF", "Juan Dominguez"],
      es: ["Resume attached as PDF", "Juan Dominguez"]
    }
  },
  {
    slug: "follow-up-email-generator",
    input: baseInput,
    mustInclude: {
      en: ["July 15, 2026", "Maria Perez"],
      es: ["15 de julio de 2026", "Maria Perez"]
    }
  },
  {
    slug: "recruiter-message-generator",
    input: baseInput,
    mustInclude: {
      en: ["Juan Dominguez", "5 years", "LinkedIn", "QA Analyst", "SQL"],
      es: ["Juan Dominguez", "5 años", "LinkedIn", "QA Analyst", "SQL"]
    }
  },
  {
    slug: "resignation-letter-generator",
    input: baseInput,
    mustInclude: {
      en: ["August 15, 2026", "Personal growth"],
      es: ["15 de agosto de 2026", "Personal growth"]
    }
  },
  {
    slug: "salary-negotiation-email-generator",
    input: baseInput,
    mustInclude: {
      en: ["USD 70,000 - USD 80,000", "market range"],
      es: ["USD 70,000 - USD 80,000", "market range"]
    }
  },
  {
    slug: "linkedin-bio-generator",
    input: baseInput,
    mustInclude: {
      en: ["Juan Dominguez", "QA", "SQL"],
      es: ["Juan Dominguez", "QA", "SQL", "profesional con enfoque"]
    }
  },
  {
    slug: "professional-bio-generator",
    input: baseInput,
    mustInclude: {
      en: ["Juan Dominguez", "QA", "5 years", "SQL"],
      es: ["Juan Dominguez", "QA", "5 años", "SQL"]
    }
  }
];

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertCleanOutput(output: string, context: string) {
  const forbidden = ["Your Name", "{{", "}}", "\\n", "undefined", "null", "[object Object]", "MVP", "active template", "Public page prepared for SEO", "interesado/a", "atento/a", "enfocado/a", "supervisor/a"];
  for (const token of forbidden) {
    assert(!output.includes(token), `${context}: output contains forbidden token ${token}`);
  }
}

assert(getAllLocalTemplates().length === 16, `Expected 16 local templates, found ${getAllLocalTemplates().length}`);

for (const testCase of cases) {
  const tool = getAllTools().find((item) => item.slug === testCase.slug);
  assert(tool, `Missing tool ${testCase.slug}`);

  for (const locale of ["en", "es"] as const) {
    const template = getLocalTemplate(tool, locale);
    assert(template, `Missing ${locale} template for ${testCase.slug}`);
    const output = renderTemplate(template.templateBody, { ...testCase.input, language: locale === "es" ? "Español" : "English" }, { locale });
    assertCleanOutput(output, `${testCase.slug}/${locale}`);

    for (const expected of testCase.mustInclude[locale]) {
      assert(output.includes(expected), `${testCase.slug}/${locale}: expected output to include ${expected}. Output: ${output}`);
    }
  }
}

const optionalInput = { ...baseInput, attachment_note: "", reason_optional: "", interviewer_name: "" };
for (const slug of ["job-application-email-generator", "resignation-letter-generator", "follow-up-email-generator"]) {
  const tool = getAllTools().find((item) => item.slug === slug);
  assert(tool, `Missing tool ${slug}`);
  for (const locale of ["en", "es"] as const) {
    const template = getLocalTemplate(tool, locale);
    assert(template, `Missing ${locale} template for ${slug}`);
    const output = renderTemplate(template.templateBody, optionalInput, { locale });
    assertCleanOutput(output, `${slug}/${locale}/optional-empty`);
    assert(!/\n{3,}/.test(output), `${slug}/${locale}: optional empty fields created excessive blank lines`);
  }
}

console.log("Template regression tests passed for 8 tools x 2 locales.");
