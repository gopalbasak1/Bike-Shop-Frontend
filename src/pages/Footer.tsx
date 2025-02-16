import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold">Bike Shop</h2>
          <p className="text-gray-400 mt-2">
            Your trusted destination for premium bikes and accessories. Ride
            with confidence!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li>
              <a href="/about" className="hover:text-gray-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/all-product" className="hover:text-gray-200">
                Products
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="text-gray-400 mt-2 flex items-center">
            <MapPin size={18} className="mr-2" /> 123 Bike Street, City Name
          </p>
          <p className="text-gray-400 flex items-center">
            <Phone size={18} className="mr-2" /> +123 456 7890
          </p>
          <p className="text-gray-400 flex items-center">
            <Mail size={18} className="mr-2" /> support@bikeshop.com
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-8 text-sm">
        © {new Date().getFullYear()} Bike Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
