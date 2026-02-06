// Home.js
// Complete Home page (React + Tailwind) — top-right horizontal orange buttons + horizontal services pill.
// Replace your existing Home.js with this file.

import { useEffect, useState, useRef } from "react";
// ya agar wo kisi folder me hai, to uska path
import GrainMarket from "./GrainMarket";
import ResponsiveServicesStrip from "../components/ResponsiveServicesStrip";







/* Minimal localized strings — expand as needed */
const HOME_TRANSLATIONS = {
  english: {
    heroTitle: "Smart Fair Prices. Smart Farming. Bright Future",
    heroSub: "Markets · Schemes · Soil Tests · Weather — all in one place.",
    exploreServices: "Explore Everything",
    runningSchemes: "Running Govt. Schemes",
    chooseState: "Choose State",
    schemesNote: "",
    weatherReport: "Weather Report",
    refresh: "Refresh",
    soilTesting: "Soil Testing & Lab Reports",
    bookTest: "Book a Soil Test",
    footerName: "KisanConnect",
    footerTag: "Connecting farmers with markets & science.",
  },
  hindi: {
    heroTitle: "किसान के लिए स्मार्ट समाधान",
    heroSub: "बाजार · योजनाएँ · मिट्टी जाँच · मौसम — सब एक जगह।",
    exploreServices: "सभी सेवाएँ देखें",
    runningSchemes: "चल रही सरकारी योजनाएँ",
    chooseState: "राज्य चुनें",
    schemesNote: "कार्ड पर होवर करें और विवरण देखें। प्रोडक्शन में आधिकारिक छवियों का उपयोग करें।",
    weatherReport: "मौसम रिपोर्ट",
    refresh: "ताज़ा करें",
    soilTesting: "मिट्टी परीक्षण और रिपोर्ट",
    bookTest: "मिट्टी परीक्षण बुक करें",
    footerName: "KisanConnect",
    footerTag: "किसानों को बाजार और विज्ञान से जोड़ना।",
  },
};

const t = (lang, key) => {
  const pack = HOME_TRANSLATIONS[lang] || HOME_TRANSLATIONS["english"];
  return pack[key] || HOME_TRANSLATIONS["english"][key] || "";
};

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Jammu & Kashmir"
];

export default function Home() {
  const [language, setLanguage] = useState(() => localStorage.getItem("bhm_language") || "english");

  const defaultSchemes = [
    { id: "s1", title: "Crop Insurance", img: "./assets/CropInsaurance.jpeg" },
    { id: "s2", title: "Soil Health Card", img: "/assets/SoilHealthCard.webp" },
    { id: "s3", title: "Irrigation Subsidy", img: "./assets/Irrigation Subsidy.jpg" },
    { id: "s4", title: "Farmer Pension", img: "./assets/FarmerPension.jpeg" },
    { id: "s5", title: "pm kisan", img: "./assets/pm-kisan.webp" },
    { id: "s6", title: "Subsidy-for-Tractor", img: "./assets/Subsidy-for-Tractor.jpg" },


  ];

  const schemesByState = {
    Punjab: [
      { id: "punjab1", title: "Punjab MSP Boost", img: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=60" },
      { id: "punjab2", title: "Punjab Solar Pumps", img: "https://images.unsplash.com/photo-1547149604-88c6d5d1f4f6?auto=format&fit=crop&w=1200&q=60" },
    ],
    Kerala: [
      { id: "ker1", title: "Kerala Spice Promotion", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60" },
      { id: "ker2", title: "Coastal Farmer Aid", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=60" },
    ],
    Maharashtra: [
      { id: "mah1", title: "Drought Relief", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60" },
      { id: "mah2", title: "Banana Market Support", img: "https://images.unsplash.com/photo-1582515073490-399813dbf719?auto=format&fit=crop&w=1200&q=60" },
    ],
    Rajasthan: [
      { id: "punjab1", title: "Punjab MSP Boost", img: "" },
      { id: "punjab2", title: "Punjab Solar Pumps", img: "" },
    ],
    Kerala: [
      { id: "ker1", title: "Kerala Spice Promotion", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60" },
      { id: "ker2", title: "Coastal Farmer Aid", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=60" },
    ],
    Maharashtra: [
      { id: "mah1", title: "Drought Relief", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60" },
      { id: "mah2", title: "Banana Market Support", img: "https://images.unsplash.com/photo-1582515073490-399813dbf719?auto=format&fit=crop&w=1200&q=60" },
    ],
  };




  const [selectedState, setSelectedState] = useState("Uttar Pradesh");
  const [schemes, setSchemes] = useState(defaultSchemes);

  const [weatherLocation, setWeatherLocation] = useState("Local Village");
  const [weather, setWeather] = useState({ temp: "32°C", icon: "☀️", condition: "Sunny", humidity: "45%", wind: "8 km/h" });

  const marqueeRef = useRef(null);

  useEffect(() => {
    if (schemesByState[selectedState]) setSchemes(schemesByState[selectedState]);
    else setSchemes(defaultSchemes);
  }, [selectedState]);

  useEffect(() => {
    const map = {
      "Local Village": { temp: "32°C", icon: "☀️", condition: "Sunny", humidity: "45%", wind: "8 km/h" },
      "Town Market": { temp: "28°C", icon: "🌧️", condition: "Light Rain", humidity: "76%", wind: "10 km/h" },
      "Near River": { temp: "30°C", icon: "🌤️", condition: "Partly Cloudy", humidity: "60%", wind: "6 km/h" },
      "Hilly Area": { temp: "22°C", icon: "🌥️", condition: "Cloudy", humidity: "70%", wind: "12 km/h" },
    };
    setWeather(map[weatherLocation] || map["Local Village"]);
  }, [weatherLocation]);

  // language listeners (storage & custom event)
  useEffect(() => {
    const readLang = () => localStorage.getItem("bhm_language") || "english";
    const onStorage = (e) => { if (e.key === "bhm_language") setLanguage(e.newValue || "english"); };
    const onCustom = () => setLanguage(readLang());

    window.addEventListener("storage", onStorage);
    window.addEventListener("bhm_language_changed", onCustom);
    window.addEventListener("languagechange", onCustom);

    setLanguage(readLang());

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("bhm_language_changed", onCustom);
      window.removeEventListener("languagechange", onCustom);
    };
  }, []);

  /* ---------- Child components ---------- */

  function SchemeCardCompact({ scheme }) {
    return (
      <div className="relative w-64 h-36 rounded-2xl overflow-hidden shadow-md transform transition hover:scale-105">
        <img src={scheme.img} alt={scheme.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
          <h4 className="text-white font-semibold text-sm">{scheme.title}</h4>
        </div>
      </div>
    );
  }

  function SoilReportCard({ title, rating, img, notes }) {
    return (
      <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl">
        <img src={img} alt={title} className="w-32 h-24 object-cover rounded-md" loading="lazy" />
        <div className="flex-1">
          <h5 className="font-semibold text-lg">{title}</h5>
          <p className="text-sm text-slate-600">Quality: <span className="font-medium text-amber-600">{rating}</span></p>
          <p className="text-sm mt-2 text-slate-700">{notes}</p>
        </div>
        <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">View</button>
      </div>
    );
  }

  /* ---------- Render ---------- */

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* HERO: shorter, blurred bg with overlays */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[60vh] md:h-[70vh]">
          <img
            src="./assets/imag1.jpg"
            alt="Hero background"
            className="absolute inset-0 w-400 h-full object-cover md:object-contain object-center pointer-events-none"
            style={{ filter: "brightness(0.85) blur(1.6px)" }}
            loading="eager"
          />

          {/* gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,248,240,0.45)] via-[rgba(255,241,220,0.18)] to-[rgba(235,249,255,0.25)] pointer-events-none"></div>
          <div className="absolute -left-40 -bottom-24 w-80 h-80 rounded-full filter blur-3xl opacity-40 bg-amber-200/40 pointer-events-none"></div>
          <div className="absolute -right-28 -top-20 w-80 h-80 rounded-full filter blur-3xl opacity-35 bg-sky-200/30 pointer-events-none"></div>





          {/* HERO CONTENT */}
          <div className="relative z-20 container mx-auto px-6 lg:px-12 h-full flex items-center justify-start">
            <div className="max-w-3xl">
              <h1 className="text-slate-900 text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-md">{t(language, "heroTitle")}</h1>
              <p className="mt-3 text-slate-700 text-sm md:text-lg">{t(language, "heroSub")}</p>

              {/* SERVICES PILL: horizontal icons, light orange */}

            </div>
          </div>


        </div>
      </section>

      {/* RUNNING SCHEMES */}
      <section className="container mx-auto px-6 lg:px-12 py-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-800">{t(language, "runningSchemes")}</h2>
          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-600 hidden md:block">{t(language, "chooseState") + ":"}</label>
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="px-3 py-2 rounded-lg border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200">
              {STATES.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-5 relative overflow-hidden">
          <div ref={marqueeRef} className="flex gap-6 py-4 animate-marquee-reverse will-change-transform"
            onMouseEnter={() => { if (marqueeRef.current) marqueeRef.current.style.animationPlayState = "paused"; }}
            onMouseLeave={() => { if (marqueeRef.current) marqueeRef.current.style.animationPlayState = "running"; }}>
            {Array.from({ length: 2 }).map((_, idx) =>
              schemes.map(s => <div key={`${s.id}-${idx}`} className="transform transition hover:scale-105"><SchemeCardCompact scheme={s} /></div>)
            )}
          </div>

          <div className="text-sm text-slate-600 mt-3">{t(language, "schemesNote")}</div>

        </div>
      </section>

      {/* -------- SERVICES STRIP  -------- */}
      <ResponsiveServicesStrip />

      <GrainMarket />

      {/* ---------------------------------- */}


      {/* --- MANDI PRICES SECTION --- */}
      <section className="w-full flex justify-center mt-10">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 rounded-2xl shadow-xl px-10 py-10 max-w-6xl w-full">

          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-orange-700 text-center mb-6 tracking-wide">
            🌾 Mandi Prices Today
          </h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* State */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
              <select className="w-full p-3 border rounded-lg bg-white">
                <option>Select State</option>
                <option>Rajasthan</option>
                <option>Punjab</option>
                <option>Haryana</option>
                <option>Uttar Pradesh</option>
              </select>
            </div>

            {/* District */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">District</label>
              <select className="w-full p-3 border rounded-lg bg-white">
                <option>Select District</option>
                <option>Jaipur</option>
                <option>Jodhpur</option>
                <option>Ludhiana</option>
              </select>
            </div>

            {/* Nearest Mandi */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Nearest Mandi</label>
              <select className="w-full p-3 border rounded-lg bg-white">
                <option>Select Mandi</option>
                <option>Jaipur (F&V)</option>
                <option>Sanganer</option>
                <option>Ludhiana</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full table-auto">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-3 text-left">Commodity</th>
                  <th className="p-3 text-left">Arrival Date</th>
                  <th className="p-3 text-left">Variety</th>
                  <th className="p-3 text-left">Market</th>
                  <th className="p-3 text-right">Min Price</th>
                  <th className="p-3 text-right">Max Price</th>
                  <th className="p-3 text-right">Avg Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="p-3">Potato</td>
                  <td className="p-3">19/09/2025</td>
                  <td className="p-3">Other</td>
                  <td className="p-3 text-blue-600 font-medium">Jaipur (F&V)</td>
                  <td className="p-3 text-right">Rs 700</td>
                  <td className="p-3 text-right">Rs 1200</td>
                  <td className="p-3 text-right">Rs 950</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3">Onion</td>
                  <td className="p-3">19/09/2025</td>
                  <td className="p-3">Other</td>
                  <td className="p-3 text-blue-600 font-medium">Jaipur (F&V)</td>
                  <td className="p-3 text-right">Rs 600</td>
                  <td className="p-3 text-right">Rs 1300</td>
                  <td className="p-3 text-right">Rs 950</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3">Tomato</td>
                  <td className="p-3">19/09/2025</td>
                  <td className="p-3">Other</td>
                  <td className="p-3 text-blue-600 font-medium">Jaipur (F&V)</td>
                  <td className="p-3 text-right">Rs 1500</td>
                  <td className="p-3 text-right">Rs 3500</td>
                  <td className="p-3 text-right">Rs 2500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>




      {/* ---------- SOIL TESTING ---------- */}
      <section className="container mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Explanation */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-bold">{t(language, "soilTesting")}</h3>
            <p className="mt-3 text-slate-700">
              Soil testing identifies N-P-K levels, pH and micronutrients.
              Send a sample to the lab or use our field kit.
              Get tailored fertilizer recommendations.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90">🧪</div>
                  <div>
                    <h5 className="font-semibold">How it works</h5>
                    <p className="text-sm text-slate-600">
                      Collect top 15 cm, dry, label & send sample to lab.
                      Report in 3–7 days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-sky-50 border border-sky-100">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90">📄</div>
                  <div>
                    <h5 className="font-semibold">What you get</h5>
                    <p className="text-sm text-slate-600">
                      Soil health card + crop-specific recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                className="inline-block px-5 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                href="#book"
              >
                {t(language, "bookTest")}
              </a>
            </div>
          </div>

          {/* Right: Doctor image + reports below */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {/* Doctor/Scientist soil testing image */}
            <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="assets/soilTesting.jpg"
                alt="Doctor performing soil test"
                className="w-full h-full object-cover"
              />

            </div>

            {/* Reports moved below */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold">Sample Reports</h4>
              <SoilReportCard
                title="Loamy Field - #001"
                rating="Good"
                img="./assets/Loamy Field.jpg"
                notes="pH 6.8 • N: Medium • P: Low • K: Adequate. Apply P-rich fertilizer & compost."
              />
              <SoilReportCard
                title="Acidic Plot - #002"
                rating="Average"
                img="./assets/AcidicField.jpeg"
                notes="pH 5.2 • N: Low • P: Low • K: Low. Apply lime & NPK starter."
              />
            </div>
          </div>
        </div>
      </section>


      {/* WEATHER & SOIL */}
      <section className="container mx-auto px-6 lg:px-12 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-yellow-100 rounded-2xl p-6 shadow hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div><h3 className="text-lg font-semibold">{t(language, "weatherReport")}</h3><p className="text-sm text-slate-600">Live-ish (demo)</p></div>
            <div className="text-4xl">{weather.icon}</div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="text-4xl md:text-5xl font-bold">{weather.temp}</div>
            <div className="flex-1"><div className="font-medium">{weather.condition}</div><div className="text-sm text-slate-600 mt-1">Humidity: {weather.humidity} • Wind: {weather.wind}</div></div>
          </div>

          <div className="mt-5 flex gap-3">
            <select value={weatherLocation} onChange={(e) => setWeatherLocation(e.target.value)} className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-200">
              {["Local Village", "Town Market", "Near River", "Hilly Area"].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">{t(language, "refresh")}</button>
          </div>
        </div>

        <div className="lg:col-span-2  grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 rounded-xl p-4 shadow hover:shadow-xl transition">
            <h4 className="font-semibold">7-day (sample)</h4>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
                <div key={d} className="text-center p-2 rounded-lg bg-sky-50">
                  <div className="text-xl">{["☀️", "🌤️", "🌧️", "☀️", "🌥️"][i]}</div>
                  <div className="text-sm font-medium mt-1">{20 + i}°C</div>
                  <div className="text-xs text-slate-600 mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow hover:shadow-xl transition">
            <h4 className="font-semibold">Agri Alerts</h4>
            <ul className="mt-3 space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-3"><span>⚠️</span><div><div className="font-medium">Heat Advisory</div><div className="text-slate-600">Protect stored produce & adjust irrigation timings.</div></div></li>
              <li className="flex items-start gap-3"><span>💧</span><div><div className="font-medium">Irrigation Window</div><div className="text-slate-600">Water early morning for best uptake.</div></div></li>
            </ul>
          </div>
        </div>
      </section>

      {/* STYLES: marquee */}
      <style>{`
        @keyframes marqueeReverse {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-reverse { display:inline-flex; gap:1.25rem; animation: marqueeReverse 24s linear infinite; }
        @media (max-width:768px){ .animate-marquee-reverse{ animation-duration:36s; } }
      `}</style>
    </div>
  );
}
