const Footer = () => {
  return (
    <footer className="relative h-22 bg-[#0A2540] text-white">
      {/* Curved top divider */}
      <svg
        className="absolute z-10 top-0 left-0 w-full h-18"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          d="M0,64 C480,160 960,0 1440,64 L1440,0 L0,0 Z"
        />
      </svg>

      {/* Content */}
      <div className="absolute bottom-2 right-2">
        
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} Sculpture. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
