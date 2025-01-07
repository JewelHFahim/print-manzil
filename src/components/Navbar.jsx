import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav>
      <div className="h-[60px] w-full bg-[#101010] text-white shadow-md px-5 md:px-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold gray-400 flex items-center gap-2">
        <img src="/logo.jpg" alt="" className="w-10 h-10 rounded-full"/>
        Print Manzil</Link>

        <ul className="flex items-center gap-5 md:gap-10">
          <li>
            <Link to="/" className="hover:text-blue-600 transition-all duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/design-tshirt" className="hover:text-blue-600 transition-all duration-200 blue-600">
              Design
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
