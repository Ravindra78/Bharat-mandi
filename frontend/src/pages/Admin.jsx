import { useState } from "react";
import { BarChart3, Users, Package, TrendingUp, AlertCircle, Settings, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Redirect if not admin
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50">
        <div className="bg-white rounded-2xl p-8 border-2 border-red-200 text-center max-w-md">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-slate-700 mb-6">You don't have permission to access the admin panel.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-red-100">Welcome, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all flex items-center gap-2"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-light mb-2">Total Users</p>
                <p className="text-4xl font-bold text-slate-900">12,450</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <Users size={32} className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-light mb-2">Total Orders</p>
                <p className="text-4xl font-bold text-slate-900">5,280</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <Package size={32} className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-light mb-2">Revenue (₹)</p>
                <p className="text-4xl font-bold text-slate-900">₹52.3L</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-full">
                <TrendingUp size={32} className="text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-light mb-2">Active Sellers</p>
                <p className="text-4xl font-bold text-slate-900">1,340</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <BarChart3 size={32} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden mb-8">
          <div className="flex flex-wrap border-b border-slate-200">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex-1 px-6 py-4 font-semibold transition-all text-center ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-red-50 to-red-100 text-red-600 border-b-2 border-red-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 px-6 py-4 font-semibold transition-all text-center ${
                activeTab === "users"
                  ? "bg-gradient-to-r from-red-50 to-red-100 text-red-600 border-b-2 border-red-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              👥 Users
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 px-6 py-4 font-semibold transition-all text-center ${
                activeTab === "orders"
                  ? "bg-gradient-to-r from-red-50 to-red-100 text-red-600 border-b-2 border-red-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              📦 Orders
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex-1 px-6 py-4 font-semibold transition-all text-center ${
                activeTab === "products"
                  ? "bg-gradient-to-r from-red-50 to-red-100 text-red-600 border-b-2 border-red-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              🛍️ Products
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 px-6 py-4 font-semibold transition-all text-center ${
                activeTab === "settings"
                  ? "bg-gradient-to-r from-red-50 to-red-100 text-red-600 border-b-2 border-red-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              ⚙️ Settings
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === "dashboard" && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-lg font-bold mb-4">📈 Monthly Growth</h3>
                    <div className="space-y-2">
                      <p>Users: <span className="font-bold text-green-600">+12.5%</span></p>
                      <p>Orders: <span className="font-bold text-green-600">+8.3%</span></p>
                      <p>Revenue: <span className="font-bold text-green-600">+15.2%</span></p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-lg font-bold mb-4">✅ System Status</h3>
                    <div className="space-y-2">
                      <p>Server: <span className="font-bold text-green-600">Operational</span></p>
                      <p>Database: <span className="font-bold text-green-600">Healthy</span></p>
                      <p>API: <span className="font-bold text-green-600">Running</span></p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">User Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">ID</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Email</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Role</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Status</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 1, name: "Raj Kumar", email: "raj@example.com", role: "Buyer", status: "Active" },
                        { id: 2, name: "Priya Singh", email: "priya@example.com", role: "Seller", status: "Active" },
                        { id: 3, name: "Arjun Patel", email: "arjun@example.com", role: "Buyer", status: "Inactive" },
                      ].map((u) => (
                        <tr key={u.id} className="border-b hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-slate-700">#{u.id}</td>
                          <td className="px-4 py-3 text-slate-700 font-medium">{u.name}</td>
                          <td className="px-4 py-3 text-slate-600">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${u.role === "Buyer" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Order ID</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Customer</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Amount</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Status</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: "ORD001", customer: "Raj Kumar", amount: "₹5,240", status: "Delivered", date: "02-07-2026" },
                        { id: "ORD002", customer: "Priya Singh", amount: "₹2,100", status: "Processing", date: "02-06-2026" },
                        { id: "ORD003", customer: "Arjun Patel", amount: "₹8,500", status: "Shipped", date: "02-05-2026" },
                      ].map((o) => (
                        <tr key={o.id} className="border-b hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-slate-700 font-medium">{o.id}</td>
                          <td className="px-4 py-3 text-slate-700">{o.customer}</td>
                          <td className="px-4 py-3 text-slate-700 font-bold">{o.amount}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${o.status === "Delivered" ? "bg-green-100 text-green-700" : o.status === "Shipped" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Product Management</h2>
                <button className="mb-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                  + Add New Product
                </button>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Product</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Seller</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Price</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Stock</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { product: "Organic Wheat", seller: "Farm Fresh Co.", price: "₹45/kg", stock: "500 kg" },
                        { product: "Fresh Tomatoes", seller: "Green Valley", price: "₹35/kg", stock: "250 kg" },
                        { product: "Basmati Rice", seller: "Punjab Grains", price: "₹80/kg", stock: "1000 kg" },
                      ].map((p, idx) => (
                        <tr key={idx} className="border-b hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-slate-700 font-medium">{p.product}</td>
                          <td className="px-4 py-3 text-slate-700">{p.seller}</td>
                          <td className="px-4 py-3 text-slate-700 font-bold">{p.price}</td>
                          <td className="px-4 py-3 text-slate-700">{p.stock}</td>
                          <td className="px-4 py-3">
                            <button className="text-blue-600 hover:text-blue-800 font-semibold mr-3">Edit</button>
                            <button className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Platform Settings</h2>
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Platform Name</label>
                        <input type="text" value="Bharat Mandi" className="w-full border-2 border-slate-300 rounded-lg px-4 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Support Email</label>
                        <input type="email" value="support@bharatmandi.com" className="w-full border-2 border-slate-300 rounded-lg px-4 py-2" />
                      </div>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                    <h3 className="text-lg font-bold text-red-600 mb-4">⚠️ Danger Zone</h3>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                      Send System Notification
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
