import { useInvoiceStore } from "@/store/invoices.store";
import type { ImagePayload } from "@/types/image";
import type { InvoiceData } from "@/types/invoice";
import { useState } from "react";

type ErrorType = Error | null;

interface UsePostResult {
  loading: boolean;
  error: ErrorType;
  execute: (body: ImagePayload[]) => Promise<void>;
}

export const usePost = (url: string): UsePostResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  const setInvoices = useInvoiceStore((state) => state.setInvoices);

  const execute = async (body: ImagePayload[]) => {
    try {
      setLoading(true);

      const formattedInvoices = body.map((img) => ({
        imageId: img.imageId,
        imageBase64: img.imageBase64,
        mimeType: img.mimeType,
      }));

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoices: formattedInvoices,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const jsonData = (await response.json()) as {
        invoices: InvoiceData[];
      };

      if (jsonData.invoices.length > 0) {
        setInvoices(jsonData.invoices);
      }

      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    execute,
  };
};
