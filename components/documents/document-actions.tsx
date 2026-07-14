"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import { getDocumentsPath } from "@/lib/i18n/navigation";

type DocumentActionsProps = Readonly<{
  documentId: string;
  locale: Locale;
  isFavorite: boolean;
  mode?: "list" | "detail";
}>;

export function DocumentActions({ documentId, locale, isFavorite, mode = "list" }: DocumentActionsProps) {
  const router = useRouter();
  const [favorite, setFavorite] = useState(isFavorite);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggleFavorite() {
    setIsWorking(true);
    setError(null);

    try {
      const response = await fetch(`/api/documents/${documentId}/favorite`, {
        method: favorite ? "DELETE" : "POST"
      });

      if (!response.ok) {
        throw new Error(locale === "es" ? "No se pudo actualizar favorito." : "Favorite could not be updated.");
      }

      setFavorite(!favorite);
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : locale === "es" ? "Error inesperado." : "Unexpected error.");
    } finally {
      setIsWorking(false);
    }
  }

  async function deleteDocument() {
    const confirmed = window.confirm(
      locale === "es" ? "¿Eliminar este documento guardado?" : "Delete this saved document?"
    );

    if (!confirmed) {
      return;
    }

    setIsWorking(true);
    setError(null);

    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error(locale === "es" ? "No se pudo eliminar el documento." : "The document could not be deleted.");
      }

      if (mode === "detail") {
        router.push(getDocumentsPath(locale));
      } else {
        router.refresh();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : locale === "es" ? "Error inesperado." : "Unexpected error.");
      setIsWorking(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-2 sm:flex sm:flex-wrap">
        <Button type="button" variant="secondary" onClick={toggleFavorite} disabled={isWorking} className="w-full px-4 py-2 sm:w-auto">
          {favorite ? (locale === "es" ? "Quitar favorito" : "Unfavorite") : locale === "es" ? "Favorito" : "Favorite"}
        </Button>
        <Button type="button" variant="danger" onClick={deleteDocument} disabled={isWorking} className="w-full px-4 py-2 sm:w-auto">
          {locale === "es" ? "Eliminar" : "Delete"}
        </Button>
      </div>
      {error ? <p className="text-xs leading-5 text-red-700">{error}</p> : null}
    </div>
  );
}
