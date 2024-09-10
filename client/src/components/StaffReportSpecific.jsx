import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState, useEffect } from "react";
import logo from '../assets/logo.png';
import axios from "axios";
import config from "../config";
import { ReactToPrint } from 'react-to-print';

const StaffReportSpecific = ({category}) => {

    const dummyData = [
        {
            category: 'Wedding',
            status: 'approved',
            couple: 'Clyde Noob & Carl Barrera',
            dateRequested: 'August 24, 2023',
            dateApproved: 'August 30, 2023',
            interval: '6 Days',
            fees: 500
        },
        {
            category: 'Wedding',
            status: 'pending',
            couple: 'Clyde Barrera & Carl Noob',
            dateRequested: 'June 01, 2023',
            dateApproved: null,
            interval: null,
            fees: null,
        },
        {
            category: 'Wedding',
            status: 'approved',
            couple: 'Bob Tani & Larry Bird',
            dateRequested: 'August 01, 2023',
            dateApproved: 'August 07, 2023',
            interval: '6 Days',
            fees: 500
        },
          {
            category: 'Wedding',
            status: 'cancelled',
            couple: 'Jebron Lames & Nick Dick',
            dateRequested: 'August 01, 2023',
            dataCancelled: 'August 07, 2023',
            interval: '6 Days',
        },
    ];

    //testing shite
    const pendingData = dummyData.filter(data => data.status === 'pending' && data.category === category);
    const cancelledData = dummyData.filter(data => data.status === 'cancelled' && data.category === category);
    const approvedData = dummyData.filter(data => data.status === 'approved' && data.category === category);


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
                                <TableCell colSpan={5} sx={{fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center'}}>{category}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" sx={{fontWeight: 'bold', fontSize: '1rem', backgroundColor: 'green', color: 'white'}}>APPROVED</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Date Requested</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Date Approved</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Interval</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Fees Collected</TableCell>
                            </TableRow>

                                  {approvedData.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{data.couple}</TableCell>
                                    <TableCell align="right">{data.dateRequested}</TableCell>
                                    <TableCell align="right">{data.dateApproved}</TableCell>
                                    <TableCell align="right">{data.interval}</TableCell>
                                    <TableCell align="right">{data.fees}</TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell align="center" sx={{fontWeight: 'bold', fontSize: '1rem', backgroundColor: '#ED8234', color: 'white'}}>PENDING</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Date Requested</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Date Approved</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Interval</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Fees Collected</TableCell>
                            </TableRow>

                                  {pendingData.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{data.couple}</TableCell>
                                    <TableCell align="right">{data.dateRequested}</TableCell>
                                    <TableCell align="right">{data.dateApproved || <i>N/A</i>}</TableCell>
                                    <TableCell align="right">{data.interval || <i>N/A</i>}</TableCell>
                                    <TableCell align="right">{data.fees || <i>N/A</i>}</TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell align="center" sx={{fontWeight: 'bold', fontSize: '1rem', backgroundColor: '#950000', color: 'white'}}>CANCELLED</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Date Requested</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Date Cancelled</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Interval</TableCell>
                                <TableCell align="right" sx={{fontWeight: 'bold'}}>Fees Collected</TableCell>
                            </TableRow>

                                  {cancelledData.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{data.couple}</TableCell>
                                    <TableCell align="right">{data.dateRequested}</TableCell>
                                    <TableCell align="right">{data.dataCancelled || <i>N/A</i>}</TableCell>
                                    <TableCell align="right">{data.interval || <i>N/A</i>}</TableCell>
                                    <TableCell align="right">{data.fees || <i>N/A</i>}</TableCell>
                                </TableRow>
                            ))}
                       
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default StaffReportSpecific