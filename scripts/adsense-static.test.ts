import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const publicAdsTxt = path.join(root, "public", "ads.txt");
const outAdsTxt = path.join(outDir, "ads.txt");
const expectedAdsTxt = "google.com, pub-2860965210851539, DIRECT, f08c47fec0942fa0";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function read(filePath: string) {
  return fs.readFileSync(filePath, "utf8");
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }
    return [fullPath];
  });
}

assert(fs.existsSync(publicAdsTxt), "public/ads.txt is missing.");
assert(read(publicAdsTxt).trim() === expectedAdsTxt, "public/ads.txt does not match the confirmed AdSense publisher line.");
assert(fs.existsSync(outAdsTxt), "out/ads.txt is missing. Run npm run build before npm run validate:adsense.");
assert(read(outAdsTxt).trim() === expectedAdsTxt, "out/ads.txt does not match public/ads.txt.");

const htmlFiles = walk(outDir).filter((file) => file.endsWith(".html"));
const legalHtml = htmlFiles.filter((file) => /\/(privacy|terms|privacidad|terminos)\/index\.html$/.test(file.replaceAll(path.sep, "/")));

assert(legalHtml.length >= 4, "Expected legal pages were not found in out/.");

for (const file of legalHtml) {
  const content = read(file);
  assert(!content.includes("adsbygoogle"), `Legal page contains adsbygoogle markup: ${path.relative(root, file)}`);
  assert(!content.includes("pagead2.googlesyndication.com"), `Legal page contains AdSense script: ${path.relative(root, file)}`);
}

const allHtml = htmlFiles.map((file) => [file, read(file)] as const);

for (const [file, content] of allHtml) {
  assert(!content.includes("Reserved space for a future sponsor message"), `Ad placeholder text visible in static HTML: ${path.relative(root, file)}`);
  assert(!content.includes("Espacio reservado para un futuro mensaje patrocinado"), `Spanish ad placeholder text visible in static HTML: ${path.relative(root, file)}`);
}

console.log(`AdSense static validation passed for ${htmlFiles.length} HTML files.`);
