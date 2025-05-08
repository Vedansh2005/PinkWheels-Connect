import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/Home';
import BusList from './components/BusList';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff69b4',
    },
    secondary: {
      main: '#ff1493',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bus-list"
            element={
              <ProtectedRoute>
                <BusList />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
