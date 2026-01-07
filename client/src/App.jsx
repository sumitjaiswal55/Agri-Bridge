import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer.jsx";
import HomeMain from "./pages/home/HomeMain";

function App() {
  return (
    <>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomeMain />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
