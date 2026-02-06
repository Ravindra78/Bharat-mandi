import { useState } from "react";
import { Link } from "react-router-dom";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
];

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    state: "",
    otp: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const resp = await fetch(`${API_BASE}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          address: {
            state: form.state,
          },
        }),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.msg || data.message || 'Registration failed');
      alert('Registered successfully');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSendOtp = async () => {
    try {
      if (!form.email && !form.phone) return alert('Enter email or phone to receive OTP');

      const isEmail = !!(form.email && form.email.includes('@'));
      const url = isEmail ? `${API_BASE}/api/users/otp/send-email` : `${API_BASE}/api/users/otp/send-sms`;
      const body = isEmail ? { email: form.email, purpose: 'registration' } : { phone: form.phone, purpose: 'registration' };

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.msg || data.message || 'Failed to send OTP');
      alert(data.message || 'OTP sent');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3ead7] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#5c4033] mb-4">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          {/* MOBILE / EMAIL */}
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="phone"
            placeholder="Mobile Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-2"
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-2"
            required
          />

          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-2"
            required
          />

          {/* STATE */}
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          {/* OTP */}
          <div className="flex gap-2">
            <input
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={handleSendOtp}
              className="px-4 bg-green-700 text-white rounded"
            >
              Send OTP
            </button>
          </div>

          {/* REGISTER */}
          <button className="w-full bg-green-700 text-white py-2 rounded">
            Register
          </button>
        </form>

        {/* SOCIAL AUTH */}
        <div className="mt-6 space-y-3">
          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-50">
            <img src="/src/assets/google.jpeg" className="w-5 h-5" />
            Register with Google
          </button>

          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-50">
            <img src="/src/assets/AadharCard.png" className="w-5 h-5" />
            Register with Aadhaar
          </button>
        </div>

        {/* LOGIN LINK */}
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
