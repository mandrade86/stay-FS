import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Subscription Manager
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, {user?.fullName}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to your subscription management dashboard!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a simple dashboard. In a real application, you would see:
          </Typography>
          <Box component="ul" sx={{ mt: 2, pl: 2 }}>
            <Typography component="li">Your active subscriptions</Typography>
            <Typography component="li">Upcoming deliveries</Typography>
            <Typography component="li">Product recommendations</Typography>
            <Typography component="li">Account settings</Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Layout;
