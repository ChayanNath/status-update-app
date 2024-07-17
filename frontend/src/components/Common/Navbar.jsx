import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = !!localStorage.getItem("token");
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Status Update
        </Link>
        <div className="flex items-center">
          {token ? (
            <>
              <Link to="/status-update" className="text-white mr-4">
                Update Status
              </Link>
              <button onClick={handleLogout} className="text-white mr-4">
                Logout
              </button>
              <div className="flex items-center">
                {user && user.firstName && user.lastName ? (
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-white text-2xl" />
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
