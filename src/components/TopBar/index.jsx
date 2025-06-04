import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/admin/logout', {
        method: 'POST',
      });

      if (response.ok) {
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Logout failed');
      }
    } catch (err) {
      setError('Failed to logout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            Photo Sharing App
          </Typography>
          {user ? (
            <>
              <Typography variant="body1" color="inherit" sx={{ mr: 2 }}>
                Hi {user.first_name}
              </Typography>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    Logging out...
                  </>
                ) : (
                  'Logout'
                )}
              </Button>
            </>
          ) : (
            <Button 
              color="inherit" 
              onClick={() => navigate('/login')}
              disabled={loading}
            >
              Please Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TopBar;