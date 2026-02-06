import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-bold">
                BM
              </div>
              Bharat Mandi
            </h3>
            <p className="text-sm mb-4 font-light leading-relaxed">
              Connecting farmers directly with buyers, ensuring fair prices and quality agricultural products.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-teal-400 transition-colors duration-300 hover:scale-125 transform"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-teal-400 transition-colors duration-300 hover:scale-125 transform"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-teal-400 transition-colors duration-300 hover:scale-125 transform"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-teal-400 transition-colors duration-300 hover:scale-125 transform"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors duration-300 font-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-teal-400 transition-colors duration-300 font-light">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-400 transition-colors duration-300 font-light">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors duration-300 font-light">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:support@bharatmandi.com"
                  className="hover:text-teal-400 transition-colors duration-300 flex items-center gap-2 font-light"
                >
                  <Mail size={16} />
                  support@bharatmandi.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-300 font-light">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-300 font-light">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-300 font-light">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-300 font-light">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-300 font-light">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-300 font-light">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-300 font-light">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-light">
            <p>&copy; 2026 Bharat Mandi. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Made with love for Indian Farmers</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
