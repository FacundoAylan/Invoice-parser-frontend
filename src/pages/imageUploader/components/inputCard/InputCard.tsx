interface InputCardProps {
  handleFiles: (files: FileList) => void;
}

const InputCard = ({ handleFiles }: InputCardProps) => {
  const handleDropLocal = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <section
      className="
        w-[90%] lg:w-[500px]
        bg-[#16284B]
        rounded-2xl
        shadow-2xl
        border-t-8 border-[#7ED957]
        p-4 md:p-8
        text-center
        transition-all
      "
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropLocal}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        id="fileInput"
        className="hidden"
        onChange={handleInputChange}
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

        <h2 className="text-2xl lg:text-4xl font-bold text-white">
          Sube tus imágenes
        </h2>

        <p className="text-sm text-gray-300 max-w-sm">
          Arrastra tus imágenes aquí o haz clic para subir
        </p>

        <span
          className="
            mt-2
            bg-[#7ED957]
            hover:bg-[#6cc84b] hover:-translate-y-0.5
            text-white
            font-bold
            p-2 lg:px-8 lg:py-4
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
