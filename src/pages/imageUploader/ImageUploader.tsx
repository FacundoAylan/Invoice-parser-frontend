import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Modal } from "./components/modal/modal";
import InputCard from "./components/inputCard/InputCard";
import ImageSidebar from "./components/invoiceCard/ImageSidebar";
import { fileToBase64 } from "./utils/fileBase";
import type { ImagePayload, ImagePreview } from "@/types/image";
import type { InvoiceData } from "@/types/invoice";
import { usePost } from "@/hook/useFetch";
import { Loading } from "@/components";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const ImageUploader = () => {
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleFiles = (files: FileList) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDelete = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDeleteAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.url));

    setImages([]);
    setSelectedIndex(null);
  };

  const onNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;

      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  const onPrev = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;

      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  const onDelete = () => {
    if (selectedIndex === null) return;

    const deletedIndex = selectedIndex;

    handleDelete(deletedIndex);

    if (images.length === 1) {
      setSelectedIndex(null);
      return;
    }

    if (deletedIndex >= images.length - 1) {
      setSelectedIndex(images.length - 2);
    }
  };

  const { execute, data, loading, error } = usePost<
    InvoiceData[],
    ImagePayload[]
  >(`${API_URL}/invoice`);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (data) {
      navigate("/invoices", {
        state: {
          invoices: data,
        },
      });
    }
  }, [data, navigate]);

  if (loading || error || data) {
    return <Loading />;
  }

  const getImagesPayload = async (): Promise<ImagePayload[]> => {
    return Promise.all(
      images.map(async (image) => ({
        imageBase64: await fileToBase64(image.file),
        mimeType: image.file.type,
      })),
    );
  };

  const handleUpload = async () => {
    try {
      const payload = await getImagesPayload();

      await execute(payload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-8">
        <InputCard handleFiles={handleFiles} />

        {images.length > 0 && (
          <ImageSidebar
            images={images}
            setSelectedIndex={(index) => setSelectedIndex(index)}
            handleDelete={handleDelete}
            onDeleteAll={handleDeleteAll}
            onUpload={handleUpload}
          />
        )}
      </div>

      {selectedIndex !== null && (
        <Modal
          images={images}
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
