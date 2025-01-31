// Assuming auth utils are in utils/auth.ts

import { Link } from "react-router-dom";
import { isAuthenticated, logout } from "./Utils";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Bike Shop Logo" className="h-8" />{" "}
          {/* Replace with your logo */}
          <span className="text-xl font-bold">Bike Shop</span>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/products" className="hover:text-gray-200">
            All Product
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="space-x-4">
          {isAuthenticated() ? (
            <>
              <Link to="/dashboard/user" className="hover:text-gray-200">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-400"
              >
                Logout
              </button>
            </>
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
