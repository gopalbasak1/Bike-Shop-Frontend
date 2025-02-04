import { Link } from "react-router-dom";
import { logout } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hook";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();

  // Get user from Redux state instead of localStorage
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout()); // Logout via Redux
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Bike Shop Logo" className="h-8" />
          <span className="text-xl font-bold">Bike Shop</span>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/all-product" className="hover:text-gray-200">
            All Product
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="space-x-4">
          {user ? (
            <div className="relative">
              {/* User profile */}
              <button
                onClick={handleDropdownToggle}
                className="relative flex items-center space-x-2 hover:text-gray-200"
              >
                <div className="relative group">
                  <img
                    src={user.image || "/default-profile.png"}
                    alt="User"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                  {/* Tooltip (Hidden by default, shown on hover) */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-10 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-max whitespace-nowrap">
                    {user?.name?.firstName} {user?.name?.middleName}{" "}
                    {user?.name?.lastName}
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg">
                  <Link
                    to={`/${user?.role}/dashboard`}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-200">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
