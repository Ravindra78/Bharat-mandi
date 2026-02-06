import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';   // ✅ Footer import

// Services Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResponsiveServicesStrip from './components/ResponsiveServicesStrip';

import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import ListingsPage from './pages/ListingsPage';
import ProductForm from './pages/ProductForm';
import Negotiation from './pages/Negotiation';
import Orders from './pages/Orders';
import Kyc from './pages/Kyc';
import ChatWindow from './components/ChatWindow';
import Tractor from "./pages/Tractor";
import GrainMarket from "./pages/GrainMarket";
import KCC from "./pages/KCC";

// Services Import 
import Harvester from "./pages/Harvester";
import Spraying from "./pages/Spraying"; // ✅ fixed path
import Soil from "./pages/Soil";
import Irrigation from "./pages/Irrigation";

// Govt. Schemes 
import PMKisan from "./pages/PMKisan";
import Cooperative from "./pages/Cooperative";
import Seeds from "./pages/Seeds";
import Loans from './pages/Loans';

// Cloud Storage
import ColdStorage from "./pages/ColdStorage";
import Warehouse from "./pages/Warehouse";
import FCI from "./pages/FCI";
import PrivateStorage from "./pages/PrivateStorage";
import FarmerStorage from './pages/FarmerStorage';

// Sell & Buy 
import Sell from "./pages/Sell";
import Connect from "./pages/Connect";

// ✅ Mandi Prices (NEW)
import LiveMarketPrices from "./pages/LiveMarketPrices";
import GovtMSPRates from "./pages/GovtMSPRates";
import CompareStateDistrict from "./pages/CompareStateDistrict";


// Hooks & Styles
import useNotifications from './hooks/useNotifications';
import './styles/index.css';

function App() {
  useNotifications(); // Notification hook

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />

          {/* Product Listing Pages */}
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/create-listing" element={<ProductForm />} />

          {/* Negotiation / Orders / KYC */}
          <Route path="/negotiation/:id" element={<Negotiation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/kyc" element={<Kyc />} />

          {/* Chat Route */}
          <Route path="/chat/:id" element={<ChatWindow />} />

          {/* Services */}
          <Route path="/tractor" element={<Tractor />} />
          <Route path="/grain-market" element={<GrainMarket />} />
          <Route path="/KCC" element={<KCC />} />
          <Route path="/Harvester" element={<Harvester />} />
          <Route path="/Spraying" element={<Spraying />} />
          <Route path="/Soil" element={<Soil />} />
          <Route path="/Irrigation" element={<Irrigation />} />

          {/* Schemes */}
          <Route path="/PMKisan" element={<PMKisan />} />
          <Route path="/Cooperative" element={<Cooperative />} />
          <Route path="/seeds" element={<Seeds />} />
          <Route path="/Loans" element={<Loans />} />

          {/* Cloud Services */}
          <Route path="/ColdStorage" element={<ColdStorage />} />
          <Route path="/Warehouse" element={<Warehouse />} />
          <Route path="/FCI" element={<FCI />} />
          <Route path="/PrivateStorage" element={<PrivateStorage />} />
          <Route path="/FarmerStorage" element={<FarmerStorage />} />


          {/* Sell & Buy */}
          <Route path="/Sell" element={<Sell />} />
          <Route path="/Connect" element={<Connect />} />
          <Route path="/ResponsiveServicesStrip" element={<ResponsiveServicesStrip />} />

          {/* ✅ Mandi Prices */}
          <Route path="/LiveMarketPrices" element={<LiveMarketPrices />} />
          <Route path="/GovtMSPRates" element={<GovtMSPRates />} />
          <Route path="/CompareStateDistrict" element={<CompareStateDistrict />} />

        </Routes>


        {/* ✅ Footer render */}
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
