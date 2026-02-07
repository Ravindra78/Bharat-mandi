import {
  Wrench,
  Zap,
  Settings,
  TrendingUp,
  Shield,
  BookOpen,
  Truck,
} from "lucide-react";

const Equipment = () => {
  const equipment = [
    {
      id: 1,
      name: "Tractors (40 HP)",
      price: "₹7,50,000",
      category: "Heavy Machinery",
      rating: 4.8,
      sellers: 45,
      imageUrl:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop",
      inStock: 23,
    },
    {
      id: 2,
      name: "Harvesters",
      price: "₹12,50,000",
      category: "Heavy Machinery",
      rating: 4.9,
      sellers: 32,
      imageUrl:
        "https://blog.machinefinder.com/wp-content/uploads/2019/07/tseries-combine-r2C001197-1024x576.jpg",
      inStock: 15,
    },
    {
      id: 3,
      name: "Water Pump Sets",
      price: "₹45,000",
      category: "Irrigation",
      rating: 4.7,
      sellers: 120,
      imageUrl:
        "https://www.walkerpump.com/wp-content/uploads/2024/01/Meet-The-Must-Have-Tool-For-Irrigation-Centrifugal-Water-Pump.jpg",
      inStock: 180,
    },
    {
      id: 4,
      name: "Drip Irrigation System",
      price: "₹2,50,000",
      category: "Irrigation",
      rating: 4.8,
      sellers: 78,
      imageUrl: "https://i.cdn.newsbytesapp.com/images/l29020250221134502.jpeg",
      inStock: 65,
    },
    {
      id: 5,
      name: "Seed Drill Machine",
      price: "₹1,25,000",
      category: "Seeding",
      rating: 4.6,
      sellers: 56,
      imageUrl:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop",
      inStock: 42,
    },
    {
      id: 6,
      name: "Spraying Equipment",
      price: "₹8,500",
      category: "Protection",
      rating: 4.5,
      sellers: 200,
      imageUrl:
        "https://5.imimg.com/data5/FR/WL/MY-19066629/agriculture-spray-machine.jpg",
      inStock: 350,
    },
    {
      id: 7,
      name: "Rotavator",
      price: "₹95,000",
      category: "Soil Preparation",
      rating: 4.7,
      sellers: 67,
      imageUrl:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop",
      inStock: 38,
    },
    {
      id: 8,
      name: "Thresher Machine",
      price: "₹3,25,000",
      category: "Harvesting",
      rating: 4.8,
      sellers: 43,
      imageUrl: "https://i.ytimg.com/vi/lJbzPqYQ8y0/maxresdefault.jpg",
      inStock: 28,
    },
  ];

  const categories = [
    "All",
    "Heavy Machinery",
    "Irrigation",
    "Seeding",
    "Protection",
    "Soil Preparation",
    "Harvesting",
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-2xl p-12 mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Agricultural Equipment Marketplace
          </h1>
          <p className="text-xl font-light">
            Buy, sell, and rent quality farming equipment. New and used
            machinery available.
          </p>
        </div>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Browse by Equipment Type
          </h2>
          <div className="flex overflow-x-auto gap-3 pb-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${idx === 0 ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Equipment Grid */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Available Equipment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-orange-400 hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 h-40 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-3xl font-bold text-orange-600 mb-3">
                    {item.price}
                  </p>

                  <div className="space-y-2 text-sm mb-4 bg-slate-50 rounded-lg p-3">
                    <p>
                      <strong>⭐ Rating:</strong> {item.rating} ({item.sellers}{" "}
                      sellers)
                    </p>
                    <p>
                      <strong>📦 Stock:</strong> {item.inStock} units available
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-all">
                      Buy
                    </button>
                    <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 py-2 rounded-lg font-semibold transition-all">
                      Rent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-12 border-2 border-orange-200">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Equipment Support Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="inline-block bg-orange-100 p-4 rounded-full mb-4">
                <Wrench className="text-orange-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Repair & Maintenance
              </h3>
              <p className="text-slate-600 font-light">
                Expert technicians available in your region for equipment
                repairs and maintenance
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="inline-block bg-orange-100 p-4 rounded-full mb-4">
                <BookOpen className="text-orange-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Training & Support
              </h3>
              <p className="text-slate-600 font-light">
                Free training and manuals to operate equipment safely and
                efficiently
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="inline-block bg-orange-100 p-4 rounded-full mb-4">
                <Truck className="text-orange-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Delivery & Setup
              </h3>
              <p className="text-slate-600 font-light">
                Free delivery and on-site installation by certified technicians
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Equipment;
