import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
} from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SecurityIcon from '@mui/icons-material/Security';
import WcIcon from '@mui/icons-material/Wc';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const AboutUs = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fff5f9 0%, #ffe6e6 100%)',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: '#FF4B91',
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            About PinkWheels
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              mb: 4
            }}
          >
            Empowering women through safe and comfortable travel experiences
          </Typography>
        </Box>

        {/* Mission Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            mb: 6, 
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 75, 145, 0.2)'
          }}
        >
          <Typography variant="h4" sx={{ color: '#FF4B91', mb: 3, fontWeight: 'bold' }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            At PinkWheels, we are committed to providing a safe, comfortable, and empowering travel experience for women. 
            Our women-only bus service ensures that every journey is not just a ride, but a step towards greater freedom 
            and independence for women travelers.
          </Typography>
        </Paper>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 75, 145, 0.2)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <WcIcon sx={{ fontSize: 40, color: '#FF4B91', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#FF4B91', mb: 2, fontWeight: 'bold' }}>
                Women-Only Service
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Exclusively designed for women travelers, ensuring a comfortable and secure journey.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 75, 145, 0.2)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <SecurityIcon sx={{ fontSize: 40, color: '#FF4B91', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#FF4B91', mb: 2, fontWeight: 'bold' }}>
                Enhanced Security
              </Typography>
              <Typography variant="body2" color="text.secondary">
                24/7 security monitoring and female staff on board for your safety.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 75, 145, 0.2)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <LocalPoliceIcon sx={{ fontSize: 40, color: '#FF4B91', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#FF4B91', mb: 2, fontWeight: 'bold' }}>
                Female Staff
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All our buses are staffed by trained female professionals.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Why Choose Us */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#FF4B91', 
              mb: 4, 
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Why Choose PinkWheels?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  mb: 3,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 75, 145, 0.2)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DirectionsBusIcon sx={{ color: '#FF4B91', mr: 2 }} />
                  <Typography variant="h6" sx={{ color: '#FF4B91', fontWeight: 'bold' }}>
                    Modern Fleet
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Our buses are equipped with modern amenities including comfortable seating, 
                  air conditioning, and entertainment systems.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  mb: 3,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 75, 145, 0.2)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SupportAgentIcon sx={{ color: '#FF4B91', mr: 2 }} />
                  <Typography variant="h6" sx={{ color: '#FF4B91', fontWeight: 'bold' }}>
                    24/7 Support
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Round-the-clock customer support to assist you with any queries or concerns.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  mb: 3,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 75, 145, 0.2)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmojiEventsIcon sx={{ color: '#FF4B91', mr: 2 }} />
                  <Typography variant="h6" sx={{ color: '#FF4B91', fontWeight: 'bold' }}>
                    Award-Winning Service
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Recognized for our commitment to women's safety and comfort in public transportation.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs; 