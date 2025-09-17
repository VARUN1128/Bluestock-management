import React from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Info as InfoIcon,
  Share as ShareIcon,
  ContactPhone as ContactIcon,
} from '@mui/icons-material';

interface FormStepProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onFinish?: () => void;
  children: React.ReactNode;
  stepTitle: string;
  stepDescription?: string;
  isLastStep?: boolean;
  isFirstStep?: boolean;
  canProceed?: boolean;
  isLoading?: boolean;
}

const stepIcons = [
  <BusinessIcon key="company" />,
  <InfoIcon key="info" />,
  <ShareIcon key="social" />,
  <ContactIcon key="contact" />,
];

const stepLabels = [
  'Company Info',
  'Founding Info',
  'Social Media',
  'Contact',
];

const FormStep: React.FC<FormStepProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onFinish,
  children,
  stepTitle,
  stepDescription,
  isLastStep = false,
  isFirstStep = false,
  canProceed = true,
  isLoading = false,
}) => {
  const handleNext = () => {
    if (isLastStep && onFinish) {
      onFinish();
    } else {
      onNext();
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
      {/* Progress Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" color="primary">
            Jobpilot
          </Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">
              Setup Progress
            </Typography>
            <Box sx={{ width: 200, mt: 1 }}>
              <Box
                sx={{
                  width: '100%',
                  height: 8,
                  backgroundColor: 'grey.200',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: `${(currentStep / totalSteps) * 100}%`,
                    height: '100%',
                    backgroundColor: 'primary.main',
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
              <Typography variant="caption" color="primary" sx={{ mt: 0.5, display: 'block' }}>
                {Math.round((currentStep / totalSteps) * 100)}% Completed
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Step Navigation */}
        <Stepper activeStep={currentStep - 1} alternativeLabel sx={{ mb: 3 }}>
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;
            
            return (
              <Step key={index}>
                <StepLabel
                  icon={stepIcons[index]}
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'primary.main' : isCompleted ? 'text.primary' : 'text.disabled',
                    },
                    '& .MuiStepLabel-iconContainer': {
                      '& .MuiSvgIcon-root': {
                        color: isActive ? 'primary.main' : isCompleted ? 'primary.main' : 'action.disabled',
                        fontSize: '1.5rem',
                      },
                      ...(isActive && {
                        backgroundColor: 'primary.light',
                        borderRadius: '50%',
                        padding: '8px',
                        margin: '-8px',
                        '& .MuiSvgIcon-root': {
                          color: 'white',
                        },
                      }),
                    },
                    '& .MuiStepLabel-connector': {
                      '& .MuiStepConnector-line': {
                        borderColor: isCompleted ? 'primary.main' : 'action.disabled',
                        borderWidth: 2,
                      },
                    },
                  }}
                >
                  {stepLabels[index]}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

      {/* Form Content */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {stepTitle}
          </Typography>
          {stepDescription && (
            <Typography variant="body1" color="text.secondary">
              {stepDescription}
            </Typography>
          )}
        </Box>

        {children}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={onPrevious}
            disabled={isFirstStep || isLoading}
            sx={{ minWidth: 120 }}
          >
            Previous
          </Button>
          
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!canProceed || isLoading}
            sx={{ minWidth: 120 }}
          >
            {isLoading ? (
              'Loading...'
            ) : isLastStep ? (
              'Finish Setup'
            ) : (
              'Save & Next'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FormStep;
