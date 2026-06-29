import { useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<TResponse, TBody> {
  data: Data<TResponse>;
  loading: boolean;
  error: ErrorType;
  execute: (body: TBody) => Promise<void>;
}

export const usePost = <TResponse, TBody>(
  url: string,
): Params<TResponse, TBody> => {
  const [data, setData] = useState<Data<TResponse>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  const execute = async (body: TBody) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoices: body,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const jsonData = (await response.json()) as { invoices: TResponse };

      setData(jsonData.invoices);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
};
