import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InvoiceData, Item } from "@/types/invoice"; 

interface InvoiceStore {
  invoices: InvoiceData[];
  setInvoices: (invoices: InvoiceData[]) => void;
  updateInvoiceItem: (
    invoiceId: string,
    itemIndex: number,
    updatedItem: Item,
  ) => void;
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

      updateInvoiceItem: (invoiceId, itemIndex, updatedItem) =>
        set((state) => ({
          invoices: state.invoices.map((inv) =>
            inv.imageId === invoiceId
              ? {
                  ...inv,
                  items: (inv.items || []).map((item, idx) =>
                    idx === itemIndex ? updatedItem : item,
                  ),
                }
              : inv,
          ),
        })),

      clearInvoices: () => set({ invoices: [] }),
    }),
    {
      name: "invoice-storage",
    },
  ),
);
