import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header/Header.js';
import AppRoutes from './Routes';

const theme = createTheme({
  // You can customize your theme here
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Header />
          <AppRoutes />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;