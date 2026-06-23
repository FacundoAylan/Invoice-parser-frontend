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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.34 6m-4.74 0l-.34-6M9 3.5V4.5M15 3.5V4.5M4.5 4.5h15m-1.5 0l-1.07 13.44A2.25 2.25 0 0114.53 20H9.47a2.25 2.25 0 01-2.24-2.06L6.15 4.5h12.3M10 9v6M14 9v6"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default InvoiceCard;
