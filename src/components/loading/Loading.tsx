import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <section className="w-full h-full flex flex-col gap-6 items-center justify-center bg-gray-50/50 animate-fade-in">
      <div className="relative text-[#0a2540]">
        <AiOutlineLoading3Quarters
          size="120px"
          className="animate-spin opacity-90"
        />
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <span className="text-[#0a2540] text-3xl font-bold tracking-tight">
          Cargando ...
        </span>
        <p className="text-gray-500 text-base">
          Estamos preparando todo para vos.
        </p>
      </div>
    </section>
  );
};

export default Loading;
