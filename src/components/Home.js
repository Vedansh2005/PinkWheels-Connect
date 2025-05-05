import React, { useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Paper,
  Fade,
  Divider,
  Dialog, // Added
  DialogTitle, // Added
  DialogContent, // Added
  DialogActions, // Added
  TextField, // Added
  IconButton, // Added
} from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CloseIcon from '@mui/icons-material/Close'; // Added
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SeatSelection from './SeatSelection';

const routes = [
  { 
    id: 1, 
    from: 'Mumbai', 
    to: 'Pune', 
    basePrice: 300, 
    departureTime: '08:00', 
    arrivalTime: '11:00', 
    busType: 'AC Seater',
    distance: 150,
    availableSeats: 40
  },
  { 
    id: 2, 
    from: 'Pune', 
    to: 'Nashik', 
    basePrice: 250, 
    departureTime: '10:30', 
    arrivalTime: '13:30', 
    busType: 'AC Sleeper',
    distance: 200,
    availableSeats: 30
  },
  { 
    id: 3, 
    from: 'Mumbai', 
    to: 'Nashik', 
    basePrice: 400, 
    departureTime: '09:00', 
    arrivalTime: '13:00', 
    busType: 'AC Seater',
    distance: 180,
    availableSeats: 40
  },
  { 
    id: 4, 
    from: 'Delhi', 
    to: 'Agra', 
    basePrice: 350, 
    departureTime: '07:00', 
    arrivalTime: '10:00', 
    busType: 'AC Sleeper',
    distance: 230,
    availableSeats: 35
  },
  { 
    id: 5, 
    from: 'Agra', 
    to: 'Jaipur', 
    basePrice: 320, 
    departureTime: '12:00', 
    arrivalTime: '16:00', 
    busType: 'AC Seater',
    distance: 240,
    availableSeats: 38
  },
  { 
    id: 6, 
    from: 'Bangalore', 
    to: 'Chennai', 
    basePrice: 500, 
    departureTime: '06:00', 
    arrivalTime: '12:00', 
    busType: 'AC Sleeper',
    distance: 350,
    availableSeats: 28
  },
  { 
    id: 7, 
    from: 'Hyderabad', 
    to: 'Bangalore', 
    basePrice: 450, 
    departureTime: '14:00', 
    arrivalTime: '20:00', 
    busType: 'AC Seater',
    distance: 500,
    availableSeats: 32
  },
  { 
    id: 8, 
    from: 'Chennai', 
    to: 'Hyderabad', 
    basePrice: 470, 
    departureTime: '09:00', 
    arrivalTime: '15:00', 
    busType: 'AC Sleeper',
    distance: 520,
    availableSeats: 30
  },
  { 
    id: 9, 
    from: 'Kolkata', 
    to: 'Bhubaneswar', 
    basePrice: 400, 
    departureTime: '05:00', 
    arrivalTime: '11:00', 
    busType: 'AC Seater',
    distance: 440,
    availableSeats: 36
  },
  { 
    id: 10, 
    from: 'Ahmedabad', 
    to: 'Surat', 
    basePrice: 280, 
    departureTime: '13:00', 
    arrivalTime: '16:00', 
    busType: 'AC Seater',
    distance: 260,
    availableSeats: 40
  },
];

const cities = ['Mumbai', 'Pune', 'Nashik', 'Delhi', 'Agra', 'Jaipur', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Bhubaneswar', 'Ahmedabad', 'Surat'];

const Home = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [seatSelectionOpen, setSeatSelectionOpen] = useState(false);
  // Removed unused selectedSeats state - bookingDetails.seats is used instead
  const [passengerName, setPassengerName] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSearch = () => {
    setError('');
    setLoading(true);
    if (!from || !to) {
      setError('Please select both departure and arrival cities');
      return;
    }
    if (!date) {
      setError('Please select a travel date');
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError('Please select a future date');
      return;
    }
    if (from === to) {
      setError('Departure and arrival cities cannot be the same');
      return;
    }

    const availableRoutes = routes.filter(
      (route) => route.from === from && route.to === to
    );

    setTimeout(() => {
      if (availableRoutes.length === 0) {
        setError('No routes available for selected cities');
        setSearchResults([]);
      } else {
        setError('');
        setSearchResults(availableRoutes);
      }
      setLoading(false);
    }, 1000);
  };

  // Removed bookingSuccess state declaration from here as it's moved up

  const calculateFare = useCallback((route, seatCount) => {
    const baseFare = route.basePrice;
    const distanceFactor = route.distance / 100; // Price increase per 100km
    const busTypeFactor = route.busType === 'AC Sleeper' ? 1.2 : 1; // 20% more for sleeper
    
    return Math.round(baseFare * seatCount * distanceFactor * busTypeFactor);
  }, []);

  // Renamed from handleSeatSelect to initiateBookingProcess
  const initiateBookingProcess = (seats) => {
    const totalFare = calculateFare(selectedRoute, seats.length);
    setBookingDetails({ route: selectedRoute, seats, totalFare });
    // Removed setSelectedSeats(seats); - No longer needed
    setSeatSelectionOpen(false);
    setPaymentDialogOpen(true); // Open payment dialog
  };

  const openSeatSelection = (route) => {
    setSelectedRoute(route);
    setPassengerName(''); // Reset passenger name when opening seat selection
    setSeatSelectionOpen(true);
  };

  // Renamed from handleBooking to confirmAndSaveBooking
  const confirmAndSaveBooking = () => {
    if (!passengerName.trim()) {
      setError('Please enter passenger name.'); // Add validation
      return;
    }
    if (!bookingDetails) {
      setError('Booking details are missing. Please try again.');
      return;
    }

    try {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const { route, seats, totalFare } = bookingDetails;

      // Check for duplicate bookings
      const isDuplicate = bookings.some(booking => 
        booking.from === route.from && 
        booking.to === route.to && 
        new Date(booking.date).toDateString() === date.toDateString() &&
        booking.passengerName === passengerName.trim() && // Check name too
        booking.status === 'Confirmed'
      );

      if (isDuplicate) {
        setError('You already have a confirmed booking for this route and passenger on the selected date.');
        setPaymentDialogOpen(false); // Close dialog on error
        return;
      }

      const newBooking = {
        id: Date.now(),
        ...route,
        passengerName: passengerName.trim(), // Add passenger name
        date: date.toISOString(),
        status: 'Confirmed',
        paymentStatus: 'Paid', // Simulate successful payment
        bookingDate: new Date().toISOString(),
        selectedSeats: seats,
        totalFare: totalFare
      };
      
      bookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      setBookingSuccess(true);
      setPaymentDialogOpen(false); // Close dialog
      setTimeout(() => setBookingSuccess(false), 3000);
      
      // Reset form after successful booking
      setFrom('');
      setTo('');
      setDate(null);
      setSearchResults([]);
      setSelectedRoute(null);
      // Removed setSelectedSeats([]); - No longer needed
      setPassengerName('');
      setBookingDetails(null);
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Booking error:', err);
      setError('Failed to save booking. Please try again.');
      // Keep dialog open on error?
    }
  };

  const handlePaymentDialogClose = () => {
    setPaymentDialogOpen(false);
    // Optionally reset passenger name if dialog is closed without confirming
    // setPassengerName(''); 
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 'bold', mb: 3 }}>
        Find Your Safe Journey
      </Typography>
      <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2, background: 'linear-gradient(90deg, #ffe0f0 0%, #e0f7fa 100%)', border: '2px solid #ff69b4' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5} md={5} lg={4}>
              <FormControl fullWidth>
                <InputLabel>From</InputLabel>
                <Select
                  value={from}
                  label="From"
                  onChange={(e) => setFrom(e.target.value)}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={5} md={5} lg={4}>
              <FormControl fullWidth>
                <InputLabel>To</InputLabel>
                <Select
                  value={to}
                  label="To"
                  onChange={(e) => setTo(e.target.value)}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2} md={2} lg={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Travel Date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                    setError('');
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !date && error?.includes('date')
                    }
                  }}
                  minDate={new Date()}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="contained"
              // Remove the first sx prop
              onClick={handleSearch}
              // Removed duplicate color="primary" prop
              disabled={loading || !from || !to || !date}
              // Keep only one sx prop
              sx={{
                background: 'linear-gradient(90deg, #ff69b4 0%, #ffb347 100%)',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                mt: 2,
                boxShadow: 2,
                fontSize: '1.1rem', // Added from previous merge attempt
                transform: 'scale(1.0)', // Initial scale
                transition: 'transform 0.2s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #ff1493 0%, #ffb347 100%)',
                  color: 'white',
                  boxShadow: 4,
                  transform: 'scale(1.02)' // Combined hover styles
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Search Routes'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {bookingSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Booking confirmed! Check My Bookings for details.
        </Alert>
      )}

      <Box sx={{ mt: 4 }}>
        {searchResults.map((route) => (
          <Fade in={true} key={route.id}>
            <Card sx={{
              mb: 2,
              boxShadow: 2,
              borderRadius: 2,
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
              transition: 'all 0.3s ease'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={8}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <DirectionsBusIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {route.from} to {route.to}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1.2rem' }} />
                          <Typography variant="body1" color="text.secondary">
                            {route.departureTime} - {route.arrivalTime}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AirlineSeatReclineNormalIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1.2rem' }} />
                          <Typography variant="body1" color="text.secondary">
                            {route.busType}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Paper elevation={0} sx={{ mt: 2, p: 1, bgcolor: 'primary.light', borderRadius: 1 }}>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                        ₹{route.basePrice} {/* Corrected from route.price */}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Available Seats: {route.availableSeats}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => openSeatSelection(route)} // Use openSeatSelection
                        // Removed duplicate color="primary" prop
                        sx={{ mt: 2, backgroundColor: '#ff69b4', '&:hover': { backgroundColor: '#ff1493' } }}
                      >
                        Select Seats & Book
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        ))}
      </Box>
      {/* Seat Selection Dialog */}
      {selectedRoute && (
        <SeatSelection
          open={seatSelectionOpen}
          onClose={() => setSeatSelectionOpen(false)}
          busType={selectedRoute.busType}
          onSeatSelect={initiateBookingProcess} // Use initiateBookingProcess
        />
      )}

      {/* Passenger Details and Confirmation Dialog */}
      <Dialog open={paymentDialogOpen} onClose={handlePaymentDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, bgcolor: 'primary.light', color: 'white' }}>
          Confirm Booking & Passenger Details
          <IconButton
            onClick={handlePaymentDialogClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {bookingDetails && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Route: {bookingDetails.route.from} to {bookingDetails.route.to}</Typography>
              <Typography variant="body2">Date: {date ? date.toLocaleDateString() : 'N/A'}</Typography>
              <Typography variant="body2">Seats: {bookingDetails.seats.join(', ')}</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>Total Fare: ₹{bookingDetails.totalFare}</Typography>
            </Box>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Passenger Name"
            type="text"
            fullWidth
            variant="outlined"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            required
          />
          {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>} 
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handlePaymentDialogClose}>Cancel</Button>
          <Button 
            onClick={confirmAndSaveBooking} 
            variant="contained" 
            disabled={!passengerName.trim()} // Disable if name is empty
          >
            Confirm & Book
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;