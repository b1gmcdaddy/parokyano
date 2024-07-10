import React, { useState, useEffect } from "react";
import NavStaff from "../../components/NavStaff";
import { Box, Toolbar, Typography, Button } from "@mui/material";


const ServiceRequests = () => {
  return (
    <Box sx={{ display: "flex", mx: { md: "30px" } }}>
      <NavStaff />
       <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }} >
          <Toolbar />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', 
            marginTop: '8px', alignItems: 'center' }}>
            <Typography sx={{fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600}}>Service Requests</Typography> 
            <Button variant="contained" type="button" sx={{backgroundColor:"#355173"}}>ADD REQUEST</Button>
          </Box>
          

        </Box>
    </Box>
  );
};

export default ServiceRequests;
