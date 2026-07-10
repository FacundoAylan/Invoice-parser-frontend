interface ImagePreviewProps {
  image: string;
  rotation: number;
}

export const ImagePreview = ({ image, rotation }: ImagePreviewProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div
        className="w-full h-full transition-transform duration-300 ease-out rounded-3xl flex items-center justify-center"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <img
          src={image}
          alt="Preview"
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      </div>
    </div>
  );
};
