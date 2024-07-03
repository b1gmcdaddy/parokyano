import React from 'react';
import NavStaff from '../../components/NavStaff';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const StaffDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavStaff />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>
          Hello, World Hello, WorldHello, WorldHello, WorldHello, WorldHello, WorldHello, WorldHello, World
          Hello, WorldHello, WorldHello, WorldHello, WorldHello, WorldHello, WorldHello, WorldHello, WorldHello, World
          Hello, WorldHello, WorldHello, WorldHello, WorldHello, World
        </Typography>
      </Box>
    </Box>
  );
}

export default StaffDashboard;
