import React, { createContext, useState, useEffect, useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
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
      localStorage.setItem('isLoggedIn', 'true'); // Ensure this is a string

      setIsAuthenticated(true);
      setUserId(jwtDecode(response.data.token).userId); // Assuming JWT contains userId claim
      console.log('Login completed, navigating to home');
      navigate('/')
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
    console.log('Logout completed, navigating to login page');
    navigate('/login')
  };

  const handleRegister = async (values) => {
    try{
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`, values)
      console.log("Registering in with:", values)
    } catch (err){
      console.error(err)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, isLoading, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
