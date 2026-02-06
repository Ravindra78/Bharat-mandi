import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { verifyFirebaseAuth } from "./services/firebaseAuth";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Services from "./pages/Services";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Weather from "./pages/Weather";
import Equipment from "./pages/Equipment";
import LiveBid from "./pages/LiveBid";
import ColdStorage from "./pages/ColdStorage";
import Godown from "./pages/Godown";
import SoilTesting from "./pages/SoilTesting";
import Admin from "./pages/Admin";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  useEffect(() => {
    // Auto-login with Firebase if user has a session
    const checkFirebaseAuth = async () => {
      try {
        const result = await verifyFirebaseAuth();
        if (result) {
          console.log("Auto-login successful:", result.user.name);
        }
      } catch (error) {
        console.log("No active Firebase session");
      }
    };

    checkFirebaseAuth();
  }, []);

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/live-bid" element={<LiveBid />} />
        <Route path="/cold-storage" element={<ColdStorage />} />
        <Route path="/godown" element={<Godown />} />
        <Route path="/soil-testing" element={<SoilTesting />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
