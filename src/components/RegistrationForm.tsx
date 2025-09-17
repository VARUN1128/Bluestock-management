import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { registerStart } from '../store/slices/authSlice';
import { supabaseAuth } from '../services/supabaseAuth';
import type { RegisterData } from '../types/auth.js';

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterData & { confirmPassword: string; terms: boolean }>();

  const password = watch('password');

  const onSubmit = async (data: RegisterData & { confirmPassword: string; terms: boolean }) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!data.terms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);
    dispatch(registerStart());

    try {
      const { confirmPassword, terms, ...registerData } = data;
      
      // Sign up with Supabase Auth
      const { user, session } = await supabaseAuth.signUp(registerData);
      
      if (!user) {
        throw new Error('Registration failed. Please try again.');
      }

      toast.success('Registration successful! Please check your email for verification and verify your mobile number.');
      
      // Navigate to OTP verification with user data
      navigate('/otp-verification', {
        state: {
          userData: registerData,
          userId: user.id,
          session: session,
        },
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
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
          <Box sx={{ flex: 1, minHeight: 600 }}>
            <Paper
              elevation={8}
              sx={{
                height: 600,
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

          {/* Right Side - Registration Form */}
          <Box sx={{ flex: 1 }}>
            <Paper elevation={8} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Register as a Company
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Create your company account to start posting jobs and managing candidates.
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Full Name"
                  {...register('full_name', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Full name must be at least 2 characters',
                    },
                  })}
                  error={!!errors.full_name}
                  helperText={errors.full_name?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Country</InputLabel>
                    <Controller
                      name="country_code"
                      control={control}
                      defaultValue="+91"
                      render={({ field }) => (
                        <Select {...field} label="Country">
                          <MenuItem value="+91">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FlagIcon sx={{ fontSize: 20 }} />
                              <Typography>IN (+91)</Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem value="+1">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FlagIcon sx={{ fontSize: 20 }} />
                              <Typography>US (+1)</Typography>
                            </Box>
                          </MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Mobile No"
                    type="tel"
                    {...register('mobile_no', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit mobile number',
                      },
                    })}
                    error={!!errors.mobile_no}
                    helperText={errors.mobile_no?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Organization Email"
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

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Gender
                  </Typography>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue="m"
                    render={({ field }) => (
                      <ToggleButtonGroup
                        {...field}
                        exclusive
                        fullWidth
                        sx={{ mb: 2 }}
                      >
                        <ToggleButton value="m" sx={{ py: 1.5 }}>
                          MALE
                        </ToggleButton>
                        <ToggleButton value="f" sx={{ py: 1.5 }}>
                          FEMALE
                        </ToggleButton>
                        <ToggleButton value="o" sx={{ py: 1.5 }}>
                          OTHER
                        </ToggleButton>
                      </ToggleButtonGroup>
                    )}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
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

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <FormControlLabel
                  control={
                    <Controller
                      name="terms"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                        />
                      )}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      All your information is collected, stored and processed as per our data processing guidelines. By signing or registering, you agree to our{' '}
                      <Link href="#" color="primary">
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link href="#" color="primary">
                        Terms of use
                      </Link>
                      .
                    </Typography>
                  }
                  sx={{ mb: 3, alignItems: 'flex-start' }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{ py: 1.5, mb: 2 }}
                >
                  {isLoading ? 'Creating Account...' : 'Register'}
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate('/login')}
                      sx={{ textDecoration: 'none' }}
                    >
                      Login
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

export default RegistrationForm;
