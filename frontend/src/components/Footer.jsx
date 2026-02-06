import logo from "../assets/logo1.png"; // अपना logo path डालो

const Footer = () => {
  return (
    <footer className="bg-[#5999E3] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {/* Column 1: Logo + Description */}
          <div className="flex flex-col items-start text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
              <img
                src={logo}
                alt="DhartiAmrit"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <h3 className="text-xl sm:text-2xl font-bold transition-all duration-300 hover:text-[#E0725C] hover:scale-105">
                DhartiAmrit
              </h3>
            </div>
            <p className="text-sm sm:text-base opacity-90 leading-relaxed transition-all duration-300 hover:text-[#E0725C] hover:scale-105">
              Reviving soil health naturally and boosting farm productivity with
              100% organic solutions.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-xl mb-4 sm:mb-6 transition-all duration-300 hover:text-[#E0725C] hover:scale-105">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Product", href: "#product" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-[#E0725C] hover:underline hover:scale-110 transition-all duration-300 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-xl mb-4 sm:mb-6 transition-all duration-300 hover:text-[#E0725C] hover:scale-105">
              Contact Us
            </h4>
            <div className="space-y-2 sm:space-y-4 text-sm sm:text-base">
              <p className="transition-all duration-300 hover:text-[#E0725C] hover:scale-105">
                📞 +91 XXXXX XXXXX
              </p>
              <p className="transition-all duration-300 hover:text-[#E0725C] hover:scale-105">
                📧 info@dhartiamrit.com
              </p>
              <p className="transition-all duration-300 hover:text-[#E0725C] hover:scale-105">
                🌿 Jaipur, Rajasthan, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-xs sm:text-sm py-5 sm:py-6 border-t border-[#4a7bc7] bg-[#4a7bc7]">
        © {new Date().getFullYear()} DhartiAmrit. All rights reserved. Made with
        🌱
      </div>
    </footer>
  );
};

export default Footer;
