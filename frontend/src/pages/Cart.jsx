import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Fresh Tomatoes", price: 40, quantity: 2, image: "https://images.unsplash.com/photo-1592534106566-74f440642117?w=200&h=200&fit=crop" },
    { id: 2, name: "Organic Wheat", price: 50, quantity: 1, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=200&h=200&fit=crop" },
    { id: 3, name: "Farm Fresh Milk", price: 45, quantity: 3, image: "https://images.unsplash.com/photo-1452895917063-39bfab34e5a4?w=200&h=200&fit=crop" },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax - discount;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode === "SAVE10") {
      setDiscount(Math.round(subtotal * 0.1));
      alert("Promo code applied! 10% discount");
    } else if (promoCode === "FARM50") {
      setDiscount(50);
      alert("Promo code applied! ₹50 off");
    } else {
      alert("Invalid promo code");
      setDiscount(0);
    }
    setPromoCode("");
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          to="/products"
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 hover:scale-105 transition-transform duration-300 font-light"
        >
          <ArrowLeft size={20} /> Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-slate-900">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-12 text-center">
            <p className="text-2xl font-semibold mb-4 text-slate-900">Your cart is empty</p>
            <p className="text-slate-600 mb-6 font-light">
              Add some products to get started!
            </p>
            <Link
              to="/products"
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-6 border-b border-slate-200 last:border-b-0 items-start hover:bg-slate-50 transition-colors duration-300"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {/* Image */}
                    <div className="bg-gradient-to-br from-slate-100 to-slate-50 w-20 h-20 rounded-lg flex-shrink-0 shadow-md overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-slate-900">{item.name}</h3>
                      <p className="text-teal-600 font-bold text-lg">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-slate-200 rounded transition-colors duration-300"
                      >
                        <Minus size={18} className="text-slate-600" />
                      </button>
                      <span className="px-3 font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-slate-200 rounded transition-colors duration-300"
                      >
                        <Plus size={18} className="text-slate-600" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-20">
                      <p className="font-semibold text-lg text-slate-900">
                        ₹{item.price * item.quantity}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 mt-2 flex items-center gap-1 text-sm hover:scale-110 transition-transform duration-300"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-6 text-slate-900">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:border-teal-500 focus:outline-none transition-colors duration-300 text-slate-900"
                    />
                    <button
                      onClick={applyPromo}
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-300 font-semibold hover:scale-105"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-light">
                    Try: SAVE10 or FARM50
                  </p>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex justify-between text-slate-700 font-light">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 font-light">
                    <span>
                      Tax (5%)
                    </span>
                    <span className="font-semibold text-slate-900">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 font-light">
                    <span>
                      Shipping
                      {shipping === 0 && (
                        <span className="text-teal-600 text-xs ml-1">
                          FREE
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-slate-900">
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-teal-600 font-light">
                      <span>Discount</span>
                      <span className="font-semibold">-₹{discount}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold text-slate-900">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    ₹{total}
                  </span>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 mb-3">
                  Proceed to Checkout
                </button>
                <button className="w-full border border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-300">
                  Save for Later
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-sm text-slate-600 font-light">
                  <div className="flex items-center gap-2">
                    <span className="text-teal-600">✓</span> Secure Checkout
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal-600">✓</span> Fast Delivery
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal-600">✓</span> Money-back Guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
