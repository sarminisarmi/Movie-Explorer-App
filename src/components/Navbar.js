import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  useMediaQuery, 
  useTheme,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = ({ darkMode, setDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar sx={{ 
        padding: { xs: '0 8px', sm: '0 16px' },
        minHeight: { xs: 56, sm: 64 }
      }}>
        {/* Logo/Brand */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: { xs: 1, md: 0 },
            mr: { md: 3 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Movie Explorer
          </Link>
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ 
            display: 'flex', 
            flexGrow: 1,
            alignItems: 'center',
            gap: 1
          }}>
            <SearchBar fullWidth />
            <Box sx={{ display: 'flex', ml: 'auto', gap: 1 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/favorites"
                sx={{ minWidth: 'auto', px: 2 }}
              >
                Favorites
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{ minWidth: 'auto', px: 2 }}
              >
                Login
              </Button>
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </Box>
          </Box>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <Box sx={{ 
            display: 'flex', 
            flexGrow: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 1
          }}>
            {/* Mobile Search Toggle */}
            <IconButton
              color="inherit"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <SearchIcon />
            </IconButton>

            {/* Hamburger Menu */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              size="large"
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile Menu */}
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {showMobileSearch && (
                <MenuItem sx={{ px: 2, py: 1.5 }}>
                  <SearchBar fullWidth autoFocus />
                </MenuItem>
              )}
              <MenuItem 
                component={Link} 
                to="/favorites" 
                onClick={handleMenuClose}
              >
                Favorites
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/login" 
                onClick={handleMenuClose}
              >
                Login
              </MenuItem>
              <Divider />
              <MenuItem>
                <ThemeToggle 
                  darkMode={darkMode} 
                  setDarkMode={setDarkMode} 
                  showLabel 
                />
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>

      {/* Mobile Search Bar (when toggled) */}
      {isMobile && showMobileSearch && (
        <Box sx={{ px: 2, pb: 2, display: { md: 'none' } }}>
          <SearchBar fullWidth autoFocus />
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;