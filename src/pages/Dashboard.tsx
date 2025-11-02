import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { RootState } from '../store';
import { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } from '../store/slices/companySlice';
import FormStep from '../components/FormStep';
import ProfileCard from '../components/ProfileCard';
import CompanyInfoStep from '../components/CompanyInfoStep';
import FoundingInfoStep from '../components/FoundingInfoStep';
import SocialMediaStep from '../components/SocialMediaStep';
import ContactStep from '../components/ContactStep';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.company);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const totalSteps = 4;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch company profile if user is authenticated
    dispatch(fetchProfileStart());
    // Mock API call - replace with actual API
    setTimeout(() => {
      if (profile) {
        dispatch(fetchProfileSuccess(profile));
      } else {
        // No profile exists, show registration form
        dispatch(fetchProfileFailure('No company profile found'));
      }
    }, 1000);
  }, [isAuthenticated, navigate, dispatch, profile]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    try {
      // Show loading state
      setIsFinishing(true);
      
      // Mock API call to save company setup data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success('Company setup completed successfully!');
      
      // Navigate directly to home page
      navigate('/home');
    } catch (error) {
      toast.error('Setup failed. Please try again.');
    } finally {
      setIsFinishing(false);
    }
  };

  const handleVerifyMobile = async () => {
    setIsVerifying(true);
    try {
      // Mock OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Mobile number verified successfully!');
      setShowVerificationModal(false);
      // Redirect to success page or update profile
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = () => {
    toast.info('OTP sent to your mobile number');
  };

  const handleReportIssue = () => {
    toast.info('Issue reported. We will contact you soon.');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep onNext={handleNext} />;
      case 2:
        return <FoundingInfoStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <SocialMediaStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <ContactStep onNext={handleFinish} onPrevious={handlePrevious} />;
      default:
        return <CompanyInfoStep onNext={handleNext} />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Company Info';
      case 2:
        return 'Founding Info';
      case 3:
        return 'Social Media Profile';
      case 4:
        return 'Contact';
      default:
        return 'Company Info';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return 'Upload your company logo and banner, and provide basic company information.';
      case 2:
        return 'Tell us about your company\'s founding details and industry information.';
      case 3:
        return 'Add your social media profiles to help candidates learn more about your company.';
      case 4:
        return 'Provide contact information for better communication with candidates.';
      default:
        return '';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  // If profile exists, show dashboard with profile cards
  if (profile) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <BusinessIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Jobpilot Dashboard
            </Typography>
            <Button color="inherit" onClick={() => navigate('/settings')}>
              Settings
            </Button>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome back, {user?.full_name}!
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <ProfileCard
                user={user || undefined}
                variant="user"
                onEdit={() => navigate('/settings')}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <ProfileCard
                company={profile}
                variant="company"
                onEdit={() => navigate('/settings')}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

  // Show multi-step registration form
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <BusinessIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jobpilot - Company Setup
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Setup Progress
            </Typography>
            <Box sx={{ width: 200 }}>
              <LinearProgress
                variant="determinate"
                value={(currentStep / totalSteps) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Typography variant="body2" color="primary">
              {Math.round((currentStep / totalSteps) * 100)}% Completed
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <FormStep
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onFinish={handleFinish}
          stepTitle={getStepTitle()}
          stepDescription={getStepDescription()}
          isLastStep={currentStep === totalSteps}
          isFirstStep={currentStep === 1}
          canProceed={true}
          isLoading={isFinishing}
        >
          {renderStepContent()}
        </FormStep>
      </Container>

      {/* Verification Modal */}
      <Dialog
        open={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="primary" />
            <Typography variant="h6">Great Almost done!</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Please verify your mobile no
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Alert severity="success" sx={{ borderRadius: 2 }}>
              <AlertTitle>Email Verification</AlertTitle>
              A verification link has been sent to your email. Please check your inbox and verify.
            </Alert>
            
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              <AlertTitle>Mobile Verification</AlertTitle>
              Enter the One Time Password (OTP) which has been sent to (+91 92222*****442)
            </Alert>
            
            <TextField
              fullWidth
              label="Enter Your OTP Here"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter Your OTP Here"
              sx={{ mt: 2 }}
            />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Didn't receive OTP?{' '}
                <Button
                  variant="text"
                  size="small"
                  onClick={handleResendOTP}
                  sx={{ textTransform: 'none' }}
                >
                  Resend OTP
                </Button>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Having Trouble?{' '}
                <Button
                  variant="text"
                  size="small"
                  onClick={handleReportIssue}
                  sx={{ textTransform: 'none' }}
                >
                  Report Issue!
                </Button>
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setShowVerificationModal(false)}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Close
          </Button>
          <Button
            onClick={handleVerifyMobile}
            variant="contained"
            disabled={!otp || isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify Mobile'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
