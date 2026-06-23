const InputCard = ({ handleDrop, handleFiles }) => {
  return (
    <section
      className="
            w-full lg:w-[500px]
            bg-[#16284B]
            rounded-2xl
            shadow-2xl
            border-t-8 border-[#7ED957]
            p-8
            text-center
            transition-all
          "
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        id="fileInput"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <label
        htmlFor="fileInput"
        className="flex flex-col items-center gap-2 cursor-pointer"
      >
        <img
          src="/image/logo2.webp"
          alt="Upload"
          className="w-24 h-24 md:w-32 md:h-32 object-contain"
        />

        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Sube tus imágenes
        </h2>

        <p className="text-gray-300 max-w-sm">
          Arrastra tus imágenes aquí o haz clic para subir
        </p>

        <span
          className="
                mt-2
                bg-[#7ED957]
                hover:bg-[#6cc84b]
                text-white
                font-bold
                px-8 py-4
                rounded-2xl
                transition
              "
        >
          Elegir archivos
        </span>
      </label>
    </section>
  );
};

export default InputCard;