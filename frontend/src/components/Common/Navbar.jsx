import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/dashboard" className="text-white text-lg font-bold">
        Status Update App
      </Link>
      <div>
        <Link to="/login" className="text-gray-300 hover:text-white mx-2">
          Login
        </Link>
        <Link to="/register" className="text-gray-300 hover:text-white mx-2">
          Register
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
