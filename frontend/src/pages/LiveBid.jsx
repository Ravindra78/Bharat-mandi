import { BarChart3, Clock, Users, TrendingUp, Hammer, DollarSign } from "lucide-react";

const LiveBid = () => {
  const activeBids = [
    { id: 1, item: "Organic Tomatoes (20 quintals)", startPrice: 35, currentBid: 42, bids: 12, endTime: "2h 15m", seller: "Rajesh Patil", imageUrl: "https://images.unsplash.com/photo-1592534106566-74f440642117?w=400&h=400&fit=crop" },
    { id: 2, item: "Wheat (50 quintals)", startPrice: 48, currentBid: 56, bids: 8, endTime: "45m", seller: "Harjit Kaur", imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop" },
    { id: 3, item: "Cotton Bales (100)", startPrice: 6200, currentBid: 6850, bids: 15, endTime: "3h 30m", seller: "Suresh Kumar", imageUrl: "https://images.unsplash.com/photo-1585707734119-516ddecf1e90?w=400&h=400&fit=crop" },
    { id: 4, item: "Coconut Bunch (500)", startPrice: 12000, currentBid: 15500, bids: 10, endTime: "1h 20m", seller: "Krishnan", imageUrl: "https://images.unsplash.com/photo-1599599810694-b3e63ca5fbb3?w=400&h=400&fit=crop" },
    { id: 5, item: "Groundnut (30 quintals)", startPrice: 5500, currentBid: 6100, bids: 7, endTime: "55m", seller: "Prakash", imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop" },
    { id: 6, item: "Sugarcane (40 quintals)", startPrice: 3200, currentBid: 3750, bids: 11, endTime: "2h 45m", seller: "Vikram Singh", imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=400&h=400&fit=crop" },
  ];

  const pastBids = [
    { item: "Rice (25 quintals)", finalPrice: 2250, soldTo: "Bharat Traders", profit: "+8%" },
    { item: "Mango (10 quintals)", finalPrice: 15000, soldTo: "Fresh Produce Ltd", profit: "+12%" },
    { item: "Spices Mix (5 quintals)", finalPrice: 45000, soldTo: "Masala Corp", profit: "+15%" },
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl p-12 mb-16">
          <h1 className="text-5xl font-bold mb-4">Live Agricultural Auction</h1>
          <p className="text-xl font-light">Buy direct from farmers in real-time auctions. Best prices guaranteed!</p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200">
            <div className="inline-block bg-red-100 p-3 rounded-full mb-3">
              <Hammer className="text-red-600" size={24} />
            </div>
            <p className="text-sm text-slate-600 font-light">Active Auctions</p>
            <p className="text-3xl font-bold text-red-600">24</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="inline-block bg-purple-100 p-3 rounded-full mb-3">
              <Users className="text-purple-600" size={24} />
            </div>
            <p className="text-sm text-slate-600 font-light">Active Bidders</p>
            <p className="text-3xl font-bold text-purple-600">450+</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200">
            <div className="inline-block bg-orange-100 p-3 rounded-full mb-3">
              <DollarSign className="text-orange-600" size={24} />
            </div>
            <p className="text-sm text-slate-600 font-light">Daily Volume</p>
            <p className="text-3xl font-bold text-orange-600">₹2.5Cr</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
            <div className="inline-block bg-yellow-100 p-3 rounded-full mb-3">
              <TrendingUp className="text-yellow-600" size={24} />
            </div>
            <p className="text-sm text-slate-600 font-light">Avg Price Gain</p>
            <p className="text-3xl font-bold text-yellow-600">+12%</p>
          </div>
        </section>

        {/* Active Auctions */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Active Auctions Right Now</h2>
          <div className="space-y-4">
            {activeBids.map((bid, idx) => (
              <div key={idx} className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-red-400 hover:shadow-lg transition-all hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <img src={bid.imageUrl} alt={bid.item} className="w-20 h-20 rounded-lg object-cover" />
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{bid.item}</h3>
                      <p className="text-sm text-slate-600 font-light">Seller: {bid.seller}</p>
                    </div>
                  </div>
                  <div className="bg-red-100 border-2 border-red-400 rounded-lg px-4 py-2 flex items-center gap-2">
                    <Clock size={20} className="text-red-600" />
                    <span className="font-bold text-red-600">{bid.endTime} left</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 mb-4 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 font-light mb-1">Starting Price</p>
                    <p className="text-2xl font-bold text-slate-900">₹{bid.startPrice}</p>
                  </div>
                  <div className="border-l-2 border-r-2 border-slate-300 pl-4 pr-4">
                    <p className="text-xs text-slate-600 font-light mb-1">Current Bid</p>
                    <p className="text-3xl font-bold text-red-600">₹{bid.currentBid}</p>
                    <p className="text-xs text-green-600 font-semibold mt-1">+{((bid.currentBid - bid.startPrice) / bid.startPrice * 100).toFixed(1)}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600 font-light mb-1">Total Bids</p>
                    <p className="text-2xl font-bold text-slate-900">{bid.bids}</p>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all hover:scale-105">
                  Place Bid Now • ₹{bid.currentBid}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Completed Auctions */}
        <section>
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Recently Completed Auctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastBids.map((bid, idx) => (
              <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{bid.item}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-600 font-light">Final Price</p>
                    <p className="text-3xl font-bold text-green-600">₹{bid.finalPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-light">Sold to</p>
                    <p className="font-semibold text-slate-900">{bid.soldTo}</p>
                  </div>
                  <div className="bg-green-100 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-green-700">{bid.profit} profit vs starting bid</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LiveBid;
