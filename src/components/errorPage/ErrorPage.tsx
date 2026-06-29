import { useEffect } from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer); // Limpieza del timeout
  }, [navigate]);

  return (
    <section className="flex flex-col items-center justify-center gap-2 w-full h-full bg-white text-gray-800 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a2540] mb-4">
          ¡Ups! Ocurrió un error
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Hubo un problema al leer las facturas.
        </p>
        <p className="text-md text-gray-500 mb-6">
          Por favor, vuelve a subirlas para continuar.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Serás redirigido automáticamente en 5 segundos...
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[#0a2540] hover:bg-[#1a3a66] hover:cursor-pointer text-white rounded-lg shadow-lg transition-all duration-300 font-semibold hover:scale-105"
        >
          Volver al inicio ahora
        </button>
    </section>
  );
};

export default ErrorPage;
