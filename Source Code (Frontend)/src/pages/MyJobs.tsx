import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  InputLabel,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIconMUI,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ResponsiveLayout from '../components/ResponsiveLayout';
import type { RootState } from '../store';

const MyJobs: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { } = useSelector((state: RootState) => state.auth);
  const [filterStatus, setFilterStatus] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$80,000 - $120,000',
      posted: '2 days ago',
      applications: 24,
      status: 'Active',
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'DesignStudio',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$60,000 - $90,000',
      posted: '5 days ago',
      applications: 18,
      status: 'Active',
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'DataFlow Systems',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$90,000 - $130,000',
      posted: '1 week ago',
      applications: 32,
      status: 'Paused',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Paused':
        return 'warning';
      case 'Closed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <ResponsiveLayout
      title="My Jobs"
      subtitle="Manage your job postings and track applications."
    >
      {/* Filters */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <TextField
                fullWidth
                placeholder="Search jobs..."
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
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Jobs</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="paused">Paused</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <Button variant="outlined" startIcon={<FilterIcon />} fullWidth>
                More Filters
              </Button>
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <Button variant="outlined" fullWidth>
                Export
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card elevation={2}>
        <CardContent>
          {isMobile ? (
            // Mobile Card View
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {jobs.map((job) => (
                <Card key={job.id} variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.company} • {job.location}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
                      <Chip label={job.type} size="small" color="primary" variant="outlined" />
                      <Chip label={job.salary} size="small" color="success" variant="outlined" />
                      <Chip
                        label={job.status}
                        size="small"
                        color={getStatusColor(job.status) as any}
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {job.applications} applications • {job.posted}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" variant="outlined" startIcon={<VisibilityIcon />}>
                          View
                        </Button>
                        <Button size="small" variant="outlined" startIcon={<EditIcon />}>
                          Edit
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
          ) : (
            // Desktop Table View
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Job Title</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Applications</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Posted</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id} hover>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {job.title}
                        </Typography>
                      </TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          {job.location}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={job.type} size="small" color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <MoneyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          {job.salary}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="primary" fontWeight="bold">
                          {job.applications}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={job.status}
                          size="small"
                          color={getStatusColor(job.status) as any}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {job.posted}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button size="small" variant="outlined" startIcon={<VisibilityIcon />}>
                            View
                          </Button>
                          <Button size="small" variant="outlined" startIcon={<EditIcon />}>
                            Edit
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </ResponsiveLayout>
  );
};

export default MyJobs;