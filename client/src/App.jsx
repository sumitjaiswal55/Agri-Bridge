import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login.jsx"
import HomeMain from "./pages/home/HomeMain";
import Dashboard from "./pages/farmer/Dashboard.jsx";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
