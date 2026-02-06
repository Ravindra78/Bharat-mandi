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
    contact: "", // mobile or email
    state: "",
    otp: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("REGISTER DATA:", form);
  };

  const handleSendOtp = () => {
    alert("OTP sent (demo)");
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
            name="contact"
            placeholder="Mobile Number or Email"
            value={form.contact}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
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
              required
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
