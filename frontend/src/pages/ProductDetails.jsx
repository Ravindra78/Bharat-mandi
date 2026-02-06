import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MapPin, ShoppingCart, Star } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = [
    { id: "1", name: "Tomato", price: 40, unit: "₹/kg", imageUrl: "https://images.unsplash.com/photo-1592534106566-74f440642117?w=800&h=600&fit=crop", seller: "Rajesh Patil", location: "Maharashtra", description: "Fresh field-ripened tomatoes. Ideal for sauces and fresh market.", rating: 4.8, stock: 120 },
    { id: "2", name: "Onion", price: 35, unit: "₹/kg", imageUrl: "https://images.unsplash.com/photo-1599599810694-b3e63ca5fbb3?w=800&h=600&fit=crop", seller: "Amit Singh", location: "Gujarat", description: "Crisp onions with good storage life. High pungency for cooking.", rating: 4.6, stock: 200 },
    { id: "3", name: "Wheat", price: 55, unit: "₹/kg", imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop", seller: "Harjit Kaur", location: "Punjab", description: "Premium wheat, cleaned and graded for quality.", rating: 4.7, stock: 500 },
    { id: "4", name: "Cotton", price: 6500, unit: "₹/bale", imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop", seller: "Suresh Kumar", location: "Karnataka", description: "Ginned cotton bales, moisture-tested and stored properly.", rating: 4.5, stock: 40 },
  ];

  const product = products.find((p) => p.id === id) || products[0];
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <button onClick={() => navigate(-1)} className="text-teal-600 mb-6">← Back</button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full h-96 overflow-hidden rounded-2xl border border-slate-200">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
            <p className="text-sm text-slate-600 mb-4 flex items-center gap-2"><MapPin size={14} /> {product.location} • Seller: <strong className="text-slate-900 ml-1">{product.seller}</strong></p>

            <div className="flex items-center gap-4 mb-6">
              <p className="text-4xl font-bold text-teal-600">{product.price} <span className="text-sm text-slate-600">{product.unit}</span></p>
              <div className="flex items-center gap-1 text-sm text-slate-700">
                <Star size={16} className="text-yellow-400" /> <strong>{product.rating}</strong>
              </div>
            </div>

            <p className="text-slate-700 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-slate-50 rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2">-</button>
                <div className="px-6 py-2 font-semibold">{qty}</div>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-2">+</button>
              </div>

              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>

            <div className="text-sm text-slate-600">Stock available: <strong className="text-slate-900">{product.stock}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
