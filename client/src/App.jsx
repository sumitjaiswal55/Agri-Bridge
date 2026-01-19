import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./component/ProtectedRoute";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import HomeMain from "./pages/home/HomeMain";
import DashboardLayout from "./pages/farmer/Dashboard";
import FarmerHome from "./pages/farmer/Home";
import AddListing from "./pages/farmer/AddListing";
import MyListing from "./pages/farmer/MyListing";
import Transaction from "./pages/farmer/Transaction";
import Orders from "./pages/farmer/Orders";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import ProductDetails from "./pages/buyer/Products";
import Profile from "./pages/buyer/Profile";
import Cart from "./pages/buyer/Cart";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<FarmerHome />} />
            <Route path="add-listing" element={<AddListing />} />
            <Route path="my-listings" element={<MyListing />} />
            <Route path="transactions" element={<Transaction />} />
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
