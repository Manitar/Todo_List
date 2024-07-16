import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage.js';
import HomePage from './components/HomePage/HomePage.js';

function AppRoutes() {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    );
}

export default AppRoutes;
