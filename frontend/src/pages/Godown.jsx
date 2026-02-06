import { Warehouse, MapPin, IndianRupee, Users, Building2, Shield, Lock, Thermometer, Bug, DoorOpen, ClipboardList, TrendingUp } from "lucide-react";

const Godown = () => {
  const godowns = [
    { id: 1, name: "Secure Store Jaipur", location: "Jaipur, Rajasthan", capacity: "10000 MT", available: "6500 MT", monthlyRate: "₹4,500", securityFeatures: "CCTV + Security Guard", contact: "7 Day Rental", imageUrl: "https://images.unsplash.com/photo-1553790387-60d3498101a6?w=400&h=400&fit=crop" },
    { id: 2, name: "GrainHouse Indore", location: "Indore, Madhya Pradesh", capacity: "15000 MT", available: "8200 MT", monthlyRate: "₹5,200", securityFeatures: "CCTV + Perimeter Fence", contact: "Flexible Terms", imageUrl: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=400&h=400&fit=crop" },
    { id: 3, name: "StoragePro Ludhiana", location: "Ludhiana, Punjab", capacity: "12000 MT", available: "7800 MT", monthlyRate: "₹3,800", securityFeatures: "24/7 Security 360°", contact: "Bulk Discounts", imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop" },
    { id: 4, name: "VaultSpace Chennai", location: "Chennai, Tamil Nadu", capacity: "8000 MT", available: "3500 MT", monthlyRate: "₹4,200", securityFeatures: "CCTV + Insurance", contact: "1 Month Minimum", imageUrl: "https://images.unsplash.com/photo-1553790387-60d3498101a6?w=400&h=400&fit=crop" },
    { id: 5, name: "CropSafe Belgaum", location: "Belgaum, Karnataka", capacity: "11000 MT", available: "5600 MT", monthlyRate: "₹4,000", securityFeatures: "Armed Guard + CCTV", contact: "Pest Control", imageUrl: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=400&h=400&fit=crop" },
    { id: 6, name: "FarmStore Gujrat", location: "Gujrat, Gujarat", capacity: "9000 MT", available: "4200 MT", monthlyRate: "₹3,500", securityFeatures: "CCTV + Fire Safety", contact: "Door-to-Door", imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop" },
  ];

  const amenities = [
    { icon: Lock, title: "Secured Premises", desc: "High-tech security with armed personnel" },
    { icon: Thermometer, title: "Climate Monitoring", desc: "Regular temperature & humidity checks" },
    { icon: Bug, title: "Pest Control", desc: "Quarterly pest management services" },
    { icon: DoorOpen, title: "Easy Access", desc: "24/7 access to your stored goods" },
    { icon: ClipboardList, title: "Inventory Tracking", desc: "Real-time digital inventory system" },
    { icon: Warehouse, title: "Loading Services", desc: "Forklifts & loading equipment available" },
  ];

  const storageTypes = [
    { name: "Food Grains", price: "₹30-60/MT", products: "Rice, Wheat, Pulses, Maize" },
    { name: "Cash Crops", price: "₹40-80/MT", products: "Cotton, Sugarcane, Jute" },
    { name: "Oil Seeds", price: "₹50-100/MT", products: "Soybean, Mustard, Sunflower" },
    { name: "Spices & Dry Goods", price: "₹80-150/MT", products: "Turmeric, Chili, Cumin" },
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-12 mb-16">
          <h1 className="text-5xl font-bold mb-4">Godown & Warehouse Solutions</h1>
          <p className="text-xl font-light">Affordable agricultural warehousing with top-tier security and logistics support.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 text-center">
            <p className="text-4xl font-bold text-emerald-600">1,250+</p>
            <p className="text-slate-700 font-light mt-2">Active Warehouses</p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border-2 border-teal-200 text-center">
            <p className="text-4xl font-bold text-teal-600">50 MT</p>
            <p className="text-slate-700 font-light mt-2">Total Storage Capacity</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200 text-center">
            <p className="text-4xl font-bold text-cyan-600">₹3.5-5.5</p>
            <p className="text-slate-700 font-light mt-2">Average Monthly Rate/MT</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 text-center">
            <p className="text-4xl font-bold text-blue-600">98%</p>
            <p className="text-slate-700 font-light mt-2">Customer Satisfaction</p>
          </div>
        </div>

        {/* Godown Listings */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Available Godowns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {godowns.map((godown, idx) => (
              <div key={idx} className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-emerald-400 hover:shadow-xl transition-all hover:scale-105">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 h-28 overflow-hidden">
                  <img src={godown.imageUrl} alt={godown.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{godown.name}</h3>
                  <p className="text-sm text-slate-600 mb-4 flex items-center gap-1">
                    <MapPin size={16} /> {godown.location}
                  </p>

                  <div className="bg-slate-50 rounded-lg p-4 mb-4 space-y-2 text-sm">
                    <p><strong>Capacity:</strong> {godown.capacity}</p>
                    <p><strong>Available:</strong> <span className="text-green-600 font-bold">{godown.available}</span></p>
                    <p><strong>Monthly Rate:</strong> {godown.monthlyRate}</p>
                    <p><strong>Security:</strong> {godown.securityFeatures}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full inline-block">{godown.contact}</p>
                  </div>

                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Amenities */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Premium Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, idx) => (
              <div key={idx} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 hover:shadow-lg transition-all">
                <div className="inline-block bg-emerald-100 p-3 rounded-full mb-4">
                  <amenity.icon className="text-emerald-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{amenity.title}</h3>
                <p className="text-slate-600 font-light">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Storage Types & Pricing */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Storage Types & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storageTypes.map((type, idx) => (
              <div key={idx} className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 border-2 border-teal-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{type.name}</h3>
                  <span className="text-3xl font-bold text-emerald-600">{type.price}</span>
                </div>
                <p className="text-slate-700 font-light">
                  <strong>Suitable for:</strong> {type.products}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-12 border-2 border-emerald-200">
          <h2 className="text-4xl font-bold text-slate-900 mb-12">How to Book Your Godown</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1️⃣", title: "Search", desc: "Find godowns near your location" },
              { step: "2️⃣", title: "Compare", desc: "Check rates, capacity & security" },
              { step: "3️⃣", title: "Book", desc: "Reserve your space online" },
              { step: "4️⃣", title: "Store", desc: "Use 24/7 with full support" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center border-2 border-emerald-200">
                <div className="text-5xl mb-3">{item.step}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Godown;
