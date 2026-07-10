import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface StoredImage {
  imageId: string;
  imageBase64: string;
  mimeType: string;
  uploaded: boolean;
}

interface ImagesStore {
  images: StoredImage[];
  addImages: (images: StoredImage[]) => void;
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

      markAsUploaded: (processedInvoiceIds) =>
        set((state) => {
          const processedSet = new Set(processedInvoiceIds);
          return {
            images: state.images.map((image) =>
              processedSet.has(image.imageId)
                ? { ...image, uploaded: true }
                : image,
            ),
          };
        }),
    }),
    {
      name: "images-storage",
    },
  ),
);
