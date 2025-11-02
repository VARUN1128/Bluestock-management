import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  InputLabel,
  Chip,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Search as SearchIconMUI,
  FilterList as FilterIcon,
  Sort as SortIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ResponsiveLayout from '../components/ResponsiveLayout';
import type { RootState } from '../store';

const AllCompanies: React.FC = () => {
  const { } = useSelector((state: RootState) => state.auth);
  const [filterIndustry, setFilterIndustry] = useState('all');

  const companies = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      industry: 'Technology',
      location: 'San Francisco, CA',
      size: '50-200 employees',
      jobs: 12,
      description: 'Leading technology company specializing in innovative solutions.',
    },
    {
      id: 2,
      name: 'DesignStudio',
      industry: 'Design',
      location: 'New York, NY',
      size: '10-50 employees',
      jobs: 8,
      description: 'Creative design agency focused on user experience and branding.',
    },
    {
      id: 3,
      name: 'DataFlow Systems',
      industry: 'Data & Analytics',
      location: 'Austin, TX',
      size: '200-500 employees',
      jobs: 15,
      description: 'Data analytics company providing insights for businesses.',
    },
    {
      id: 4,
      name: 'GreenEnergy Co.',
      industry: 'Energy',
      location: 'Denver, CO',
      size: '100-500 employees',
      jobs: 6,
      description: 'Renewable energy solutions for sustainable future.',
    },
  ];

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case 'Technology':
        return 'primary';
      case 'Design':
        return 'secondary';
      case 'Data & Analytics':
        return 'info';
      case 'Energy':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <ResponsiveLayout
      title="All Companies"
      subtitle="Discover and connect with companies in your network."
    >
      {/* Search and Filters */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <TextField
                fullWidth
                placeholder="Search companies..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIconMUI />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel>Industry</InputLabel>
                <Select
                  value={filterIndustry}
                  label="Industry"
                  onChange={(e) => setFilterIndustry(e.target.value)}
                >
                  <MenuItem value="all">All Industries</MenuItem>
                  <MenuItem value="technology">Technology</MenuItem>
                  <MenuItem value="design">Design</MenuItem>
                  <MenuItem value="data">Data & Analytics</MenuItem>
                  <MenuItem value="energy">Energy</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" startIcon={<FilterIcon />} fullWidth>
                  More Filters
                </Button>
                <Button variant="outlined" startIcon={<SortIcon />} fullWidth>
                  Sort
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {companies.map((company) => (
          <Box key={company.id} sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
                    <BusinessIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {company.name}
                    </Typography>
                    <Chip
                      label={company.industry}
                      size="small"
                      color={getIndustryColor(company.industry) as any}
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {company.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {company.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {company.size}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <WorkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {company.jobs} active jobs
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                  <Button variant="outlined" size="small" fullWidth>
                    View Profile
                  </Button>
                  <Button variant="contained" size="small" fullWidth>
                    Contact
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </ResponsiveLayout>
  );
};

export default AllCompanies;