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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SeatSelection from './SeatSelection';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const routes = [
  { 
    id: 1, 
    from: 'Mumbai', 
    to: 'Pune', 
    basePrice: 300, 
    timings: [
      { departureTime: '08:00', arrivalTime: '11:00' },
      { departureTime: '10:00', arrivalTime: '13:00' },
      { departureTime: '14:00', arrivalTime: '17:00' },
      { departureTime: '18:00', arrivalTime: '21:00' }
    ],
    busType: 'Women\'s AC Seater',
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
    busType: 'Women\'s AC Sleeper',
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

const cityToStateMap = {
  'Mumbai': 'MH',
  'Pune': 'MH',
  'Nashik': 'MH',
  'Delhi': 'DL',
  'Agra': 'UP',
  'Jaipur': 'RJ',
  'Bangalore': 'KA',
  'Chennai': 'TN',
  'Hyderabad': 'TS',
  'Kolkata': 'WB',
  'Bhubaneswar': 'OD',
  'Ahmedabad': 'GJ',
  'Surat': 'GJ'
};

// Add theme colors
const theme = {
  primary: {
    main: '#FF4B91',
    light: '#FF8DC7',
    dark: '#D80032',
    contrastText: '#fff'
  },
  secondary: {
    main: '#FFB4B4',
    light: '#FFE6E6',
    dark: '#FF8FB1',
    contrastText: '#fff'
  },
  background: {
    default: '#FFF5F9',
    paper: '#FFFFFF'
  }
};

const Home = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [seatSelectionOpen, setSeatSelectionOpen] = useState(false);
  const [passengerName, setPassengerName] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [fakePaymentDialogOpen, setFakePaymentDialogOpen] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [upiId] = useState('pinkwheels@upi'); // Your UPI ID
  const [selectedTiming, setSelectedTiming] = useState(null);
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [myBookingsOpen, setMyBookingsOpen] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const navigate = useNavigate();

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

    // Save search details to localStorage
    localStorage.setItem('searchDetails', JSON.stringify({ from, to, date: date.toISOString() }));

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

  const calculateFare = useCallback((route, seatCount) => {
    const baseFare = route.basePrice;
    const distanceFactor = route.distance / 100; // Price increase per 100km
    const busTypeFactor = route.busType === 'AC Sleeper' ? 1.2 : 1; // 20% more for sleeper
    
    return Math.round(baseFare * seatCount * distanceFactor * busTypeFactor);
  }, []);

  const initiateBookingProcess = (seats) => {
    const totalFare = calculateFare(selectedRoute, seats.length);
    setBookingDetails({ route: selectedRoute, seats, totalFare });
    setSeatSelectionOpen(false);
    setPaymentDialogOpen(true); // Open payment dialog
  };

  const openSeatSelection = (route) => {
    setSelectedRoute(route);
    setPassengerName(''); // Reset passenger name when opening seat selection
    setSeatSelectionOpen(true);

    // Retrieve search details from localStorage
    const searchDetails = JSON.parse(localStorage.getItem('searchDetails') || '{}');
    if (searchDetails) {
      setFrom(searchDetails.from || '');
      setTo(searchDetails.to || '');
      setDate(searchDetails.date ? new Date(searchDetails.date) : null);
    }
  };

  const generateTicketQR = () => {
    // Generate a random booking reference
    const bookingRef = 'BW' + Math.random().toString(36).substr(2, 9).toUpperCase();
    return bookingRef;
  };

  const generateBusNumber = (fromCity) => {
    // Get state code based on departure city
    const stateCode = cityToStateMap[fromCity] || 'MH'; // Default to MH if city not found
    const districts = ['01', '02', '03', '04', '05', '06'];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    const district = districts[Math.floor(Math.random() * districts.length)];
    const letter1 = letters[Math.floor(Math.random() * letters.length)];
    const letter2 = letters[Math.floor(Math.random() * letters.length)];
    const number = Math.floor(1000 + Math.random() * 9000);
    
    return `${stateCode}-${district}-${letter1}${letter2}-${number}`;
  };

  const handlePrintTicket = () => {
    const bookingRef = generateTicketQR();
    const busNumber = generateBusNumber(bookingDetails.route.from); // Pass the departure city
    setTicketDetails({
      ...bookingDetails,
      bookingRef,
      busNumber,
      timing: selectedTiming,
      date: date.toISOString(),
      passengerName: passengerName,
      selectedSeats: bookingDetails.seats
    });
    setTicketDialogOpen(true);
  };

  const confirmAndSaveBooking = () => {
    if (!passengerName.trim()) {
      setError('Please enter passenger name.');
      return;
    }
    if (!bookingDetails || !selectedTiming) {
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
        booking.passengerName === passengerName.trim() &&
        booking.departureTime === selectedTiming.departureTime &&
        booking.status === 'Confirmed'
      );

      if (isDuplicate) {
        setError('You already have a confirmed booking for this route, timing, and passenger on the selected date.');
        setPaymentDialogOpen(false);
        return;
      }

      const newBooking = {
        id: Date.now(),
        ...route,
        passengerName: passengerName.trim(),
        date: date.toISOString(),
        departureTime: selectedTiming.departureTime,
        arrivalTime: selectedTiming.arrivalTime,
        status: 'Confirmed',
        paymentStatus: 'Paid',
        bookingDate: new Date().toISOString(),
        selectedSeats: seats,
        totalFare: totalFare
      };
      
      bookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      setBookingSuccess(true);
      setPaymentDialogOpen(false);
      handlePrintTicket();
      setTimeout(() => setBookingSuccess(false), 3000);
      
      // Reset form
      setFrom('');
      setTo('');
      setDate(null);
      setSearchResults([]);
      setSelectedRoute(null);
      setSelectedTiming(null);
      setPassengerName('');
      setBookingDetails(null);
      setError('');
    } catch (err) {
      console.error('Booking error:', err);
      setError('Failed to save booking. Please try again.');
    }
  };

  const handlePaymentDialogClose = () => {
    setPaymentDialogOpen(false);
    setPassengerName(''); // Reset passenger name
    setBookingDetails(null); // Reset booking details
  };

  const handleFakePayment = () => {
    setFakePaymentDialogOpen(true);
  };

  const handleScreenshotUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentScreenshot(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaymentConfirmation = () => {
    if (!paymentScreenshot) {
      setError('Please upload payment screenshot');
      return;
    }
    setFakePaymentDialogOpen(false);
    confirmAndSaveBooking();
  };

  const loadBookings = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setMyBookings(bookings);
  };

  const handleMyBookingsOpen = () => {
    loadBookings();
    setMyBookingsOpen(true);
  };

  const handleViewTicket = (booking) => {
    setSelectedBooking(booking);
    setTicketDialogOpen(true);
  };

  const handleCancelBooking = (booking) => {
    setBookingToCancel(booking);
    setCancelDialogOpen(true);
  };

  const confirmCancelBooking = () => {
    if (!bookingToCancel) return;

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingToCancel.id) {
        return { ...booking, status: 'Cancelled' };
      }
      return booking;
    });
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setMyBookings(updatedBookings);
    setCancelDialogOpen(false);
    setBookingToCancel(null);
  };

  return (
    <Box 
      sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        px: { xs: 2, md: 4 }, 
        py: 4,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fff5f9 0%, #ffe6e6 100%)',
        position: 'relative',
        mt: 8 // Add margin top to account for fixed navigation
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
            variant="contained"
            onClick={handleMyBookingsOpen}
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
            My Bookings
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

      {/* Add padding to account for fixed navigation */}
      <Box sx={{ pt: 8 }}>
        {/* Main Content */}
        <Box sx={{ pt: 10 }}>
          {/* Hero Section */}
          <Box 
            sx={{ 
              mb: 6,
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #FF4B91 0%, #FF8DC7 100%)',
                borderRadius: '2px'
              }
            }}
          >
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                color: theme.primary.main,
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                animation: 'fadeInDown 1s ease-out'
              }}
            >
              Safe Journey for Women
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                animation: 'fadeInUp 1s ease-out'
              }}
            >
              Book your women-only bus tickets with comfort and security. Travel safely with PinkWheels.
            </Typography>

            {/* Add Women's Safety Features */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  borderRadius: 2,
                  background: 'rgba(255, 75, 145, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Typography variant="body1" sx={{ color: theme.primary.main, fontWeight: 'medium' }}>
                  🚺 Women-Only Buses
                </Typography>
              </Paper>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  borderRadius: 2,
                  background: 'rgba(255, 75, 145, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Typography variant="body1" sx={{ color: theme.primary.main, fontWeight: 'medium' }}>
                  👮‍♀️ Female Staff
                </Typography>
              </Paper>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  borderRadius: 2,
                  background: 'rgba(255, 75, 145, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Typography variant="body1" sx={{ color: theme.primary.main, fontWeight: 'medium' }}>
                  🛡️ Safe Travel
                </Typography>
              </Paper>
            </Box>

            {/* Search Card */}
            <Card 
              sx={{ 
                mb: 4, 
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 75, 145, 0.2)',
                transition: 'all 0.3s ease',
                animation: 'fadeIn 1s ease-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px rgba(255, 75, 145, 0.15)'
                }
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5} md={5} lg={4}>
                    <FormControl fullWidth>
                      <InputLabel>From</InputLabel>
                      <Select
                        value={from}
                        label="From"
                        onChange={(e) => setFrom(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 75, 145, 0.3)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 75, 145, 0.5)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.primary.main,
                          }
                        }}
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
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 75, 145, 0.3)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 75, 145, 0.5)',
                          },
                        }}
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
                              error: !date && error?.includes('date'),
                              sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'rgba(255, 75, 145, 0.3)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'rgba(255, 75, 145, 0.5)',
                                },
                              }
                          }
                        }}
                        minDate={new Date()}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={loading || !from || !to || !date}
                    sx={{
                      background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: '25px',
                      px: 6,
                      py: 1.5,
                      boxShadow: '0 4px 20px rgba(255, 75, 145, 0.3)',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 25px rgba(255, 75, 145, 0.4)',
                        background: 'linear-gradient(45deg, #D80032 30%, #FF4B91 90%)',
                      },
                      '&:disabled': {
                        background: 'linear-gradient(45deg, #FFB4B4 30%, #FFE6E6 90%)',
                        transform: 'none',
                        boxShadow: 'none',
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Search Routes'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Alerts Section */}
          <Box sx={{ mb: 4 }}>
          {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
              {error}
            </Alert>
          )}
          {bookingSuccess && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
              Booking confirmed! Check My Bookings for details.
            </Alert>
          )}
          </Box>

          {/* Search Results Section */}
          <Box sx={{ mt: 6 }}>
            {searchResults.length > 0 && (
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 4, 
                  color: theme.primary.main,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  position: 'relative',
                  animation: 'fadeInDown 0.5s ease-out',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #FF4B91 0%, #FF8DC7 100%)',
                    borderRadius: '2px'
                  }
                }}
              >
                Available Buses
              </Typography>
            )}
            <Grid container spacing={3}>
              {searchResults.map((route, index) => (
                <Grid item xs={12} key={route.id}>
                  <Fade in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Card 
                      sx={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 75, 145, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 30px rgba(255, 75, 145, 0.15)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs={12} sm={8}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <DirectionsBusIcon sx={{ mr: 1, color: theme.primary.main, fontSize: '2rem' }} />
                              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                {route.from} to {route.to}
                              </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" gutterBottom sx={{ color: theme.primary.main }}>
                              Available Timings:
                            </Typography>
                            <Grid container spacing={2}>
                              {route.timings.map((timing, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                  <Paper
                                    elevation={selectedTiming === timing ? 3 : 1}
                                    sx={{
                                      p: 2,
                                      cursor: 'pointer',
                                      bgcolor: selectedTiming === timing ? theme.primary.light : 'background.paper',
                                      color: selectedTiming === timing ? 'white' : 'text.primary',
                                      borderRadius: 2,
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        bgcolor: selectedTiming === timing ? theme.primary.main : 'grey.100',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                      }
                                    }}
                                    onClick={() => setSelectedTiming(timing)}
                                  >
                                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                      {timing.departureTime} - {timing.arrivalTime}
                                    </Typography>
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                              <AirlineSeatReclineNormalIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1.5rem' }} />
                              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                                {route.busType}
                              </Typography>
                            </Box>
                            <Paper 
                              elevation={0} 
                              sx={{ 
                                mt: 2, 
                                p: 1.5, 
                                bgcolor: theme.primary.light, 
                                borderRadius: 2,
                                display: 'inline-block',
                                boxShadow: '0 2px 8px rgba(255, 75, 145, 0.2)'
                              }}
                            >
                              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                                ₹{route.basePrice}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Box sx={{ 
                              textAlign: 'right',
                              p: 2,
                              borderRadius: 2,
                              bgcolor: 'rgba(255, 75, 145, 0.05)'
                            }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Available Seats: {route.availableSeats}
                              </Typography>
                              {selectedTiming && (
                                <>
                                  <Button
                                    variant="contained"
                                    onClick={() => openSeatSelection(route)}
                                    sx={{ 
                                      mt: 2, 
                                      backgroundColor: theme.primary.main, 
                                      '&:hover': { backgroundColor: theme.primary.dark },
                                      width: { xs: '100%', sm: 'auto' },
                                      borderRadius: 2,
                                      boxShadow: '0 4px 12px rgba(255, 75, 145, 0.3)',
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 15px rgba(255, 75, 145, 0.4)'
                                      }
                                    }}
                                  >
                                    Select Seats & Book
                                  </Button>
                                </>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Seat Selection Dialog */}
          {selectedRoute && (
            <SeatSelection
              open={seatSelectionOpen}
              onClose={() => setSeatSelectionOpen(false)}
              busType={selectedRoute.busType}
              onSeatSelect={initiateBookingProcess}
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
                onClick={handleFakePayment} 
                variant="contained" 
                disabled={!passengerName.trim()} // Disable if name is empty
              >
                Proceed to Payment
              </Button>
            </DialogActions>
          </Dialog>

          {/* Fake Payment Dialog */}
          <Dialog open={fakePaymentDialogOpen} onClose={() => setFakePaymentDialogOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, bgcolor: 'primary.light', color: 'white' }}>
              Payment Details
              <IconButton
                onClick={() => setFakePaymentDialogOpen(false)}
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
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Pay using UPI
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
                  <Typography variant="body1" gutterBottom>
                    UPI ID: {upiId}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Amount: ₹{bookingDetails?.totalFare}
                  </Typography>
                </Paper>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Upload Payment Screenshot
                </Typography>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="screenshot-upload"
                  type="file"
                  onChange={handleScreenshotUpload}
                />
                <label htmlFor="screenshot-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Upload Screenshot
                  </Button>
                </label>

                {paymentScreenshot && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img
                      src={paymentScreenshot}
                      alt="Payment Screenshot"
                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                  </Box>
                )}

                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setFakePaymentDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={handlePaymentConfirmation}
                variant="contained"
                disabled={!paymentScreenshot}
              >
                Confirm Payment
              </Button>
            </DialogActions>
          </Dialog>

          {/* Ticket Dialog */}
          <Dialog 
            open={ticketDialogOpen} 
            onClose={() => {
              setTicketDialogOpen(false);
              setSelectedBooking(null);
            }} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            <DialogTitle 
              sx={{ 
                m: 0, 
                p: 2, 
                background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
                color: 'white',
                borderRadius: '12px 12px 0 0'
              }}
            >
              {selectedBooking ? 'Previous Ticket' : 'Your Ticket'}
              <IconButton
                onClick={() => {
                  setTicketDialogOpen(false);
                  setSelectedBooking(null);
                }}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {(selectedBooking || ticketDetails) && (
                <Box sx={{ p: 2 }}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 3, 
                      mb: 3,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #ffffff 0%, #fff5f9 100%)',
                      boxShadow: '0 4px 20px rgba(255, 75, 145, 0.1)',
                      animation: 'fadeIn 0.5s ease-out'
                    }}
                  >
                    <Typography variant="h5" gutterBottom align="center" sx={{ color: 'primary.main' }}>
                      PinkWheels Bus Ticket
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Booking Reference:</Typography>
                        <Typography variant="body1" gutterBottom>
                          {selectedBooking?.bookingRef || ticketDetails?.bookingRef || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Bus Number:</Typography>
                        <Typography variant="body1" gutterBottom>
                          {selectedBooking?.busNumber || ticketDetails?.busNumber || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Passenger Name:</Typography>
                        <Typography variant="body1" gutterBottom sx={{ fontWeight: 'medium' }}>
                          {selectedBooking?.passengerName || ticketDetails?.passengerName || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">From:</Typography>
                        <Typography variant="body1" gutterBottom>
                          {selectedBooking?.from || ticketDetails?.route?.from || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">To:</Typography>
                        <Typography variant="body1" gutterBottom>
                          {selectedBooking?.to || ticketDetails?.route?.to || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Date:</Typography>
                        <Typography variant="body1" gutterBottom>
                          {selectedBooking?.date || ticketDetails?.date ? 
                            new Date(selectedBooking?.date || ticketDetails?.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            }) : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Time:</Typography>
                        <Typography variant="body1" gutterBottom>
                          {selectedBooking ? 
                            `${selectedBooking.departureTime} - ${selectedBooking.arrivalTime}` :
                            ticketDetails?.timing ? 
                            `${ticketDetails.timing.departureTime} - ${ticketDetails.timing.arrivalTime}` : 
                            'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Seats:</Typography>
                        <Typography variant="body1" gutterBottom sx={{ fontWeight: 'medium' }}>
                          {selectedBooking?.selectedSeats?.join(', ') || 
                           ticketDetails?.selectedSeats?.join(', ') || 
                           'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">Total Fare:</Typography>
                        <Typography variant="body1" gutterBottom>
                          ₹{selectedBooking?.totalFare || ticketDetails?.totalFare || 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      {(selectedBooking?.bookingRef || ticketDetails?.bookingRef) && (
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${selectedBooking?.bookingRef || ticketDetails?.bookingRef}`}
                          alt="Ticket QR Code"
                          style={{ maxWidth: '150px' }}
                        />
                      )}
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 2, 
                        textAlign: 'center', 
                        color: 'text.secondary',
                        fontStyle: 'italic'
                      }}
                    >
                      Please show this ticket to the bus conductor
                    </Typography>
                  </Paper>
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button 
                onClick={() => {
                  setTicketDialogOpen(false);
                  setSelectedBooking(null);
                }}
                sx={{
                  color: theme.primary.main,
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 75, 145, 0.05)'
                  }
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => window.print()}
                sx={{
                  background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
                  color: 'white',
                  borderRadius: '20px',
                  px: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(255, 75, 145, 0.3)',
                    background: 'linear-gradient(45deg, #D80032 30%, #FF4B91 90%)',
                  }
                }}
              >
                Print Ticket
              </Button>
            </DialogActions>
          </Dialog>

          {/* My Bookings Dialog */}
          <Dialog 
            open={myBookingsOpen} 
            onClose={() => setMyBookingsOpen(false)} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            <DialogTitle 
              sx={{ 
                m: 0, 
                p: 2, 
                background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
                color: 'white',
                borderRadius: '12px 12px 0 0'
              }}
            >
              My Bookings
              <IconButton
                onClick={() => setMyBookingsOpen(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {myBookings.length === 0 ? (
                <Box sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  animation: 'fadeIn 0.5s ease-out'
                }}>
                  <Typography variant="h6" color="text.secondary">
                    No bookings found
                  </Typography>
                </Box>
              ) : (
                <TableContainer 
                  component={Paper} 
                  sx={{ 
                    mt: 2,
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    animation: 'fadeIn 0.5s ease-out'
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow sx={{ 
                        background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
                        '& th': {
                          color: 'white',
                          fontWeight: 'bold'
                        }
                      }}>
                        <TableCell sx={{ color: 'white' }}>Booking Ref</TableCell>
                        <TableCell sx={{ color: 'white' }}>From</TableCell>
                        <TableCell sx={{ color: 'white' }}>To</TableCell>
                        <TableCell sx={{ color: 'white' }}>Date</TableCell>
                        <TableCell sx={{ color: 'white' }}>Time</TableCell>
                        <TableCell sx={{ color: 'white' }}>Seats</TableCell>
                        <TableCell sx={{ color: 'white' }}>Fare</TableCell>
                        <TableCell sx={{ color: 'white' }}>Status</TableCell>
                        <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myBookings.map((booking) => (
                        <TableRow 
                          key={booking.id}
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: 'rgba(255, 75, 145, 0.05)',
                              transition: 'background-color 0.3s ease'
                            } 
                          }}
                        >
                          <TableCell>{booking.bookingRef || 'N/A'}</TableCell>
                          <TableCell>{booking.from}</TableCell>
                          <TableCell>{booking.to}</TableCell>
                          <TableCell>
                            {new Date(booking.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </TableCell>
                          <TableCell>{`${booking.departureTime} - ${booking.arrivalTime}`}</TableCell>
                          <TableCell>{booking.selectedSeats?.join(', ') || 'N/A'}</TableCell>
                          <TableCell>₹{booking.totalFare}</TableCell>
                          <TableCell>
                            <Typography
                              sx={{
                                color: booking.status === 'Confirmed' ? 'success.main' : 
                                       booking.status === 'Cancelled' ? 'error.main' : 'warning.main',
                                fontWeight: 'bold'
                              }}
                            >
                              {booking.status}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleViewTicket(booking)}
                                sx={{
                                  background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
                                  color: 'white',
                                  borderRadius: '20px',
                                  minWidth: '100px',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(255, 75, 145, 0.3)',
                                    background: 'linear-gradient(45deg, #D80032 30%, #FF4B91 90%)',
                                  }
                                }}
                              >
                                View Ticket
                              </Button>
                              {booking.status === 'Confirmed' && (
                                <Button
                                  variant="outlined"
                                  size="small"
                                  onClick={() => handleCancelBooking(booking)}
                                  sx={{
                                    borderColor: 'error.main',
                                    color: 'error.main',
                                    borderRadius: '20px',
                                    minWidth: '100px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      borderColor: 'error.dark',
                                      backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)',
                                    }
                                  }}
                                >
                                  Cancel
                                </Button>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button 
                onClick={() => setMyBookingsOpen(false)}
                sx={{
                  color: theme.primary.main,
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 75, 145, 0.05)'
                  }
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Cancel Booking Confirmation Dialog */}
          <Dialog
            open={cancelDialogOpen}
            onClose={() => setCancelDialogOpen(false)}
            maxWidth="xs"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            <DialogTitle 
              sx={{ 
                m: 0, 
                p: 2, 
                background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
                color: 'white',
                borderRadius: '12px 12px 0 0'
              }}
            >
              Cancel Booking
              <IconButton
                onClick={() => setCancelDialogOpen(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Are you sure you want to cancel this booking?
                </Typography>
                {bookingToCancel && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">
                      From: {bookingToCancel.from}
                    </Typography>
                    <Typography variant="body1">
                      To: {bookingToCancel.to}
                    </Typography>
                    <Typography variant="body1">
                      Date: {new Date(bookingToCancel.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </Typography>
                    <Typography variant="body1">
                      Time: {bookingToCancel.departureTime} - {bookingToCancel.arrivalTime}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: 'error.main' }}>
                      Note: Cancellation is subject to our cancellation policy.
                    </Typography>
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button 
                onClick={() => setCancelDialogOpen(false)}
                sx={{
                  color: theme.primary.main,
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 75, 145, 0.05)'
                  }
                }}
              >
                No, Keep Booking
              </Button>
              <Button
                variant="contained"
                onClick={confirmCancelBooking}
                sx={{
                  background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
                  color: 'white',
                  borderRadius: '20px',
                  px: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)',
                    background: 'linear-gradient(45deg, #b71c1c 30%, #d32f2f 90%)',
                  }
                }}
              >
                Yes, Cancel Booking
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>

      {/* Add keyframe animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Home;