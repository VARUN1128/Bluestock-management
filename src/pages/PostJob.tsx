import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  InputLabel,
  Button,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResponsiveLayout from '../components/ResponsiveLayout';
import type { RootState } from '../store';

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const { } = useSelector((state: RootState) => state.auth);
  const [jobType, setJobType] = useState('full-time');
  const [experienceLevel, setExperienceLevel] = useState('mid-level');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log('Job posted successfully');
    navigate('/my-jobs');
  };

  return (
    <ResponsiveLayout
      title="Post a New Job"
      subtitle="Create and publish a new job listing to attract qualified candidates."
    >
      <Card elevation={2}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Job Title"
                placeholder="e.g., Senior Frontend Developer"
                variant="outlined"
                required
              />

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                  <FormControl fullWidth>
                    <InputLabel>Job Type</InputLabel>
                    <Select
                      value={jobType}
                      label="Job Type"
                      onChange={(e) => setJobType(e.target.value)}
                    >
                      <MenuItem value="full-time">Full-time</MenuItem>
                      <MenuItem value="part-time">Part-time</MenuItem>
                      <MenuItem value="contract">Contract</MenuItem>
                      <MenuItem value="internship">Internship</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                  <FormControl fullWidth>
                    <InputLabel>Experience Level</InputLabel>
                    <Select
                      value={experienceLevel}
                      label="Experience Level"
                      onChange={(e) => setExperienceLevel(e.target.value)}
                    >
                      <MenuItem value="entry-level">Entry Level</MenuItem>
                      <MenuItem value="mid-level">Mid Level</MenuItem>
                      <MenuItem value="senior-level">Senior Level</MenuItem>
                      <MenuItem value="executive">Executive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                  <TextField
                    fullWidth
                    label="Location"
                    placeholder="e.g., San Francisco, CA"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />
                </Box>

                <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                  <TextField
                    fullWidth
                    label="Salary Range"
                    placeholder="e.g., $80,000 - $120,000"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>

              <TextField
                fullWidth
                label="Job Description"
                multiline
                rows={6}
                placeholder="Describe the role, responsibilities, and requirements..."
                variant="outlined"
                required
              />

              <TextField
                fullWidth
                label="Required Skills"
                placeholder="e.g., React, TypeScript, Node.js (comma separated)"
                variant="outlined"
              />

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    defaultValue="TechCorp Inc."
                    variant="outlined"
                    disabled
                  />
                </Box>

                <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                  <TextField
                    fullWidth
                    label="Application Deadline"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Box>

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="This job posting is active and visible to candidates"
              />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" size="large">
                  Save as Draft
                </Button>
                <Button variant="contained" size="large" type="submit">
                  Post Job
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </ResponsiveLayout>
  );
};

export default PostJob;