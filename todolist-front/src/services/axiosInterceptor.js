import axios from 'axios';

const withAuth = () => {
  const token = localStorage.getItem('jwtToken');

  const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL, // Replace with your server base URL
  });

  // Request interceptor to add JWT token to Authorization header
  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return instance;
};

export default withAuth;
