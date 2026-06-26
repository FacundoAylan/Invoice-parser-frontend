import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0A2540] text-white mt-10">
      {/* Curved top divider */}
      <svg
        className="absolute top-0 left-0 w-full h-[100px]"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          d="M0,64 C480,160 960,0 1440,64 L1440,0 L0,0 Z"
        ></path>
      </svg>

      {/* Content */}
      <div className="relative flex gap-8 items-end justify-end px-6 pb-2 min-h-[110px]">
        
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} Sculpture. Todos los derechos reservados.
        </p>

        <a
          href="#"
          className="flex items-center gap-2 text-[#7ED957] font-semibold hover:text-[#6CC84A] transition"
        >
          Contacto <FaWhatsapp className="text-xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
