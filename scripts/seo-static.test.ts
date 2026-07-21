import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getAllTools, getToolPath } from "../lib/tools/tools-data";
import { getAboutPath, getContactPath, getHomePath, getPrivacyPath, getTermsPath, getToolsPath } from "../lib/i18n/navigation";

type Assertion = Readonly<{ name: string; passed: boolean; details?: string }>;

const outDir = join(process.cwd(), "out");
const siteUrl = "https://applykit.online";
const publicPaths = [
  getHomePath("en"),
  getHomePath("es"),
  getToolsPath("en"),
  getToolsPath("es"),
  getAboutPath("en"),
  getAboutPath("es"),
  getContactPath("en"),
  getContactPath("es"),
  getPrivacyPath("en"),
  getPrivacyPath("es"),
  getTermsPath("en"),
  getTermsPath("es"),
  ...getAllTools().flatMap((tool) => [getToolPath("en", tool.slug), getToolPath("es", tool.slug)])
];

function readOut(path: string) {
  return readFileSync(join(outDir, path), "utf8");
}

function htmlPath(route: string) {
  return route === "/" ? "index.html" : join(route.replace(/^\//, ""), "index.html");
}

const assertions: Assertion[] = [];

assertions.push({ name: "out directory exists", passed: existsSync(outDir) });
for (const file of ["sitemap.xml", "robots.txt", "ads.txt", "manifest.webmanifest", "icon.svg"]) {
  assertions.push({ name: `${file} exists`, passed: existsSync(join(outDir, file)) });
}

for (const route of publicPaths) {
  assertions.push({ name: `${route} generated`, passed: existsSync(join(outDir, htmlPath(route))) });
}

const sitemap = readOut("sitemap.xml");
const robots = readOut("robots.txt");
const adsTxt = readOut("ads.txt");

for (const route of publicPaths) {
  assertions.push({ name: `${route} in sitemap`, passed: sitemap.includes(`${siteUrl}${route}`) });
}

for (const blocked of ["localhost", "vercel.app", "pages.dev", "/dashboard", "/documents", "/documentos", "/admin", "/login", "/register", "/auth", "/api"]) {
  assertions.push({ name: `sitemap excludes ${blocked}`, passed: !sitemap.includes(blocked) });
}

assertions.push({ name: "robots points to production sitemap", passed: robots.includes(`${siteUrl}/sitemap.xml`) });
assertions.push({ name: "ads.txt keeps Google publisher line", passed: adsTxt.trim() === "google.com, pub-2860965210851539, DIRECT, f08c47fec0942fa0" });

const htmlChecks: Assertion[] = publicPaths.map((route) => {
  const html = readOut(htmlPath(route));
  const titleCount = (html.match(/<title>/g) ?? []).length;
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  const canonicalOk = html.includes(`rel="canonical"`) && html.includes(`${siteUrl}${route}`);
  const hreflangEn = html.includes('hrefLang="en"') || html.includes('hreflang="en"');
  const hreflangEs = html.includes('hrefLang="es"') || html.includes('hreflang="es"');
  const hreflangDefault = html.includes('hrefLang="x-default"') || html.includes('hreflang="x-default"');
  const tempText = /MVP|active template|internal templates|Public page prepared for SEO|sign in to save|Save with account|Guardar con cuenta|Copy or save|Copia o guarda|Your Name/.test(html);

  return {
    name: `${route} metadata and public copy`,
    passed: titleCount === 1 && h1Count === 1 && canonicalOk && hreflangEn && hreflangEs && hreflangDefault && !tempText,
    details: `title=${titleCount}, h1=${h1Count}, canonical=${canonicalOk}, en=${hreflangEn}, es=${hreflangEs}, x-default=${hreflangDefault}, temp=${tempText}`
  };
});

assertions.push(...htmlChecks);

const failed = assertions.filter((assertion) => !assertion.passed);

if (failed.length > 0) {
  console.error("SEO/static validation failed:");
  for (const failure of failed) {
    console.error(`- ${failure.name}${failure.details ? ` (${failure.details})` : ""}`);
  }
  process.exit(1);
}

console.log(`SEO/static validation passed for ${publicPaths.length} public routes.`);
