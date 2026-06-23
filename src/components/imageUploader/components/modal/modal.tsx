import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ImagePreview } from "./ImagePreview";
import { ModalControls } from "./ModalControls";

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
  const [rotation, setRotation] = useState(0);

  const image = images[currentIndex]?.url;

  const handleRotateLeft = () => setRotation((prev) => prev - 90);
  const handleRotateRight = () => setRotation((prev) => prev + 90);

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
    <section
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
    >
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
        ✕
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
          hover:bg-black/70
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
          hover:bg-black/70
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
          <div
            className="relative flex h-full w-full items-center justify-center"
          >
            <TransformComponent
              wrapperClass="!w-full !h-full flex items-center justify-center"
              contentClass="flex items-center justify-center min-h-full min-w-full"
            >
              <ImagePreview image={image} rotation={rotation} />
            </TransformComponent>

            <ModalControls
              onZoomIn={()=>zoomIn()}
              onZoomOut={()=>zoomOut()}
              onRotateLeft={handleRotateLeft}
              onRotateRight={handleRotateRight}
              onDelete={onDelete}
            />
          </div>
        )}
      </TransformWrapper>
    </section>
  );
};
