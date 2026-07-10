import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Modal } from "./components/modal/modal";
import InputCard from "./components/inputCard/InputCard";
import ImageSidebar from "./components/invoiceCard/ImageSidebar";
import { fileToBase64 } from "./utils/fileBase";
import type { ImagePayload } from "@/types/image";
import { usePost } from "@/hook/useFetch";
import { Loading } from "@/components";
import { useImagesStore } from "@/store/images.store";
import { API_URL } from "@/utils/env";

const ImageUploader = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  const images = useImagesStore((state) => state.images);
  const addImages = useImagesStore((state) => state.addImages);
  const removeImage = useImagesStore((state) => state.removeImage);
  const clearImages = useImagesStore((state) => state.clearImages);

  const { execute, loading, error } = usePost(`${API_URL}/invoice`);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error, navigate]);

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

    if (selectedIndex !== null && selectedIndex >= images.length - 1) {
      setSelectedIndex(null);
    }
  };

  const handleDeleteAll = () => {
    clearImages();
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

    const image = images[selectedIndex];

    removeImage(image.imageId);

    if (images.length === 1) {
      setSelectedIndex(null);
      return;
    }

    if (selectedIndex >= images.length - 1) {
      setSelectedIndex(images.length - 2);
    }
  };

  const handleUpload = async () => {
    try {
      const payload: ImagePayload[] = images
        .filter((image) => !image.uploaded)
        .map((image) => ({
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full mx-auto">
      <div className="h-full flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-2 md:gap-8 pt-8 md:pt-0 overflow-y-scroll">
        <InputCard handleFiles={handleFiles} />

        {images.length > 0 && (
          <ImageSidebar
            images={images}
            setSelectedIndex={setSelectedIndex}
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
