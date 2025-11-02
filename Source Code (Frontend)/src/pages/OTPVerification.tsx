import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  AlertTitle,
  IconButton,
} from '@mui/material';
import {
  Sms as SmsIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { registerSuccess, registerFailure } from '../store/slices/authSlice';
import { supabaseAuth } from '../services/supabaseAuth';

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Get user data from location state
  const userData = location.state?.userData;
  const session = location.state?.session;

  // Fallback data if no user data is provided
  const displayEmail = userData?.email || 'your email';
  const displayMobile = userData?.mobile_no || 'your mobile number';

  useEffect(() => {
    // Redirect to registration if no user data is provided
    if (!userData) {
      toast.error('Please complete registration first.');
      navigate('/register');
      return;
    }

    // Start countdown for resend OTP
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShowResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [userData, navigate]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setIsLoading(true);

    try {
      // Mock OTP verification - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!session || !session.user) {
        throw new Error('Session not found. Please try registering again.');
      }

      // Update user profile with verification status
      await supabaseAuth.updateProfile({
        is_mobile_verified: true,
        is_email_verified: true,
      });

      // Convert Supabase user to app user format
      const appUser = supabaseAuth.convertToAppUser(session.user);
      
      dispatch(registerSuccess({ user: appUser, token: session.access_token }));
      
      toast.success('Mobile number verified successfully!');
      navigate('/home'); // Go to home page
    } catch (error: any) {
      console.error('OTP verification error:', error);
      dispatch(registerFailure('OTP verification failed'));
      toast.error(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Mock resend OTP - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('OTP sent successfully!');
      setCountdown(30);
      setShowResend(false);
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  const handleClose = () => {
    navigate('/login');
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
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{ p: 4, borderRadius: 2, position: 'relative' }}>
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'text.secondary',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Great! Almost done!
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Please verify your mobile no
            </Typography>
          </Box>

          {/* Success Alert - Email Verification */}
          <Alert
            severity="success"
            icon={<CheckCircleIcon />}
            sx={{ mb: 2 }}
          >
            <AlertTitle>Email Verification</AlertTitle>
            A verification link has been sent to <strong>{displayEmail}</strong>. Please check your inbox and click the verification link to complete email verification.
          </Alert>

          {/* Info Alert - OTP Verification */}
          <Alert
            severity="info"
            icon={<SmsIcon />}
            sx={{ mb: 3 }}
          >
            <AlertTitle>Mobile Verification</AlertTitle>
            Enter the One Time Password (OTP) which has been sent to <strong>{displayMobile}</strong>
          </Alert>

          {/* OTP Input Fields */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom sx={{ mb: 2, textAlign: 'center' }}>
              Enter Your OTP Here
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  ref={(el: HTMLInputElement | null) => {
                    inputRefs.current[index] = el;
                  }}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: 'center', fontSize: '1.5rem' },
                  }}
                  sx={{
                    width: 50,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Resend OTP Section */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            {showResend ? (
              <Link
                component="button"
                variant="body2"
                onClick={handleResendOtp}
                sx={{ textDecoration: 'none', mr: 2 }}
              >
                Didn't receive OTP? Resend OTP
              </Link>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Resend OTP in {countdown}s
              </Typography>
            )}
            <br />
            <Link
              component="button"
              variant="body2"
              sx={{ textDecoration: 'none', mt: 1 }}
            >
              Having Trouble? Report Issue!
            </Link>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleClose}
              sx={{ py: 1.5 }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleVerify}
              disabled={isLoading || otp.join('').length !== 6}
              sx={{ py: 1.5 }}
            >
              {isLoading ? 'Verifying...' : 'Verify Mobile'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default OTPVerification;
