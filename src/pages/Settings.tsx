import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { useForm, useFieldArray } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResponsiveLayout from '../components/ResponsiveLayout';
import type { RootState } from '../store';
import {
  updateProfileStart,
  updateProfileSuccess,
} from '../store/slices/companySlice';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState(0);

  const { control, handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      company_name: 'TechCorp Inc.',
      industry: 'Technology',
      website: 'https://techcorp.com',
      address: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      postal_code: '94105',
      phone: '+1 (555) 123-4567',
      email: 'contact@techcorp.com',
      founded_year: '2015',
      team_size: '50-100',
      description: 'We are a leading technology company specializing in innovative solutions.',
      vision: '',
      currentPassword: '',
      password: '',
      confirmPassword: '',
      social_links: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/techcorp' },
        { platform: 'Twitter', url: 'https://twitter.com/techcorp' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'social_links',
  });

  const onSubmit = (data: any) => {
    dispatch(updateProfileStart());
    // Simulate API call
    setTimeout(() => {
      dispatch(updateProfileSuccess(data));
    }, 1000);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const socialPlatforms = ['LinkedIn', 'Twitter', 'Facebook', 'Instagram', 'YouTube', 'GitHub'];

  return (
    <ResponsiveLayout
      title="Settings"
      subtitle="Manage your company profile and account settings."
    >
      <Card elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons="auto"
            sx={{ px: { xs: 1, md: 3 } }}
          >
            <Tab label="Company Info" />
            <Tab label="Founding Info" />
            <Tab label="Social Media Profile" />
            <Tab label="Account Setting" />
          </Tabs>
        </Box>

        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Company Info Tab */}
            {activeTab === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Company Information
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      {...register('company_name', { required: 'Company name is required' })}
                      error={!!errors.company_name}
                      helperText={errors.company_name?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth error={!!errors.industry}>
                      <InputLabel>Industry</InputLabel>
                      <Select
                        {...register('industry', { required: 'Industry is required' })}
                        label="Industry"
                      >
                        <MenuItem value="Technology">Technology</MenuItem>
                        <MenuItem value="Healthcare">Healthcare</MenuItem>
                        <MenuItem value="Finance">Finance</MenuItem>
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Website"
                      {...register('website')}
                      error={!!errors.website}
                      helperText={errors.website?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Founded Year"
                      {...register('founded_year')}
                      error={!!errors.founded_year}
                      helperText={errors.founded_year?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Company Description"
                      multiline
                      rows={4}
                      {...register('description')}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Founding Info Tab */}
            {activeTab === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Founding Information
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth error={!!errors.team_size}>
                      <InputLabel>Team Size</InputLabel>
                      <Select
                        {...register('team_size', { required: 'Team size is required' })}
                        label="Team Size"
                      >
                        <MenuItem value="1-10">1-10 employees</MenuItem>
                        <MenuItem value="11-50">11-50 employees</MenuItem>
                        <MenuItem value="51-200">51-200 employees</MenuItem>
                        <MenuItem value="201-500">201-500 employees</MenuItem>
                        <MenuItem value="500+">500+ employees</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Founded Year"
                      {...register('founded_year')}
                      error={!!errors.founded_year}
                      helperText={errors.founded_year?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Company Vision"
                      multiline
                      rows={4}
                      {...register('vision')}
                      error={!!errors.vision}
                      helperText={errors.vision?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Social Media Profile Tab */}
            {activeTab === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Social Media Profiles
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => append({ platform: '', url: '' })}
                    size="small"
                  >
                    Add Platform
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {fields.map((field, index) => (
                    <Card key={field.id} variant="outlined" sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <FormControl fullWidth>
                            <InputLabel>Platform</InputLabel>
                            <Select
                              {...register(`social_links.${index}.platform`)}
                              label="Platform"
                            >
                              {socialPlatforms.map((platform) => (
                                <MenuItem key={platform} value={platform}>
                                  {platform}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="URL"
                            {...register(`social_links.${index}.url`)}
                            error={!!errors.social_links?.[index]?.url}
                            helperText={errors.social_links?.[index]?.url?.message}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 2 }}>
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<RemoveIcon />}
                            onClick={() => remove(index)}
                            fullWidth
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Box>
              </Box>
            )}

            {/* Account Setting Tab */}
            {activeTab === 3 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Contact Information */}
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Contact Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        {...register('phone', { required: 'Phone number is required' })}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Address"
                        {...register('address')}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="City"
                        {...register('city')}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="State"
                        {...register('state')}
                        error={!!errors.state}
                        helperText={errors.state?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Postal Code"
                        {...register('postal_code')}
                        error={!!errors.postal_code}
                        helperText={errors.postal_code?.message}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                {/* Change Password */}
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Change Password
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                        {...register('currentPassword', { required: 'Current password is required' })}
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        {...register('password', { required: 'New password is required' })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        {...register('confirmPassword', { required: 'Please confirm your password' })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                {/* Delete Company */}
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: 'error.main' }}>
                    Delete Your Company
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Once you delete your company, there is no going back. Please be certain.
                  </Typography>
                  <FormControlLabel
                    control={<Checkbox color="error" />}
                    label="I understand the consequences of deleting my company"
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      disabled
                    >
                      Delete Company
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{ minWidth: 120 }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </ResponsiveLayout>
  );
};

export default Settings;