import { useState } from "react";
import { Filter, RotateCcw } from "lucide-react";

const ProductsPage = () => {
  const [sortBy, setSortBy] = useState("popular");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "vegetables", label: "Vegetables" },
    { id: "fruits", label: "Fruits" },
    { id: "grains", label: "Grains" },
    { id: "dairy", label: "Dairy" },
    { id: "spices", label: "Spices" },
  ];

  const allProducts = [
    { id: 1, name: "Fresh Tomatoes", price: 40, category: "vegetables", rating: 4.8, image: "https://images.unsplash.com/photo-1592534106566-74f440642117?w=200&h=200&fit=crop" },
    { id: 2, name: "Organic Wheat", price: 50, category: "grains", rating: 4.9, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=200&h=200&fit=crop" },
    { id: 3, name: "Farm Fresh Milk", price: 45, category: "dairy", rating: 4.7, image: "https://images.unsplash.com/photo-1452895917063-39bfab34e5a4?w=200&h=200&fit=crop" },
    { id: 4, name: "Spiced Honey", price: 300, category: "spices", rating: 4.9, image: "https://images.unsplash.com/photo-1587822891440-90869b4a7922?w=200&h=200&fit=crop" },
    { id: 5, name: "Green Apples", price: 60, category: "fruits", rating: 4.6, image: "https://images.unsplash.com/photo-1560806e614371-d89f5b7fbed7?w=200&h=200&fit=crop" },
    { id: 6, name: "Cucumber", price: 30, category: "vegetables", rating: 4.5, image: "https://images.unsplash.com/photo-1566028588640-f7f75c57cff5?w=200&h=200&fit=crop" },
    { id: 7, name: "Organic Rice", price: 45, category: "grains", rating: 4.8, image: "https://images.unsplash.com/photo-1586080876281-4d62c4435fc0?w=200&h=200&fit=crop" },
    { id: 8, name: "Fresh Banana", price: 50, category: "fruits", rating: 4.6, image: "https://images.unsplash.com/photo-1587822891440-90869b4a7922?w=200&h=200&fit=crop" },
    { id: 9, name: "Chilli Powder", price: 150, category: "spices", rating: 4.9, image: "https://images.unsplash.com/photo-1596040306935-0e4f85d7da4f?w=200&h=200&fit=crop" },
    { id: 10, name: "Carrot", price: 35, category: "vegetables", rating: 4.7, image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&h=200&fit=crop" },
    { id: 11, name: "Orange Juice", price: 80, category: "fruits", rating: 4.6, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop" },
    { id: 12, name: "Turmeric", price: 180, category: "spices", rating: 4.8, image: "https://images.unsplash.com/photo-1596040306935-0e4f85d7da4f?w=200&h=200&fit=crop" },
  ];

  const getFilteredProducts = () => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-slate-900">Products</h1>
        <p className="text-slate-600 mb-8 font-light">
          Browse our collection of fresh, organic agricultural products
        </p>

        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-md sticky top-20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg text-slate-900">Filters</h3>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 100]);
                  }}
                  className="text-sm text-teal-600 flex items-center gap-1 hover:text-teal-700 hover:scale-110 transition-transform duration-300"
                >
                  <RotateCcw size={16} /> Reset
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-slate-900">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 cursor-pointer group hover:translate-x-1 transition-transform duration-300"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={selectedCategory === cat.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="cursor-pointer accent-teal-500"
                      />
                      <span className="text-slate-700 font-light">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold mb-3 text-slate-900">Price Range</h4>
                <div className="flex gap-2 mb-3">
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-full border border-slate-300 rounded-lg px-2 py-2 text-slate-700 focus:border-teal-500 focus:outline-none transition-colors duration-300"
                  />
                  <span className="self-center text-slate-600">-</span>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full border border-slate-300 rounded-lg px-2 py-2 text-slate-700 focus:border-teal-500 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <p className="text-sm text-slate-600 font-light">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow hover:bg-slate-50 transition-colors duration-300"
              >
                <Filter size={20} /> Filters
              </button>
            </div>

            {/* Mobile Filter Panel */}
            {filterOpen && (
              <div className="lg:hidden bg-white border border-slate-200 p-4 rounded-lg shadow mb-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-700 focus:border-teal-500 focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Sort Bar */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-600 font-light">
                Showing {filteredProducts.length} products
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-slate-300 rounded-lg px-4 py-2 text-slate-700 focus:border-teal-500 focus:outline-none transition-colors duration-300"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                  style={{ transitionDelay: `${(index % 3) * 50}ms` }}
                >
                  <div className="bg-gradient-to-br from-slate-100 to-slate-50 h-48 overflow-hidden hover:scale-110 transition-transform duration-300">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-slate-900">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-teal-600 font-bold text-xl">
                        ₹{product.price}
                      </span>
                      <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded-lg text-sm font-medium border border-amber-200">
                        ⭐ {product.rating}
                      </span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-2 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 font-medium hover:shadow-md hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg font-light">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
