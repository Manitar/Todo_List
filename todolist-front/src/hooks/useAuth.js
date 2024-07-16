import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // For loading state management

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Check for login flag

    if (token && isLoggedIn === 'true') {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true);
          setUserId(decodedToken.userId); // Assuming JWT contains userId claim
        } else {
          // Token expired, handle logout
          handleLogout();
        }
      } catch (error) {
        console.error('Invalid token:', error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []); // Empty dependency array to run only once on mount

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, values);
      console.log('Logging in with:', values);

      // Save token and login flag
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('isLoggedIn', true);

      setIsAuthenticated(true);
      setUserId(jwtDecode(response.data.token).userId); // Assuming JWT contains userId claim
    } catch (err) {
      console.error(err);
      // Handle login errors (e.g., display error message)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
    setUserId(null);
  };

  return { isAuthenticated, userId, handleLogin, handleLogout };
};

export default useAuth;
