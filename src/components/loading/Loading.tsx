const Loading = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-[#121417]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#7ED957] rounded-full animate-spin"></div>

        {/* Texto */}
        <span className="text-gray-400 text-sm md:text-base font-medium tracking-wide">
          Cargando...
        </span>
      </div>
    </section>
  );
};

export default Loading;
