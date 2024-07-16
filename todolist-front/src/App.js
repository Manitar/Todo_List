import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header/Header.js';
import AppRoutes from './Routes';
import AuthProvider from './context/AuthProvider.js'; // Import AuthProvider

const theme = createTheme({
  // You can customize your theme here
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <div className="App">
            <Header />
            <AppRoutes />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;