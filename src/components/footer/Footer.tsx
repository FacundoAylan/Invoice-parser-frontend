const Footer = () => {
  return (
    <footer className="relative h-10 md:h-12 flex items-center justify-center md:justify-start bg-[#0A2540] text-white">
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} Sculpture. Todos los derechos reservados.
        </p>
    </footer>
  );
};

export default Footer;
