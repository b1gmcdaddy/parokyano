import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import React, {useState} from "react";
import logo from '../assets/logo.png';



const StaffReport = () => {

    const [reportInfo, setReportInfo] = useState([]);


  return (
    <>
        <Box sx={{ display: "flex", alignItems: 'center' }}>
            <img src={logo} style={{ height: 'auto', width: '10%'}} />
            <Typography>Catholic Church of Christ of the Agony <br/>Gethsemane Parish</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', margin: 'auto' }}>
            <Typography>Parokyano Generated Report</Typography>
            <Typography sx={{ fontStyle: 'italic', fontSize: '14px'}}>`Date Here`</Typography>
        </Box>

        <Box sx={{marginTop: '3em'}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                        <TableRow sx={{backgroundColor: '#D9D9D9'}}>
                            <TableCell sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Parish Service</TableCell>
                            <TableCell align="right" sx={{fontWeight: 'bold'}}>Pending Requests</TableCell>
                            <TableCell align="right" sx={{fontWeight: 'bold'}}>Cancelled Requests</TableCell>
                            <TableCell align="right" sx={{fontWeight: 'bold'}}>Approved Requests</TableCell>
                            <TableCell align="right" sx={{fontWeight: 'bold'}}>Fees Collected</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                            <TableCell component="th" scope="row">
      
                            </TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            </TableRow>
              
                        </TableBody>
                    </Table>
                </TableContainer>
        </Box>
    </>
  )
};

export default StaffReport;
