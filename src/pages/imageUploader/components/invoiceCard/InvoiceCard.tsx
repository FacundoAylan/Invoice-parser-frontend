import { FaTrash } from "react-icons/fa";

const InvoiceCard = ({ img, index, setSelectedIndex, handleDelete }) => {
  return (
    <section>
      <div
        key={index}
        className="
          relative
          flex-shrink-0
          bg-[#16284B]
          border border-[#7ED957]/40
          rounded-xl
          overflow-hidden
          shadow-lg
          transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl
        "
      >
        <img
          src={img.url}
          alt={`preview-${index}`}
          className="
            w-full h-32 object-cover
            cursor-pointer
            transition-transform duration-300
            hover:scale-105
          "
          onClick={() => setSelectedIndex(index)}
        />

        {/* delete button */}
        <button
          onClick={() => handleDelete(index)}
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
