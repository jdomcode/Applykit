import { DocumentDetailPageContent } from "@/components/documents/document-detail-page";

type SpanishDocumentDetailPageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Documento guardado | ApplyKit",
  description: "Documento guardado en ApplyKit."
};

export default async function SpanishDocumentDetailPage({ params }: SpanishDocumentDetailPageProps) {
  const { id } = await params;
  return <DocumentDetailPageContent locale="es" documentId={id} />;
}
