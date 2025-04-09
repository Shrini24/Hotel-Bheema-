
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-serif font-semibold text-gray-900 mb-4">
              Foodie Flow
            </h2>
            <p className="text-gray-600 text-sm">
              Luxury hotel food service made simple and elegant. Order from the comfort of your room and track your delivery in real-time.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-hotel-600 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-600 hover:text-hotel-600 text-sm">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-600 hover:text-hotel-600 text-sm">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-hotel-600 text-sm">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-hotel-600 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-hotel-600 text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact
            </h3>
            <p className="text-gray-600 text-sm mb-2">Room Service: 123</p>
            <p className="text-gray-600 text-sm mb-2">Reception: 456</p>
            <p className="text-gray-600 text-sm">Email: dining@foodieflow.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm text-center">
            &copy; {currentYear} Foodie Flow Hotel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
