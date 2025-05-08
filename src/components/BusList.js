import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { format } from 'date-fns';

const BusList = () => {
  const [busDetails, setBusDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem('selectedBusDetails') || '{}');
    if (!details.from || !details.to || !details.selectedTiming) {
      navigate('/');
      return;
    }
    setBusDetails(details);
  }, [navigate]);

  if (!busDetails) {
    return null;
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fff5f9 0%, #ffe6e6 100%)',
        position: 'relative',
        mt: 8
      }}
    >
      {/* Fixed Navigation Bar */}
      <Box 
        sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 75, 145, 0.1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        {/* Logo/Brand */}
        <Typography
          variant="h5"
          sx={{
            color: '#FF4B91',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <DirectionsBusIcon sx={{ fontSize: 32 }} />
          PinkWheels
        </Typography>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
              color: 'white',
              borderRadius: '25px',
              px: 3,
              py: 1,
              '&:hover': {
                background: 'linear-gradient(45deg, #D80032 30%, #FF4B91 90%)',
              }
            }}
          >
            Home
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/about')}
            sx={{
              background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
              color: 'white',
              borderRadius: '25px',
              px: 3,
              py: 1,
              '&:hover': {
                background: 'linear-gradient(45deg, #D80032 30%, #FF4B91 90%)',
              }
            }}
          >
            About Us
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/contact')}
            sx={{
              background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
              color: 'white',
              borderRadius: '25px',
              px: 3,
              py: 1,
              '&:hover': {
                background: 'linear-gradient(45deg, #D80032 30%, #FF4B91 90%)',
              }
            }}
          >
            Contact Us
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              navigate('/login');
            }}
            sx={{
              borderColor: '#FF4B91',
              color: '#FF4B91',
              borderRadius: '25px',
              px: 3,
              py: 1,
              ml: 2,
              '&:hover': {
                borderColor: '#D80032',
                background: 'rgba(255, 75, 145, 0.1)',
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#ff69b4', fontWeight: 'bold', mb: 4 }}>
          Bus Details
        </Typography>
        
        <Card sx={{ mb: 4, boxShadow: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Route Information
                  </Typography>
                  <Typography variant="body1">
                    From: {busDetails.from}
                  </Typography>
                  <Typography variant="body1">
                    To: {busDetails.to}
                  </Typography>
                  <Typography variant="body1">
                    Date: {format(new Date(busDetails.date), 'dd MMM yyyy')}
                  </Typography>
                  <Typography variant="body1">
                    Time: {busDetails.selectedTiming.departureTime} - {busDetails.selectedTiming.arrivalTime}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Bus Information
                  </Typography>
                  <Typography variant="body1">
                    Bus Type: {busDetails.busType}
                  </Typography>
                  <Typography variant="body1">
                    Available Seats: {busDetails.availableSeats}
                  </Typography>
                  <Typography variant="body1">
                    Base Price: ₹{busDetails.basePrice}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Amenities
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(255, 75, 145, 0.05)', borderRadius: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: '#FF4B91', fontWeight: 'bold', mb: 1 }}>
                    Comfort Features
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Women-Only Bus" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="AC with Climate Control" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Reclining Seats" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Reading Lights" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Blanket & Pillow" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(255, 75, 145, 0.05)', borderRadius: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: '#FF4B91', fontWeight: 'bold', mb: 1 }}>
                    Entertainment & Connectivity
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Free WiFi" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="USB Charging Ports" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Entertainment System" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Mobile App Support" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Live Tracking" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(255, 75, 145, 0.05)', borderRadius: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: '#FF4B91', fontWeight: 'bold', mb: 1 }}>
                    Refreshments
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Complimentary Water" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Snacks Pack" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Hot Beverages" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Refreshment Stops" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Meal Options Available" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Safety Features
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(255, 75, 145, 0.05)', borderRadius: 2 }}>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Female Staff & Driver" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="24/7 Security" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="GPS Tracking" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Emergency Contact" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="First Aid Kit" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Fire Extinguisher" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Additional Information
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(255, 75, 145, 0.05)', borderRadius: 2 }}>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Luggage Allowance: 15kg" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Boarding Point: Main Bus Stand" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Reporting Time: 30 mins before departure" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Cancellation Policy: 24 hours before journey" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Child Policy: Under 5 years free" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsBusIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Wheelchair Accessible" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate('/');
                  localStorage.removeItem('selectedBusDetails');
                }}
                sx={{
                  background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
                  color: 'white',
                  borderRadius: '25px',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #D80032 30%, #FF4B91 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(255, 75, 145, 0.3)'
                  }
                }}
              >
                Book Now
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default BusList; 