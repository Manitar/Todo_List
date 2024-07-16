import axios from 'axios';

const withAuth = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL, // Replace with your server base URL
  });

  // Request interceptor to add JWT token to Authorization header
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return instance;
};

export default withAuth;
