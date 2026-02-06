import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogOut, Search } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartCount] = useState(3); // TODO: Connect to cart state
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setUserMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">BM</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-slate-900">
              Bharat Mandi
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
            <Link to="/" className="hover:text-teal-600 transition-colors duration-300">
              Home
            </Link>
            <Link to="/products" className="hover:text-teal-600 transition-colors duration-300">
              Products
            </Link>
            <Link to="/services" className="hover:text-teal-600 transition-colors duration-300">
              Services
            </Link>
            <div className="relative group">
              <button className="hover:text-teal-600 transition-colors duration-300 flex items-center gap-1">
                Tools ▼
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-40">
                <Link to="/weather" className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors first:rounded-t-lg">
                  Weather
                </Link>
                <Link to="/equipment" className="block px-4 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                  Equipment
                </Link>
                <Link to="/live-bid" className="block px-4 py-3 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                  Live Bid
                </Link>
                <Link to="/cold-storage" className="block px-4 py-3 text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors">
                  Cold Storage
                </Link>
                <Link to="/godown" className="block px-4 py-3 text-slate-700 hover:bg-green-50 hover:text-green-600 transition-colors">
                  🏭 Godown
                </Link>
                <Link to="/soil-testing" className="block px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors last:rounded-b-lg">
                  🧪 Soil Testing
                </Link>
              </div>
            </div>
            <Link to="/about" className="hover:text-teal-600 transition-colors duration-300">
              About
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search (Hidden on mobile) */}
            <div className="hidden sm:flex items-center bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-colors duration-300">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm w-32 lg:w-48 text-slate-700 placeholder-slate-500"
              />
              <Search size={18} className="text-slate-400" />
            </div>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 text-slate-700 hover:text-teal-600 transition-colors duration-300 group"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-md group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  userMenuOpen
                    ? "bg-teal-100 text-teal-600"
                    : "text-slate-700 hover:text-teal-600 hover:bg-slate-100"
                }`}
              >
                <User size={24} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transform origin-top-right transition-all duration-300 animate-fadeIn">
                  {isAuthenticated ? (
                    <>
                      {/* User Info Header */}
                      <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-cyan-50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{user?.name || "User"}</p>
                            <p className="text-xs text-teal-600 font-medium">{user?.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors duration-200 border-b border-gray-100"
                      >
                        👤 My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors duration-200 border-b border-gray-100"
                      >
                        📦 My Orders
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 border-b border-gray-100 font-medium"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2 font-medium"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-3 text-teal-600 hover:bg-teal-50 transition-colors duration-200 border-b border-gray-100 font-medium"
                      >
                        🔐 Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-3 text-teal-600 hover:bg-teal-50 transition-colors duration-200 font-medium"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-700 hover:text-teal-600 transition-colors duration-300"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-slate-50 py-3 animate-fadeIn">
            <Link
              to="/"
              className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-white transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-white transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/services"
              className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-white transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Services
            </Link>
            <div className="px-4 py-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Tools</p>
              <Link to="/weather" className="block px-4 py-2 text-slate-700 hover:bg-blue-50 transition-colors text-sm">
                Weather
              </Link>
              <Link to="/equipment" className="block px-4 py-2 text-slate-700 hover:bg-orange-50 transition-colors text-sm">
                Equipment
              </Link>
              <Link to="/live-bid" className="block px-4 py-2 text-slate-700 hover:bg-red-50 transition-colors text-sm">
                Live Bid
              </Link>
              <Link to="/cold-storage" className="block px-4 py-2 text-slate-700 hover:bg-cyan-50 transition-colors text-sm">
                Cold Storage
              </Link>
              <Link to="/godown" className="block px-4 py-2 text-slate-700 hover:bg-green-50 transition-colors text-sm">
                Godown
              </Link>
              <Link to="/soil-testing" className="block px-4 py-2 text-slate-700 hover:bg-emerald-50 transition-colors text-sm">
                Soil Testing
              </Link>
            </div>
            <Link
              to="/about"
              className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-white transition-colors duration-200 border-t border-gray-100 mt-2"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
