import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, "out");
const publicDir = path.join(projectRoot, "public");

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

assert(fs.existsSync(path.join(publicDir, "_headers")), "Missing public/_headers file.");
assert(fs.existsSync(path.join(publicDir, "illustrations", "applykit-hero.svg")), "Missing hero illustration SVG.");
assert(fs.existsSync(path.join(publicDir, "illustrations", "applykit-documents.svg")), "Missing documents illustration SVG.");
assert(fs.existsSync(outDir), "Missing out directory. Run the build before validate:phase7.");
assert(fs.existsSync(path.join(outDir, "_headers")), "Missing exported _headers file.");

const headerRules = fs.readFileSync(path.join(outDir, "_headers"), "utf8");
for (const requiredHeader of [
  "X-Content-Type-Options: nosniff",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "X-Frame-Options: SAMEORIGIN",
  "Permissions-Policy:",
  "Cross-Origin-Opener-Policy: same-origin"
]) {
  assert(headerRules.includes(requiredHeader), `Missing required header rule: ${requiredHeader}`);
}

const htmlFiles: string[] = [];
function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
}
walk(outDir);
assert(htmlFiles.length > 0, "No HTML files found in out directory.");

const combinedHtml = htmlFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
assert(combinedHtml.includes('href="#main-content"'), "Skip link not found in exported HTML.");
assert(combinedHtml.includes("ApplyKit"), "Brand name not found in exported HTML.");

const blockedSecrets = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "service_role",
  "supabase.co",
  "@supabase"
];
for (const token of blockedSecrets) {
  assert(!combinedHtml.includes(token), `Blocked token found in exported HTML: ${token}`);
}

console.log(`Static quality validation passed for ${htmlFiles.length} HTML files.`);
