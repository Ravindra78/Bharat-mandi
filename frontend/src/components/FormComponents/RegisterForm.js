import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authActions';

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const RegisterForm = () => {
  const dispatch = useDispatch();

  // Form state
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [state, setState] = useState('');
  const [otp, setOtp] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);

  // Visitor count (static for demo)
  const visitorCount = 1247;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch register action or login action based on mode
    if (!isLoginMode) {
      dispatch(register({
        mobileOrEmail,
        fullName,
        state,
        otp,
        dob,
        gender
      }));
    } else {
      // Handle login logic here if needed
      alert('Login form submitted');
    }
  };

  return (
    <div className="min-h-screen bg-orange-100 rounded-lg flex mt-10 flex-col">
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Form */}
          <div className="flex-1 max-w-lg bg-blue-100 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              {isLoginMode ? 'Login' : 'Create an Account'}
            </h2>
            <div className="text-center mb-6 text-gray-700">
              {isLoginMode ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsLoginMode(false)}
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    Create an Account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsLoginMode(true)}
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </div>

            {!isLoginMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Mobile Number or Email</label>
                  <input
                    type="text"
                    value={mobileOrEmail}
                    onChange={(e) => setMobileOrEmail(e.target.value)}
                    required
                    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    {states.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>


                <div>
                  <label className="block mb-1 font-medium text-gray-700">OTP</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter OTP"
                    />
                    <button
                      type="button"
                      onClick={() => alert("Send OTP clicked!")} // 👈 yaha API call lagana hai
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Send OTP
                    </button>
                  </div>
                </div>


                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition"
                >
                  Create New Account
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Mobile Number or Email</label>
                  <input
                    type="text"
                    value={mobileOrEmail}
                    onChange={(e) => setMobileOrEmail(e.target.value)}
                    required
                    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    required
                    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition"
                >
                  Login
                </button>
              </form>
            )}

            {/* Social login */}
            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded py-3 px-4 hover:bg-gray-50 transition">
                <img
                  src="./assets/google.jpeg"
                  alt="Google logo"
                  className="w-5 h-5"
                />
                Login with Google
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded py-3 px-4 hover:bg-gray-50 transition">
                <img
                  src="./assets/AadharCard.png"
                  alt="Aadhaar logo"
                  className="w-5 h-5"
                />
                Login with Aadhaar
              </button>
            </div>
          </div>

          {/* Right: Welcome content */}
          <div className="flex-1 max-w-md rounded-lg shadow-md relative overflow-hidden">
            {/* Background Image */}
            <img
              src="./assets/loginimg2.png"
              alt="Farming background"
              className="absolute inset-0 w-full h-full object-contain"
            />


            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text Content */}
            <div className="relative z-10 p-6 flex flex-col items-center text-center text-white">
              <h2 className="text-2xl font-bold mb-4 drop-shadow-md">
                Welcome to Kishan Setu
              </h2>
              <p className="mb-4 text-sm md:text-base">
                Bridging farmers with markets, schemes, and technology.
                A one-stop platform for agriculture growth 🌾
              </p>
              {/* Optional Button */}
              <button className="mt-2 px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition">
              </button>
            </div>
          </div>
        </div>
      </main>



    </div>
  );
};

export default RegisterForm;
