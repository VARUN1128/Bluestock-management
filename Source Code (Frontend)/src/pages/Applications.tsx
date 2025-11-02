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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Person as PersonIcon,
  Search as SearchIconMUI,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ResponsiveLayout from '../components/ResponsiveLayout';
import type { RootState } from '../store';

const Applications: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { } = useSelector((state: RootState) => state.auth);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const applications = [
    {
      id: 1,
      candidate: 'John Smith',
      position: 'Senior Frontend Developer',
      experience: '5 years',
      location: 'San Francisco, CA',
      status: 'Under Review',
      applied: '2 days ago',
      rating: 4.5,
      skills: ['React', 'TypeScript', 'Node.js'],
    },
    {
      id: 2,
      candidate: 'Sarah Johnson',
      position: 'UX/UI Designer',
      experience: '3 years',
      location: 'New York, NY',
      status: 'Interview Scheduled',
      applied: '3 days ago',
      rating: 4.8,
      skills: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      id: 3,
      candidate: 'Mike Chen',
      position: 'Backend Engineer',
      experience: '7 years',
      location: 'Austin, TX',
      status: 'Shortlisted',
      applied: '1 week ago',
      rating: 4.2,
      skills: ['Python', 'Django', 'PostgreSQL'],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review':
        return 'info';
      case 'Interview Scheduled':
        return 'primary';
      case 'Shortlisted':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedApplication(null);
  };

  return (
    <ResponsiveLayout
      title="Applications"
      subtitle="Manage and review job applications from candidates."
    >
      {/* Search and Filters */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <TextField
                fullWidth
                placeholder="Search applications..."
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
                  <MenuItem value="all">All Applications</MenuItem>
                  <MenuItem value="under-review">Under Review</MenuItem>
                  <MenuItem value="interview-scheduled">Interview Scheduled</MenuItem>
                  <MenuItem value="shortlisted">Shortlisted</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <Button variant="outlined" startIcon={<FilterIcon />} fullWidth>
                More Filters
              </Button>
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <Button variant="outlined" startIcon={<SortIcon />} fullWidth>
                Sort
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card elevation={2}>
        <CardContent>
          {isMobile ? (
            // Mobile Card View
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {applications.map((application) => (
                <Card key={application.id} variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                        <PersonIcon />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {application.candidate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {application.position}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                        <Typography variant="body2" fontWeight="bold">
                          {application.rating}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                      <Chip
                        label={application.experience}
                        size="small"
                        color="info"
                        variant="outlined"
                      />
                      <Chip
                        label={application.location}
                        size="small"
                        color="default"
                        variant="outlined"
                      />
                      <Chip
                        label={application.status}
                        size="small"
                        color={getStatusColor(application.status) as any}
                        variant="outlined"
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Applied {application.applied}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewDetails(application)}
                      >
                        View Details
                      </Button>
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
                    <TableCell>Candidate</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Experience</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Applied</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {application.candidate}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {application.position}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{application.position}</TableCell>
                      <TableCell>{application.experience}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          {application.location}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={application.status}
                          size="small"
                          color={getStatusColor(application.status) as any}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {application.applied}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                          <Typography variant="body2" fontWeight="bold">
                            {application.rating}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleViewDetails(application)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedApplication.candidate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedApplication.position}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                    <Typography variant="body2" fontWeight="bold">
                      {selectedApplication.rating}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Chip
                  label={selectedApplication.experience}
                  color="info"
                  variant="outlined"
                />
                <Chip
                  label={selectedApplication.location}
                  color="default"
                  variant="outlined"
                />
                <Chip
                  label={selectedApplication.status}
                  color={getStatusColor(selectedApplication.status) as any}
                  variant="outlined"
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                  Skills
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedApplication.skills.join(', ')}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                  Applied
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedApplication.applied}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained">Contact Candidate</Button>
        </DialogActions>
      </Dialog>
    </ResponsiveLayout>
  );
};

export default Applications;