import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Language as WebsiteIcon,
} from '@mui/icons-material';
import type { User } from '../types/auth.js';
import type { CompanyProfile } from '../types/company.js';

interface ProfileCardProps {
  user?: User;
  company?: CompanyProfile;
  onEdit?: () => void;
  showEditButton?: boolean;
  variant?: 'user' | 'company' | 'combined';
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  company,
  onEdit,
  showEditButton = true,
  variant = 'combined',
}) => {
  const renderUserInfo = () => {
    if (!user) return null;

    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon color="action" fontSize="small" />
            <Typography variant="body2">{user.email}</Typography>
            {user.is_email_verified && (
              <Chip label="Verified" size="small" color="success" />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon color="action" fontSize="small" />
            <Typography variant="body2">{user.mobile_no}</Typography>
            {user.is_mobile_verified && (
              <Chip label="Verified" size="small" color="success" />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">
            Gender: {user.gender === 'm' ? 'Male' : user.gender === 'f' ? 'Female' : 'Other'}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderCompanyInfo = () => {
    if (!company) return null;

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Company Information
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessIcon color="action" fontSize="small" />
            <Typography variant="body2" fontWeight="medium">
              {company.company_name}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationIcon color="action" fontSize="small" />
            <Typography variant="body2">
              {company.address}, {company.city}, {company.state}, {company.country}
            </Typography>
          </Box>
          
          {company.website && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WebsiteIcon color="action" fontSize="small" />
              <Typography variant="body2" color="primary">
                {company.website}
              </Typography>
            </Box>
          )}
          
          <Typography variant="body2" color="text.secondary">
            Industry: {company.industry}
          </Typography>
          
          {company.founded_date && (
            <Typography variant="body2" color="text.secondary">
              Founded: {new Date(company.founded_date).getFullYear()}
            </Typography>
          )}
          
          {company.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {company.description}
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  const getCardImage = () => {
    if (variant === 'company' && company?.banner_url) {
      return company.banner_url;
    }
    if (variant === 'user' && company?.logo_url) {
      return company.logo_url;
    }
    if (variant === 'combined' && company?.banner_url) {
      return company.banner_url;
    }
    return undefined;
  };

  return (
    <Card sx={{ maxWidth: '100%', position: 'relative' }}>
      {showEditButton && onEdit && (
        <IconButton
          onClick={onEdit}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <EditIcon />
        </IconButton>
      )}
      
      {getCardImage() && (
        <CardMedia
          component="img"
          height="200"
          image={getCardImage()}
          alt={variant === 'company' ? 'Company Banner' : 'Company Logo'}
          sx={{ objectFit: 'cover' }}
        />
      )}
      
      <CardContent>
        {variant === 'user' && renderUserInfo()}
        {variant === 'company' && renderCompanyInfo()}
        {variant === 'combined' && (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              {renderUserInfo()}
            </Box>
            <Box sx={{ flex: 1 }}>
              {renderCompanyInfo()}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
