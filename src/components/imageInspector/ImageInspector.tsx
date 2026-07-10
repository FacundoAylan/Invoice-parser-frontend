import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { ImagePreview } from "@/components/imageInspector/ImagePreview";
import { ModalControls } from "@/components/imageInspector/ModalControls";
import type { ImagePayload } from "@/types/image";

interface ImageInspectorProps {
  image: ImagePayload;
  onDelete?: () => void;
}

const ImageInspector = ({ image, onDelete }: ImageInspectorProps) => {
  const [rotation, setRotation] = useState<number>(0);

  const imageUrl = image
    ? `data:${image.mimeType};base64,${image.imageBase64}`
    : "";

  const handleRotateLeft = () => {
    setRotation((prev) => prev - 90);
  };

  const handleRotateRight = () => {
    setRotation((prev) => prev + 90);
  };

  return (
    <div className="w-full h-full min-h-[400px]">
      <TransformWrapper
        initialScale={1}
        centerOnInit
        minScale={0.5}
        maxScale={4}
      >
        {({ zoomIn, zoomOut }) => (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <TransformComponent
              wrapperClass="max-w-[98%] max-h-[98%] flex"
              contentClass="flex items-center justify-center min-h-full min-w-full cursor-pointer"
            >
              <ImagePreview image={imageUrl} rotation={rotation} />
            </TransformComponent>

            <ModalControls
              onZoomIn={() => zoomIn()}
              onZoomOut={() => zoomOut()}
              onRotateLeft={handleRotateLeft}
              onRotateRight={handleRotateRight}
              onDelete={onDelete}
            />
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ImageInspector;
