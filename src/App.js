import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Button, createTheme } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Layout from './components/Layout';
import Home from './components/Home';
import MyBookings from './components/MyBookings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff69b4',
      dark: '#ff1493',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Box>
                <Home />
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Button
                    component={Link}
                    to="/my-bookings"
                    variant="contained"
                    sx={{ backgroundColor: '#ff69b4', '&:hover': { backgroundColor: '#ff1493' } }}
                  >
                    View My Bookings
                  </Button>
                </Box>
              </Box>
            } />
            <Route path="my-bookings" element={<MyBookings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
