import { Link } from "react-router-dom";
import { logout } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../../assets/images/biker-riding-adventure-motorcycle-vector-50062640.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleDropdownToggle = () => setDropdownOpen((prev) => !prev);
  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  const handleCloseMenus = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenus();
  };

  return (
    <nav className="bg-blue-600 text-white p-4 rounded-2xl md:mx-2 mx-2 mt-2 shadow-lg relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Bike Shop Logo" className="h-12 md:h-16" />
          <span className="text-lg md:text-xl font-bold">Bike Shop</span>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={handleMenuToggle}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/all-product" className="hover:text-gray-200">
            All Products
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
        </div>

        {/* Desktop User/Profile Section */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="flex items-center space-x-2 hover:text-gray-200"
              >
                <img
                  src={user.image || "/default-profile.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg z-10 rounded-2xl">
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-blue-600 shadow-lg rounded-b-2xl z-40">
          <div className="flex flex-col space-y-4 p-4 text-center">
            <Link
              to="/"
              className="hover:text-gray-200"
              onClick={handleCloseMenus}
            >
              Home
            </Link>
            <Link
              to="/all-product"
              className="hover:text-gray-200"
              onClick={handleCloseMenus}
            >
              All Products
            </Link>
            <Link
              to="/about"
              className="hover:text-gray-200"
              onClick={handleCloseMenus}
            >
              About
            </Link>

            {user ? (
              <div className="border-t border-gray-400 pt-2">
                <Link
                  to={`/${user?.role}/dashboard`}
                  className="block hover:text-gray-200"
                  onClick={handleCloseMenus}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 mt-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-400 pt-2">
                <Link
                  to="/login"
                  className="block hover:text-gray-200"
                  onClick={handleCloseMenus}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block hover:text-gray-200"
                  onClick={handleCloseMenus}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
