import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Truck,
  Users,
  Shield,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Market trends and pricing
  const trendingCrops = [
    {
      id: 1,
      name: "Tomato",
      price: 40,
      pastPrice: 45,
      change: "-11%",
      demand: "High",
      qty: "₹/kg",
      imageUrl:
        "https://media.istockphoto.com/id/140453734/photo/fresh-tomatoes.jpg?s=612x612&w=0&k=20&c=b6XySPuRKF6opBf0bexh9AhkWck-c7TaoJvRdVNBgT0=",
      region: "Maharashtra",
      farmer: "Rajesh Patil",
    },
    {
      id: 2,
      name: "Onion",
      price: 35,
      pastPrice: 40,
      change: "-12%",
      demand: "Very High",
      qty: "₹/kg",
      imageUrl:
        "https://www.jiomart.com/images/product/original/590002741/onion-1-kg-pack-product-images-o590002741-p590002741-1-202410141700.jpg?im=Resize=(1000,1000)",
      region: "Gujarat",
      farmer: "Amit Singh",
    },
    {
      id: 3,
      name: "Wheat",
      price: 55,
      pastPrice: 52,
      change: "+5%",
      demand: "Medium",
      qty: "₹/kg",
      imageUrl:
        "https://thejuniorage.com/wp-content/uploads/2024/02/The-Demands-Of-The-Farmers-1024x669.jpg",
      region: "Punjab",
      farmer: "Harjit Kaur",
    },
    {
      id: 4,
      name: "Cotton",
      price: 6500,
      pastPrice: 6200,
      change: "+4%",
      demand: "High",
      qty: "₹/bale",
      imageUrl:
        "https://www.orfonline.org/public/uploads/posts/image/cotton-production.jpg",
      region: "Karnataka",
      farmer: "Suresh Kumar",
    },
  ];

  const farmerStats = [
    { label: "Connected Farmers", value: "15K+", icon: "Users" },
    { label: "Daily Transactions", value: "2,500+", icon: "DollarSign" },
    { label: "Active Buyers", value: "60K+", icon: "Users" },
    { label: "Crop Varieties", value: "500+", icon: "Leaf" },
  ];

  const categories = [
    {
      name: "Vegetables",
      count: "2,450+",
      imageUrl:
        "https://media.istockphoto.com/id/1203599923/photo/food-background-with-assortment-of-fresh-organic-vegetables.jpg?s=612x612&w=0&k=20&c=DZy1JMfUBkllwiq1Fm_LXtxA4DMDnExuF40jD8u9Z0Q=",
      color: "from-green-50 to-emerald-50",
    },
    {
      name: "Grains & Pulses",
      count: "1,890+",
      imageUrl:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop",
      color: "from-amber-50 to-yellow-50",
    },
    {
      name: "Fruits",
      count: "1,230+",
      imageUrl:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
      color: "from-red-50 to-pink-50",
    },
    {
      name: "Spices",
      count: "680+",
      imageUrl:
        "https://www.viralspices.com/wp-content/uploads/2018/07/Spices.jpg",
      color: "from-orange-50 to-red-50",
    },
    {
      name: "Dairy & Eggs",
      count: "520+",
      imageUrl:
        "https://media.meer.com/attachments/e93e9eb9c2850d7ffe69d0383ed27baf224eafd3/store/fill/690/388/35defd11ef8de6b2a0af60645188fd44f1fdcc1e7ed397421e56f58cd7c7/Eggs-milk-and-cheese.jpg",
      color: "from-blue-50 to-cyan-50",
    },
    {
      name: "Seeds & Plants",
      count: "340+",
      imageUrl:
        "https://thumbs.dreamstime.com/b/agriculture-plant-seeding-growing-step-concept-garden-su-agriculture-plant-seeding-growing-step-concept-garden-99609915.jpg",
      color: "from-teal-50 to-green-50",
    },
  ];

  const featuredFarmers = [
    {
      id: 1,
      name: "Rajesh Patil",
      crops: "Tomato, Onion, Pepper",
      rating: 4.9,
      sales: "2.5K+",
      state: "Maharashtra",
      badge: "Top Seller",
      imageUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Harjit Kaur",
      crops: "Wheat, Rice, Maize",
      rating: 4.8,
      sales: "1.8K+",
      state: "Punjab",
      badge: "Certified",
      imageUrl:
        "https://www.cimmyt.org/content/uploads/2019/08/072477a0-28ef-42cf-98e1-bf26389a5064-Photo-from-Daksin.jpg",
    },
    {
      id: 3,
      name: "Suresh Kumar",
      crops: "Cotton, Sugarcane, Corn",
      rating: 4.7,
      sales: "1.5K+",
      state: "Karnataka",
      badge: "Trusted",
      imageUrl:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop",
    },
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: "Direct Connection",
      desc: "No middlemen, connect directly with farmers",
    },
    {
      icon: Truck,
      title: "Fast Logistics",
      desc: "Bulk delivery within 2-3 days across states",
    },
    {
      icon: TrendingUp,
      title: "Live Market Rates",
      desc: "Real-time pricing based on market demand",
    },
    {
      icon: Shield,
      title: "Verified Farmers",
      desc: "All sellers are verified and certified",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Mandi Style */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div
            className={`transform transition-all duration-1000 ${isVisible ? "opacity-100 -translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-teal-500/20 border border-teal-400 rounded-full px-4 py-2 mb-4">
                  <span className="text-sm font-semibold text-teal-200">
                    🌍 India's #1 Agri Marketplace
                  </span>
                </div>
                <h1 className="text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Real Mandi Prices
                  </span>
                  <br />
                  <span className="text-white">Direct from Farmers</span>
                </h1>
                <p className="text-xl text-slate-300 mb-8 font-light">
                  No middlemen. No markup. Just fair prices and fresh
                  agricultural products delivered to your door. Connecting 15K+
                  farmers with 60K+ buyers across India.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => navigate("/products")}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    Shop Now <ArrowRight size={20} />
                  </button>
                  <button
                    onClick={() => navigate("/services")}
                    className="border-2 border-teal-400 text-teal-300 px-8 py-4 rounded-xl font-semibold hover:bg-teal-500/20 transition-all duration-300"
                  >
                    Become a Seller
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Stats Bar */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {farmerStats.map((stat, idx) => (
              <div
                key={idx}
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-teal-100 text-sm font-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Prices - Live Market Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <BarChart3 className="text-teal-600" size={32} />
            <div>
              <h2 className="text-4xl font-bold text-slate-900">
                Live Market Rates
              </h2>
              <p className="text-slate-600 text-sm font-light">
                Today's trending crops and prices
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCrops.map((crop, idx) => (
              <div
                key={crop.id}
                className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-teal-400 hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${crop.change.includes("-") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {crop.change}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {crop.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-light">
                  {crop.region}
                </p>

                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 mb-4">
                  <p className="text-3xl font-bold text-teal-600 mb-1">
                    {crop.price}
                  </p>
                  <p className="text-xs text-slate-600">
                    per {crop.qty.split("/")[1]}
                  </p>
                </div>

                <div className="flex justify-between text-xs mb-4">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    Demand: <strong>{crop.demand}</strong>
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-light mb-3">
                  Seller: {crop.farmer}
                </p>
                <button
                  onClick={() => navigate(`/product/${crop.id}`)}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition-all duration-300 hover:scale-105 font-semibold text-sm"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => navigate("/products")}
                className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:scale-110 transition-all duration-300 text-center group overflow-hidden`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="w-20 h-20 mx-auto mb-3 rounded-lg overflow-hidden">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 font-light">
                  {cat.count} products
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Farmers */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Top Farmers This Week
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredFarmers.map((farmer, idx) => (
              <div
                key={farmer.id}
                className="bg-white rounded-2xl border-2 border-slate-200 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-teal-400"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-teal-200">
                    <img
                      src={farmer.imageUrl}
                      alt={farmer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-bold border border-teal-300">
                    ✓ {farmer.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {farmer.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4 font-light">
                  {farmer.state}
                </p>
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <p className="text-xs text-slate-600 mb-2 font-light">
                    Specializes in:
                  </p>
                  <p className="font-semibold text-slate-900">{farmer.crops}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm">
                    <strong>⭐ {farmer.rating}</strong> rating
                  </span>
                  <span className="text-sm text-slate-600 font-light">
                    {farmer.sales} sales
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold text-sm">
                  View Products
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Why Choose Bharat Mandi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="inline-block bg-teal-100 p-4 rounded-2xl mb-4">
                    <Icon className="text-teal-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 font-light">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Join India's Largest Agri Network
          </h2>
          <p className="text-xl text-teal-100 mb-8 font-light max-w-2xl mx-auto">
            Whether you're a farmer looking to sell directly or a buyer seeking
            fresh produce at real mandi prices
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/products")}
              className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:scale-105"
            >
              Start Shopping
            </button>
            <button
              onClick={() => navigate("/services")}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Become a Seller
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
