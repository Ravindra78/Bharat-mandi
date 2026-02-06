import { ShoppingCart, Star, MapPin, IndianRupee, ThumbsUp } from "lucide-react";

const Product = () => {
  const products = [
    { id: 1, name: "Premium Basmati Rice", category: "Grains", price: "₹450/kg", rating: 4.8, reviews: 324, seller: "Green Valley Farms", location: "Punjab", imageUrl: "https://images.unsplash.com/photo-1586080876281-4d62c4435fc0?w=400&h=400&fit=crop", inStock: true },
    { id: 2, name: "Fresh Organic Tomatoes", category: "Vegetables", price: "₹40/kg", rating: 4.6, reviews: 512, seller: "Farm Fresh Co", location: "Himachal Pradesh", imageUrl: "https://images.unsplash.com/photo-1592534106566-74f440642117?w=400&h=400&fit=crop", inStock: true },
    { id: 3, name: "Organic Wheat Flour", category: "Grains", price: "₹25/kg", rating: 4.9, reviews: 890, seller: "Golden Grain", location: "Madhya Pradesh", imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop", inStock: true },
    { id: 4, name: "Fresh Green Vegetables Mix", category: "Vegetables", price: "₹80/kg", rating: 4.5, reviews: 267, seller: "Agro Harvest", location: "Karnataka", imageUrl: "https://images.unsplash.com/photo-1566028588640-f7f75c57cff5?w=400&h=400&fit=crop", inStock: true },
    { id: 5, name: "Desi Ghee 500ml", category: "Dairy", price: "₹800/pack", rating: 4.7, reviews: 456, seller: "Pure Dairy", location: "Rajasthan", imageUrl: "https://images.unsplash.com/photo-1452895917063-39bfab34e5a4?w=400&h=400&fit=crop", inStock: true },
    { id: 6, name: "Cotton Seeds (Premium)", category: "Seeds", price: "₹1,200/20kg", rating: 4.6, reviews: 342, seller: "Seed House", location: "Andhra Pradesh", imageUrl: "https://images.unsplash.com/photo-1574856692162-ec169dec9f39?w=400&h=400&fit=crop", inStock: true },
    { id: 7, name: "Natural Honey 1kg", category: "Organic", price: "₹350/kg", rating: 4.9, reviews: 678, seller: "Beekeepers Guild", location: "Uttarakhand", imageUrl: "https://images.unsplash.com/photo-1587049141825-4f1d1d5a6fc1?w=400&h=400&fit=crop", inStock: true },
    { id: 8, name: "Organic Turmeric Powder", category: "Spices", price: "₹180/kg", rating: 4.8, reviews: 521, seller: "Spice Masters", location: "Telangana", imageUrl: "https://images.unsplash.com/photo-1596040306935-0e4f85d7da4f?w=400&h=400&fit=crop", inStock: true },
    { id: 9, name: "Fresh Onions 50kg", category: "Vegetables", price: "₹35/kg", rating: 4.4, reviews: 189, seller: "Bulk Harvest", location: "Gujarat", imageUrl: "https://images.unsplash.com/photo-1456614174391-254bc158fbb8?w=400&h=400&fit=crop", inStock: true },
    { id: 10, name: "Premium Mustard Oil", category: "Oils", price: "₹120/liter", rating: 4.7, reviews: 412, seller: "Oil Pressers", location: "West Bengal", imageUrl: "https://images.unsplash.com/photo-1587822891440-90869b4a7922?w=400&h=400&fit=crop", inStock: true },
    { id: 11, name: "Sugarcane Juice Fresh", category: "Beverages", price: "₹50/liter", rating: 4.5, reviews: 298, seller: "Sugar Fresh", location: "Maharashtra", imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", inStock: true },
    { id: 12, name: "Organic Pulses Mix", category: "Grains", price: "₹140/kg", rating: 4.8, reviews: 356, seller: "Dal House", location: "Uttar Pradesh", imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop", inStock: true },
  ];

  const categories = [
    { name: "All Products", count: 12 },
    { name: "Grains", count: 4 },
    { name: "Vegetables", count: 3 },
    { name: "Dairy", count: 1 },
    { name: "Spices", count: 1 },
    { name: "Organic", count: 1 },
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl p-12 mb-16">
          <h1 className="text-5xl font-bold mb-4">Agricultural Products Marketplace</h1>
          <p className="text-xl font-light">Fresh, organic farm products directly from farmers to your doorstep</p>
        </div>

        {/* Category Filter */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <button key={idx} className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-4 hover:border-teal-400 hover:shadow-lg transition-all text-center">
                <p className="font-bold text-slate-900">{cat.name}</p>
                <p className="text-sm text-slate-600 font-light">{cat.count} items</p>
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section>
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-teal-400 hover:shadow-xl transition-all hover:scale-105">
                {/* Product Image */}
                <div className="h-48 overflow-hidden bg-gradient-to-br from-teal-50 to-cyan-50">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-2">{product.category}</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2">{product.name}</h3>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold text-slate-900">{product.rating}</span>
                    </div>
                    <span className="text-xs text-slate-600">({product.reviews} reviews)</span>
                  </div>

                  {/* Seller Info */}
                  <p className="text-sm text-slate-600 mb-2"><strong>{product.seller}</strong></p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                    <MapPin size={14} /> {product.location}
                  </p>

                  {/* Price & Stock */}
                  <div className="bg-slate-50 rounded-lg p-3 mb-4">
                    <p className="text-2xl font-bold text-teal-600">{product.price}</p>
                    <p className={`text-xs font-semibold mt-1 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? '✓ In Stock' : 'Out of Stock'}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group">
                    <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-12 border-2 border-teal-200 mt-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Didn't find what you're looking for?</h2>
          <p className="text-slate-600 font-light mb-6">Browse our complete marketplace or connect directly with farmers for custom orders</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
              Connect with Sellers
            </button>
            <button className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3 rounded-lg font-semibold transition-all">
              View All Products
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;
