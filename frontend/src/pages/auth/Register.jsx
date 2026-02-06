import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAPI, otpAPI } from "../../services/api";
import { signUpWithGoogle } from "../../services/firebaseAuth";

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
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    state: "",
    role: "buyer",
    otp: "",
    adminCode: "",
  });
  const [adminCodeError, setAdminCodeError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Validate admin code if role is admin
    if (form.role === "admin") {
      if (!form.adminCode || form.adminCode.trim() === "") {
        setAdminCodeError("Admin authorization code is required");
        return;
      }
      setAdminCodeError("");
    }

    try {
      await userAPI.register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.role,
        address: {
          state: form.state,
        },
        adminCode: form.role === "admin" ? form.adminCode : undefined,
      });
      alert('Registered successfully');
      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        state: "",
        role: "buyer",
        otp: "",
        adminCode: "",
      });
    } catch (err) {
      const errorMsg = err.response?.data?.msg || err.response?.data?.message || err.message || 'Registration failed';
      alert(errorMsg);
      // Show admin code specific error
      if (form.role === "admin" && errorMsg.includes("admin")) {
        setAdminCodeError(errorMsg);
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      if (!form.email && !form.phone) return alert('Enter email or phone to receive OTP');

      const isEmail = !!(form.email && form.email.includes('@'));
      const response = isEmail
        ? await otpAPI.sendEmail(form.email, 'registration')
        : await otpAPI.sendSMS(form.phone, 'registration');

      alert(response.data.message || 'OTP sent successfully');
    } catch (err) {
      alert(err.response?.data?.msg || err.response?.data?.message || err.message || 'Failed to send OTP');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);
      const result = await signUpWithGoogle();
      alert(`Welcome ${result.userData.name}! Registered successfully with Google`);
      navigate('/');
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message || 'Google signup failed';
      alert(errorMsg);
    } finally {
      setGoogleLoading(false);
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

          {/* ROLE SELECTION */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-slate-700 mb-3">Select Your Role:</label>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer p-3 border-2 border-slate-200 rounded-lg hover:border-teal-500 transition-colors" style={{borderColor: form.role === 'buyer' ? '#14b8a6' : ''}}>
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={form.role === "buyer"}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="ml-3 font-medium text-slate-900">🛒 Buyer - Purchase agricultural products</span>
              </label>
              <label className="flex items-center cursor-pointer p-3 border-2 border-slate-200 rounded-lg hover:border-orange-500 transition-colors" style={{borderColor: form.role === 'seller' ? '#ea580c' : ''}}>
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  checked={form.role === "seller"}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="ml-3 font-medium text-slate-900">Seller - Sell agricultural products</span>
              </label>
              <label className="flex items-center cursor-pointer p-3 border-2 border-slate-200 rounded-lg hover:border-red-500 transition-colors" style={{borderColor: form.role === 'admin' ? '#dc2626' : ''}}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={form.role === "admin"}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="ml-3 font-medium text-slate-900">Admin - Manage platform</span>
              </label>
            </div>
          </div>

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
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-50 disabled:bg-gray-200"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth_provider_google.svg" className="w-5 h-5" alt="Google" />
            {googleLoading ? 'Signing up...' : 'Sign up with Google'}
          </button>

          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-50">
            <img src="/src/assets/aadhar.png" className="w-5 h-5" alt="Aadhaar" />
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
