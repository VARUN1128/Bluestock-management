import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResponsiveLayout from '../components/ResponsiveLayout';
import type { RootState } from '../store';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { } = useSelector((state: RootState) => state.auth);

  return (
    <ResponsiveLayout
      title="Employers Profile"
      subtitle="Manage your company profile and personal information."
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Profile Information */}
        <Box sx={{ flex: '1 1 600px', minWidth: 600 }}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Company Information
                </Typography>
                <Button startIcon={<EditIcon />} variant="outlined" size="small">
                  Edit Profile
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      defaultValue="TechCorp Inc."
                      variant="outlined"
                      disabled
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                    <TextField
                      fullWidth
                      label="Industry"
                      defaultValue="Technology"
                      variant="outlined"
                      disabled
                    />
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  label="Company Description"
                  multiline
                  rows={4}
                  defaultValue="We are a leading technology company specializing in innovative solutions for businesses worldwide."
                  variant="outlined"
                  disabled
                />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                    <TextField
                      fullWidth
                      label="Website"
                      defaultValue="https://techcorp.com"
                      variant="outlined"
                      disabled
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                    <TextField
                      fullWidth
                      label="Founded"
                      defaultValue="2015"
                      variant="outlined"
                      disabled
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Profile Summary */}
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Profile Summary
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Jobs Posted</Typography>
                  <Typography variant="body2" fontWeight="bold" color="primary">24</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Active Applications</Typography>
                  <Typography variant="body2" fontWeight="bold" color="success">156</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Hired Candidates</Typography>
                  <Typography variant="body2" fontWeight="bold" color="info">12</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Profile Completion</Typography>
                  <Typography variant="body2" fontWeight="bold" color="primary">85%</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ResponsiveLayout>
  );
};

export default Profile;