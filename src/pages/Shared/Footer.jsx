import React from 'react';
import { FaEnvelope, FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router';
import logo from '../../assets/Img/whereisit_logo.png';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 col-span-1">
            <div className="flex items-center mb-4">
              <img src={logo} alt="Logo" className="w-6 h-6" />
              <span className="ml-2 text-xl font-bold">WhereIsItHub</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting people with their lost belongings. Our platform makes it easy to report lost items and help others find what they've lost.
            </p>
            <div className="flex items-center text-gray-300 space-x-2">
              <FaEnvelope className="h-4 w-4" />
              <span>contact@whereis-it.com</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/allItems" className="text-gray-300 hover:text-white">Lost & Found</Link></li>
              <li><Link to="/addItems" className="text-gray-300 hover:text-white">Add Item</Link></li>
              <li><Link to="/allRecovered" className="text-gray-300 hover:text-white">Recoverd Item</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Important Links</h3>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-gray-300 hover:text-white">Register</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-white">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/maanvia.khan/" target="_blank" className="text-gray-300 hover:text-white">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://x.com/RahimaKhatun97" target="_blank" className="text-gray-300 hover:text-white">
                <FaXTwitter className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/rahima-khatun28/ " className="text-gray-300 hover:text-white">
                <FaLinkedinIn className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p className="text-gray-300">© {new Date().getFullYear()} WhereIsItHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
