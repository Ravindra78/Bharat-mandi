import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
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
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product" element={<Product />} />
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
