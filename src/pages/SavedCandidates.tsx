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
  Chip,
  InputAdornment,
  Rating,
  InputLabel,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Search as SearchIconMUI,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ResponsiveLayout from '../components/ResponsiveLayout';
import type { RootState } from '../store';

const SavedCandidates: React.FC = () => {
  const { } = useSelector((state: RootState) => state.auth);
  const [filterExperience, setFilterExperience] = useState('all');

  const candidates = [
    {
      id: 1,
      name: 'John Smith',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      rating: 4.8,
      salary: '$90,000 - $120,000',
      availability: 'Available now',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      title: 'UX/UI Designer',
      location: 'New York, NY',
      experience: '3 years',
      skills: ['Figma', 'Sketch', 'Adobe XD'],
      rating: 4.6,
      salary: '$70,000 - $95,000',
      availability: 'Open to offers',
    },
    {
      id: 3,
      name: 'Mike Chen',
      title: 'Backend Engineer',
      location: 'Austin, TX',
      experience: '7 years',
      skills: ['Python', 'Django', 'PostgreSQL'],
      rating: 4.9,
      salary: '$100,000 - $140,000',
      availability: 'Available now',
    },
    {
      id: 4,
      name: 'Emily Davis',
      title: 'Product Manager',
      location: 'Seattle, WA',
      experience: '4 years',
      skills: ['Agile', 'Scrum', 'Analytics'],
      rating: 4.7,
      salary: '$85,000 - $115,000',
      availability: 'Open to offers',
    },
    {
      id: 5,
      name: 'David Wilson',
      title: 'DevOps Engineer',
      location: 'Denver, CO',
      experience: '6 years',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      rating: 4.5,
      salary: '$95,000 - $130,000',
      availability: 'Available now',
    },
    {
      id: 6,
      name: 'Lisa Brown',
      title: 'Data Scientist',
      location: 'Boston, MA',
      experience: '4 years',
      skills: ['Python', 'Machine Learning', 'SQL'],
      rating: 4.8,
      salary: '$80,000 - $110,000',
      availability: 'Open to offers',
    },
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available now':
        return 'success';
      case 'Open to offers':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <ResponsiveLayout
      title="Saved Candidates"
      subtitle="Manage your saved candidates and discover new talent."
    >
      {/* Search and Filters */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <TextField
                fullWidth
                placeholder="Search candidates..."
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
                <InputLabel>Experience Level</InputLabel>
                <Select
                  value={filterExperience}
                  label="Experience Level"
                  onChange={(e) => setFilterExperience(e.target.value)}
                >
                  <MenuItem value="all">All Experience</MenuItem>
                  <MenuItem value="entry">Entry Level (0-2 years)</MenuItem>
                  <MenuItem value="mid">Mid Level (3-5 years)</MenuItem>
                  <MenuItem value="senior">Senior Level (6+ years)</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <Button variant="contained" fullWidth>
                Advanced Search
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Candidates Grid */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {candidates.map((candidate) => (
          <Box key={candidate.id} sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
                    <PersonIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {candidate.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {candidate.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {candidate.location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Experience: {candidate.experience}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Skills: {candidate.skills.join(', ')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating value={candidate.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      ({candidate.rating})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <MoneyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {candidate.salary}
                    </Typography>
                  </Box>
                  <Chip
                    label={candidate.availability}
                    size="small"
                    color={getAvailabilityColor(candidate.availability) as any}
                    variant="outlined"
                  />
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

export default SavedCandidates;