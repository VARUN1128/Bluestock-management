import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import ImageUploader from './ImageUploader';

interface CompanyInfoStepProps {
  onNext: () => void;
}

interface CompanyInfoData {
  company_name: string;
  description: string;
  logo?: File;
  banner?: File;
}

const CompanyInfoStep: React.FC<CompanyInfoStepProps> = ({ onNext }) => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyInfoData>();

  const handleLogoSelect = (file: File) => {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBannerSelect = (file: File) => {
    setBannerFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setBannerPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoRemove = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleBannerRemove = () => {
    setBannerFile(null);
    setBannerPreview(null);
  };

  const onSubmit = (data: CompanyInfoData) => {
    // Handle form submission
    console.log('Company Info:', { ...data, logo: logoFile, banner: bannerFile });
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Logo & Banner Upload */}
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Logo & Banner Image
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <ImageUploader
                onFileSelect={handleLogoSelect}
                onFileRemove={handleLogoRemove}
                currentImageUrl={logoPreview || undefined}
                title="Upload Logo"
                description="Browse photo or drop here"
                dimensions="A photo larger than 400 pixels work best"
                maxSize="Max photo size 5 MB"
                supportedFormats="Supported format JPEG, PNG"
                aspectRatio="1:1"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <ImageUploader
                onFileSelect={handleBannerSelect}
                onFileRemove={handleBannerRemove}
                currentImageUrl={bannerPreview || undefined}
                title="Banner Image"
                description="Browse photo or drop here"
                dimensions="Banner images optical dimension 1520x400"
                maxSize="Max photo size 5 MB"
                supportedFormats="Supported format JPEG, PNG"
                aspectRatio="3.8:1"
              />
            </Box>
          </Box>
        </Box>

        {/* Company Name */}
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Company name"
            {...register('company_name', {
              required: 'Company name is required',
              minLength: {
                value: 2,
                message: 'Company name must be at least 2 characters',
              },
            })}
            error={!!errors.company_name}
            helperText={errors.company_name?.message}
          />
        </Box>

        {/* About Us */}
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="About Us"
            multiline
            rows={4}
            placeholder="Write down about your company here. Let the candidate know who we are..."
            {...register('description', {
              required: 'Company description is required',
              minLength: {
                value: 50,
                message: 'Description must be at least 50 characters',
              },
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
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

export default CompanyInfoStep;
