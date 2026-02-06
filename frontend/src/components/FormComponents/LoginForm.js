import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Visitor count (static for demo)
  const visitorCount = 1247;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen bg-orange-100 flex rounded-lg flex-col mt-10">

      {/* Main content */}
      <main className="flex-1 container mx-auto mt-40 px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Form */}
          <div className="flex-1 max-w-lg bg-blue-100 rounded-lg shadow-md p-6">
            <div className="text-center mb-6 text-gray-700">
              Don't have an account?{' '}
              <button
                onClick={() => setIsLoginMode(false)}
                className="text-blue-700 font-semibold hover:underline"
              >
                Create an Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition"
              >
                Login
              </button>
            </form>

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
              src="./assets/loginimg.jpg"
              alt="Farming background"
              className="absolute inset-0 w-full h-full object-cover"
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

export default LoginForm;
