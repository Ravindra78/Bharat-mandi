import { useRef, useState, useEffect } from "react";
import productImg from "../assets/logo1.png";
import heroVideo from "../assets/Hero.mp4";

const HEADER_HEIGHT = 96; // header ki height (px)

const HomePage = () => {
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = soundOn;
    setSoundOn(!soundOn);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      // Most browsers require this for better autoplay reliability
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <main className="w-full" style={{ marginTop: `${HEADER_HEIGHT}px` }}>
      {/* ================= HERO / VIDEO ================= */}
      <section className="relative min-h-[70vh] sm:min-h-[85vh] w-full overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          poster="/path-to-good-poster.jpg" // ← mobile ke liye accha poster daal dena
        />

        {/* Stronger overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

        {/* Content - better responsive typography & padding */}
        <div className="relative z-10 min-h-[70vh] sm:min-h-[85vh] flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-0 w-full text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              DhartiAmrit
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-3 md:mt-4 text-orange-400 font-semibold">
                49 Organic Jadibutiyon ki Shakti
              </span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl max-w-xl lg:max-w-2xl text-gray-100">
              100% chemical free organic product jo sabjiyon ko keedon se
              bachata hai aur production badhata hai.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a
                href="#product"
                className="bg-sky-600 hover:bg-sky-700 px-8 py-4 rounded-full text-base sm:text-lg font-semibold text-center transition-colors"
              >
                Buy Now
              </a>

              <button
                onClick={toggleSound}
                className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-full border border-white/30 text-white text-base sm:text-lg font-medium hover:bg-white/30 transition-colors"
              >
                {soundOn ? "🔇 Mute" : "🔊 Sound On"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="py-16 sm:py-20 bg-sky-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-green-700 mb-10 sm:mb-12">
            DhartiAmrit ke Fayde
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              "100% Chemical Free & Organic",
              "49 Jadibutiyon se bana",
              "Sabjiyon me keede nahi lagte",
              "Production aur quality badhata hai",
              "Mitti ki upjaau shakti badhata hai",
              "Trusted & Tested Product",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-t-4 border-orange-400 text-gray-800 text-lg"
              >
                ✔ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCT ================= */}
      <section id="product" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="flex justify-center">
            <img
              src={productImg}
              alt="DhartiAmrit Product"
              className="w-64 sm:w-80 md:w-96 max-w-full h-auto"
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-700">
              DhartiAmrit Organic Booster
            </h2>

            <p className="mt-5 text-base sm:text-lg text-gray-700">
              Ye product 49 prakritik jadibutiyon se milkar banaya gaya hai.
              Puri tarah chemical free.
            </p>

            <ul className="mt-6 space-y-3 text-left inline-block text-base sm:text-lg">
              <li>🌿 100% Organic</li>
              <li>🚫 No Chemicals</li>
              <li>🐛 Keede nahi lagte</li>
              <li>📈 Production badhta hai</li>
            </ul>

            <p className="mt-8 text-2xl sm:text-3xl font-bold text-orange-600">
              Price: ₹____ / Pack
            </p>

            <a
              href="#contact"
              className="inline-block mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-base sm:text-lg font-semibold transition-colors"
            >
              Buy Now
            </a>
          </div>
        </div>
      </section>

      {/* ================= 49 JADIBUTI INFO ================= */}
      <section className="py-16 sm:py-20 bg-green-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700">
            49 Organic Jadibutiyon se bana
          </h2>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            DhartiAmrit mitti ko jeevit karta hai, fasal ko majboot banata hai
            aur long-term fayda deta hai.
          </p>
        </div>
      </section>

      {/* ================= VIDEOS ================= */}
      <section className="py-16 sm:py-20 bg-sky-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-700 mb-10 sm:mb-12">
            Field Results & Demo Videos
          </h2>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Field Demo 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Field Demo 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
