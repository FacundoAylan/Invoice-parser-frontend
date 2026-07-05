import { useNavigate } from "react-router";

const Navbar = () => {

  const navigate = useNavigate();

  const redirect = () =>{
    navigate("/");
  };

  return (
    <nav
      className=" w-full h-12 lg:h-16 
      flex items-center justify-center lg:justify-start z-50
      bg-[#0A2540]
      border-b-2 border-[#8fbe4e]
      overflow-hidden"
    >
      <img
        src="/image/logo.webp"
        className="h-8 lg:h-12 w-auto object-contain transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
        onClick={redirect}
      />
    </nav>
  );
};

export default Navbar;
