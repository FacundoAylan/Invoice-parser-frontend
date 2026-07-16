import { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import ImageInspector from "@/components/imageInspector/ImageInspector";
import type { ImagePayload } from "@/types/image";

interface ModalProps {
  images: ImagePayload[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onDelete: () => void;
}

export const Modal = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onDelete,
}: ModalProps) => {
  const image = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext, onClose]);

  if (!image) return null;


  return (
    <section className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
      {/* Close button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute z-50 top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-red-500 text-2xl hover:scale-110 hover:cursor-pointer transition"
      >
        <HiXMark className="text-xl" />
      </button>

      {/* Prev. button*/}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 text-white text-3xl hover:bg-black/70 hover:cursor-pointer flex items-center justify-center"
      >
        ‹
      </button>

      <div className="w-[80vw] h-[80vh] flex items-center justify-center">
        <ImageInspector
          key={image.imageId}
          image={image}
          onDelete={onDelete}
        />
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 text-white text-3xl hover:bg-black/70 hover:cursor-pointer flex items-center justify-center"
      >
        ›
      </button>
    </section>
  );
};
