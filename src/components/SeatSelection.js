import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Tooltip,
} from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CloseIcon from '@mui/icons-material/Close';
import WomanIcon from '@mui/icons-material/Woman';

const SeatSelection = ({ open, onClose, busType, onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  // Removed: const [hoveredSeat, setHoveredSeat] = useState(null);

  // Generate seat layout based on bus type
  const totalSeats = busType === 'AC Sleeper' ? 30 : 40;
  const seatsPerRow = busType === 'AC Sleeper' ? 2 : 3;

  // Simulate some seats as already booked and some as women-only
  const bookedSeats = [3, 7, 12, 18, 25];
  const womenOnlySeats = [4, 8, 13, 19, 26];

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      }
      // Limit selection to 4 seats
      if (prev.length >= 4) return prev;
      return [...prev, seatNumber];
    });
  };

  const handleConfirm = () => {
    onSeatSelect(selectedSeats);
    onClose();
  };

  const getSeatColor = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return 'grey.400';
    if (womenOnlySeats.includes(seatNumber)) return 'pink.light';
    if (selectedSeats.includes(seatNumber)) return 'primary.main';
    return 'grey.100';
  };

  const getSeatTooltip = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return 'Already Booked';
    if (womenOnlySeats.includes(seatNumber)) return 'Women-Only Seat';
    if (selectedSeats.includes(seatNumber)) return 'Selected';
    return `Seat ${seatNumber}`;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: 'primary.light', color: 'white' }}>
        Select Your Seats
        <IconButton
          onClick={onClose}
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
          <Grid container spacing={2} justifyContent="center">
            {/* Legend */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventSeatIcon sx={{ color: 'grey.100', mr: 1 }} />
                    <Typography variant="body2">Available</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventSeatIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="body2">Selected</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventSeatIcon sx={{ color: 'grey.400', mr: 1 }} />
                    <Typography variant="body2">Booked</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                    <WomanIcon sx={{ color: 'pink', mr: 1 }} />
                    <Typography variant="body2">Women Only</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* Seat Layout */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container spacing={1} sx={{ maxWidth: 400 }}>
                  {Array.from({ length: totalSeats }, (_, index) => {
                    const seatNumber = index + 1;
                    return (
                      <Grid item xs={12 / seatsPerRow} key={seatNumber}>
                        <Tooltip title={getSeatTooltip(seatNumber)}>
                          <IconButton
                            onClick={() => handleSeatClick(seatNumber)}
                            disabled={bookedSeats.includes(seatNumber)}
                            sx={{
                              color: getSeatColor(seatNumber),
                              '&:hover': {
                                color: !bookedSeats.includes(seatNumber) ? 'primary.dark' : 'grey.400'
                              }
                            }}
                          >
                            {womenOnlySeats.includes(seatNumber) ? (
                              <WomanIcon />
                            ) : (
                              <EventSeatIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ flex: 1 }}>
          Selected: {selectedSeats.length} seat(s)
        </Typography>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={selectedSeats.length === 0}
        >
          Confirm Selection
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SeatSelection;