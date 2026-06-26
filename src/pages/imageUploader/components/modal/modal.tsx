import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ImagePreview } from "./ImagePreview";
import { ModalControls } from "./ModalControls";
import { HiXMark } from "react-icons/hi2";

interface ImagePreviewType {
  file: File;
  url: string;
}

interface ModalProps {
  images: ImagePreviewType[];
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
const [rotations, setRotations] = useState<number[]>([]);

const image = images[currentIndex]?.url;
const rotation = rotations[currentIndex] ?? 0;

const handleRotateLeft = () => {
  setRotations((prev) => {
    const copy = [...prev];
    copy[currentIndex] = (copy[currentIndex] ?? 0) - 90;
    return copy;
  });
};

const handleRotateRight = () => {
  setRotations((prev) => {
    const copy = [...prev];
    copy[currentIndex] = (copy[currentIndex] ?? 0) + 90;
    return copy;
  });
};

  const handleDelete = () => {
    setRotations((prev) => prev.filter((_, index) => index !== currentIndex));

    onDelete();
  };

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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onPrev, onNext, onDelete, onClose]);


  return (
    <section className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      {/*Close Modal */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute z-50
          top-4 right-4
          w-10 h-10
          flex items-center justify-center
          rounded-full
          text-red-500 text-2xl
          hover:scale-110 hover:cursor-pointer
          transition
        "
      >
        <HiXMark className="text-xl" />
      </button>
      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="
          absolute left-4 top-1/2 -translate-y-1/2
          z-50 w-12 h-12
          rounded-full
          bg-black/50
          text-white
          text-3xl
          hover:bg-black/70 hover:cursor-pointer
        "
      >
        ‹
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="
          absolute right-4 top-1/2 -translate-y-1/2
          z-50 w-12 h-12
          rounded-full
          bg-black/50
          text-white
          text-3xl
          hover:bg-black/70 hover:cursor-pointer
        "
      >
        ›
      </button>

      <TransformWrapper
        initialScale={1}
        centerOnInit
        minScale={0.5}
        maxScale={4}
      >
        {({ zoomIn, zoomOut }) => (
          <div className="relative flex h-full w-full items-center justify-center">
            <TransformComponent
              wrapperClass="max-w-full max-h-full flex items-center justify-center"
              contentClass="flex items-center justify-center min-h-full min-w-full"
            >
              <ImagePreview image={image} rotation={rotation} />
            </TransformComponent>

            <ModalControls
              onZoomIn={() => zoomIn()}
              onZoomOut={() => zoomOut()}
              onRotateLeft={handleRotateLeft}
              onRotateRight={handleRotateRight}
              onDelete={handleDelete}
            />
          </div>
        )}
      </TransformWrapper>
    </section>
  );
};
