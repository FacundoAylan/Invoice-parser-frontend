import { useNavigate } from "react-router";

const NotFoundPage = () => {
  
  const navigate = useNavigate();

  const redirect = ()=>{
    navigate("/");
  };

  return (
    <section className="flex flex-col items-center gap-4 w-full h-screen bg-white text-gray-800 px-4 py-24">
      <img
        src="/image/logo404.webp"
        alt="Logo de error 404"
        className="w-40 h-40 mb-4"
      />
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a2540] text-center">
        ¡Ups! Página no encontrada
      </h1>

      <p className="text-base md:text-lg text-gray-600 text-center max-w-md">
        Es posible que el enlace esté roto o que la ruta no exista.
      </p>

      <button
        type="button"
        className="px-6 py-3 bg-[#0a2540] hover:bg-[#1a3a66] hover:cursor-pointer text-white rounded-lg shadow-lg transition-all duration-300 font-semibold hover:scale-105"
        onClick={redirect}
      >
        Volver al inicio
      </button>
    </section>
  );
};

export default NotFoundPage;
