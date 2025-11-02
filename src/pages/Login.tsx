import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { supabaseAuth } from '../services/supabaseAuth';
import type { LoginCredentials } from '../types/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    dispatch(loginStart());

    try {
      // Sign in with Supabase
      const { user, session } = await supabaseAuth.signIn(data);
      
      if (!user || !session) {
        throw new Error('Login failed. Please check your credentials.');
      }

      // Convert Supabase user to app user format
      const appUser = supabaseAuth.convertToAppUser(user);
      
      dispatch(loginSuccess({ user: appUser, token: session.access_token }));
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      dispatch(loginFailure(error.message || 'Login failed. Please try again.'));
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
          {/* Left Side - Image Placeholder */}
          <Box sx={{ flex: 1, minHeight: 500 }}>
            <Paper
              elevation={8}
              sx={{
                height: 500,
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color="white" sx={{ opacity: 0.8 }}>
                IMG Placeholder
              </Typography>
            </Paper>
          </Box>

          {/* Right Side - Login Form */}
          <Box sx={{ flex: 1 }}>
            <Paper elevation={8} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Login as a Company
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Email ID"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ textAlign: 'right', mb: 2 }}>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ textDecoration: 'none' }}
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle OTP login
                    }}
                  >
                    Login with OTP
                  </Link>
                </Box>

                <TextField
                  fullWidth
                  label="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ textAlign: 'right', mb: 3 }}>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ textDecoration: 'none' }}
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle forgot password
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    mb: 2,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                  }}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate('/register')}
                      sx={{ textDecoration: 'none', fontWeight: 'bold' }}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
