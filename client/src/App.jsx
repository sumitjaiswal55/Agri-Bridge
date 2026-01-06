import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
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
