import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  LinkedIn as LinkedInIcon,
  Language as WebsiteIcon,
} from '@mui/icons-material';
import { useForm, useFieldArray } from 'react-hook-form';

interface SocialMediaStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface SocialMediaData {
  socialLinks: SocialLink[];
}

const SocialMediaStep: React.FC<SocialMediaStepProps> = ({ onNext }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SocialMediaData>({
    defaultValues: {
      socialLinks: [
        { platform: 'facebook', url: '' },
        { platform: 'twitter', url: '' },
        { platform: 'instagram', url: '' },
        { platform: 'youtube', url: '' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  const socialPlatforms = [
    { value: 'facebook', label: 'Facebook', icon: <FacebookIcon /> },
    { value: 'twitter', label: 'Twitter', icon: <TwitterIcon /> },
    { value: 'instagram', label: 'Instagram', icon: <InstagramIcon /> },
    { value: 'youtube', label: 'YouTube', icon: <YouTubeIcon /> },
    { value: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon /> },
    { value: 'website', label: 'Website', icon: <WebsiteIcon /> },
  ];

  const onSubmit = (data: SocialMediaData) => {
    console.log('Social Media Data:', data);
    onNext();
  };

  const addNewSocialLink = () => {
    append({ platform: 'facebook', url: '' });
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = socialPlatforms.find(p => p.value === platform);
    return platformData?.icon || <WebsiteIcon />;
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Social Media Links
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Add your social media profiles to help candidates learn more about your company.
          </Typography>
        </Box>

        {fields.map((field, index) => (
          <Box sx={{ width: '100%' }} key={field.id}>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {/* Platform Selector */}
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Platform</InputLabel>
                <Select
                  {...register(`socialLinks.${index}.platform` as const)}
                  label="Platform"
                  startAdornment={
                    <InputAdornment position="start">
                      {getPlatformIcon(field.platform)}
                    </InputAdornment>
                  }
                >
                  {socialPlatforms.map((platform) => (
                    <MenuItem key={platform.value} value={platform.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {platform.icon}
                        {platform.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* URL Input */}
              <TextField
                fullWidth
                placeholder="Profile link/url..."
                {...register(`socialLinks.${index}.url` as const, {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: 'Please enter a valid URL',
                  },
                })}
                error={!!errors.socialLinks?.[index]?.url}
                helperText={errors.socialLinks?.[index]?.url?.message}
              />

              {/* Remove Button */}
              <IconButton
                onClick={() => remove(index)}
                color="error"
                disabled={fields.length <= 1}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        ))}

        {/* Add New Social Link Button */}
        <Box sx={{ width: '100%' }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addNewSocialLink}
            sx={{ width: '100%', py: 1.5 }}
          >
            Add New Social Link
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SocialMediaStep;
