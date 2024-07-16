import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthProvider'; // Import the AuthContext

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <p>Loading...</p>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
