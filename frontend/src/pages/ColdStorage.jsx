import {
  SnowflakeIcon,
  MapPin,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const ColdStorage = () => {
  const facilities = [
    {
      id: 1,
      name: "ChillZone Mumbai",
      location: "Mumbai, Maharashtra",
      temp: "-18°C",
      capacity: "5000 MT",
      available: "2350 MT",
      pricePerDay: "₹15/MT",
      rating: 4.9,
      imageUrl:
        "https://content.jdmagicbox.com/comp/def_content/cold-storage-services/ssnnvcjtoz-cold-storage-services-9-k5zm2-250.jpg",
    },
    {
      id: 2,
      name: "FrostHouse Delhi",
      location: "Delhi, NCR",
      temp: "-20°C",
      capacity: "8000 MT",
      available: "4200 MT",
      pricePerDay: "₹12/MT",
      rating: 4.8,
      imageUrl:
        "https://5.imimg.com/data5/SELLER/Default/2021/2/HW/OP/JD/36458554/warehousing-500x500.jpg",
    },
    {
      id: 3,
      name: "IceVault Bangalore",
      location: "Bangalore, Karnataka",
      temp: "-15°C",
      capacity: "6000 MT",
      available: "1800 MT",
      pricePerDay: "₹18/MT",
      rating: 4.7,
      imageUrl:
        "https://5.imimg.com/data5/SELLER/Default/2021/2/HW/OP/JD/36458554/warehousing-500x500.jpg",
    },
    {
      id: 4,
      name: "ColdChain Pune",
      location: "Pune, Maharashtra",
      temp: "-20°C",
      capacity: "4500 MT",
      available: "3200 MT",
      pricePerDay: "₹14/MT",
      rating: 4.6,
      imageUrl:
        "https://content.jdmagicbox.com/comp/pune/j9/020pxx20.xx20.190330190232.n1j9/catalogue/coldrush-logistics-chakan-pune-cold-storage-services-1rzpko04wm.jpg?clr=",
    },
  ];

  const features = [
    {
      icon: "🌡️",
      title: "Temperature Control",
      desc: "Precise climate control from -5°C to -25°C",
    },
    {
      icon: "📦",
      title: "Flexible Spaces",
      desc: "Individual compartments for different products",
    },
    {
      icon: "📊",
      title: "Real-time Tracking",
      desc: "Monitor your stock online 24/7",
    },
    {
      icon: "🔒",
      title: "Security",
      desc: "CCTV surveillance and insurance coverage",
    },
    {
      icon: "🚚",
      title: "Logistics Support",
      desc: "Pickup and delivery services available",
    },
    {
      icon: "📋",
      title: "Documentation",
      desc: "Complete quality certificates provided",
    },
  ];

  const products = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat & Fish",
    "Processed Foods",
    "Pharmaceuticals",
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-12 mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Cold Storage & Godown Solutions
          </h1>
          <p className="text-xl font-light">
            Find verified cold storage facilities. Secure storage for your
            perishable produce.
          </p>
        </div>

        {/* Facilities */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Available Cold Storage Facilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 h-32 overflow-hidden">
                  <img
                    src={facility.imageUrl}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {facility.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 font-light flex items-center gap-1">
                    <MapPin size={16} /> {facility.location}
                  </p>

                  <div className="bg-slate-50 rounded-lg p-4 mb-4 space-y-2">
                    <p className="text-sm">
                      <strong>🌡️ Temperature:</strong> {facility.temp}
                    </p>
                    <p className="text-sm">
                      <strong>📦 Capacity:</strong> {facility.capacity}
                    </p>
                    <p className="text-sm">
                      <strong>✅ Available:</strong>{" "}
                      <span className="text-green-600 font-bold">
                        {facility.available}
                      </span>
                    </p>
                    <p className="text-sm">
                      <strong>💰 Rate:</strong> {facility.pricePerDay}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm">⭐ {facility.rating}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Verified
                    </span>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all">
                    Book Space
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compatible Products */}
        <section className="mb-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-12 border-2 border-blue-200">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Suitable for These Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-4 text-center border-2 border-blue-200 hover:border-blue-600 transition-all"
              >
                <p className="font-semibold text-slate-900">{product}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Info */}
        <section className="bg-white rounded-2xl border-2 border-slate-200 p-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Pricing Structure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Weekly Storage
              </h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                ₹80-110/MT
              </p>
              <ul className="space-y-2 text-sm text-slate-700 font-light">
                <li>✓ 7 days storage included</li>
                <li>✓ Daily monitoring</li>
                <li>✓ Humidity control</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-8 border-2 border-cyan-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Monthly Storage
              </h3>
              <p className="text-4xl font-bold text-cyan-600 mb-4">
                ₹300-450/MT
              </p>
              <ul className="space-y-2 text-sm text-slate-700 font-light">
                <li>✓ 30 days storage included</li>
                <li>✓ Premium monitoring</li>
                <li>✓ Flexible checkout</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Bulk Storage
              </h3>
              <p className="text-4xl font-bold text-teal-600 mb-4">
                Custom Quotes
              </p>
              <ul className="space-y-2 text-sm text-slate-700 font-light">
                <li>✓ Large volume discounts</li>
                <li>✓ Dedicated space</li>
                <li>✓ Logistics support</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ColdStorage;
