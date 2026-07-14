import type { Metadata } from "next";
import { ToolsIndex } from "@/components/tools/tools-index";
import { getPublicTools } from "@/lib/tools/public-tools";
import { buildToolsIndexMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildToolsIndexMetadata(
  "es",
  "Herramientas laborales | ApplyKit",
  "Herramientas para crear cartas de presentación, correos laborales, mensajes a reclutadores, bios profesionales y otros textos para aplicar a trabajos."
);

export default async function HerramientasPage() {
  const result = await getPublicTools("es");

  return <ToolsIndex locale="es" tools={result.tools} source={result.source} error={result.error} />;
}
