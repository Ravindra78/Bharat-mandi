import { useState } from "react";
import logo from "../assets/logo1.png";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Product", href: "#product" },
    { name: "About Us", href: "#aboutus" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="w-full sticky top-0 z-50">
      {/* FULL WIDTH BAR */}
      <div className="w-full h-20 sm:h-24 md:h-28 lg:h-32 flex shadow-sm border-b border-[#d2b89e] bg-[#e8d9c0]">
        {/* LEFT: LOGO + BRAND NAME (Mobile में close & logo बड़ा) */}
        <div className="flex items-center px-4 sm:px-6 md:px-8 lg:px-10 h-full gap-2 sm:gap-3 md:gap-4">
          <img
            src={logo}
            alt="DhartiAmrit"
            className="h-[85%] sm:h-[90%] md:h-full w-auto object-contain"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#5c4033] whitespace-nowrap">
            DhartiAmrit
          </h1>
        </div>

        {/* CENTER: Empty space (breathing room) */}
        <div className="flex-1" />

        {/* RIGHT: MENU */}
        <div className="flex items-center px-4 sm:px-6 md:px-8 lg:px-10 h-full">
          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 lg:gap-10 font-medium text-[#5c4033]">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-[#8b6f47] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#5c4033] p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#e8d9c0] border-t border-[#d2b89e] px-6 py-6 space-y-5 shadow-md">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-xl font-medium text-[#5c4033] hover:text-[#8b6f47]"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
