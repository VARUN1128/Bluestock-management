import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Business as BusinessIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <BusinessIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jobpilot
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Setup Progress
            </Typography>
            <Box sx={{ width: 200 }}>
              <LinearProgress
                variant="determinate"
                value={100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Typography variant="body2" color="primary">
              100% Completed
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card elevation={8} sx={{ textAlign: 'center', p: 4 }}>
          <CardContent>
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: 60,
                    color: 'white',
                  }}
                />
              </Box>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Congratulations, Your profile is 100% complete!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Donec hendrerit, ante mattis pellentesque eleifend, tortor urna malesuada ante, 
                eget aliquam nulla augue hendrerit ligula. Nunc mauris arcu, mattis sed sem vitae.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                size="large"
                startIcon={<DashboardIcon />}
                onClick={() => navigate('/dashboard')}
                sx={{
                  minWidth: 160,
                  py: 1.5,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                View Dashboard
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<PersonIcon />}
                onClick={() => navigate('/settings')}
                sx={{
                  minWidth: 160,
                  py: 1.5,
                }}
              >
                View Profile
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            © 2021 Jobpilot - Job Board. All rights reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Success;
