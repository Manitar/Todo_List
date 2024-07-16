import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage.js';
import HomePage from './components/HomePage/HomePage.js';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
