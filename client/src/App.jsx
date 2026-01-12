import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// --- Components ---
import ProtectedRoute from "./component/ProtectedRoute"; // Jo abhi banaya

// --- Pages ---
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import HomeMain from "./pages/home/HomeMain";

// --- Dashboard & Sub-pages ---
import DashboardLayout from "./pages/farmer/Dashboard"; // Dashboard.jsx (Layout)
import FarmerHome from "./pages/farmer/Home";
import AddListing from "./pages/farmer/AddListing";
import MyListing from "./pages/farmer/MyListing";
import Transaction from "./pages/farmer/Transaction";
import Orders from "./pages/farmer/Orders";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import ProductDetails from "./pages/buyer/Products"
import Profile from "./pages/buyer/Profile"
import Cart from './pages/buyer/Cart';

function App() {
  return (
    <>
      <div>
        <Routes>
          {/* --- Public Routes (Koi bhi khol sakta hai) --- */}
          <Route path="/" element={<HomeMain />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* --- Protected Dashboard Routes --- */}
          {/* Ye poora block ProtectedRoute ke andar wrap hai */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes (Ye DashboardLayout ke <Outlet /> me dikhenge) */}
            
            {/* Jab sirf /dashboard khulega */}
            <Route index element={<FarmerHome />} /> 
            
            {/* URL: /dashboard/add-listing */}
            <Route path="add-listing" element={<AddListing />} />
            
            {/* URL: /dashboard/my-listings */}
            <Route path="my-listings" element={<MyListing />} />
            
            {/* URL: /dashboard/transactions */}
            <Route path="transactions" element={<Transaction />} />
            
            {/* URL: /dashboard/orders */}
            <Route path="orders" element={<Orders />} />


            
          </Route>
            <Route path="product" element={<BuyerDashboard />} />
            <Route path="product/:id" element={<ProductDetails />} />

            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
