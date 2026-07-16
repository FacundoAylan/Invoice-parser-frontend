import type { ImagePayload } from "@/types/image";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ImagesStore {
  images: ImagePayload[];
  addImages: (images: ImagePayload[]) => void;
  removeImage: (id: string) => void;
  clearImages: () => void;
  markAsUploaded: (processedInvoiceIds: string[]) => void;
}

export const useImagesStore = create<ImagesStore>()(
  persist(
    (set) => ({
      images: [],

      addImages: (images) =>
        set((state) => ({
          images: [...state.images, ...images],
        })),

      removeImage: (imageId) =>
        set((state) => ({
          images: state.images.filter((image) => image.imageId !== imageId),
        })),

      clearImages: () =>
        set({
          images: [],
        }),

      markAsUploaded: (processedInvoiceIds: string[]) =>
        set((state) => {
          const invoiceSet = new Set(processedInvoiceIds);

          return {
            images: state.images.map((image) => {
              const hasInvoice = invoiceSet.has(image.imageId);

              return {
                ...image,
                isProcessed: true, 
                hasAssociatedInvoice: hasInvoice,
              };
            }),
          };
        }),
    }),
    {
      name: "images-storage",
    },
  ),
);
