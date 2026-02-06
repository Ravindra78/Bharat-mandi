import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import { Menu, X, Globe, UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "bn", label: "বাংলা" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#e8d9c0] border-b border-[#d2b89e]">
      {/* TOP BAR */}
      <div className="flex items-center h-16 sm:h-20 px-4 md:px-8">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="DhartiAmrit" className="h-10 sm:h-12" />
          <span className="font-bold text-lg sm:text-xl text-[#5c4033]">
            DhartiAmrit
          </span>
        </Link>

        <div className="flex-1" />

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-[#5c4033] font-medium">
          <Link to="/" className="hover:text-[#8b6f47]">
            Home
          </Link>
          <Link to="/product" className="hover:text-[#8b6f47]">
            Product
          </Link>
          <Link to="/services" className="hover:text-[#8b6f47]">
            Services
          </Link>
          <Link to="/about" className="hover:text-[#8b6f47]">
            About
          </Link>

          {/* 🌐 LANGUAGE (CLICK) */}
          <div className="relative">
            <button
              onClick={() => {
                setLangOpen(!langOpen);
                setAuthOpen(false);
              }}
              className="p-1"
            >
              <Globe size={22} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#f5efe6] border rounded shadow">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="block w-full text-left px-4 py-2 hover:bg-[#e8d9c0]"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 👤 LOGIN / REGISTER (CLICK) */}
          <div className="relative">
            <button
              onClick={() => {
                setAuthOpen(!authOpen);
                setLangOpen(false);
              }}
              className="p-1"
            >
              <UserCircle size={26} />
            </button>

            {authOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#f5efe6] border rounded shadow">
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-[#e8d9c0]"
                  onClick={() => setAuthOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 hover:bg-[#e8d9c0]"
                  onClick={() => setAuthOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-[#e8d9c0] border-t border-[#d2b89e] px-6 py-6 space-y-4">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link to="/product" onClick={() => setMobileOpen(false)}>
            Product
          </Link>
          <Link to="/services" onClick={() => setMobileOpen(false)}>
            Services
          </Link>
          <Link to="/about" onClick={() => setMobileOpen(false)}>
            About
          </Link>

          {/* LANGUAGE */}
          <div>
            <p className="font-medium mb-2">Language</p>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/login"
            className="block text-center bg-[#5c4033] text-white py-2 rounded"
            onClick={() => setMobileOpen(false)}
          >
            Login / Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
