import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ResponsiveLayout from '../components/ResponsiveLayout';
import type { RootState } from '../store';

const Billing: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { } = useSelector((state: RootState) => state.auth);

  const billingHistory = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Premium Plan - Monthly',
      amount: '$99.00',
      status: 'Paid',
    },
    {
      id: 2,
      date: '2023-12-15',
      description: 'Premium Plan - Monthly',
      amount: '$99.00',
      status: 'Paid',
    },
    {
      id: 3,
      date: '2023-11-15',
      description: 'Premium Plan - Monthly',
      amount: '$99.00',
      status: 'Paid',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <ResponsiveLayout
      title="Plans & Billing"
      subtitle="Manage your subscription and view billing history."
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Current Plan */}
        <Box sx={{ flex: '1 1 400px', minWidth: 400 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Current Plan
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'primary.light',
                    color: 'primary.main',
                  }}
                >
                  <CreditCardIcon />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Premium Plan
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    $99/month
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Includes unlimited job postings, advanced analytics, and priority support.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" fullWidth>
                  Change Plan
                </Button>
                <Button variant="contained" fullWidth>
                  Upgrade
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Payment Method */}
        <Box sx={{ flex: '1 1 400px', minWidth: 400 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Payment Method
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'success.light',
                    color: 'success.main',
                  }}
                >
                  <CreditCardIcon />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    **** **** **** 1234
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expires 12/25
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Visa ending in 1234
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" startIcon={<EditIcon />} fullWidth>
                  Update Card
                </Button>
                <Button variant="outlined" startIcon={<AddIcon />} fullWidth>
                  Add Method
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Billing History */}
        <Box sx={{ flex: '1 1 100%', minWidth: '100%' }}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Billing History
                </Typography>
                <Button variant="outlined" startIcon={<DownloadIcon />}>
                  Download All
                </Button>
              </Box>

              {isMobile ? (
                // Mobile Card View
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {billingHistory.map((item) => (
                    <Card key={item.id} variant="outlined" sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {item.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.date}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {item.amount}
                          </Typography>
                          <Chip
                            label={item.status}
                            size="small"
                            color={getStatusColor(item.status) as any}
                            variant="outlined"
                          />
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
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {billingHistory.map((item) => (
                        <TableRow key={item.id} hover>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {item.amount}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={item.status}
                              size="small"
                              color={getStatusColor(item.status) as any}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Button size="small" variant="outlined" startIcon={<DownloadIcon />}>
                              Download
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
        </Box>
      </Box>
    </ResponsiveLayout>
  );
};

export default Billing;