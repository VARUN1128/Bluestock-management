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
  Button,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Language as WebsiteIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

interface FoundingInfoStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

interface FoundingInfoData {
  organization_type: string;
  industry_type: string;
  team_size: string;
  founded_date: string;
  website: string;
  vision: string;
}

const FoundingInfoStep: React.FC<FoundingInfoStepProps> = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FoundingInfoData>();

  const onSubmit = (data: FoundingInfoData) => {
    console.log('Founding Info:', data);
    onNext();
  };

  const organizationTypes = [
    'Private Limited',
    'Public Limited',
    'Partnership',
    'Sole Proprietorship',
    'LLP',
    'Non-Profit',
    'Government',
    'Other',
  ];

  const industryTypes = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Real Estate',
    'Consulting',
    'Media & Entertainment',
    'Other',
  ];

  const teamSizes = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+',
  ];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Organization Type */}
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Organization Type</InputLabel>
            <Controller
              name="organization_type"
              control={control}
              defaultValue=""
              rules={{ required: 'Organization type is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Organization Type"
                  error={!!errors.organization_type}
                >
                  <MenuItem value="">
                    <em>Select...</em>
                  </MenuItem>
                  {organizationTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.organization_type && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                {errors.organization_type.message}
              </Typography>
            )}
          </FormControl>
        </Box>

        {/* Industry Types */}
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Industry Types</InputLabel>
            <Controller
              name="industry_type"
              control={control}
              defaultValue=""
              rules={{ required: 'Industry type is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Industry Types"
                  error={!!errors.industry_type}
                >
                  <MenuItem value="">
                    <em>Select...</em>
                  </MenuItem>
                  {industryTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.industry_type && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                {errors.industry_type.message}
              </Typography>
            )}
          </FormControl>
        </Box>

        {/* Team Size */}
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Team Size</InputLabel>
            <Controller
              name="team_size"
              control={control}
              defaultValue=""
              rules={{ required: 'Team size is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Team Size"
                  error={!!errors.team_size}
                >
                  <MenuItem value="">
                    <em>Select...</em>
                  </MenuItem>
                  {teamSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.team_size && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                {errors.team_size.message}
              </Typography>
            )}
          </FormControl>
        </Box>

        {/* Year of Establishment */}
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="Year of Establishment"
            placeholder="dd/mm/yyyy"
            type="date"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarIcon color="action" />
                </InputAdornment>
              ),
            }}
            {...register('founded_date', {
              required: 'Founded date is required',
            })}
            error={!!errors.founded_date}
            helperText={errors.founded_date?.message}
          />
        </Box>

        {/* Company Website */}
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="Company Website"
            placeholder="Website url..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WebsiteIcon color="action" />
                </InputAdornment>
              ),
            }}
            {...register('website', {
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'Please enter a valid URL starting with http:// or https://',
              },
            })}
            error={!!errors.website}
            helperText={errors.website?.message}
          />
        </Box>

        {/* Company Vision */}
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Company Vision"
            multiline
            rows={4}
            placeholder="Tell us about your company vision..."
            {...register('vision', {
              required: 'Company vision is required',
              minLength: {
                value: 50,
                message: 'Vision must be at least 50 characters',
              },
            })}
            error={!!errors.vision}
            helperText={errors.vision?.message}
          />
          
          {/* Rich Text Editor Toolbar (Basic) */}
          <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button size="small" variant="outlined" sx={{ minWidth: 'auto', px: 1 }}>
              <strong>B</strong>
            </Button>
            <Button size="small" variant="outlined" sx={{ minWidth: 'auto', px: 1 }}>
              <em>I</em>
            </Button>
            <Button size="small" variant="outlined" sx={{ minWidth: 'auto', px: 1 }}>
              <u>U</u>
            </Button>
            <Button size="small" variant="outlined" sx={{ minWidth: 'auto', px: 1 }}>
              <s>S</s>
            </Button>
            <Button size="small" variant="outlined" sx={{ minWidth: 'auto', px: 1 }}>
              🔗
            </Button>
            <Button size="small" variant="outlined" sx={{ minWidth: 'auto', px: 1 }}>
              •
            </Button>
            <Button size="small" variant="outlined" sx={{ minWidth: 'auto', px: 1 }}>
              1.
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FoundingInfoStep;
