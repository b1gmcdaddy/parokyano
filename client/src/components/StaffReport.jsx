import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState, useEffect } from "react";
import logo from '../assets/logo.png';
import axios from "axios";
import config from "../config";
import { ReactToPrint } from 'react-to-print';

const StaffReport = () => {

    const [reportInfo, setReportInfo] = useState({});

    useEffect(() => {
        const getSummaryReport = async () => {
            try {
                const res = await axios.get(`${config.API}/request/summary`, {
                    params: {
                        requestDate: '2024-07-01',  // for testing muna
                        approveDate: '2024-07-20' 
                    }
                });
                setReportInfo(res.data); 
            } catch (err) {
                console.error('error retrieving summary', err);
            }
        };
        getSummaryReport();
    }, []);

    return (
        <>
            <Box sx={{ display: "flex", alignItems: 'center' }}>
                <img src={logo} style={{ height: 'auto', width: '10%', marginTop: '1em' }} alt="Logo" />
                <Typography>Catholic Church of Christ of the Agony <br/>Gethsemane Parish</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', margin: 'auto' }}>
                <Typography>Parokyano Generated Report</Typography>
                <Typography sx={{ fontStyle: 'italic', fontSize: '14px' }}>{'Date Here'}</Typography>
            </Box>

            <Box sx={{ marginTop: '3em' }}>
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
                            {Object.entries(reportInfo).map(([type, info]) => (
                                <TableRow key={type} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell component="th" scope="row">{type}</TableCell>
                                    <TableCell align="right">{info.pending}</TableCell>
                                    <TableCell align="right">{info.cancelled}</TableCell>
                                    <TableCell align="right">{info.approved}</TableCell>
                                    <TableCell align="right"> {/* to implement */} </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default StaffReport;
