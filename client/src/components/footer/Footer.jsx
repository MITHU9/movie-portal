import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";

import { BiSolidCameraMovie } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 border-t w-full">
      <div className="container mx-auto px-6">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Website Name and Tagline */}
          <div className="text-center md:text-left">
            <div className="text-4xl font-bold text-blue-600 flex items-center justify-center md:justify-start">
              <BiSolidCameraMovie />
              <NavLink to="/">CineVerse</NavLink>
            </div>
            <p className="mt-2 text-sm">
              Your ultimate destination for discovering, reviewing, and enjoying
              the best movies.
            </p>
          </div>

          {/* Contact Information */}
          <div className="text-center  flex flex-col items-center justify-center md:text-left">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>info@movieportal.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+1 (123) 456-7890</span>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="">
            <div className="text-center ">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/all-movies"
                    className="hover:text-blue-400 transition"
                  >
                    Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" className="hover:text-blue-400 transition">
                    Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/community"
                    className="hover:text-blue-400 transition"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/community"
                    className="hover:text-blue-400 transition"
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="text-center md:text-start ">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex justify-center items-center space-x-4 md:justify-start">
              <a
                href="#"
                className="text-white hover:text-gray-400 transition transform hover:scale-110"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-400 transition transform hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-400 transition transform hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-400 transition transform hover:scale-110"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright Section */}
        <div className="text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Movie Portal. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
