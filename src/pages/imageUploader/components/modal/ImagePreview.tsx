interface ImagePreviewProps {
  image: string;
  rotation: number;
}

export const ImagePreview = ({ image, rotation }: ImagePreviewProps) => {
  const isHorizontal = rotation % 180 !== 0;

  return (
    <div
      className="flex items-center justify-center transition-transform duration-300 ease-out"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <img
        src={image}
        alt="Preview"
        className="object-contain select-none pointer-events-none"
        style={{
          maxHeight: isHorizontal ? "85vw" : "85vh",
          maxWidth: isHorizontal ? "85vh" : "85vw",
        }}
      />
    </div>
  );
};
