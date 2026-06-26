import type { ImagePreview } from "../../../../data/Image";
import InvoiceCard from "./InvoiceCard";

interface Props {
  images: ImagePreview[];
  setSelectedIndex: (index: number) => void;
  handleDelete: (index: number) => void;
  onDeleteAll: () => void;
  onUpload: () => void;
}

export const ImageSidebar = ({
  images,
  setSelectedIndex,
  handleDelete,
  onDeleteAll,
  onUpload,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div
        className="
          w-full lg:w-[280px]
          flex flex-col
          gap-4
          max-h-[300px]
          overflow-y-auto
          pr-2 py-4
          scrollbar-thin scrollbar-thumb-[#7ED957]/40 scrollbar-track-transparent
        "
      >
        {images.map((img, index) => (
          <InvoiceCard
            key={index}
            img={img}
            index={index}
            setSelectedIndex={setSelectedIndex}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <div className="flex gap-3 mt-2">
        <button
          className="
            bg-[#7ED957] hover:bg-[#6CC84A]
            text-white font-bold
            px-5 py-2 rounded-xl
            shadow-md transition-all
            hover:cursor-pointer hover:scale-105
          "
          onClick={onUpload}
        >
          Subir
        </button>

        <button
          type="button"
          className="
            bg-red-600 hover:bg-red-700
            text-white font-bold
            px-5 py-2 rounded-xl
            shadow-md transition-all
            hover:cursor-pointer hover:scale-105
          "
          onClick={onDeleteAll}
        >
          Eliminar todas
        </button>
      </div>
    </div>
  );
};

export default ImageSidebar;