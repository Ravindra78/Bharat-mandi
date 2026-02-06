import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '.././redux/actions/authActions';

// Responsive Navbar with language selector (major Indian languages)
// - Mobile-friendly hamburger menu
// - Language options for commonly used Indian languages
// - Simple in-component translations (no external i18n library required)
// - Persists selected language to localStorage
// - Added glassmorphism design: semi-transparent background with blur effect

const TRANSLATIONS = {
  english: {
    home: 'Home',
    listings: 'Listings',
    dashboard: 'Dashboard',
    orders: 'Orders',
    kyc: 'KYC',
    logout: 'Logout',
    login: 'Login',
    register: 'Register'
  },
  hindi: {
    home: 'होम',
    listings: 'लिस्टिंग्स',
    dashboard: 'डैशबोर्ड',
    orders: 'ऑर्डर',
    kyc: 'केवाईसी',
    logout: 'लॉग आउट',
    login: 'लॉगिन',
    register: 'रजिस्टर'
  },
  bengali: {
    home: 'হোম',
    listings: 'লিস্টিং',
    dashboard: 'ড্যাশবোর্ড',
    orders: 'অর্ডার',
    kyc: 'কে.ওয়াই.সি',
    logout: 'লগআউট',
    login: 'লগইন',
    register: 'রেজিস্টার'
  },
  telugu: {
    home: 'హోం',
    listings: 'లిస్టింగ్స్',
    dashboard: 'డాష్‌బోర్డ్',
    orders: 'ఆర్డర్స్',
    kyc: 'కెవైసీ',
    logout: 'లాగ్ ఔట్',
    login: 'లాగిన్',
    register: 'రెజిస్టర్'
  },
  marathi: {
    home: 'मुख्यपृष्ठ',
    listings: 'लिस्टिंग्स',
    dashboard: 'डॅशबोर्ड',
    orders: 'ऑर्डर',
    kyc: 'केवायसी',
    logout: 'लॉगआउट',
    login: 'लॉगिन',
    register: 'नोंदणी'
  },
  tamil: {
    home: 'ஹோம்',
    listings: 'பட்டியல்',
    dashboard: 'டாஷ் போர்டு',
    orders: 'ஒர்டர்கள்',
    kyc: 'கே.வ وای.சி',
    logout: 'வெளியேறு',
    login: 'உள்நுழைய',
    register: 'பதிவு'
  },
  gujarati: {
    home: 'હોમ',
    listings: 'લિસ્ટિંગ્સ',
    dashboard: 'ડેશબોર્ડ',
    orders: 'ઓર્ડર',
    kyc: 'કેવાયસી',
    logout: 'લોગઆઉટ',
    login: 'લૉગિન',
    register: 'રજીસ્ટર'
  },
  kannada: {
    home: 'ಹೊಮ್',
    listings: 'ಲಿಸ್ಟಿಂಗ್ಸ್',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    orders: 'ಆರ್ಡರ್ಸ್',
    kyc: 'ಕೆವೈಸಿ',
    logout: 'ಲಾಗ್ ಔಟ್',
    login: 'ಲಾಗಿನ್',
    register: 'ನೋಂದಣಿ'
  },
  malayalam: {
    home: 'ഹോം',
    listings: 'ലിസ്റ്റിംഗ്സ്',
    dashboard: 'ഡാഷ്ബോഡ്',
    orders: 'ഓർഡറുകൾ',
    kyc: 'കെവൈസി',
    logout: 'ലോഗ്ഔറ്റ്',
    login: 'ലോഗിൻ',
    register: 'രജിസ്റ്റർ'
  },
  odia: {
    home: 'ହୋମ',
    listings: 'ଲିସ୍ଟିଂସ',
    dashboard: 'ଡ୍ୟାସ୍‌ବୋର୍ଡ',
    orders: 'ଅର୍ଡର',
    kyc: 'କେ.ଓ.ୟାଇ.ସି',
    logout: 'ଲଗ୍ ଆଉଟ୍',
    login: 'ଲଗଇନ୍',
    register: 'ରେଜିଷ୍ଟର'
  },
  punjabi: {
    home: 'ਹੁਮ',
    listings: 'ਲਿਸਟਿੰਗ',
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    orders: 'ਆਰਡਰ',
    kyc: 'ਕੇਵਾਈਸੀ',
    logout: 'ਲੌਗਆਉਟ',
    login: 'ਲੌਗਿਨ',
    register: 'ਰਜਿਸਟਰ'
  },
  assamese: {
    home: 'হোম',
    listings: 'লিস্টিং',
    dashboard: 'ড্যাসবোর্ড',
    orders: 'অৰ্ডাৰ',
    kyc: 'কেৱাইচি',
    logout: 'লগআউট',
    login: 'লগইন',
    register: 'ৰেজিষ্টাৰ'
  }
};

const LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'हिंदी' },
  { value: 'bengali', label: 'বাংলা (Bengali)' },
  { value: 'telugu', label: 'తెలుగు (Telugu)' },
  { value: 'marathi', label: 'मराठी (Marathi)' },
  { value: 'tamil', label: 'தமிழ் (Tamil)' },
  { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
  { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
  { value: 'malayalam', label: 'മലയാളം (Malayalam)' },
  { value: 'odia', label: 'ଓଡ଼ିଆ (Odia)' },
  { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { value: 'assamese', label: 'অসমীয়া (Assamese)' }
];

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [language, setLanguage] = useState(() => localStorage.getItem('bhm_language') || 'english');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('bhm_language', language);
  }, [language]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.english;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-400 backdrop-blur-md border-b border-blue/20 text-black supports-[backdrop-filter:blur(0)]:bg-blue/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="./assets/logo2.png"
                alt="Ashok Stambh Logo"
                className="w-15 h-14 rounded"
              />
              <span className="font-bold select-none">
                <span className="text-orange-800">किशान</span> <span className="text-amber-600">𝓢𝓮𝓽𝓾</span>
              </span>
            </Link>
          </div>



          {/* Center: desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-green-200">{t.home}</Link>
            <Link to="/listings" className="hover:text-green-200">{t.listings}</Link>

            {/* Search Bar */}
            <div className="relative" >
              <input
                type="text"
                placeholder="Search..."
                className=" w-96 px-4 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white">
                🔍
              </button>
            </div>

            {isAuthenticated && (
              <>
                <Link
                  to={user?.role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard'}
                  className="hover:text-green-200"
                >
                  {t.dashboard}
                </Link>
                <Link to="/orders" className="hover:text-green-200">{t.orders}</Link>
                {user?.kycStatus !== 'verified' && (
                  <Link to="/kyc" className="hover:text-green-200">{t.kyc}</Link>
                )}
              </>
            )}


          </div>


          {/* Right: actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <button onClick={handleLogout} className="hover:text-green-200">{t.logout}</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-green-200">{t.login}</Link>
                  <Link to="/register" className="hover:text-green-200">{t.register}</Link>
                </>
              )}

              {/* Language selector (desktop) */}
              <div>
                <label htmlFor="lang" className="sr-only">Language</label>
                <select
                  id="lang"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-md p-1 focus:outline-none focus:border-green-200"
                >
                  {LANGUAGE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile: hamburger */}
            <div className="md:hidden flex items-center">
              <button
                aria-label="Toggle menu"
                onClick={() => setMobileOpen(v => !v)}
                className="p-2 rounded bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu content */}
        {mobileOpen && (
          <div className="md:hidden py-2 bg-white/5 backdrop-blur-sm border-b border-white/20">
            <div className="flex flex-col space-y-2 pb-2">
              <Link to="/" className="px-2 py-2 rounded hover:bg-white/10">{t.home}</Link>
              <Link to="/listings" className="px-2 py-2 rounded hover:bg-white/10">{t.listings}</Link>

              {isAuthenticated ? (
                <>
                  <Link to={user?.role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard'} className="px-2 py-2 rounded hover:bg-white/10">{t.dashboard}</Link>
                  <Link to="/orders" className="px-2 py-2 rounded hover:bg-white/10">{t.orders}</Link>
                  {user?.kycStatus !== 'verified' && <Link to="/kyc" className="px-2 py-2 rounded hover:bg-white/10">{t.kyc}</Link>}
                  <button onClick={handleLogout} className="text-left px-2 py-2 rounded hover:bg-white/10">{t.logout}</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-2 py-2 rounded hover:bg-white/10">{t.login}</Link>
                  <Link to="/register" className="px-2 py-2 rounded hover:bg-white/10">{t.register}</Link>
                </>
              )}

              <div className="px-2 pt-2">
                <label htmlFor="lang-mobile" className="block text-sm font-medium mb-1">Language</label>
                <select
                  id="lang-mobile"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-md p-2 focus:outline-none focus:border-green-200"
                >
                  {LANGUAGE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
