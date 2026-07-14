import { DocumentsPageContent } from "@/components/documents/documents-page";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Documentos guardados | ApplyKit",
  description: "Historial privado de documentos guardados en ApplyKit."
};

export default function SpanishDocumentsPage() {
  return <DocumentsPageContent locale="es" />;
}
