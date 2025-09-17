import React from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

interface ContactStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

interface ContactData {
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  country_code: string;
  email: string;
}

const ContactStep: React.FC<ContactStepProps> = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactData>({
    defaultValues: {
      country_code: '+880',
    },
  });

  const onSubmit = (data: ContactData) => {
    console.log('Contact Data:', data);
    onNext();
  };

  const countries = [
    { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Provide your contact details for better communication with candidates.
          </Typography>
        </Box>

        {/* Map Location */}
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Map Location"
            placeholder="Enter your complete address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationIcon color="action" />
                </InputAdornment>
              ),
            }}
            {...register('address', {
              required: 'Address is required',
              minLength: {
                value: 10,
                message: 'Please enter a complete address',
              },
            })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Box>

        {/* City */}
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="City"
            {...register('city', {
              required: 'City is required',
            })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </Box>

        {/* State */}
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="State"
            {...register('state', {
              required: 'State is required',
            })}
            error={!!errors.state}
            helperText={errors.state?.message}
          />
        </Box>

        {/* Postal Code */}
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="Postal Code"
            {...register('postal_code', {
              required: 'Postal code is required',
              pattern: {
                value: /^[0-9]{5,6}$/,
                message: 'Please enter a valid postal code',
              },
            })}
            error={!!errors.postal_code}
            helperText={errors.postal_code?.message}
          />
        </Box>

        {/* Country */}
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="Country"
            {...register('country', {
              required: 'Country is required',
            })}
            error={!!errors.country}
            helperText={errors.country?.message}
          />
        </Box>

        {/* Phone */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Country Code</InputLabel>
              <Controller
                name="country_code"
                control={control}
                rules={{ required: 'Country code is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Country Code"
                    startAdornment={
                      <InputAdornment position="start">
                        <FlagIcon color="action" />
                      </InputAdornment>
                    }
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Phone number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="action" />
                  </InputAdornment>
                ),
              }}
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: 'Please enter a valid phone number',
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Box>
        </Box>

        {/* Email */}
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            placeholder="Email address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ContactStep;
