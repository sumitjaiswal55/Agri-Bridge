import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check karein ki user logged in hai ya nahi.
  // Abhi ke liye hum localStorage check kar rahe hain. 
  // Jab tum backend connect karoge, tab wahan se token verify hoga.
  const isAuthenticated = localStorage.getItem("token"); 

  if (!isAuthenticated) {
    // Agar login nahi hai, to Login page pe bhej do
    // 'replace' history stack ko clean rakhta hai
    return <Navigate to="/login" replace />;
  }

  // Agar login hai, to jo page maanga tha wo dikhao
  return children;
};

export default ProtectedRoute;