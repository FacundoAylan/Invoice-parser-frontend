import { Link } from "react-router";

const Navbar = () => {

  return (
    <nav
      className="w-full h-12 lg:h-16
      flex items-center justify-center lg:justify-start z-50
      bg-[#0A2540]
      border-b-2 border-[#8fbe4e]
      overflow-hidden"
    >
      <Link
        to="/"
        aria-label="Ir al inicio"
        className="transition-transform duration-200 hover:scale-105"
      >
        <img
          src="/image/logo.webp"
          alt="Logo"
          className="h-8 lg:h-12 w-auto object-contain"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
