import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${API_BASE}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.msg || data.message || 'Login failed');
      // Save token and basic user info
      if (data.token) localStorage.setItem('token', data.token);
      alert('Login successful');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3ead7] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg grid md:grid-cols-2 overflow-hidden">
        {/* LEFT FORM */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#5c4033] mb-2">
            Login to Kishan Setu
          </h2>
          <p className="text-sm mb-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-700 font-semibold">
              Create Account
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
            >
              Login
            </button>
          </form>

          {/* SOCIAL */}
          <div className="mt-6 space-y-3">
            <button className="w-full border py-2 rounded flex justify-center gap-2">
              <img src="/src/assets/google.jpeg" className="w-5" />
              Login with Google
            </button>

            <button className="w-full border py-2 rounded flex justify-center gap-2">
              <img src="/src/assets/AadharCard.png" className="w-5" />
              Login with Aadhaar
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative hidden md:block">
          <img
            src="/src/assets/loginimg.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 p-8 text-white text-center flex flex-col justify-center h-full">
            <h3 className="text-2xl font-bold mb-4">
              Welcome to Kishan Setu 🌾
            </h3>
            <p>One platform for farmers, mandi prices, schemes and loans.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
