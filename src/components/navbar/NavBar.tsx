import { useNavigate } from "react-router";

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav
      className=" w-full h-16
      flex items-center z-50
      border-b-2 border-[#8fbe4e]
      overflow-hidden"
    >
      <img
        src="/image/logo.webp"
        className="h-15 w-auto object-contain transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
        onClick={ () => navigate("/") }
      />
    </nav>
  );
};

export default Navbar;
