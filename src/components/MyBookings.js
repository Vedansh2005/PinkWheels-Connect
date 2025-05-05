import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Alert,
  Fade,
  Divider,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person'; // Added
import { format } from 'date-fns';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings);
  }, []);

  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: 'Cancelled' }
        : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  if (bookings.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="info">
          No bookings found. Start booking your safe journey now!
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 'bold', mb: 4 }}>
        My Bookings
      </Typography>
      {bookings.map((booking) => (
        <Fade in={true} key={booking.id}>
          <Card sx={{
            mb: 3,
            boxShadow: 2,
            borderRadius: 2,
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
            transition: 'all 0.3s ease'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DirectionsBusIcon sx={{ mr: 1, color: 'primary.main', fontSize: '2rem' }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {booking.from} to {booking.to}
                    </Typography>
                    <Chip
                      label={booking.status}
                      color={booking.status === 'Confirmed' ? 'success' : 'error'}
                      sx={{ ml: 'auto', fontWeight: 'bold' }}
                    />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <EventIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body1">
                          {format(new Date(booking.date), 'dd MMM yyyy')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body1">
                          {booking.departureTime} - {booking.arrivalTime}
                        </Typography>
                      </Box>
                      {/* Added Passenger Name Display */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body1">
                          Passenger: {booking.passengerName || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AirlineSeatReclineNormalIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body1">
                          {booking.busType}
                        </Typography>
                      </Box>
                      <Box>
                        <Paper elevation={0} sx={{ display: 'inline-block', p: 1, mb: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                            ₹{booking.totalFare}
                          </Typography>
                        </Paper>
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <EventSeatIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Selected Seats" 
                              secondary={booking.selectedSeats?.join(', ') || 'Not specified'}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PaymentIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Fare Details" 
                              secondary={`Base Price: ₹${booking.basePrice} × ${booking.selectedSeats?.length || 1} seat(s)`}
                            />
                          </ListItem>
                          {/* Optional: Display Payment Status */}
                          {/* 
                          <ListItem>
                            <ListItemIcon>
                              <PaymentIcon color={booking.paymentStatus === 'Paid' ? 'success' : 'warning'} />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Payment Status" 
                              secondary={booking.paymentStatus || 'Pending'}
                            />
                          </ListItem>
                          */}
                        </List>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                {booking.status === 'Confirmed' && (
                  <Grid item xs={12} sx={{ textAlign: 'right', mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleCancelBooking(booking.id)}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': { transform: 'scale(1.02)', bgcolor: 'error.light', color: 'white' },
                        transition: 'all 0.2s'
                      }}
                    >
                      Cancel Booking
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Fade>
      ))}
    </Box>
  );
};

export default MyBookings;