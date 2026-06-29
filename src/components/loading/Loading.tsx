const Loading = () => {
  return (
    <section className="w-full h-full flex flex-col gap-4 items-center justify-center">
        {/* Spinner */}
        <div className="w-24 h-24 border-6 border-gray-300 border-t-[#0a2540] rounded-full animate-spin"/>

        <span className="text-[#0a2540] text-xl font-medium tracking-wide">
          Cargando...
        </span>
    </section>
  );
};

export default Loading;
