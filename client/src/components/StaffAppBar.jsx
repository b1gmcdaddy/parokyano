import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const StaffAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{paddingY: "8px", backgroundColor: "#D9D9D9" }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="black" component="div" sx={{letterSpacing: "2px", marginLeft: {md: "8em"}}}>
            Parokyano
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default StaffAppBar;