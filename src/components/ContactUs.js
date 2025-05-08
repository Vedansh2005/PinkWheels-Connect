import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setSnackbar({
      open: true,
      message: 'Thank you for your message! We will get back to you soon.',
      severity: 'success'
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Box 
      sx={{ 
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
            onClick={() => navigate('/view-bus')}
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
            View Bus
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
          Contact Us
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: '100%',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                border: '1px solid rgba(255, 75, 145, 0.2)'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#ff69b4' }}>
                Get in Touch
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ color: '#ff69b4', mr: 1 }} />
                  <Typography>
                    123 Pink Street, Women's Safety Zone<br />
                    New Delhi, India 110001
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ color: '#ff69b4', mr: 1 }} />
                  <Typography>
                    +91 1800-XXX-XXXX
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ color: '#ff69b4', mr: 1 }} />
                  <Typography>
                    support@pinkwheels.com
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ color: '#ff69b4', mr: 1 }} />
                  <Typography>
                    Monday - Sunday: 24/7 Support
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                border: '1px solid rgba(255, 75, 145, 0.2)'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#ff69b4' }}>
                Send us a Message
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#ff69b4',
                          },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#ff69b4',
                          },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#ff69b4',
                          },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#ff69b4',
                          },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(45deg, #FF4B91 30%, #FF8DC7 90%)',
                        color: 'white',
                        borderRadius: '25px',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          background: 'linear-gradient(45deg, #D80032 30%, #FF4B91 90%)',
                        }
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs; 