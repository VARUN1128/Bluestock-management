import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Button,
  FormControl,
  Select,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem as MenuItemComponent,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Dashboard as OverviewIcon,
  Person as PersonIcon,
  PostAdd as PostAddIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Favorite as FavoriteIcon,
  Payment as PaymentIcon,
  BusinessCenter as BusinessCenterIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Support as SupportIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { supabaseAuth } from '../services/supabaseAuth';
import { toast } from 'react-toastify';
import type { RootState } from '../store';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showSidebar?: boolean;
  showHeader?: boolean;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  title,
  subtitle,
  showSidebar = true,
  showHeader = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useSelector((state: RootState) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const drawerWidth = 280;

  const sidebarItems = [
    { text: 'Overview', icon: <OverviewIcon />, path: '/home' },
    { text: 'Employers Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Post a Job', icon: <PostAddIcon />, path: '/post-job' },
    { text: 'My Jobs', icon: <WorkIcon />, path: '/my-jobs' },
    { text: 'Saved Candidate', icon: <FavoriteIcon />, path: '/saved-candidates' },
    { text: 'Plans & Billing', icon: <PaymentIcon />, path: '/billing' },
    { text: 'All Companies', icon: <BusinessCenterIcon />, path: '/companies' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  // Function to check if a sidebar item is active
  const isActiveItem = (path: string) => {
    const currentPath = location.pathname;
    
    // Special handling for home/dashboard routes
    if (path === '/home' && (currentPath === '/home' || currentPath === '/dashboard' || currentPath === '/')) {
      return true;
    }
    
    return currentPath === path;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarItemClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleHeaderNavClick = (path: string) => {
    navigate(path);
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setLanguageAnchor(null);
    setProfileAnchor(null);
  };

  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      await supabaseAuth.signOut();
      
      // Dispatch logout action to clear user data
      dispatch(logout());
      
      // Show success message
      toast.success('Logged out successfully!');
      
      // Close any open menus
      handleClose();
      
      // Navigate to login page
      navigate('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      // Even if Supabase logout fails, clear local state
      dispatch(logout());
      toast.success('Logged out successfully!');
      handleClose();
      navigate('/login');
    }
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <BusinessIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight="bold" color="primary">
          BlueStock
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        {sidebarItems.map((item) => {
          const isActive = isActiveItem(item.path);
          return (
            <ListItem
              key={item.text}
              component="div"
              onClick={() => handleSidebarItemClick(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: isActive ? 'primary.light' : 'transparent',
                color: isActive ? 'primary.main' : 'text.primary',
                cursor: 'pointer',
                borderLeft: isActive ? '4px solid' : '4px solid transparent',
                borderLeftColor: isActive ? 'primary.main' : 'transparent',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: isActive ? 'primary.light' : 'action.hover',
                  transform: 'translateX(2px)',
                },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'text.secondary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    fontWeight: isActive ? 600 : 400,
                  }
                }}
              />
            </ListItem>
          );
        })}
        <Divider sx={{ my: 2 }} />
        <ListItem
          component="div"
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: 'error.main',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'error.light',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'error.main' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log-out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Header */}
      {showHeader && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: 'white',
            color: 'text.primary',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            px: { xs: 2, sm: 3 },
            minHeight: { xs: 64, sm: 72 },
            py: { xs: 1, sm: 0 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
              {isMobile && showSidebar && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ 
                    mr: 1,
                    p: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      borderRadius: 2
                    }
                  }}
                >
                  <MenuIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                </IconButton>
              )}
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  color: 'text.primary',
                  letterSpacing: '-0.02em',
                  display: { xs: 'block', sm: 'block' }
                }}
              >
                {title}
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 0.5, sm: 1 },
              flexWrap: 'nowrap'
            }}>
              {/* Navigation Links - Hidden on mobile */}
              <Box sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                gap: 0.5,
                mr: 2
              }}>
                <Button
                  color="inherit"
                  onClick={() => handleHeaderNavClick('/home')}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.04)',
                    }
                  }}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleHeaderNavClick('/jobs')}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.04)',
                    }
                  }}
                >
                  Jobs
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleHeaderNavClick('/support')}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.04)',
                    }
                  }}
                >
                  Support
                </Button>
              </Box>

              {/* Phone - Hidden on mobile */}
              <Box sx={{ 
                display: { xs: 'none', lg: 'flex' }, 
                alignItems: 'center', 
                gap: 0.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                backgroundColor: 'rgba(0,0,0,0.02)',
                mr: 1
              }}>
                <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>

              {/* Language Selector */}
              <Button
                color="inherit"
                onClick={handleLanguageClick}
                startIcon={<LanguageIcon sx={{ fontSize: 18 }} />}
                sx={{ 
                  minWidth: 'auto', 
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  }
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  EN
                </Typography>
              </Button>

              {/* Notifications */}
              <IconButton 
                color="inherit"
                sx={{
                  p: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  }
                }}
              >
                <Badge 
                  badgeContent={4} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.7rem',
                      height: 18,
                      minWidth: 18,
                      fontWeight: 600
                    }
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: 20 }} />
                </Badge>
              </IconButton>

              {/* Post A Jobs Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  borderRadius: 2,
                  px: { xs: 2, sm: 3 },
                  py: 1,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
                onClick={() => handleHeaderNavClick('/post-job')}
              >
                Post A Jobs
              </Button>

              {/* Profile Avatar */}
              <Tooltip title={user?.full_name || 'User Profile'}>
                <IconButton 
                  onClick={handleProfileClick}
                  sx={{
                    p: 0.5,
                    ml: 1,
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    transition: 'transform 0.2s ease-in-out'
                  }}
                >
                  <Avatar sx={{ 
                    width: { xs: 32, sm: 36 }, 
                    height: { xs: 32, sm: 36 }, 
                    bgcolor: 'primary.main',
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)'
                  }}>
                    {user?.full_name ? (
                      user.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                    ) : (
                      <PersonIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                    )}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <>
          <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                borderRight: '1px solid #e0e0e0',
                backgroundColor: '#fafafa',
              },
            }}
          >
            {drawer}
          </Drawer>
        </>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          width: { md: showSidebar ? `calc(100% - ${drawerWidth}px)` : '100%' },
          ml: { md: showSidebar ? `${drawerWidth}px` : 0 },
          mt: showHeader ? { xs: '64px', sm: '72px' } : 0,
          minHeight: showHeader ? { xs: 'calc(100vh - 64px)', sm: 'calc(100vh - 72px)' } : '100vh',
          maxWidth: { md: '1400px' },
          mx: { md: 'auto' },
        }}
      >
        {subtitle && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {subtitle}
          </Typography>
        )}
        {children}
      </Box>

      {/* Language Menu */}
      <Menu
        anchorEl={languageAnchor}
        open={Boolean(languageAnchor)}
        onClose={handleClose}
      >
        <MenuItemComponent onClick={handleClose}>English</MenuItemComponent>
        <MenuItemComponent onClick={handleClose}>Spanish</MenuItemComponent>
        <MenuItemComponent onClick={handleClose}>French</MenuItemComponent>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={handleClose}
      >
        {user?.full_name && (
          <MenuItemComponent disabled>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              {user.full_name}
            </Typography>
          </MenuItemComponent>
        )}
        <MenuItemComponent onClick={() => { handleClose(); navigate('/profile'); }}>
          Profile
        </MenuItemComponent>
        <MenuItemComponent onClick={() => { handleClose(); navigate('/settings'); }}>
          Settings
        </MenuItemComponent>
        <MenuItemComponent onClick={handleLogout}>
          Logout
        </MenuItemComponent>
      </Menu>
    </Box>
  );
};

export default ResponsiveLayout;
