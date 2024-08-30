import React, { useState, useEffect } from "react";
import NavStaff from "../../components/NavStaff";
import { Box, Toolbar, Typography, Button, Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PendingRequests from "./requests-list/PendingRequests";
import ApprovedRequests from "./requests-list/ApprovedRequests";



const ServiceRequests = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  
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

          <Box sx={{ width: '100%', marginTop: '20px'}}>
            <Grid container spacing={1}>
              <Grid item sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  type="button"
                  sx={{
                    backgroundColor: activeTab === 0 ? "#355173" : "#D9D9D9",
                    height: '40px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    color: activeTab === 0 ? 'white' : 'black',
                  }}
                  onClick={() => handleTabChange(0)}
                >
                  Approved Requests
                </Button>
              </Grid>
              <Grid item sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  type="button"
                  sx={{
                    backgroundColor: activeTab === 1 ? "#355173" : "#D9D9D9",
                    height: '40px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    color: activeTab === 1 ? 'white' : 'black',
                  }}
                  onClick={() => handleTabChange(1)}
                >
                  Pending Requests
                </Button>
              </Grid>
              <Grid item sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  type="button"
                  sx={{
                    backgroundColor: activeTab === 2 ? "#355173" : "#D9D9D9",
                    height: '40px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    color: activeTab === 2 ? 'white' : 'black',
                  }}
                  onClick={() => handleTabChange(2)}
                >
                  Cancelled Requests
                </Button>
              </Grid>

              <Grid item sm={12}>
                <TextField fullWidth size="small" InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}/>
              </Grid>

              <Grid item sm={12}>
                <Box sx={{ p: 3 }}>
                  {activeTab === 0 && <Box>Approved Requests Content</Box>}
                  {activeTab === 1 && <PendingRequests />}
                  {activeTab === 2 && <Box>Cancelled Requests Content</Box>}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Box>
  );
};

export default ServiceRequests;
