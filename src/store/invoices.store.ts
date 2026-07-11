import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InvoiceData } from "../types/invoice";

interface InvoiceStore {
  invoices: InvoiceData[];
  setInvoices: (invoices: InvoiceData[]) => void;
  clearInvoices: () => void;
}

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      invoices: [],

      setInvoices: (newInvoices) =>
        set((state) => ({
          invoices: [...state.invoices, ...newInvoices],
        })),

      clearInvoices: () => set({ invoices: [] }),
    }),
    {
      name: "invoice-storage",
    },
  ),
);
