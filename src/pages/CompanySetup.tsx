import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { registerStart, registerSuccess, registerFailure } from '../store/slices/authSlice';
import FormStep from '../components/FormStep';
import CompanyInfoStep from '../components/CompanyInfoStep';
import FoundingInfoStep from '../components/FoundingInfoStep';
import SocialMediaStep from '../components/SocialMediaStep';
import ContactStep from '../components/ContactStep';
import { Container, Box } from '@mui/material';

const CompanySetup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 4;

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
    setIsLoading(true);
    dispatch(registerStart());

    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user data
      const mockUser = {
        id: 1,
        email: 'company@example.com',
        full_name: 'Company Name',
        signup_type: 'e' as const,
        gender: 'm' as const,
        mobile_no: '1234567890',
        is_mobile_verified: true,
        is_email_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      dispatch(registerSuccess({ user: mockUser, token: 'mock-token' }));
      
      toast.success('Company setup completed successfully!');
      navigate('/home');
    } catch (error) {
      dispatch(registerFailure('Company setup failed'));
      toast.error('Setup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
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
        return 'Company Information';
      case 2:
        return 'Founding Information';
      case 3:
        return 'Social Media Profile';
      case 4:
        return 'Contact Information';
      default:
        return 'Company Information';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return 'Tell us about your company and upload your logo and banner.';
      case 2:
        return 'Share details about when and how your company was founded.';
      case 3:
        return 'Add your social media profiles to help candidates learn more about your company.';
      case 4:
        return 'Provide your contact details for better communication with candidates.';
      default:
        return '';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
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
          isLoading={isLoading}
        >
          {renderCurrentStep()}
        </FormStep>
      </Container>
    </Box>
  );
};

export default CompanySetup;
