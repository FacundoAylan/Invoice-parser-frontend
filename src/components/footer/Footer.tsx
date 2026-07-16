const Footer = () => {
  return (
    <footer className="relative h-10 md:h-12 flex items-center justify-center md:justify-end gap-1 bg-[#0A2540] text-white px-2">
        <img 
          alt="logo3"
          src="/image/logo3.webp"
          className="w-4 h-4"
        />
        <p className="text-sm text-gray-300 font-medium">
          {new Date().getFullYear()} Sculpture. Todos los derechos reservados.
        </p>
    </footer>
  );
};

export default Footer;
