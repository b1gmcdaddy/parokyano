import { useState } from "react";
import React from "react";
import NavStaff from "../../components/NavStaff";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Toolbar, Typography, Button, Grid, TextField, InputAdornment } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CertificatesPending from "./certificates-list/CertificatesPending";
import CertificatesForClaiming from "./certificates-list/CertificatesForClaiming";


const CertificateRequests = () => {

    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

  return (
    <>
            <Box sx={{ display: "flex", mx: { md: "30px" } }}>
                <NavStaff />
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }} >
                    <Toolbar />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', alignItems: 'center' }}>
                        <Typography sx={{fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600}}>Certificate Requests</Typography> 
                        <Button variant="contained" type="button" sx={{backgroundColor:"#355173"}}>ADD REQUEST</Button>
                    </Box>

                    <Box sx={{ width: '100%', marginTop: '20px'}}>
                        <Grid container spacing={1}>
                            <Grid item sm={6}>
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
                                    Pending
                                </Button>
                            </Grid>
                            <Grid item sm={6}>
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
                                    For Claiming
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
                                    {activeTab === 0 && <CertificatesPending />}
                                    {activeTab === 1 && <CertificatesForClaiming />}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
  )
}

export default CertificateRequests