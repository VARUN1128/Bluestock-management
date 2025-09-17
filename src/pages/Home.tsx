import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  useMediaQuery,
  useTheme,
  Skeleton,
  Alert,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResponsiveLayout from '../components/ResponsiveLayout';
import { dashboardService, type DashboardStats, type JobPosting, type Application } from '../services/dashboardService';
import type { RootState } from '../store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useSelector((state: RootState) => state.auth);

  // State for dynamic data
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [recentJobs, setRecentJobs] = useState<JobPosting[]>([]);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter and sort states
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [jobSortBy, setJobSortBy] = useState<string>('posted');
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  
  // Dropdown states
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const filterOpen = Boolean(filterAnchorEl);
  const sortOpen = Boolean(sortAnchorEl);

  // Filter and sort options
  const filterOptions = [
    { value: 'all', label: 'All Jobs', icon: <FilterIcon /> },
    { value: 'active', label: 'Active', icon: <PersonIcon /> },
    { value: 'paused', label: 'Paused', icon: <PersonIcon /> },
    { value: 'closed', label: 'Closed', icon: <PersonIcon /> },
  ];

  const sortOptions = [
    { value: 'posted', label: 'Recently Posted', icon: <SortIcon /> },
    { value: 'title', label: 'Job Title', icon: <SortIcon /> },
    { value: 'company', label: 'Company', icon: <SortIcon /> },
    { value: 'applications', label: 'Applications', icon: <SortIcon /> },
  ];

  // Filter and sort functions
  const filterJobs = (jobs: JobPosting[], filter: string) => {
    if (filter === 'all') return jobs;
    return jobs.filter(job => job.status.toLowerCase() === filter.toLowerCase());
  };

  const sortJobs = (jobs: JobPosting[], sortBy: string) => {
    const sortedJobs = [...jobs];
    switch (sortBy) {
      case 'title':
        return sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
      case 'company':
        return sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
      case 'applications':
        return sortedJobs.sort((a, b) => b.applications - a.applications);
      case 'posted':
      default:
        return sortedJobs.sort((a, b) => {
          // Simple date sorting based on posted string
          const getDaysAgo = (posted: string) => {
            if (posted.includes('day')) return parseInt(posted.split(' ')[0]);
            if (posted.includes('week')) return parseInt(posted.split(' ')[0]) * 7;
            return 0;
          };
          return getDaysAgo(a.posted) - getDaysAgo(b.posted);
        });
    }
  };

  // Dropdown handlers
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleFilterSelect = (filter: string) => {
    setJobFilter(filter);
    handleFilterClose();
  };

  const handleSortSelect = (sort: string) => {
    setJobSortBy(sort);
    handleSortClose();
  };

  // Apply filter and sort when jobs or filter/sort options change
  useEffect(() => {
    const filtered = filterJobs(recentJobs, jobFilter);
    const sorted = sortJobs(filtered, jobSortBy);
    setFilteredJobs(sorted);
  }, [recentJobs, jobFilter, jobSortBy]);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all data in parallel
        const [stats, jobs, applications] = await Promise.all([
          dashboardService.getDashboardStats(),
          dashboardService.getRecentJobs(),
          dashboardService.getRecentApplications(),
        ]);
        
        setDashboardStats(stats);
        setRecentJobs(jobs);
        setRecentApplications(applications);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Create job stats array from dashboard stats
  const jobStats = dashboardStats ? [
    { title: 'Total Jobs Posted', value: dashboardStats.totalJobsPosted.toString(), color: 'primary' },
    { title: 'Active Applications', value: dashboardStats.activeApplications.toString(), color: 'success' },
    { title: 'Interviews Scheduled', value: dashboardStats.interviewsScheduled.toString(), color: 'warning' },
    { title: 'Hired Candidates', value: dashboardStats.hiredCandidates.toString(), color: 'info' },
  ] : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Paused':
        return 'warning';
      case 'Closed':
        return 'error';
      case 'Under Review':
        return 'info';
      case 'Interview Scheduled':
        return 'primary';
      case 'Shortlisted':
        return 'success';
      default:
        return 'default';
    }
  };

  // Loading skeleton component for stats cards
  const StatsCardSkeleton = () => (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
          <Skeleton variant="circular" width={56} height={56} />
        </Box>
      </CardContent>
    </Card>
  );

  // Error state
  if (error) {
    return (
      <ResponsiveLayout
        title="Employer Dashboard"
        subtitle={`Welcome back${user?.full_name ? `, ${user.full_name}` : ''}! Here's what's happening with your job postings and applications.`}
      >
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ mb: 3 }}
        >
          Retry
        </Button>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout
      title="Employer Dashboard"
      subtitle={`Welcome back${user?.full_name ? `, ${user.full_name}` : ''}! Here's what's happening with your job postings and applications.`}
    >
      {/* Statistics Cards */}
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
        {loading ? (
          // Show loading skeletons
          Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={6} sm={6} lg={3} key={index}>
              <StatsCardSkeleton />
            </Grid>
          ))
        ) : (
          // Show actual data
          jobStats.map((stat, index) => (
            <Grid item xs={6} sm={6} lg={3} key={index}>
              <Card 
                elevation={2} 
                sx={{ 
                  height: '100%',
                  minHeight: { xs: 100, sm: 120 },
                  '&:hover': {
                    transform: { xs: 'none', sm: 'translateY(-2px)' },
                    transition: 'transform 0.2s ease-in-out',
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h4" 
                      fontWeight="bold" 
                      color={`${stat.color}.main`}
                      sx={{ 
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        lineHeight: 1.2,
                        mb: 1
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        lineHeight: 1.3,
                        fontWeight: 500
                      }}
                    >
                      {stat.title}
                    </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          ))
        )}
      </Grid>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Recent Job Postings */}
        <Grid item xs={12} lg={8}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: { xs: 2, sm: 3 },
                flexWrap: 'wrap',
                gap: { xs: 1, sm: 0 }
              }}>
                <Typography 
                  variant="h6" 
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    lineHeight: 1.3,
                    flex: { xs: '1 1 100%', sm: '0 0 auto' },
                    minWidth: 0
                  }}
                >
                  Recent Job Postings
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1,
                  flex: { xs: '0 0 auto', sm: '0 0 auto' },
                  alignItems: 'center'
                }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FilterIcon />}
                    onClick={handleFilterClick}
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      px: { xs: 1.5, sm: 2 },
                      py: { xs: 0.5, sm: 1 },
                      minWidth: 'auto',
                      whiteSpace: 'nowrap',
                      backgroundColor: jobFilter !== 'all' ? 'primary.light' : 'transparent',
                      color: jobFilter !== 'all' ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        backgroundColor: jobFilter !== 'all' ? 'primary.main' : 'action.hover',
                        color: jobFilter !== 'all' ? 'white' : 'text.primary',
                      }
                    }}
                  >
                    <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                      Filter {jobFilter !== 'all' && `(${filterOptions.find(opt => opt.value === jobFilter)?.label})`}
                    </Box>
                    <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>
                      {jobFilter === 'all' ? 'F' : jobFilter.charAt(0).toUpperCase()}
                    </Box>
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<SortIcon />}
                    onClick={handleSortClick}
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      px: { xs: 1.5, sm: 2 },
                      py: { xs: 0.5, sm: 1 },
                      minWidth: 'auto',
                      whiteSpace: 'nowrap',
                      backgroundColor: jobSortBy !== 'posted' ? 'primary.light' : 'transparent',
                      color: jobSortBy !== 'posted' ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        backgroundColor: jobSortBy !== 'posted' ? 'primary.main' : 'action.hover',
                        color: jobSortBy !== 'posted' ? 'white' : 'text.primary',
                      }
                    }}
                  >
                    <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                      Sort {jobSortBy !== 'posted' && `(${sortOptions.find(opt => opt.value === jobSortBy)?.label})`}
                    </Box>
                    <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>
                      {jobSortBy === 'posted' ? 'S' : jobSortBy.charAt(0).toUpperCase()}
                    </Box>
                  </Button>
                </Box>
              </Box>

              {loading ? (
                // Loading state for job postings
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} variant="outlined" sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Skeleton variant="text" width="70%" height={24} />
                        <Skeleton variant="text" width="50%" height={20} />
                        <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
                          <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                          <Skeleton variant="rectangular" width={50} height={24} sx={{ borderRadius: 1 }} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Skeleton variant="text" width="40%" height={20} />
                          <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 1 }} />
                        </Box>
                      </Box>
                    </Card>
                  ))}
                </Box>
              ) : filteredJobs.length === 0 ? (
                // Empty state
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4,
                  px: 2
                }}>
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                      mb: 1
                    }}
                  >
                    No jobs found
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.8rem', sm: '0.875rem' }
                    }}
                  >
                    {jobFilter !== 'all' 
                      ? `No ${jobFilter} jobs available. Try changing the filter.`
                      : 'No job postings available at the moment.'
                    }
                  </Typography>
                </Box>
              ) : isMobile ? (
                // Mobile Card View
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
                  {filteredJobs.map((job) => (
                    <Card 
                      key={job.id} 
                      variant="outlined" 
                      sx={{ 
                        p: { xs: 1.5, sm: 2 },
                        '&:hover': {
                          boxShadow: 2,
                          transform: 'translateY(-1px)',
                          transition: 'all 0.2s ease-in-out',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 1.5 } }}>
                        <Typography 
                          variant="h6" 
                          fontWeight="bold"
                          sx={{ 
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            lineHeight: 1.3,
                            mb: 0.5
                          }}
                        >
                          {job.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            lineHeight: 1.4
                          }}
                        >
                          {job.company} • {job.location}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: { xs: 0.5, sm: 0.75 }, 
                          my: { xs: 1, sm: 1.5 },
                          alignItems: 'center'
                        }}>
                          <Chip 
                            label={job.type} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                            sx={{ 
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                              height: { xs: 24, sm: 28 },
                              '& .MuiChip-label': {
                                px: { xs: 1, sm: 1.5 }
                              }
                            }}
                          />
                          <Chip 
                            label={job.salary} 
                            size="small" 
                            color="success" 
                            variant="outlined"
                            sx={{ 
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                              height: { xs: 24, sm: 28 },
                              '& .MuiChip-label': {
                                px: { xs: 1, sm: 1.5 }
                              }
                            }}
                          />
                          <Chip
                            label={job.status}
                            size="small"
                            color={getStatusColor(job.status) as any}
                            variant="outlined"
                            sx={{ 
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                              height: { xs: 24, sm: 28 },
                              '& .MuiChip-label': {
                                px: { xs: 1, sm: 1.5 }
                              }
                            }}
                          />
                        </Box>
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: { xs: 1, sm: 0 },
                          mt: { xs: 0.5, sm: 0 }
                        }}>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              textAlign: { xs: 'center', sm: 'left' },
                              lineHeight: 1.4,
                              order: { xs: 2, sm: 1 }
                            }}
                          >
                            {job.applications} applications • {job.posted}
                          </Typography>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            startIcon={<VisibilityIcon />}
                            sx={{ 
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              px: { xs: 1.5, sm: 2 },
                              py: { xs: 0.5, sm: 1 },
                              minWidth: 'auto',
                              order: { xs: 1, sm: 2 },
                              alignSelf: { xs: 'center', sm: 'auto' }
                            }}
                          >
                            <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>View Details</Box>
                            <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>View</Box>
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                  ))}
                </Box>
              ) : (
                // Desktop Table View
                <TableContainer sx={{ 
                  '& .MuiTable-root': {
                    minWidth: 650
                  }
                }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Job Title</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Company</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Location</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Salary</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Applications</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Posted</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow key={job.id} hover>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '0.875rem' }}>
                              {job.title}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.875rem' }}>{job.company}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                              {job.location}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={job.type} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                              sx={{ 
                                fontSize: '0.75rem',
                                height: 28,
                                '& .MuiChip-label': { px: 1.5 }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <MoneyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                              {job.salary}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="primary" fontWeight="bold" sx={{ fontSize: '0.875rem' }}>
                              {job.applications}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={job.status}
                              size="small"
                              color={getStatusColor(job.status) as any}
                              variant="outlined"
                              sx={{ 
                                fontSize: '0.75rem',
                                height: 28,
                                '& .MuiChip-label': { px: 1.5 }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                              {job.posted}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="small" 
                              variant="outlined" 
                              startIcon={<VisibilityIcon />}
                              sx={{ 
                                fontSize: '0.75rem',
                                px: 1.5,
                                py: 0.5
                              }}
                            >
                              View
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
        </Grid>

        {/* Filter Dropdown Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={filterOpen}
          onClose={handleFilterClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              minWidth: 200,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {filterOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleFilterSelect(option.value)}
              selected={jobFilter === option.value}
              sx={{
                backgroundColor: jobFilter === option.value ? 'primary.light' : 'transparent',
                '&:hover': {
                  backgroundColor: jobFilter === option.value ? 'primary.light' : 'action.hover',
                },
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: jobFilter === option.value ? 'primary.main' : 'text.secondary' }}>
                {option.icon}
              </ListItemIcon>
              <ListItemText 
                primary={option.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.875rem',
                    fontWeight: jobFilter === option.value ? 600 : 400,
                    color: jobFilter === option.value ? 'primary.main' : 'text.primary',
                  },
                }}
              />
            </MenuItem>
          ))}
        </Menu>

        {/* Sort Dropdown Menu */}
        <Menu
          anchorEl={sortAnchorEl}
          open={sortOpen}
          onClose={handleSortClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              minWidth: 200,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              selected={jobSortBy === option.value}
              sx={{
                backgroundColor: jobSortBy === option.value ? 'primary.light' : 'transparent',
                '&:hover': {
                  backgroundColor: jobSortBy === option.value ? 'primary.light' : 'action.hover',
                },
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: jobSortBy === option.value ? 'primary.main' : 'text.secondary' }}>
                {option.icon}
              </ListItemIcon>
              <ListItemText 
                primary={option.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.875rem',
                    fontWeight: jobSortBy === option.value ? 600 : 400,
                    color: jobSortBy === option.value ? 'primary.main' : 'text.primary',
                  },
                }}
              />
            </MenuItem>
          ))}
        </Menu>

        {/* Recent Applications */}
        <Grid item xs={12} lg={4}>
          <Card elevation={2}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                sx={{ 
                  mb: { xs: 2, sm: 3 },
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  lineHeight: 1.3
                }}
              >
                Recent Applications
              </Typography>

              {loading ? (
                // Loading state for applications
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box sx={{ flex: 1 }}>
                          <Skeleton variant="text" width="60%" height={20} />
                          <Skeleton variant="text" width="80%" height={16} />
                        </Box>
                        <Skeleton variant="text" width={30} height={20} />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                        <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                        <Skeleton variant="text" width={60} height={16} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
                {recentApplications.map((application) => (
                  <Box
                    key={application.id}
                    sx={{
                        p: { xs: 1.5, sm: 2 },
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        cursor: 'pointer',
                          transform: 'translateY(-1px)',
                          transition: 'all 0.2s ease-in-out',
                      },
                    }}
                  >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: { xs: 1.5, sm: 2 }, 
                        mb: { xs: 1, sm: 1.5 },
                        flexDirection: { xs: 'column', sm: 'row' }
                      }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: { xs: 1, sm: 2 },
                          width: { xs: '100%', sm: 'auto' }
                        }}>
                      <Box
                        sx={{
                              width: { xs: 36, sm: 40 },
                              height: { xs: 36, sm: 40 },
                          borderRadius: '50%',
                          backgroundColor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                              flexShrink: 0
                        }}
                      >
                            <PersonIcon sx={{ 
                              color: 'primary.main',
                              fontSize: { xs: 18, sm: 20 }
                            }} />
                      </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography 
                              variant="subtitle2" 
                              fontWeight="bold"
                              sx={{ 
                                fontSize: { xs: '0.9rem', sm: '0.875rem' },
                                lineHeight: 1.3,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                          {application.candidate}
                        </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ 
                                fontSize: { xs: '0.8rem', sm: '0.75rem' },
                                lineHeight: 1.4,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                          {application.position}
                        </Typography>
                      </Box>
                        </Box>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 0.5,
                          alignSelf: { xs: 'flex-end', sm: 'flex-start' }
                        }}>
                          <StarIcon sx={{ 
                            fontSize: { xs: 14, sm: 16 }, 
                            color: 'warning.main' 
                          }} />
                          <Typography 
                            variant="body2" 
                            fontWeight="bold"
                            sx={{ 
                              fontSize: { xs: '0.8rem', sm: '0.875rem' }
                            }}
                          >
                          {application.rating}
                        </Typography>
                      </Box>
                    </Box>

                      <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: { xs: 0.5, sm: 1 }, 
                        mb: { xs: 1, sm: 1.5 }
                      }}>
                      <Chip
                        label={application.experience}
                        size="small"
                        color="info"
                        variant="outlined"
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                      />
                      <Chip
                        label={application.location}
                        size="small"
                        color="default"
                        variant="outlined"
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                      />
                    </Box>

                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 0.5, sm: 0 }
                      }}>
                      <Chip
                        label={application.status}
                        size="small"
                        color={getStatusColor(application.status) as any}
                        variant="outlined"
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                        />
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ 
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            textAlign: { xs: 'center', sm: 'right' }
                          }}
                        >
                        {application.applied}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              )}

              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate('/applications')}
              >
                View All Applications
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ResponsiveLayout>
  );
};

export default Home;