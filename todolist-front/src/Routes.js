import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage.js';
import HomePage from './components/HomePage/HomePage.js';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function AppRoutes() {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      </Routes>
    );
}

export default AppRoutes;
