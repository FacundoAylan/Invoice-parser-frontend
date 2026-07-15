import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Modal } from "./components/modal/modal";
import InputCard from "./components/inputCard/InputCard";
import ImageSidebar from "./components/invoiceCard/ImageSidebar";
import { fileToBase64 } from "./utils/fileBase";
import type { ImagePayload } from "@/types/image";
import { usePost } from "@/hooks/useFetch";
import { Loading } from "@/components";
import { useImagesStore } from "@/store/images.store";
import { API_URL } from "@/utils/env";
import { useInvoiceStore } from "@/store/invoices.store";

const ImageUploader = () => {

  const invoices = useInvoiceStore((state) => state.invoices);
  const clearInvoices = useInvoiceStore((state) => state.clearInvoices);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  const images = useImagesStore((state) => state.images);
  const addImages = useImagesStore((state) => state.addImages);
  const removeImage = useImagesStore((state) => state.removeImage);
  const clearPendingImages = useImagesStore((state) => state.clearPendingImages);

  const pendingImages = images.filter((image) => !image.uploaded);

  const { execute, loading, error } = usePost(`${API_URL}/invoice`);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error, navigate]);


  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      if (pendingImages.length > 0) {
        clearPendingImages();
      }
    }
  }, [pendingImages, clearPendingImages]);

  const handleFiles = async (files: FileList) => {
    const newImages = await Promise.all(
      Array.from(files).map(async (file) => ({
        imageId: crypto.randomUUID(),
        imageBase64: await fileToBase64(file),
        mimeType: file.type,
        uploaded: false,
      })),
    );

    addImages(newImages);
  };

  const handleDelete = (id: string) => {
    removeImage(id);

    if (selectedIndex !== null && selectedIndex >= pendingImages.length - 1) {
      setSelectedIndex(null);
    }
  };

  const handleDeleteAll = () => {
    clearPendingImages();
    setSelectedIndex(null);
  };

  const onNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === pendingImages.length - 1 ? 0 : prev + 1;
    });
  };

  const onPrev = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? pendingImages.length - 1 : prev - 1;
    });
  };

  const onDelete = () => {
    if (selectedIndex === null) return;

    const image = pendingImages[selectedIndex];

    removeImage(image.imageId);

    if (pendingImages.length === 1) {
      setSelectedIndex(null);
      return;
    }

    if (selectedIndex >= pendingImages.length - 1) {
      setSelectedIndex(pendingImages.length - 2);
    }
  };

  const handleUpload = async () => {
    try {
      const payload: ImagePayload[] = pendingImages.map((image) => ({
        imageId: image.imageId,
        imageBase64: image.imageBase64,
        mimeType: image.mimeType,
      }));

      await execute(payload);

      navigate("/invoices");
    } catch (err) {
      console.error(err);
    }
  };

const handleNavigateToInvoices = () => {
  navigate("/invoices");
};

const handleClearInvoices = () => {
  clearInvoices();
};

if (loading) {
  return <Loading />;
}

return (
  <div className="w-full mx-auto">
    <div className="absolute z-10 w-full flex justify-center pt-2">
      {invoices.length > 0 && (
        <div className="w-1/2 flex items-center justify-between gap-4 p-4 bg-[#0A2540] rounded-2xl border border-[#7ED957] shadow-md">
          <span className="text-sm font-medium text-white">
            Aún tienes facturas cargadas en el sistema
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleNavigateToInvoices}
              className="px-4 py-2 text-sm font-semibold text-[#0A2540] bg-[#7ED957] rounded-lg 
                 transition-transform duration-200 ease-in-out 
                 hover:bg-[#6CC84A] hover:scale-105 hover:cursor-pointer"
            >
              Ver Facturas
            </button>

            <button
              type="button"
              onClick={handleClearInvoices}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg 
                 transition-transform duration-200 ease-in-out 
                 hover:bg-red-600 hover:scale-105 hover:cursor-pointer"
            >
              Eliminar Facturas
            </button>
          </div>
        </div>
      )}
    </div>

    <div className="h-full flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-2 md:gap-8 md:pt-0 overflow-y-scroll">
      <InputCard handleFiles={handleFiles} />

      {pendingImages.length > 0 && (
        <ImageSidebar
          images={pendingImages}
          setSelectedIndex={(index) => {
            setSelectedIndex(index);
          }}
          handleDelete={handleDelete}
          onDeleteAll={handleDeleteAll}
          onUpload={handleUpload}
        />
      )}
    </div>

    {selectedIndex !== null && (
      <Modal
        images={pendingImages}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNext={onNext}
        onPrev={onPrev}
        onDelete={onDelete}
      />
    )}
  </div>
);
};

export default ImageUploader;
