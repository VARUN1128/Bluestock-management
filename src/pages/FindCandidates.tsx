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
  Rating,
  Slider,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
  Search as SearchIconMUI,
  FilterList as FilterIcon,
  Sort as SortIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
  Favorite as FavoriteIconMUI,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResponsiveLayout from '../components/ResponsiveLayout';
import type { RootState } from '../store';

const FindCandidates: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { } = useSelector((state: RootState) => state.auth);
  const [filterExperience, setFilterExperience] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [salaryRange, setSalaryRange] = useState([50000, 150000]);
  const [savedCandidates, setSavedCandidates] = useState<number[]>([]);

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

  const toggleSaved = (candidateId: number) => {
    setSavedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  return (
    <ResponsiveLayout
      title="Find Candidates"
      subtitle="Search and discover qualified candidates for your open positions."
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Filters Sidebar */}
        <Box sx={{ flex: { xs: 1, md: '0 0 300px' } }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Filters
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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

                <FormControl fullWidth>
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={filterLocation}
                    label="Location"
                    onChange={(e) => setFilterLocation(e.target.value)}
                  >
                    <MenuItem value="all">All Locations</MenuItem>
                    <MenuItem value="remote">Remote</MenuItem>
                    <MenuItem value="san-francisco">San Francisco, CA</MenuItem>
                    <MenuItem value="new-york">New York, NY</MenuItem>
                    <MenuItem value="austin">Austin, TX</MenuItem>
                  </Select>
                </FormControl>

                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Salary Range: ${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}
                  </Typography>
                  <Slider
                    value={salaryRange}
                    onChange={(_, newValue) => setSalaryRange(newValue as number[])}
                    valueLabelDisplay="auto"
                    min={30000}
                    max={200000}
                    step={5000}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Availability
                  </Typography>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Available now" />
                  <FormControlLabel control={<Checkbox />} label="Open to offers" />
                </Box>

                <Button variant="outlined" fullWidth>
                  Clear Filters
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Candidates List */}
        <Box sx={{ flex: 1 }}>
          {/* Search Bar */}
          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  placeholder="Search candidates by name, skills, or location..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIconMUI />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="outlined" startIcon={<FilterIcon />}>
                  Filters
                </Button>
                <Button variant="outlined" startIcon={<SortIcon />}>
                  Sort
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* View Toggle */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {candidates.length} candidates found
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" variant="outlined">List View</Button>
              <Button size="small" variant="contained">Card View</Button>
            </Box>
          </Box>

          {/* Candidates Grid */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {candidates.map((candidate) => (
              <Box key={candidate.id} sx={{ flex: '1 1 400px', minWidth: 400 }}>
                <Card elevation={2} sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ width: 50, height: 50, bgcolor: 'primary.main' }}>
                        <PersonIcon />
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                        <Typography variant="body2" fontWeight="bold">
                          {candidate.rating}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Experience: {candidate.experience}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Skills: {candidate.skills.join(', ')}
                      </Typography>
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

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        fullWidth
                      >
                        View Profile
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<FavoriteIconMUI />}
                        onClick={() => toggleSaved(candidate.id)}
                        color={savedCandidates.includes(candidate.id) ? 'error' : 'primary'}
                        fullWidth
                      >
                        {savedCandidates.includes(candidate.id) ? 'Saved' : 'Save'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ResponsiveLayout>
  );
};

export default FindCandidates;