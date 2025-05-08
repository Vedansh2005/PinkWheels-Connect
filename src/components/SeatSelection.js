import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import SecurityIcon from '@mui/icons-material/Security';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import WcIcon from '@mui/icons-material/Wc';

const SeatSelection = ({ open, onClose, busType, onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalSeats = busType === 'Women\'s AC Sleeper' ? 30 : 40;
  const seatsPerRow = 4;
  const rows = Math.ceil(totalSeats / seatsPerRow);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      if (selectedSeats.length < 6) { // Limit to 6 seats per booking
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length > 0) {
      onSeatSelect(selectedSeats);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
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
        Select Your Seat
        <IconButton
          onClick={onClose}
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
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#FF4B91', fontWeight: 'bold' }}>
            Women's Safety Features
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
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
                <WcIcon sx={{ color: '#FF4B91' }} />
                <Typography variant="body2" sx={{ color: '#FF4B91', fontWeight: 'medium' }}>
                  Women-Only Seating
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
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
                <LocalPoliceIcon sx={{ color: '#FF4B91' }} />
                <Typography variant="body2" sx={{ color: '#FF4B91', fontWeight: 'medium' }}>
                  Female Staff
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
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
                <SecurityIcon sx={{ color: '#FF4B91' }} />
                <Typography variant="body2" sx={{ color: '#FF4B91', fontWeight: 'medium' }}>
                  24/7 Security
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#FF4B91', fontWeight: 'bold' }}>
            Seat Layout
          </Typography>
          <Grid container spacing={2}>
            {Array.from({ length: rows }, (_, rowIndex) => (
              <Grid item xs={12} key={rowIndex}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  {Array.from({ length: seatsPerRow }, (_, colIndex) => {
                    const seatNumber = rowIndex * seatsPerRow + colIndex + 1;
                    if (seatNumber <= totalSeats) {
                      return (
                        <Paper
                          key={seatNumber}
                          elevation={selectedSeats.includes(seatNumber) ? 3 : 1}
                          onClick={() => handleSeatClick(seatNumber)}
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            bgcolor: selectedSeats.includes(seatNumber) ? '#FF4B91' : 'white',
                            color: selectedSeats.includes(seatNumber) ? 'white' : 'text.primary',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          <EventSeatIcon />
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {seatNumber}
                          </Typography>
                        </Paper>
                      );
                    }
                    return null;
                  })}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Maximum 6 seats can be selected per booking
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onClose}
          sx={{
            color: '#FF4B91',
            '&:hover': { 
              backgroundColor: 'rgba(255, 75, 145, 0.05)'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
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
          Confirm Selection
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SeatSelection;