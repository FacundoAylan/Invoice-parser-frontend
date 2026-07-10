import type { StoredImage } from "@/store/images.store";
import { FaTrash } from "react-icons/fa";

interface InvoiceCardProps {
  img: StoredImage;
  index: number;
  setSelectedIndex: (index: number) => void;
  handleDelete: (id: string) => void;
}

const InvoiceCard = ({
  img,
  index,
  setSelectedIndex,
  handleDelete,
}: InvoiceCardProps) => {
  return (
    <section>
      <div
        className="
          w-[90px] md:w-full
          relative
          flex-shrink-0
          rounded-xl
          overflow-hidden
          transition-transform duration-300 hover:scale-[1.02]
        "
      >
        <img
          src={`data:${img.mimeType};base64,${img.imageBase64}`}
          alt={`preview-${index}`}
          className="
            w-full h-32 object-cover
            bg-black/50 backdrop-blur-md
            cursor-pointer
            transition-transform duration-300
            border-4 border-[#0a2540]
            rounded-xl
          "
          onClick={() => setSelectedIndex(index)}
        />

        <button
          onClick={() => handleDelete(img.imageId)}
          className="
            absolute top-2 right-2
            w-8 h-8 flex items-center justify-center
            rounded-full bg-red-600 text-white
            hover:bg-red-700 hover:scale-110 hover:cursor-pointer
            transition-all duration-200 shadow-md
          "
          title="Eliminar imagen"
        >
          <FaTrash className="text-lg" />
        </button>
      </div>
    </section>
  );
};

export default InvoiceCard;
