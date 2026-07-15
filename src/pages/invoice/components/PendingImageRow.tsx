import type { StoredImage } from "@/store/images.store";

interface PendingImageRowProps {
  img: StoredImage;
  viewImage: boolean;
  onViewClick: () => void;
}

const PendingImageRow = ({
  img,
  viewImage,
  onViewClick,
}: PendingImageRowProps) => {
  return (
    <div
      className={`grid items-center bg-[#0A2540] rounded-xl border border-gray-800/60 p-3 transition-all duration-150 hover:scale-101 ${
        viewImage
          ? "grid-cols-[1fr_100px]"
          : "grid-cols-[1fr_100px] md:grid-cols-[1fr_120px_140px_120px]"
      }`}
    >
      <div className="text-left font-medium text-white text-xs md:text-sm flex items-center gap-3 pr-2 truncate">
        <div className="w-10 h-10 bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-slate-800">
          <img
            src={`data:${img.mimeType};base64,${img.imageBase64}`}
            alt="Miniatura"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <span className="truncate">Imagen sin procesar</span>
      </div>

      {!viewImage && (
        <div className="hidden md:flex justify-center">
          <span className="inline-block bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs px-2.5 py-1 rounded-3xl uppercase">
            {img.mimeType.split("/")[1]}
          </span>
        </div>
      )}

      {!viewImage && (
        <div className="hidden md:block text-right text-gray-400 text-xs md:text-sm font-mono truncate">
          {img.imageId.substring(0, 12)}...
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onViewClick}
          className="text-xs px-3 py-1.5 rounded-3xl font-semibold border transition-all cursor-pointer bg-[#7ED957]/20 text-[#7ED957] border-[#7ED957]/30 font-bold"
        >
          ver Factura
        </button>
      </div>
    </div>
  );
};

export default PendingImageRow;
