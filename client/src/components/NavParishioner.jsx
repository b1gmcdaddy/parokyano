import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const pages = [
  { name: 'Events', path: '/events' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/' },
];

function NavParishioner() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#E8E8E8' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
     
          <Typography
            variant="h6"
            noWrap
            component="a"
            href='/'
            sx={{
              mr: 6,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'arial',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            PAROKYANO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#000000"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                color: '#000000'
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={page.path}>
                    {page.name}
                    </Link>
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href='/'
            sx={{
              mr: 4,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            PAROKYANO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#000000', display: 'block', textTransform: 'none' }}
              >
              <Link to={page.path}>{page.name}</Link>
              </Button>
            ))}
          </Box>

         
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavParishioner;
